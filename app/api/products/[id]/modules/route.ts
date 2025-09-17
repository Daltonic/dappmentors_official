// /api/products/[id]/modules/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Collection, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { Product } from "@/utils/interfaces";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
}

// GET - Fetch all modules for a specific product
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
        product.createdBy !== payload.userId &&
        product.status !== "published"
      ) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
    }

    console.log(
      `GET - Found product with ${product.modules?.length || 0} modules`,
    );

    // Return the modules
    const modules = product.modules || [];

    return NextResponse.json({
      modules: modules.map((module, index) => ({
        ...module,
        id: module.id || `module-${index}`, // Ensure each module has an ID
        lessons: (module.lessons || []).map((lesson, lessonIndex) => ({
          ...lesson,
          id: lesson.id || `lesson-${lessonIndex}`, // Ensure each lesson has an ID
        })),
      })),
    });
  } catch (error) {
    console.error("GET /api/products/[id]/modules error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
