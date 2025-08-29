// /api/products/bulk/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { Product } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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
    const collection: Collection<Product> = db.collection("products");

    const body = await request.json();
    const { action, productIds, updateData } = body;

    // Validate required fields
    if (!action || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: action and productIds" },
        { status: 400 },
      );
    }

    // Convert string IDs to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = productIds.map((id: string) => new ObjectId(id));
    } catch (error) {
      console.error("PATCH /api/products/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid product IDs provided" },
        { status: 400 },
      );
    }

    let updateResult;
    const now = new Date().toISOString();

    switch (action) {
      case "bulk-status-change":
        if (!updateData?.status) {
          return NextResponse.json(
            { error: "status is required for bulk status change" },
            { status: 400 },
          );
        }

        // Validate status
        const validStatuses = ["published", "draft", "archived"];
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
              updatedAt: new Date(now),
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
              updatedAt: new Date(now),
            },
          },
        );
        break;

      case "bulk-category-change":
        if (!updateData?.category) {
          return NextResponse.json(
            { error: "category is required for bulk category change" },
            { status: 400 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              category: updateData.category,
              updatedAt: new Date(now),
            },
          },
        );
        break;

      case "bulk-price-update":
        if (typeof updateData?.price !== "number" || updateData.price < 0) {
          return NextResponse.json(
            { error: "Valid price is required for bulk price update" },
            { status: 400 },
          );
        }

        updateResult = await collection.updateMany(
          { _id: { $in: objectIds } },
          {
            $set: {
              price: updateData.price,
              updatedAt: new Date(now),
            },
          },
        );
        break;

      case "bulk-delete":
        // Check if any products have enrollments
        const productsWithEnrollments = await collection
          .find({
            _id: { $in: objectIds },
            enrollments: { $gt: 0 },
          })
          .toArray();

        if (productsWithEnrollments.length > 0) {
          return NextResponse.json(
            {
              error: `Cannot delete products with enrollments. Found ${productsWithEnrollments.length} products with active enrollments.`,
              productsWithEnrollments: productsWithEnrollments.map((p) => ({
                id: p._id.toString(),
                title: p.title,
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
            message: `Successfully deleted ${deleteResult.deletedCount} products`,
            deletedCount: deleteResult.deletedCount,
            deletedIds: productIds,
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
        { error: "No products found with the provided IDs" },
        { status: 404 },
      );
    }

    // Fetch updated products to return current state
    const updatedProducts = await collection
      .find({ _id: { $in: objectIds } })
      .toArray();

    // Transform products for frontend
    const transformedProducts = updatedProducts.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
    }));

    const getSuccessMessage = () => {
      switch (action) {
        case "bulk-status-change":
          return `Successfully updated status for ${updateResult!.modifiedCount} products to ${updateData.status}`;
        case "bulk-featured-toggle":
          return `Successfully ${updateData.featured ? "featured" : "unfeatured"} ${updateResult!.modifiedCount} products`;
        case "bulk-category-change":
          return `Successfully updated category for ${updateResult!.modifiedCount} products to ${updateData.category}`;
        case "bulk-price-update":
          return `Successfully updated price for ${updateResult!.modifiedCount} products to $${updateData.price}`;
        default:
          return `Successfully updated ${updateResult!.modifiedCount} products`;
      }
    };

    return NextResponse.json(
      {
        message: getSuccessMessage(),
        modifiedCount: updateResult!.modifiedCount,
        matchedCount: updateResult!.matchedCount,
        products: transformedProducts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/products/bulk error:", error);

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

// GET method for getting bulk product information
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
    const productIds = url.searchParams.get("productIds");

    if (!productIds) {
      return NextResponse.json(
        { error: "productIds parameter is required" },
        { status: 400 },
      );
    }

    const productIdArray = productIds.split(",");

    // Convert to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = productIdArray.map((id: string) => new ObjectId(id.trim()));
    } catch (error) {
      console.error("GET /api/products/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid product IDs provided" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<Product> = db.collection("products");

    // Build filter - non-admin users can only see published products or their own
    const filter: Filter<Product> = { _id: { $in: objectIds } };
    if (payload.role !== "admin") {
      filter.$or = [{ status: "published" }, { createdBy: payload.userId }];
    }

    const products = await collection.find(filter).toArray();

    // Transform products for frontend
    const transformedProducts = products.map((product) => ({
      ...product,
      id: product._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(
      {
        products: transformedProducts,
        count: transformedProducts.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/products/bulk error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
