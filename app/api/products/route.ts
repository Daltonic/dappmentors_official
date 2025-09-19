import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Product, ProductType } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import {
  validateAndNormalizeFeatures,
  validateAndNormalizeModules,
  validateAndNormalizeTestimonials,
  validateAndNormalizeFAQs,
  validateProductData,
} from "@/validations/products";
import { logActivity } from "@/heplers/users";

type ProductStatus = "published" | "draft" | "archived";
type ProductDifficulty =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "All Levels";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

// Helper function to normalize ProductType
const normalizeProductType = (
  type: string | undefined,
): ProductType | undefined => {
  if (!type) return undefined;
  const normalizedType =
    type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return ["Course", "Bootcamp", "Ebook", "Codebase"].includes(normalizedType)
    ? (normalizedType as ProductType)
    : undefined;
};

// GET - List all products with filtering and pagination (PUBLIC ACCESS)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
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

    // Check authentication to determine access level
    const accessToken = request.cookies.get("access-token")?.value;
    let payload = null;

    if (accessToken) {
      try {
        payload = await verifyAccessToken(accessToken);
      } catch (error) {
        console.warn("Invalid access token in GET request:", error);
      }
    }

    // Build filter query
    const filter: Filter<ProductDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { longDescription: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
        { technologies: { $in: [new RegExp(search, "i")] } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    // Normalize type to match ProductType
    const normalizedType = normalizeProductType(type);
    if (normalizedType) {
      filter.type = normalizedType;
    } else if (type) {
      return NextResponse.json(
        { error: `Invalid product type: ${type}` },
        { status: 400 },
      );
    }

    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty as ProductDifficulty;
    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Apply access-based filtering
    if (!payload) {
      // Public access - only published products
      filter.status = "published";
    } else {
      // Authenticated access
      if (status) filter.status = status as ProductStatus;

      // Non-admin users can only see published products (unless they're the creator)
      if (payload.role !== "admin") {
        filter.$or = [{ status: "published" }, { createdBy: payload.userId }];
      }
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
        }) as unknown as Product,
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
        status: payload ? status : "published",
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

// POST - Create new product (REQUIRES AUTHENTICATION)
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
      "instructor.name",
    ];
    const missingFields = requiredFields.filter((field) => {
      if (field === "instructor.name") {
        return !body.instructor || !body.instructor.name;
      }
      return !body[field];
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Normalize type to match ProductType
    const normalizedType = normalizeProductType(body.type);
    if (!normalizedType) {
      return NextResponse.json(
        { error: `Invalid product type: ${body.type}` },
        { status: 400 },
      );
    }

    // Validate data types and constraints
    const validationErrors = validateProductData({
      ...body,
      type: normalizedType,
    });
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Generate unique slug
    const slug = generateSlug(body.title, new ObjectId().toString());

    // Prepare product document
    const now = new Date();
    const productData: Omit<ProductDocument, "_id"> = {
      slug,
      title: body.title.trim().slice(0, 100),
      subtitle: body.subtitle?.trim().slice(0, 150) || "",
      description: body.description.trim().slice(0, 500),
      longDescription: body.longDescription?.trim().slice(0, 2000) || "",
      type: normalizedType,
      price: parseFloat(String(body.price)) || 0,
      originalPrice: body.originalPrice
        ? parseFloat(String(body.originalPrice))
        : undefined,
      currency: body.currency || "USD",
      status: (body.status || "draft") as ProductStatus,
      category: body.category.trim(),
      difficulty: body.difficulty as ProductDifficulty,
      level: body.level?.trim() || body.difficulty,
      duration: body.duration.trim(),
      language: body.language?.trim() || "English",
      lastUpdated: now.toISOString(),
      instructor: {
        name: String(body.instructor.name || "")
          .trim()
          .slice(0, 100),
        bio: body.instructor.bio
          ? String(body.instructor.bio).trim().slice(0, 500)
          : "",
        avatar: body.instructor.avatar
          ? String(body.instructor.avatar).trim()
          : "",
        credentials: Array.isArray(body.instructor.credentials)
          ? body.instructor.credentials
              .map((cred: string) => String(cred).trim().slice(0, 100))
              .slice(0, 10)
          : [],
      },
      createdAt: now,
      updatedAt: now,
      featured: Boolean(body.featured),
      imageUrl: body.imageUrl?.trim() || "",
      enrollments: 0,
      rating: parseFloat(String(body.rating)) || 0,
      totalReviews: parseInt(String(body.totalReviews)) || 0,
      studentsEnrolled: parseInt(String(body.studentsEnrolled)) || 0,
      tags: Array.isArray(body.tags)
        ? body.tags.map((tag: string) => String(tag).trim()).slice(0, 20)
        : [],
      technologies: Array.isArray(body.technologies)
        ? body.technologies
            .map((tech: string) => String(tech).trim())
            .slice(0, 15)
        : [],
      features: validateAndNormalizeFeatures(body.features || []).slice(0, 10),
      modules: validateAndNormalizeModules(body.modules || []),
      includes: Array.isArray(body.includes)
        ? body.includes.map((item: string) => String(item).trim()).slice(0, 20)
        : [],
      testimonials: validateAndNormalizeTestimonials(
        body.testimonials || [],
      ).slice(0, 10),
      faqs: validateAndNormalizeFAQs(body.faqs || []).slice(0, 10),
      videoPreviewUrl: body.videoPreviewUrl?.trim() || "",
      createdBy: payload.userId,
    };

    // Insert product
    const result = await collection.insertOne(productData);

    // Log activity for product creation
    await logActivity(
      db,
      "items_activities",
      "Product created",
      `${productData.title} ${productData.type} has been created`,
      {
        userId: productData.createdBy,
        itemSlug: productData.slug,
        itemType: "product",
      },
    );

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
      slug: createdProduct.slug,
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
