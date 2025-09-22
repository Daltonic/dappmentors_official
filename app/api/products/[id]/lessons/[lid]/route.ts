// /api/products/[id]/lessons/[lid]/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Lesson, ModuleWithLessons, Note, Product } from "@/utils/interfaces";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
}

interface NoteDocument extends Omit<Note, "id" | "createdAt"> {
  _id: ObjectId;
  productId: string;
  lessonId: string;
  userId: string;
  createdAt: Date;
}

// GET - Fetch a specific lesson and its notes
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lid: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId, lid: lessonId } = resolvedParams;

    console.log(
      `GET /api/products/${productId}/lessons/${lessonId} - Starting`,
    );

    if (!ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const productsCollection: Collection<ProductDocument> =
      db.collection("products");
    const usersCollection = db.collection("users");

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
        console.warn("Invalid access token in GET lesson request:", error);
      }
    }

    // Access control: Require authentication
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user to check purchase
    const user = await usersCollection.findOne({
      _id: new ObjectId(payload.userId),
    });

    // Check if user is creator or has purchased the product
    const hasAccess =
      product.createdBy === payload.userId ||
      user?.role === "admin" ||
      (user?.purchasedProducts && user.purchasedProducts.includes(productId));

    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    console.log(`Lesson: ${lessonId}, Product: ${productId}`);

    // Find the lesson across all modules
    let foundLesson: Lesson | null = null;
    for (const productModule of product.modules || []) {
      const lesson = productModule.lessons?.find(
        (l: Lesson) => l.id === lessonId,
      );
      if (lesson) {
        foundLesson = lesson;
        break;
      }
    }

    if (!foundLesson) {
      console.log(`GET - Lesson ${lessonId} not found in product ${productId}`);
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    console.log(
      `GET - Found lesson: "${foundLesson.title}" with duration "${foundLesson.duration}"`,
    );

    // Fetch user notes if authenticated
    let notes: Note[] = [];
    if (payload) {
      try {
        const notesCollection: Collection<NoteDocument> =
          db.collection("lesson_notes");
        const userNotes = await notesCollection
          .find({
            productId,
            lessonId,
            userId: payload.userId,
          })
          .sort({ timestamp: 1 })
          .toArray();

        notes = userNotes.map((note) => ({
          id: note._id.toString(),
          timestamp: note.timestamp,
          content: note.content,
          createdAt: note.createdAt,
        }));
      } catch (notesError) {
        console.warn("Error fetching notes:", notesError);
        // Continue without notes if there's an error
      }
    }

    return NextResponse.json({
      lesson: foundLesson,
      notes,
    });
  } catch (error) {
    console.error(
      "GET /api/products/[productId]/lessons/[lessonId] error:",
      error,
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH - Mark lesson as complete (Note: This updates shared product data; in production, use user-specific progress)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; lid: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: productId, lid: lessonId } = resolvedParams;

    const body = await request.json();
    const { completed } = body;

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Completed must be a boolean" },
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

    const db = await connectToDatabase();
    const productsCollection = db.collection("products");
    const usersCollection = db.collection("users");

    const product = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch user to check purchase
    const user = await usersCollection.findOne({
      _id: new ObjectId(payload.userId),
    });

    // Check if user is creator or has purchased the product
    const hasAccess =
      product.createdBy === payload.userId ||
      user?.role === "admin" ||
      (user?.purchasedProducts && user.purchasedProducts.includes(productId));

    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Find and update the lesson
    let updated = false;
    const updatedModules = (product.modules || []).map(
      (module: ModuleWithLessons) => {
        const updatedLessons = module.lessons?.map((lesson: Lesson) => {
          if (lesson.id === lessonId) {
            updated = true;
            return { ...lesson, completed };
          }
          return lesson;
        });
        return { ...module, lessons: updatedLessons };
      },
    );

    if (!updated) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    await productsCollection.updateOne(
      { _id: new ObjectId(productId) },
      {
        $set: {
          modules: updatedModules,
          updatedAt: new Date(),
        },
      },
    );

    return NextResponse.json({ message: "Lesson updated successfully" });
  } catch (error) {
    console.error(
      "PATCH /api/products/[productId]/lessons/[lessonId] error:",
      error,
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
