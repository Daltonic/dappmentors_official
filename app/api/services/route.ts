// /api/services/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Service } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/products";

type ServiceType =
  | "Education"
  | "Mentorship"
  | "Development"
  | "Writing"
  | "Hiring"
  | "Community";
type ServiceStatus = "active" | "inactive" | "coming-soon";

interface ServiceDocument extends Omit<Service, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

// GET - List all services with filtering and pagination
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
    const collection: Collection<ServiceDocument> = db.collection("services");

    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const type = url.searchParams.get("type") || "";
    const status = url.searchParams.get("status") || "";
    const category = url.searchParams.get("category") || "";
    const featured = url.searchParams.get("featured");
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const sortOrder = url.searchParams.get("sortOrder") || "desc";

    // Build filter query
    const filter: Filter<ServiceDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { lead: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (type) filter.type = type as ServiceType;
    if (status) filter.status = status as ServiceStatus;
    if (category) filter.category = category;
    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Non-admin users can only see active services (unless they're the creator)
    if (payload.role !== "admin") {
      filter.$or = [{ status: "active" }, { createdBy: payload.userId }];
    }

    // Build sort object
    const sort: { [key: string]: 1 | -1 } = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute queries
    const [services, totalServices] = await Promise.all([
      collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
      collection.countDocuments(filter),
    ]);

    // Transform services for frontend
    const transformedServices = services.map(
      (service) =>
        ({
          ...service,
          id: service._id.toString(),
          _id: undefined,
          slug: undefined,
        }) as unknown as Service,
    );

    const totalPages = Math.ceil(totalServices / limit);

    return NextResponse.json({
      services: transformedServices,
      pagination: {
        currentPage: page,
        totalPages,
        totalServices,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        type,
        status,
        category,
        featured,
      },
    });
  } catch (error) {
    console.error("GET /api/services error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST - Create new service
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

    // Check if user has permission to create services
    if (payload.role !== "admin" && payload.role !== "instructor") {
      return NextResponse.json(
        {
          error: "Forbidden - Admin or Instructor access required",
        },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<Omit<ServiceDocument, "_id">> =
      db.collection("services");

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "type",
      "price",
      "category",
      "duration",
      "lead",
    ];
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Validate data types and constraints
    const validationErrors = validateServiceData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Generate unique slug
    const slug = generateSlug(body.title, new ObjectId().toString());

    // Prepare service document
    const now = new Date();
    const serviceData: Omit<ServiceDocument, "_id"> = {
      slug,
      title: body.title.trim(),
      description: body.description.trim(),
      type: body.type as ServiceType,
      price:
        typeof body.price === "string"
          ? body.price.trim()
          : parseFloat(body.price),
      status: (body.status || "active") as ServiceStatus,
      category: body.category.trim(),
      duration: body.duration.trim(),
      clients: 0,
      rating: 0,
      totalReviews: 0,
      lead: body.lead.trim(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      featured: body.featured || false,
      thumbnail: body.thumbnail?.trim() || "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      createdBy: payload.userId,
    };

    // Insert service
    const result = await collection.insertOne(serviceData);

    // Fetch the created service
    const createdService = await collection.findOne({ _id: result.insertedId });

    if (!createdService) {
      return NextResponse.json(
        { error: "Failed to retrieve created service" },
        { status: 500 },
      );
    }

    // Transform for frontend
    const transformedService = {
      ...createdService,
      id: createdService._id.toString(),
      _id: undefined,
      slug: createdService.slug,
    } as Service;

    return NextResponse.json(
      {
        message: "Service created successfully",
        service: transformedService,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/services error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          { error: "A service with this title already exists" },
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
function validateServiceData(data: Partial<Service>): string[] {
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
  const validTypes = [
    "Education",
    "Mentorship",
    "Development",
    "Writing",
    "Hiring",
    "Community",
  ];
  if (!validTypes.includes(data.type as string)) {
    errors.push("Invalid service type");
  }

  // Price validation (can be string or number)
  if (data.price !== undefined) {
    if (typeof data.price === "string") {
      if (data.price.trim().length === 0) {
        errors.push("Price is required");
      }
    } else if (typeof data.price === "number") {
      if (isNaN(data.price) || data.price < 0) {
        errors.push("Price must be a valid positive number");
      }
      if (data.price > 100000) {
        errors.push("Price cannot exceed $100,000");
      }
    } else {
      errors.push("Price must be a number or string");
    }
  }

  // Status validation
  const validStatuses = ["active", "inactive", "coming-soon"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push("Invalid status");
  }

  // Lead validation
  if (typeof data.lead !== "string" || data.lead.trim().length < 2) {
    errors.push("Lead must be at least 2 characters long");
  }
  if (data.lead && data.lead.length > 100) {
    errors.push("Lead must be less than 100 characters");
  }

  // Duration validation
  if (typeof data.duration !== "string" || data.duration.trim().length < 2) {
    errors.push("Duration must be at least 2 characters long");
  }
  if (data.duration && data.duration.length > 100) {
    errors.push("Duration must be less than 100 characters");
  }

  // Category validation
  if (typeof data.category !== "string" || data.category.trim().length < 2) {
    errors.push("Category must be at least 2 characters long");
  }
  if (data.category && data.category.length > 50) {
    errors.push("Category must be less than 50 characters");
  }

  // Thumbnail validation
  if (data.thumbnail && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  // Tags validation
  if (data.tags && Array.isArray(data.tags)) {
    if (data.tags.length > 10) {
      errors.push("Maximum 10 tags allowed");
    }
    data.tags.forEach((tag, index) => {
      if (typeof tag !== "string" || tag.trim().length === 0) {
        errors.push(`Tag ${index + 1} must be a non-empty string`);
      }
      if (tag.length > 30) {
        errors.push(`Tag ${index + 1} must be less than 30 characters`);
      }
    });
  }

  // Deliverables validation
  if (data.deliverables && Array.isArray(data.deliverables)) {
    if (data.deliverables.length > 20) {
      errors.push("Maximum 20 deliverables allowed");
    }
    data.deliverables.forEach((deliverable, index) => {
      if (typeof deliverable !== "string" || deliverable.trim().length === 0) {
        errors.push(`Deliverable ${index + 1} must be a non-empty string`);
      }
      if (deliverable.length > 200) {
        errors.push(
          `Deliverable ${index + 1} must be less than 200 characters`,
        );
      }
    });
  }

  return errors;
}
