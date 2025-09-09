// /api/services/[id]/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import {
  FAQs,
  Service,
  ServiceFeature,
  ServicePackage,
} from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import {
  validateAndNormalizeFAQs,
  validateAndNormalizeFeatures,
  validateAndNormalizePackages,
  validateUpdateServiceData,
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

// GET - Get single service by ID or slug (PUBLIC ACCESS)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

    const db = await connectToDatabase();
    const collection: Collection<ServiceDocument> = db.collection("services");

    // Determine query based on param
    let query: Filter<ServiceDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    const service = await collection.findOne(query);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
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

    // Public access: only show active services
    // Authenticated users: can see their own services regardless of status
    // Admins: can see all services
    if (!payload) {
      // Public access - only active services
      if (service.status !== "active") {
        return NextResponse.json(
          { error: "Service not found" },
          { status: 404 },
        );
      }
    } else {
      // Authenticated access - check permissions
      if (
        payload.role !== "admin" &&
        service.status !== "active" &&
        service.createdBy !== payload.userId
      ) {
        return NextResponse.json(
          { error: "Service not found" },
          { status: 404 },
        );
      }
    }

    // Transform for frontend
    const { _id, ...rest } = service;
    const transformedService = {
      ...rest,
      id: _id.toString(),
    } as Service;

    return NextResponse.json({ service: transformedService });
  } catch (error) {
    console.error("GET /api/services/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update service by ID or slug (REQUIRES AUTHENTICATION)
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
    const collection: Collection<ServiceDocument> = db.collection("services");

    // Determine query based on param
    let query: Filter<ServiceDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if service exists and user has permission
    const existingService = await collection.findOne(query);
    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Permission check - only admin or service creator can update
    if (
      payload.role !== "admin" &&
      existingService.createdBy !== payload.userId
    ) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to update this service",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validate data if provided
    const validationErrors = validateUpdateServiceData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Prepare update data
    const now = new Date();
    const updateData: Partial<Omit<Service, "id">> = {
      updatedAt: now,
    };

    // Define all allowed fields
    const allowedFields = [
      "title",
      "subtitle",
      "description",
      "type",
      "price",
      "status",
      "category",
      "duration",
      "lead",
      "featured",
      "thumbnail",
      "tags",
      "deliverables",
      "technologies",
      "blockchains",
      "clients",
      "rating",
      "totalReviews",
      "features",
      "packages",
      "faqs",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        let value: unknown = body[field];

        if (typeof value === "string" && field !== "price") {
          value = value.trim();
        }

        if (field === "price") {
          updateData[field] =
            typeof value === "string"
              ? value.trim()
              : parseFloat(String(value)) || 0;
        } else if (field === "type") {
          updateData[field] = value as ServiceType;
        } else if (field === "status") {
          updateData[field] = value as ServiceStatus;
        } else if (field === "featured") {
          updateData[field] = !!value;
        } else if (
          ["tags", "deliverables", "technologies", "blockchains"].includes(
            field,
          )
        ) {
          (updateData[field as keyof typeof updateData] as
            | string[]
            | undefined) = Array.isArray(value)
            ? (value as string[]).map((item: string) => String(item).trim())
            : [];
        } else if (["clients", "totalReviews"].includes(field)) {
          (updateData[field as keyof typeof updateData] as
            | number[]
            | undefined) = Array.isArray(value)
            ? (value as number[]).map(
                (item: number) => parseInt(String(item)) || 0,
              )
            : [];
          // updateData[field] = parseInt(String(value)) || 0
        } else if (field === "rating") {
          updateData[field] = parseFloat(String(value)) || 0;
        } else if (field === "features") {
          updateData[field] = validateAndNormalizeFeatures(
            value as ServiceFeature[],
          );
        } else if (field === "packages") {
          updateData[field] = validateAndNormalizePackages(
            value as ServicePackage[],
          );
        } else if (field === "faqs") {
          updateData[field] = validateAndNormalizeFAQs(value as FAQs[]);
        } else {
          (updateData as Record<string, unknown>)[field] = value;
        }
      }
    });

    // If title is updated, regenerate slug
    if (body.title && body.title !== existingService.title) {
      updateData.slug = generateSlug(
        body.title,
        existingService._id.toString(),
      );
    }

    // Update service
    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Fetch updated service
    const updatedService = await collection.findOne(query);

    // Transform for frontend
    if (!updatedService) {
      return NextResponse.json(
        { error: "Failed to retrieve updated service" },
        { status: 500 },
      );
    }
    const { _id, ...rest } = updatedService;
    const transformedService = {
      ...rest,
      id: _id.toString(),
    } as Service;

    return NextResponse.json({
      message: "Service updated successfully",
      service: transformedService,
    });
  } catch (error) {
    console.error("PUT /api/services/[id] error:", error);

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

// DELETE - Delete service by ID or slug (REQUIRES AUTHENTICATION)
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
    const collection: Collection<ServiceDocument> = db.collection("services");

    // Determine query based on param
    let query: Filter<ServiceDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if service exists and user has permission
    const existingService = await collection.findOne(query);
    if (!existingService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    // Permission check - only admin or service creator can delete
    if (
      payload.role !== "admin" &&
      existingService.createdBy !== payload.userId
    ) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to delete this service",
        },
        { status: 403 },
      );
    }

    // Check if service has clients (prevent deletion of services with active clients)
    if (existingService.clients > 0) {
      return NextResponse.json(
        {
          error:
            "Cannot delete service with active clients. Set to inactive instead.",
        },
        { status: 400 },
      );
    }

    // Delete service
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Service deleted successfully",
      deletedId: param,
    });
  } catch (error) {
    console.error("DELETE /api/services/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
