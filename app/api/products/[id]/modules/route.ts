// api/products/[productId]/modules/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, Filter, ObjectId, OptionalId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Lesson, ModuleWithLessons } from "@/utils/interfaces";

interface ModuleDocument extends Omit<ModuleWithLessons, "id"> {
  _id: ObjectId;
  productId: ObjectId;
}

// GET - List all modules for a product with pagination (if needed)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const modulesCollection: Collection<ModuleDocument> =
      db.collection("modules");
    const productsCollection: Collection = db.collection("products");

    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check authentication
    const accessToken = request.cookies.get("access-token")?.value;
    let payload = null;
    if (accessToken) {
      try {
        payload = await verifyAccessToken(accessToken);
      } catch (error) {
        console.warn("Invalid access token in GET modules request:", error);
      }
    }

    // Access control
    if (!payload) {
      if (product.status !== "published") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      if (
        payload.role !== "admin" &&
        product.createdBy !== payload.userId &&
        product.status !== "published"
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    const filter: Filter<ModuleDocument> = {
      productId: new ObjectId(productId),
    };

    const modules = await modulesCollection
      .find(filter)
      .sort({ order: 1 })
      .toArray();

    const transformedModules = modules.map((module) => ({
      ...module,
      id: module._id.toString(),
      productId: module.productId.toString(),
      _id: undefined,
    })) as ModuleWithLessons[];

    return NextResponse.json({
      modules: transformedModules,
    });
  } catch (error) {
    console.error("GET /api/products/[productId]/modules error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update multiple modules with lessons for a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check permission
    if (payload.role !== "admin" && payload.role !== "instructor") {
      return NextResponse.json(
        { error: "Forbidden - Admin or Instructor access required" },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const modulesCollection: Collection<ModuleDocument> =
      db.collection("modules");
    const productsCollection: Collection = db.collection("products");

    // Check product exists and permission
    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (payload.role !== "admin" && product.createdBy !== payload.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const modules: ModuleWithLessons[] = body.modules;

    console.log("Incoming modules:", JSON.stringify(modules, null, 2));

    if (!Array.isArray(modules) || modules.length === 0) {
      return NextResponse.json(
        { error: "At least one module is required" },
        { status: 400 },
      );
    }

    // Validate modules and lessons
    const errors: string[] = [];
    modules.forEach((module, index) => {
      const requiredFields: (keyof ModuleWithLessons)[] = [
        "title",
        "description",
        "duration",
      ];
      const missingFields = requiredFields.filter((field) => {
        const value = module[field];
        return typeof value !== "string" || !value.trim();
      });
      if (missingFields.length > 0) {
        errors.push(
          `Module ${index + 1}: Missing or invalid fields: ${missingFields.join(", ")}`,
        );
      }

      if (module.lessons && Array.isArray(module.lessons)) {
        module.lessons.forEach((lesson, lessonIndex) => {
          const lessonRequiredFields: (keyof Lesson)[] = [
            "title",
            "type",
            "duration",
          ];
          const missingLessonFields = lessonRequiredFields.filter((field) => {
            const value = lesson[field];
            return typeof value !== "string" || !value.trim();
          });
          if (missingLessonFields.length > 0) {
            errors.push(
              `Module ${index + 1}, Lesson ${lessonIndex + 1}: Missing or invalid fields: ${missingLessonFields.join(
                ", ",
              )}`,
            );
          }
        });
      }
    });

    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Validation errors", details: errors },
        { status: 400 },
      );
    }

    // Prepare operations for upserting modules
    const operations = modules.map(async (module, index) => {
      const moduleId =
        module.id && ObjectId.isValid(module.id)
          ? module.id
          : new ObjectId().toString();

      const moduleData: OptionalId<ModuleDocument> = {
        productId: new ObjectId(productId),
        title: module.title.trim(),
        description: module.description.trim(),
        duration: module.duration.trim(),
        lessons: module.lessons.map((lesson, lessonIndex) => ({
          ...lesson,
          id:
            lesson.id && ObjectId.isValid(lesson.id)
              ? lesson.id
              : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          completed: lesson.completed || false,
          locked: lesson.locked || false,
          order: lessonIndex,
          resources:
            lesson.resources?.map((resource) => ({
              ...resource,
              id:
                resource.id && ObjectId.isValid(resource.id)
                  ? resource.id
                  : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              downloadable: resource.downloadable || false,
            })) || [],
        })),
        completed: module.completed || false,
        progress: module.progress || 0,
        order: index,
      };

      const filter: Filter<ModuleDocument> = {
        _id: new ObjectId(moduleId),
        productId: new ObjectId(productId),
      };

      return modulesCollection
        .replaceOne(filter, moduleData, { upsert: true })
        .then((result) => ({
          operation: result,
          moduleId,
        }));
    });

    // Execute all operations and collect results
    const operationResults = await Promise.all(operations);

    // Log operation results
    operationResults.forEach((result, index) => {
      console.log(
        `Module ${index + 1} operation result:`,
        JSON.stringify(result, null, 2),
      );
      if (result.operation.matchedCount === 0 && !result.operation.upsertedId) {
        console.warn(`Module ${index + 1} was not updated or inserted`);
      }
    });

    // Collect IDs of modules that were successfully updated or inserted
    const moduleIds = operationResults
      .filter((result) => result.moduleId)
      .map((result) => new ObjectId(result.moduleId));

    // Delete modules not included in the update
    if (moduleIds.length > 0) {
      const deleteResult = await modulesCollection.deleteMany({
        productId: new ObjectId(productId),
        _id: { $nin: moduleIds },
      });
      console.log(`Deleted ${deleteResult.deletedCount} outdated modules`);
    }

    // Fetch updated modules
    const updatedModules = await modulesCollection
      .find({ productId: new ObjectId(productId) })
      .sort({ order: 1 })
      .toArray();

    const transformedModules = updatedModules.map((module) => ({
      ...module,
      id: module._id.toString(),
      productId: module.productId.toString(),
      _id: undefined,
    })) as ModuleWithLessons[];

    return NextResponse.json(
      {
        message: "Modules updated successfully",
        modules: transformedModules,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT /api/products/[productId]/modules error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
