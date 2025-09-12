// Updated /api/services/bulk/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { FAQs, Package, Service, ServiceType } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import {
  validateAndNormalizeFAQs,
  validateAndNormalizeFeatures,
  validateAndNormalizePackages,
  validateUpdateServiceData,
} from "@/validations/services";
import { generateSlug } from "@/heplers/global";

type ServiceStatus = "active" | "inactive" | "coming-soon";

interface ServiceDocument extends Omit<Service, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
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

    // Check if user has admin privileges for bulk operations
    if (payload.role !== "admin") {
      return NextResponse.json(
        {
          error: "Forbidden - Admin access required for bulk operations",
        },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<ServiceDocument> = db.collection("services");

    const body = await request.json();
    const { action, serviceIds, updateData } = body;

    // Validate required fields
    if (!action || !Array.isArray(serviceIds) || serviceIds.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: action and serviceIds" },
        { status: 400 },
      );
    }

    // Convert string IDs to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = serviceIds.map((id: string) => new ObjectId(id));
    } catch (error) {
      console.error("PATCH /api/services/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid service IDs provided" },
        { status: 400 },
      );
    }

    let updateResult;
    const now = new Date();

    switch (action) {
      case "bulk-status-change":
        if (!updateData?.status) {
          return NextResponse.json(
            { error: "status is required for bulk status change" },
            { status: 400 },
          );
        }

        // Validate status
        const validStatuses = ["active", "inactive", "coming-soon"];
        if (!validStatuses.includes(updateData.status)) {
          return NextResponse.json(
            { error: "Invalid status provided" },
            { status: 400 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              status: updateData.status,
              updatedAt: now,
            },
          },
        );
        break;

      case "bulk-featured-toggle":
        if (typeof updateData?.featured !== "boolean") {
          return NextResponse.json(
            { error: "featured boolean value is required" },
            { status: 400 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              featured: updateData.featured,
              updatedAt: now,
            },
          },
        );
        break;

      case "bulk-type-change":
        if (!updateData?.type) {
          return NextResponse.json(
            { error: "type is required for bulk type change" },
            { status: 400 },
          );
        }

        // Validate type
        const validTypes: ServiceType[] = [
          "Hiring",
          "Education",
          "Mentorship",
          "Professional",
          "Writing",
        ];
        if (!validTypes.includes(updateData.type)) {
          return NextResponse.json(
            { error: "Invalid type provided" },
            { status: 400 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              type: updateData.type,
              updatedAt: now,
            },
          },
        );
        break;

      case "bulk-update":
        // Validate update data using validateUpdateServiceData
        const validationErrors = validateUpdateServiceData(updateData);
        if (validationErrors.length > 0) {
          return NextResponse.json(
            { error: `Validation errors: ${validationErrors.join(", ")}` },
            { status: 400 },
          );
        }

        // Prepare update data
        const updateFields: Partial<Omit<Service, "id">> = {
          updatedAt: now,
        };

        // Define allowed fields for bulk update
        const allowedFields = [
          "title",
          "description",
          "type",
          "price",
          "status",
          "featured",
          "thumbnail",
          "features",
          "packages",
          "faqs",
          "icon",
          "clients",
        ];

        allowedFields.forEach((field) => {
          if (updateData[field] !== undefined) {
            let value: unknown = updateData[field];

            if (typeof value === "string" && field !== "price") {
              value = value.trim();
            }

            if (field === "price") {
              updateFields[field] =
                typeof value === "string"
                  ? value.trim()
                  : parseFloat(String(value)) || 0;
            } else if (field === "type") {
              updateFields[field] = value as ServiceType;
            } else if (field === "status") {
              updateFields[field] = value as ServiceStatus;
            } else if (field === "featured") {
              updateFields[field] = !!value;
            } else if (field === "clients") {
              updateFields[field] = parseInt(String(value)) || 0;
            } else if (field === "features") {
              updateFields[field] = validateAndNormalizeFeatures(
                value as string[],
              );
            } else if (field === "packages") {
              updateFields[field] = validateAndNormalizePackages(
                value as Package[],
              );
            } else if (field === "faqs") {
              updateFields[field] = validateAndNormalizeFAQs(value as FAQs[]);
            } else {
              (updateFields as Record<string, unknown>)[field] = value;
            }
          }
        });

        // If title is updated, regenerate slugs for each service
        if (updateData.title) {
          const services = await collection
            .find({ _id: { $in: objectIds } })
            .toArray();
          const bulkOps = services.map((service) => ({
            updateOne: {
              filter: { _id: service._id },
              update: {
                $set: {
                  ...updateFields,
                  slug: generateSlug(updateData.title, service._id.toString()),
                },
              },
            },
          }));

          updateResult = await collection.bulkWrite(bulkOps);
        } else {
          updateResult = await collection.updateMany(
            { _id: { $in: objectIds } },
            { $set: updateFields },
          );
        }
        break;

      case "bulk-delete":
        // Check if any services have clients
        const servicesWithClients = await collection
          .find({
            _id: { $in: objectIds },
            clients: { $gt: 0 },
          })
          .toArray();

        if (servicesWithClients.length > 0) {
          return NextResponse.json(
            {
              error: `Cannot delete services with active clients. Found ${servicesWithClients.length} services with active clients.`,
              servicesWithClients: servicesWithClients.map((s) => ({
                id: s._id.toString(),
                title: s.title,
              })),
            },
            { status: 400 },
          );
        }

        const deleteResult = await collection.deleteMany({
          _id: { $in: objectIds },
        });

        return NextResponse.json(
          {
            message: `Successfully deleted ${deleteResult.deletedCount} services`,
            deletedCount: deleteResult.deletedCount,
            deletedIds: serviceIds,
          },
          { status: 200 },
        );

      default:
        return NextResponse.json(
          { error: "Invalid action provided" },
          { status: 400 },
        );
    }

    // Check if any documents were updated (for non-delete operations)
    if (updateResult && updateResult.matchedCount === 0) {
      return NextResponse.json(
        { error: "No services found with the provided IDs" },
        { status: 404 },
      );
    }

    // Fetch updated services to return current state
    const updatedServices = await collection
      .find({ _id: { $in: objectIds } })
      .toArray();

    // Transform services for frontend
    const transformedServices = updatedServices.map((service) => ({
      ...service,
      id: service._id.toString(),
      _id: undefined,
      slug: undefined,
    }));

    const getSuccessMessage = () => {
      switch (action) {
        case "bulk-status-change":
          return `Successfully updated status for ${updateResult!.modifiedCount} services to ${updateData.status}`;
        case "bulk-featured-toggle":
          return `Successfully ${updateData.featured ? "featured" : "unfeatured"} ${updateResult!.modifiedCount} services`;
        case "bulk-type-change":
          return `Successfully updated type for ${updateResult!.modifiedCount} services to ${updateData.type}`;
        case "bulk-update":
          return `Successfully updated ${updateResult!.modifiedCount} services`;
        default:
          return `Successfully updated ${updateResult!.modifiedCount} services`;
      }
    };

    return NextResponse.json(
      {
        message: getSuccessMessage(),
        modifiedCount: updateResult!.modifiedCount,
        matchedCount: updateResult!.matchedCount,
        services: transformedServices,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/services/bulk error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          { error: "Duplicate key error occurred" },
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

// GET method for getting bulk service information
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

    const url = new URL(request.url);
    const serviceIds = url.searchParams.get("serviceIds");

    if (!serviceIds) {
      return NextResponse.json(
        { error: "serviceIds parameter is required" },
        { status: 400 },
      );
    }

    const serviceIdArray = serviceIds.split(",");

    // Convert to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = serviceIdArray.map((id: string) => new ObjectId(id.trim()));
    } catch (error) {
      console.error("GET /api/services/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid service IDs provided" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<ServiceDocument> = db.collection("services");

    // Build filter - non-admin users can only see active services or their own
    const filter: Filter<ServiceDocument> = { _id: { $in: objectIds } };
    if (payload.role !== "admin") {
      filter.$or = [{ status: "active" }, { createdBy: payload.userId }];
    }

    const services = await collection.find(filter).toArray();

    // Transform services for frontend
    const transformedServices = services.map((service) => ({
      ...service,
      id: service._id.toString(),
      _id: undefined,
      slug: undefined,
    }));

    return NextResponse.json(
      {
        services: transformedServices,
        count: transformedServices.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/services/bulk error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
