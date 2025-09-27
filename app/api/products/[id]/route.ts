import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import {
  FAQs,
  Product,
  ProductFeature,
  ProductTestimonial,
  ProductType,
  Package,
} from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import {
  validateAndNormalizeFAQs,
  validateAndNormalizeFeatures,
  validateAndNormalizeTestimonials,
  validateUpdateProductData,
} from "@/validations/products";
import { logActivity } from "@/heplers/users";

type ProductStatus = "published" | "draft" | "archived";
type ProductDifficulty = "Beginner" | "Intermediate" | "Advanced";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
}

// GET - Get single product by ID or slug (PUBLIC ACCESS)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

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

    // Check authentication to determine access level
    const accessToken = request.cookies.get("access-token")?.value;
    let payload = null;

    if (accessToken) {
      try {
        payload = await verifyAccessToken(accessToken);
      } catch (error) {
        // Invalid token, but we'll continue with public access
        console.warn("Invalid access token in GET request:", error);
      }
    }

    // Public access: only show published products
    // Authenticated users: can see their own products regardless of status
    // Admins: can see all products
    if (!payload) {
      // Public access - only published products
      if (product.status !== "published") {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
    } else {
      // Authenticated access - check permissions
      if (
        payload.role !== "admin" &&
        product.status !== "published" &&
        product.createdBy !== payload.userId
      ) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 },
        );
      }
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

// PUT - Update product by ID or slug (REQUIRES AUTHENTICATION)
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
    const now = new Date();
    const updateData: Partial<Omit<Product, "id">> = {
      updatedAt: now,
      lastUpdated: now.toISOString(), // Ensure lastUpdated is set
    };

    // Define all allowed fields
    const allowedFields = [
      "title",
      "subtitle",
      "description",
      "longDescription",
      "type",
      "price",
      "originalPrice",
      "currency",
      "status",
      "category",
      "difficulty",
      "duration",
      "level",
      "language",
      "instructor",
      "featured",
      "imageUrl",
      "videoPreviewUrl",
      "tags",
      "technologies",
      "features",
      "includes",
      "testimonials",
      "faqs",
      "packages",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        let value: unknown = body[field];

        if (
          typeof value === "string" &&
          !["price", "originalPrice"].includes(field)
        ) {
          value = value.trim();
        }

        if (field === "price" || field === "originalPrice") {
          updateData[field] = parseFloat(String(value)) || 0;
        } else if (field === "type") {
          updateData[field] = value as ProductType;
        } else if (field === "status") {
          updateData[field] = value as ProductStatus;
        } else if (field === "difficulty" || field === "level") {
          updateData[field] = value as ProductDifficulty;
        } else if (field === "featured") {
          updateData[field] = !!value;
        } else if (["tags", "technologies", "includes"].includes(field)) {
          (updateData[field as keyof typeof updateData] as
            | string[]
            | undefined) = Array.isArray(value)
            ? (value as string[]).map((item: string) => String(item).trim())
            : [];
        } else if (field === "features") {
          updateData[field] = validateAndNormalizeFeatures(
            value as ProductFeature[],
          );
        } else if (field === "testimonials") {
          updateData[field] = validateAndNormalizeTestimonials(
            value as ProductTestimonial[],
          );
        } else if (field === "faqs") {
          updateData[field] = validateAndNormalizeFAQs(value as FAQs[]);
        } else if (field === "packages") {
          updateData[field] = Array.isArray(value)
            ? (value as Package[])
                .map((pkg) => ({
                  name: pkg.name?.trim() || "",
                  price: pkg.price || "",
                  features: Array.isArray(pkg.features)
                    ? pkg.features.map((f: string) => f.trim()).filter(Boolean)
                    : [],
                }))
                .slice(0, 5)
            : [];
        } else if (
          field === "instructor" &&
          typeof value === "object" &&
          value !== null
        ) {
          updateData[field] = {
            name: String((value as { name?: string }).name || "").trim(),
            bio: String((value as { bio?: string }).bio || "").trim(),
            avatar: String((value as { avatar?: string }).avatar || "").trim(),
            credentials: Array.isArray(
              (value as { credentials?: string[] }).credentials,
            )
              ? (value as { credentials: string[] }).credentials.map(
                  (cred: string) => String(cred).trim(),
                )
              : [],
          };
        } else {
          (updateData as Record<string, unknown>)[field] = value;
        }
      }
    });

    // If title is updated, regenerate slug
    if (body.title && body.title !== existingProduct.title) {
      updateData.slug = generateSlug(
        body.title,
        existingProduct._id.toString(),
      );
    }

    // Update product
    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Log activity for product updated
    await logActivity(
      db,
      "items_activities",
      "Product updated",
      `${body.title || existingProduct.title} ${body.type || existingProduct.type} has been updated`,
      {
        userId: existingProduct.createdBy,
        itemSlug: updateData.slug || existingProduct.slug,
        itemType: "product",
      },
    );

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

// DELETE - Delete product by ID or slug (REQUIRES AUTHENTICATION)
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
    if (existingProduct.enrollments && existingProduct.enrollments > 0) {
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
