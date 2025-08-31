// /api/services/[id]/route.ts

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

// GET - Get single service by ID or slug
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

    // Check permissions - non-admin users can only view active services or their own
    if (
      payload.role !== "admin" &&
      service.status !== "active" &&
      service.createdBy !== payload.userId
    ) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
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

// PUT - Update service by ID or slug
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
    const updateData: Partial<Omit<Service, "id">> = {
      updatedAt: new Date().toISOString(),
    };

    // Only update provided fields
    const allowedFields = [
      "title",
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
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        let value: unknown = body[field];

        if (typeof value === "string" && field !== "price") {
          value = value.trim();
        }

        if (field === "price") {
          // Handle both string and number prices
          updateData[field] =
            typeof value === "string"
              ? value.trim()
              : parseFloat(value as string);
        } else if (field === "type") {
          updateData[field] = value as ServiceType;
        } else if (field === "status") {
          updateData[field] = value as ServiceStatus;
        } else if (field === "featured") {
          updateData[field] = !!value;
        } else if (field === "tags" || field === "deliverables") {
          updateData[field] = Array.isArray(value) ? value : [];
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

// DELETE - Delete service by ID or slug
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

// Validation helper for updates
function validateUpdateServiceData(data: Partial<Service>): string[] {
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
    const validTypes = [
      "Education",
      "Mentorship",
      "Development",
      "Writing",
      "Hiring",
      "Community",
    ];
    if (!validTypes.includes(data.type)) {
      errors.push("Invalid service type");
    }
  }

  // Price validation (if provided)
  if (data.price !== undefined) {
    if (typeof data.price === "number") {
      if (isNaN(data.price) || data.price < 0) {
        errors.push("Price must be a valid positive number");
      }
      if (data.price > 100000) {
        errors.push("Price cannot exceed $100,000");
      }
    } else if (typeof data.price === "string") {
      if (data.price.trim().length === 0) {
        errors.push("Price cannot be empty");
      }
    } else {
      errors.push("Price must be a number or string");
    }
  }

  // Status validation (if provided)
  if (data.status !== undefined) {
    const validStatuses = ["active", "inactive", "coming-soon"];
    if (!validStatuses.includes(data.status)) {
      errors.push("Invalid status");
    }
  }

  // Lead validation (if provided)
  if (data.lead !== undefined) {
    if (typeof data.lead !== "string" || data.lead.trim().length < 2) {
      errors.push("Lead must be at least 2 characters long");
    }
    if (data.lead.length > 100) {
      errors.push("Lead must be less than 100 characters");
    }
  }

  // Duration validation (if provided)
  if (data.duration !== undefined) {
    if (typeof data.duration !== "string" || data.duration.trim().length < 2) {
      errors.push("Duration must be at least 2 characters long");
    }
    if (data.duration.length > 100) {
      errors.push("Duration must be less than 100 characters");
    }
  }

  // Category validation (if provided)
  if (data.category !== undefined) {
    if (typeof data.category !== "string" || data.category.trim().length < 2) {
      errors.push("Category must be at least 2 characters long");
    }
    if (data.category.length > 50) {
      errors.push("Category must be less than 50 characters");
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

  // Tags validation (if provided)
  if (data.tags !== undefined) {
    if (!Array.isArray(data.tags)) {
      errors.push("Tags must be an array");
    } else {
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
  }

  // Deliverables validation (if provided)
  if (data.deliverables !== undefined) {
    if (!Array.isArray(data.deliverables)) {
      errors.push("Deliverables must be an array");
    } else {
      if (data.deliverables.length > 20) {
        errors.push("Maximum 20 deliverables allowed");
      }
      data.deliverables.forEach((deliverable, index) => {
        if (
          typeof deliverable !== "string" ||
          deliverable.trim().length === 0
        ) {
          errors.push(`Deliverable ${index + 1} must be a non-empty string`);
        }
        if (deliverable.length > 200) {
          errors.push(
            `Deliverable ${index + 1} must be less than 200 characters`,
          );
        }
      });
    }
  }

  return errors;
}
