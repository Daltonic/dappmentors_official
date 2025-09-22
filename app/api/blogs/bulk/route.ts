// /api/blogs/bulk/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { BlogPost } from "@/utils/interfaces";
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
    const collection: Collection<BlogPost> = db.collection("blogs");

    const body = await request.json();
    const { action, blogIds, updateData } = body;

    // Validate required fields
    if (!action || !Array.isArray(blogIds) || blogIds.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: action and blogIds" },
        { status: 400 },
      );
    }

    // Convert string IDs to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = blogIds.map((id: string) => new ObjectId(id));
    } catch (error) {
      console.error("PATCH /api/blogs/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid blog IDs provided" },
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
              updatedAt: now,
            },
          },
        );
        break;

      case "bulk-delete":
        const deleteResult = await collection.deleteMany({
          _id: { $in: objectIds },
        });

        return NextResponse.json(
          {
            message: `Successfully deleted ${deleteResult.deletedCount} blogs`,
            deletedCount: deleteResult.deletedCount,
            deletedIds: blogIds,
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
        { error: "No blogs found with the provided IDs" },
        { status: 404 },
      );
    }

    // Fetch updated blogs to return current state
    const updatedBlogs = await collection
      .find({ _id: { $in: objectIds } })
      .toArray();

    // Transform blogs for frontend
    const transformedBlogs = updatedBlogs.map((blog) => ({
      ...blog,
      id: blog._id.toString(),
      _id: undefined,
    }));

    const getSuccessMessage = () => {
      switch (action) {
        case "bulk-status-change":
          return `Successfully updated status for ${updateResult!.modifiedCount} blogs to ${updateData.status}`;
        case "bulk-featured-toggle":
          return `Successfully ${updateData.featured ? "featured" : "unfeatured"} ${updateResult!.modifiedCount} blogs`;
        case "bulk-category-change":
          return `Successfully updated category for ${updateResult!.modifiedCount} blogs to ${updateData.category}`;
        default:
          return `Successfully updated ${updateResult!.modifiedCount} blogs`;
      }
    };

    return NextResponse.json(
      {
        message: getSuccessMessage(),
        modifiedCount: updateResult!.modifiedCount,
        matchedCount: updateResult!.matchedCount,
        blogs: transformedBlogs,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/blogs/bulk error:", error);

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

// GET method for getting bulk blog information
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
    const blogIds = url.searchParams.get("blogIds");

    if (!blogIds) {
      return NextResponse.json(
        { error: "blogIds parameter is required" },
        { status: 400 },
      );
    }

    const blogIdArray = blogIds.split(",");

    // Convert to ObjectIds
    let objectIds: ObjectId[];
    try {
      objectIds = blogIdArray.map((id: string) => new ObjectId(id.trim()));
    } catch (error) {
      console.error("GET /api/blogs/bulk error:", error);
      return NextResponse.json(
        { error: "Invalid blog IDs provided" },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<BlogPost> = db.collection("blogs");

    // Build filter with explicit Filter<BlogPost> type
    const filter: Filter<BlogPost> = { _id: { $in: objectIds } };
    if (payload.role !== "admin") {
      filter.$or = [{ status: "published" }, { createdBy: payload.userId }];
    }

    const blogs = await collection.find(filter).toArray();

    // Transform blogs for frontend
    const transformedBlogs = blogs.map((blog) => ({
      ...blog,
      id: blog._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json(
      {
        blogs: transformedBlogs,
        count: transformedBlogs.length,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/blogs/bulk error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
