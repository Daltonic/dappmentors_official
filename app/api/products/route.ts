// /api/products/route.ts

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

// GET - List all products with filtering and pagination
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
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

    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const type = url.searchParams.get("type") || "";
    const status = url.searchParams.get("status") || "";
    const category = url.searchParams.get("category") || "";
    const difficulty = url.searchParams.get("difficulty") || "";
    const featured = url.searchParams.get("featured");
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    // Build filter query
    const filter: Filter<ProductDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { instructor: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    if (type) filter.type = type as ProductType;
    if (status) filter.status = status as ProductStatus;
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty as ProductDifficulty;
    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Non-admin users can only see published products (unless they're the creator)
    if (payload.role !== "admin") {
      filter.$or = [{ status: "published" }, { createdBy: payload.userId }];
    }

    // Build sort object
    const sort: { [key: string]: 1 | -1 } = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [products, totalProducts] = await Promise.all([
      collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
      collection.countDocuments(filter),
    ]);

    // Transform products for frontend
    const transformedProducts = products.map(
      (product) =>
        ({
          ...product,
          id: product._id.toString(),
          _id: undefined,
        }) as Product,
    );

    const totalPages = Math.ceil(totalProducts / limit);

    return NextResponse.json({
      products: transformedProducts,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        type,
        status,
        category,
        difficulty,
        featured,
      },
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Check if user has permission to create products
    if (payload.role !== "admin" && payload.role !== "instructor") {
      return NextResponse.json(
        {
          error: "Forbidden - Admin or Instructor access required",
        },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<Omit<ProductDocument, "_id">> =
      db.collection("products");

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "type",
      "price",
      "category",
      "difficulty",
      "duration",
      "instructor",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Validate data types and constraints
    const validationErrors = validateProductData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Generate unique slug
    const slug = await generateUniqueSlug(
      body.title,
      db.collection("products"),
    );

    // Prepare product document
    const now = new Date();
    const productData: Omit<ProductDocument, "_id"> = {
      slug,
      title: body.title.trim(),
      description: body.description.trim(),
      type: body.type as ProductType,
      price: parseFloat(body.price),
      status: (body.status || "draft") as ProductStatus,
      category: body.category.trim(),
      difficulty: body.difficulty as ProductDifficulty,
      duration: body.duration.trim(),
      enrollments: 0,
      rating: 0,
      totalReviews: 0,
      instructor: body.instructor.trim(),
      createdAt: now,
      updatedAt: now,
      featured: body.featured || false,
      thumbnail: body.thumbnail?.trim() || "",
      createdBy: payload.userId,
    };

    // Insert product
    const result = await collection.insertOne(productData);

    // Fetch the created product
    const createdProduct = await collection.findOne({ _id: result.insertedId });

    if (!createdProduct) {
      return NextResponse.json(
        { error: "Failed to retrieve created product" },
        { status: 500 },
      );
    }

    // Transform for frontend
    const transformedProduct = {
      ...createdProduct,
      id: createdProduct._id.toString(),
      _id: undefined,
    } as Product;

    return NextResponse.json(
      {
        message: "Product created successfully",
        product: transformedProduct,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/products error:", error);

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

// Validation helper function
function validateProductData(data: Partial<Product>): string[] {
  const errors: string[] = [];

  // Title validation
  if (typeof data.title !== "string" || data.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }
  if (data.title && data.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  // Description validation
  if (
    typeof data.description !== "string" ||
    data.description.trim().length < 10
  ) {
    errors.push("Description must be at least 10 characters long");
  }
  if (data.description && data.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  // Type validation
  const validTypes = ["Course", "Bootcamp", "eBook", "Codebase"];
  if (!validTypes.includes(data.type as string)) {
    errors.push("Invalid product type");
  }

  // Price validation
  const price = parseFloat(data.price as unknown as string);
  if (isNaN(price) || price < 0) {
    errors.push("Price must be a valid positive number");
  }
  if (price > 10000) {
    errors.push("Price cannot exceed $10,000");
  }

  // Status validation
  const validStatuses = ["published", "draft", "archived"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push("Invalid status");
  }

  // Difficulty validation
  const validDifficulties = ["Beginner", "Intermediate", "Advanced"];
  if (!validDifficulties.includes(data.difficulty as string)) {
    errors.push("Invalid difficulty level");
  }

  // Thumbnail validation
  if (data.thumbnail && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  return errors;
}
