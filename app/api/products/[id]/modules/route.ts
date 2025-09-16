import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Lesson, ModuleWithLessons, Product } from "@/utils/interfaces";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
  modules?: ModuleWithLessons[];
}

// Utility function to generate unique IDs (matching product-seeder pattern)
const generateId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 9; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// GET - List all modules for a product with lessons
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    console.log(`GET /api/products/${productId}/modules - Starting`);

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const productsCollection: Collection<ProductDocument> =
      db.collection("products");

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

    // Get modules from product and ensure they have proper structure
    const modules = (product.modules || []) as ModuleWithLessons[];

    console.log(
      `GET - Found ${modules.length} modules for product ${productId}`,
    );
    if (modules.length > 0) {
      console.log(`GET - First module duration: "${modules[0].duration}"`);
    }

    // Sort modules by order
    const sortedModules = modules.sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );

    return NextResponse.json({
      modules: sortedModules,
    });
  } catch (error) {
    console.error("GET /api/products/[productId]/modules error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update modules with lessons for a product (DEBUG VERSION)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const startTime = Date.now();

  try {
    const resolvedParams = await params;
    const { id: productId } = resolvedParams;

    console.log(`\n=== PUT /api/products/${productId}/modules - Starting ===`);
    console.log(`Request timestamp: ${new Date().toISOString()}`);

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
    const productsCollection: Collection<ProductDocument> =
      db.collection("products");

    // Get current product state BEFORE update
    const productBefore = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productBefore) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (
      payload.role !== "admin" &&
      productBefore.createdBy !== payload.userId
    ) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log(
      `Current modules count: ${(productBefore.modules || []).length}`,
    );
    if (productBefore.modules && productBefore.modules.length > 0) {
      console.log(
        `Current first module duration: "${productBefore.modules[0].duration}"`,
      );
    }

    // Parse request body
    const body = await request.json();
    const incomingModules: ModuleWithLessons[] = body.modules;

    console.log(`Incoming modules count: ${incomingModules.length}`);
    if (incomingModules.length > 0) {
      console.log(
        `Incoming first module duration: "${incomingModules[0].duration}"`,
      );
      console.log(
        "Incoming first module structure:",
        JSON.stringify(
          {
            id: incomingModules[0].id,
            title: incomingModules[0].title,
            duration: incomingModules[0].duration,
            lessonsCount: incomingModules[0].lessons?.length || 0,
          },
          null,
          2,
        ),
      );
    }

    if (!Array.isArray(incomingModules)) {
      return NextResponse.json(
        { error: "Modules must be an array" },
        { status: 400 },
      );
    }

    // Allow empty modules array
    if (incomingModules.length === 0) {
      console.log("Clearing all modules");

      const clearResult = await productsCollection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $set: {
            modules: [],
            updatedAt: new Date(),
            lastUpdated: new Date().toISOString(),
          },
        },
      );

      console.log("Clear result:", clearResult);

      return NextResponse.json(
        {
          message: "Modules cleared successfully",
          modules: [],
        },
        { status: 200 },
      );
    }

    // Basic validation - keep it simple
    const errors: string[] = [];

    incomingModules.forEach((module, moduleIndex) => {
      if (!module.title || !module.title.trim()) {
        errors.push(`Module ${moduleIndex + 1}: Title is required`);
      }
      if (!module.description || !module.description.trim()) {
        errors.push(`Module ${moduleIndex + 1}: Description is required`);
      }
      if (!module.duration || !module.duration.trim()) {
        errors.push(`Module ${moduleIndex + 1}: Duration is required`);
      }
    });

    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      return NextResponse.json(
        { error: "Validation errors", details: errors },
        { status: 400 },
      );
    }

    // Process modules - preserve as much original structure as possible
    const processedModules: ModuleWithLessons[] = incomingModules.map(
      (module, moduleIndex) => {
        console.log(
          `Processing module ${moduleIndex + 1}: "${module.title}" - Duration: "${module.duration}"`,
        );

        const moduleId = module.id || `module-${generateId()}`;

        // Process lessons
        const processedLessons: Lesson[] = (module.lessons || []).map(
          (lesson: Lesson, lessonIndex: number) => {
            const lessonId = lesson.id || `lesson-${generateId()}`;

            const processedResources = (lesson.resources || []).map(
              (resource) => ({
                id: resource.id || `resource-${generateId()}`,
                title: resource.title || `Resource ${lessonIndex + 1}`,
                type: resource.type || "link",
                url: resource.url || "",
                downloadable: resource.downloadable ?? false,
              }),
            );

            const processedLesson: Lesson = {
              id: lessonId,
              title: lesson.title || `Lesson ${lessonIndex + 1}`,
              type: lesson.type || "reading",
              duration: lesson.duration || "15 minutes",
              description: lesson.description || "",
              completed: lesson.completed ?? false,
              locked: lesson.locked ?? lessonIndex > 0,
              order: lessonIndex,
              resources: processedResources,
            };

            // Add optional fields if they exist
            if (lesson.videoUrl) processedLesson.videoUrl = lesson.videoUrl;
            if (lesson.content) processedLesson.content = lesson.content;
            if (lesson.transcript)
              processedLesson.transcript = lesson.transcript;

            return processedLesson;
          },
        );

        const processedModule: ModuleWithLessons = {
          id: moduleId,
          title: module.title,
          description: module.description,
          duration: module.duration, // Keep original duration exactly as provided
          lessons: processedLessons,
          completed: module.completed ?? false,
          progress: module.progress ?? 0,
          order: moduleIndex,
        };

        // Add productId if provided
        if (module.productId) {
          processedModule.productId = module.productId;
        }

        console.log(
          `Processed module ${moduleIndex + 1}: Duration="${processedModule.duration}"`,
        );

        return processedModule;
      },
    );

    console.log("\n--- ABOUT TO UPDATE DATABASE ---");
    console.log(`Updating ${processedModules.length} modules`);
    console.log(
      "First processed module:",
      JSON.stringify(
        {
          id: processedModules[0]?.id,
          title: processedModules[0]?.title,
          duration: processedModules[0]?.duration,
          lessonsCount: processedModules[0]?.lessons?.length || 0,
        },
        null,
        2,
      ),
    );

    // Perform the database update
    const updateResult = await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          modules: processedModules,
          updatedAt: new Date(),
          lastUpdated: new Date().toISOString(),
        },
      },
    );

    console.log("\n--- UPDATE RESULT ---");
    console.log("Update result:", {
      acknowledged: updateResult.acknowledged,
      matchedCount: updateResult.matchedCount,
      modifiedCount: updateResult.modifiedCount,
      upsertedCount: updateResult.upsertedCount,
      upsertedId: updateResult.upsertedId,
    });

    if (updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: "Product not found for update" },
        { status: 404 },
      );
    }

    // CRITICAL: Verify the update by fetching the product again
    console.log("\n--- VERIFICATION FETCH ---");
    const verificationProduct = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!verificationProduct) {
      console.error("CRITICAL: Product not found during verification!");
      return NextResponse.json(
        { error: "Failed to verify update" },
        { status: 500 },
      );
    }

    const savedModules = verificationProduct.modules || [];
    console.log(
      `Verification: Found ${savedModules.length} modules in database`,
    );

    if (savedModules.length > 0) {
      console.log(
        `Verification: First module duration="${savedModules[0].duration}"`,
      );
      console.log(
        "Verification: First saved module structure:",
        JSON.stringify(
          {
            id: savedModules[0].id,
            title: savedModules[0].title,
            duration: savedModules[0].duration,
            lessonsCount: savedModules[0].lessons?.length || 0,
          },
          null,
          2,
        ),
      );
    }

    // Check if the data actually matches what we tried to save
    if (processedModules.length > 0 && savedModules.length > 0) {
      const originalDuration = processedModules[0].duration;
      const savedDuration = savedModules[0].duration;

      if (originalDuration !== savedDuration) {
        console.error("CRITICAL: Duration mismatch detected!");
        console.error(
          `Expected: "${originalDuration}", Got: "${savedDuration}"`,
        );

        return NextResponse.json(
          {
            error:
              "Data consistency error - update may not have persisted correctly",
            details: {
              expected: originalDuration,
              actual: savedDuration,
            },
          },
          { status: 500 },
        );
      }
    }

    const endTime = Date.now();
    console.log(
      `\n=== PUT OPERATION COMPLETED in ${endTime - startTime}ms ===`,
    );
    console.log(`Successfully updated product ${productId}`);

    // Return the verified modules from database
    const sortedModules = savedModules.sort(
      (a, b) => (a.order || 0) - (b.order || 0),
    );

    return NextResponse.json(
      {
        message: "Modules updated successfully",
        modules: sortedModules,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PUT /api/products/[productId]/modules error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
