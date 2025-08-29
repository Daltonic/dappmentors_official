import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Product } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateUniqueSlug } from "@/heplers/products";

type ProductType = "Course" | "Bootcamp" | "eBook" | "Codebase";
type ProductStatus = "published" | "draft" | "archived";
type ProductDifficulty = "Beginner" | "Intermediate" | "Advanced";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
}

// GET - Get single product by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

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
    const collection: Collection<ProductDocument> = db.collection("products");

    // Determine query based on param
    let query: Filter<ProductDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    const product = await collection.findOne(query);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check permissions - non-admin users can only view published products or their own
    if (
      payload.role !== "admin" &&
      product.status !== "published" &&
      product.createdBy !== payload.userId
    ) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Transform for frontend
    const { _id, ...rest } = product;
    const transformedProduct = {
      ...rest,
      id: _id.toString(),
    } as Product;

    return NextResponse.json({ product: transformedProduct });
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update product by ID or slug
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

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
    const collection: Collection<ProductDocument> = db.collection("products");

    // Determine query based on param
    let query: Filter<ProductDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if product exists and user has permission
    const existingProduct = await collection.findOne(query);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Permission check - only admin or product creator can update
    if (
      payload.role !== "admin" &&
      existingProduct.createdBy !== payload.userId
    ) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to update this product",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validate data if provided
    const validationErrors = validateUpdateProductData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Prepare update data
    const updateData: Partial<Omit<Product, "id">> = {
      updatedAt: new Date(),
    };

    // Only update provided fields
    const allowedFields = [
      "title",
      "description",
      "type",
      "price",
      "status",
      "category",
      "difficulty",
      "duration",
      "instructor",
      "featured",
      "thumbnail",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        let value: unknown = body[field];
        if (typeof value === "string" && field !== "price") {
          value = value.trim();
        }
        if (field === "price") {
          updateData[field] = parseFloat(value as string);
        } else if (field === "type") {
          updateData[field] = value as ProductType;
        } else if (field === "status") {
          updateData[field] = value as ProductStatus;
        } else if (field === "difficulty") {
          updateData[field] = value as ProductDifficulty;
        } else if (field === "featured") {
          updateData[field] = !!value;
        } else {
          (updateData as Record<string, unknown>)[field] = value;
        }
      }
    });

    // If title is updated, regenerate slug
    if (body.title && body.title !== existingProduct.title) {
      updateData.slug = await generateUniqueSlug(
        body.title,
        collection,
        existingProduct._id,
      );
    }

    // Update product
    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch updated product
    const updatedProduct = await collection.findOne(query);

    // Transform for frontend
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Failed to retrieve updated product" },
        { status: 500 },
      );
    }
    const { _id, ...rest } = updatedProduct;
    const transformedProduct = {
      ...rest,
      id: _id.toString(),
    } as Product;

    return NextResponse.json({
      message: "Product updated successfully",
      product: transformedProduct,
    });
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          { error: "A product with this title already exists" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// DELETE - Delete product by ID or slug
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

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
    const collection: Collection<ProductDocument> = db.collection("products");

    // Determine query based on param
    let query: Filter<ProductDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if product exists and user has permission
    const existingProduct = await collection.findOne(query);
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Permission check - only admin or product creator can delete
    if (
      payload.role !== "admin" &&
      existingProduct.createdBy !== payload.userId
    ) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to delete this product",
        },
        { status: 403 },
      );
    }

    // Check if product has enrollments (prevent deletion of products with students)
    if (existingProduct.enrollments > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete product with active enrollments. Archive it instead.",
        },
        { status: 400 },
      );
    }

    // Delete product
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      deletedId: param,
    });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Validation helper for updates
function validateUpdateProductData(data: Partial<Product>): string[] {
  const errors: string[] = [];

  // Title validation (if provided)
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    }
    if (data.title.length > 100) {
      errors.push("Title must be less than 100 characters");
    }
  }

  // Description validation (if provided)
  if (data.description !== undefined) {
    if (
      typeof data.description !== "string" ||
      data.description.trim().length < 10
    ) {
      errors.push("Description must be at least 10 characters long");
    }
    if (data.description.length > 500) {
      errors.push("Description must be less than 500 characters");
    }
  }

  // Type validation (if provided)
  if (data.type !== undefined) {
    const validTypes = ["Course", "Bootcamp", "eBook", "Codebase"];
    if (!validTypes.includes(data.type)) {
      errors.push("Invalid product type");
    }
  }

  // Price validation (if provided)
  if (data.price !== undefined) {
    const price = parseFloat(String(data.price));
    if (isNaN(price) || price < 0) {
      errors.push("Price must be a valid positive number");
    }
    if (price > 10000) {
      errors.push("Price cannot exceed $10,000");
    }
  }

  // Status validation (if provided)
  if (data.status !== undefined) {
    const validStatuses = ["published", "draft", "archived"];
    if (!validStatuses.includes(data.status)) {
      errors.push("Invalid status");
    }
  }

  // Difficulty validation (if provided)
  if (data.difficulty !== undefined) {
    const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
    if (!validDifficulties.includes(data.difficulty)) {
      errors.push("Invalid difficulty level");
    }
  }

  // Thumbnail validation (if provided)
  if (data.thumbnail !== undefined && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  return errors;
}
