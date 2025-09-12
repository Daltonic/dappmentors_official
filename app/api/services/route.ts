// Updated /api/services/route.ts (with added validation for POST)
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Service, ServiceType } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import {
  validateAndNormalizeFAQs,
  validateServiceData,
} from "@/validations/services";

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
    const status = url.searchParams.get("status") || "";
    const type = url.searchParams.get("type") || ""; // New type filter
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
    const filter: Filter<ServiceDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
      ];
    }

    if (type) {
      filter.type = type as ServiceType; // Apply type filter
    }

    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (!payload) {
      filter.status = "active";
    } else {
      if (status) filter.status = status as ServiceStatus;
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
        status: payload ? status : "active",
        type, // Include type in filters
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
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (payload.role !== "admin" && payload.role !== "instructor") {
      return NextResponse.json(
        { error: "Forbidden - Admin or Instructor access required" },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<Omit<ServiceDocument, "_id">> =
      db.collection("services");

    const body = await request.json();

    // Validate data
    const validationErrors = validateServiceData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    const slug = generateSlug(body.title, new ObjectId().toString());
    const now = new Date();
    const serviceData: Omit<ServiceDocument, "_id"> = {
      slug,
      title: body.title.trim(),
      description: body.description.trim(),
      price:
        typeof body.price === "string"
          ? body.price.trim()
          : parseFloat(body.price),
      status: (body.status || "active") as ServiceStatus,
      createdAt: now,
      updatedAt: now,
      featured: body.featured || false,
      thumbnail: body.thumbnail?.trim() || "",
      features: Array.isArray(body.features) ? body.features : [],
      faqs: validateAndNormalizeFAQs(body.faqs || []),
      icon: body.icon.trim(),
      clients: parseInt(body.clients) || 0,
      packages: Array.isArray(body.packages) ? body.packages : [],
      createdBy: payload.userId,
      type: body.type as ServiceType, // Include type
    };

    const result = await collection.insertOne(serviceData);
    const createdService = await collection.findOne({ _id: result.insertedId });

    if (!createdService) {
      return NextResponse.json(
        { error: "Failed to retrieve created service" },
        { status: 500 },
      );
    }

    const transformedService = {
      ...createdService,
      id: createdService._id.toString(),
      _id: undefined,
      slug: createdService.slug,
    } as Service;

    return NextResponse.json(
      { message: "Service created successfully", service: transformedService },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/services error:", error);
    if (error instanceof Error && error.message.includes("E11000")) {
      return NextResponse.json(
        { error: "A service with this title already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
