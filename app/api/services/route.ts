// /api/services/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Service } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import {
  validateAndNormalizeFAQs,
  validateAndNormalizeFeatures,
  validateAndNormalizePackages,
  validateServiceData,
} from "@/validations/services";

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

// GET - List all services with filtering and pagination (PUBLIC ACCESS)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
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

    // Build filter query
    const filter: Filter<ServiceDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { subtitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { lead: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
        { technologies: { $in: [new RegExp(search, "i")] } },
        { blockchains: { $in: [new RegExp(search, "i")] } },
      ];
    }

    if (type) filter.type = type as ServiceType;
    if (category) filter.category = category;
    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Apply access-based filtering
    if (!payload) {
      // Public access - only active services
      filter.status = "active";
    } else {
      // Authenticated access
      if (status) filter.status = status as ServiceStatus;

      // Non-admin users can only see active services (unless they're the creator)
      if (payload.role !== "admin") {
        filter.$or = [{ status: "active" }, { createdBy: payload.userId }];
      }
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
        status: payload ? status : "active", // Only show applied status filter for authenticated users
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

// POST - Create new service (REQUIRES AUTHENTICATION)
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
      subtitle: body.subtitle?.trim() || "",
      description: body.description.trim(),
      type: body.type as ServiceType,
      category: body.category.trim(),
      price:
        typeof body.price === "string"
          ? body.price.trim()
          : parseFloat(body.price),
      status: (body.status || "active") as ServiceStatus,
      duration: body.duration.trim(),
      clients: parseInt(body.clients) || 0,
      rating: parseFloat(body.rating) || 0,
      totalReviews: parseInt(body.totalReviews) || 0,
      lead: body.lead.trim(),
      createdAt: now,
      updatedAt: now,
      featured: body.featured || false,
      thumbnail: body.thumbnail?.trim() || "",
      tags: Array.isArray(body.tags) ? body.tags : [],
      deliverables: Array.isArray(body.deliverables) ? body.deliverables : [],
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      blockchains: Array.isArray(body.blockchains) ? body.blockchains : [],
      features: validateAndNormalizeFeatures(body.features || []),
      packages: validateAndNormalizePackages(body.packages || []),
      faqs: validateAndNormalizeFAQs(body.faqs || []),
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
