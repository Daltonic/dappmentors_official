import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { BlogPost, BlogStatus } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import { logActivity } from "@/heplers/users";
import { validateBlogData } from "@/validations/blogs";

interface BlogDocument extends Omit<BlogPost, "id"> {
  _id: ObjectId;
  createdBy: string;
}

// GET - Get single blog by ID or slug (PUBLIC ACCESS)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const resolvedParams = await params;
    const { id: param } = resolvedParams;

    const db = await connectToDatabase();
    const collection: Collection<BlogDocument> = db.collection("blogs");

    // Determine query based on param
    let query: Filter<BlogDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    const blog = await collection.findOne(query);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
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

    // Public access: only show published blogs
    // Authenticated users: can see their own blogs regardless of status
    // Admins: can see all blogs
    if (!payload) {
      // Public access - only published blogs
      if (blog.status !== "published") {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
    } else {
      // Authenticated access - check permissions
      if (
        payload.role !== "admin" &&
        blog.status !== "published" &&
        blog.createdBy !== payload.userId
      ) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
    }

    // Transform for frontend
    const { _id, ...rest } = blog;
    const transformedBlog = {
      ...rest,
      id: _id.toString(),
    } as BlogPost;

    return NextResponse.json({ blog: transformedBlog });
  } catch (error) {
    console.error("GET /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PUT - Update blog by ID or slug (REQUIRES AUTHENTICATION)
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
    const collection: Collection<BlogDocument> = db.collection("blogs");

    // Determine query based on param
    let query: Filter<BlogDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if blog exists and user has permission
    const existingBlog = await collection.findOne(query);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Permission check - only admin or blog creator can update
    if (payload.role !== "admin" && existingBlog.createdBy !== payload.userId) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to update this blog",
        },
        { status: 403 },
      );
    }

    const body = await request.json();

    // Validate data if provided
    const validationErrors = validateBlogData(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: `Validation errors: ${validationErrors.join(", ")}` },
        { status: 400 },
      );
    }

    // Prepare update data
    const now = new Date();
    const updateData: Partial<Omit<BlogPost, "id">> = {
      updatedAt: now,
    };

    // Define all allowed fields
    const allowedFields = [
      "title",
      "content",
      "excerpt",
      "category",
      "readTime",
      "publishDate",
      "topics",
      "image",
      "featured",
      "status",
      "author",
      "relatedProduct",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        let value: unknown = body[field];

        if (typeof value === "string" && !["publishDate"].includes(field)) {
          value = value.trim();
        }

        if (field === "publishDate") {
          updateData[field] = new Date(value as string);
        } else if (field === "status") {
          updateData[field] = value as BlogStatus;
        } else if (field === "featured") {
          updateData[field] = !!value;
        } else if (field === "topics") {
          (updateData[field as keyof typeof updateData] as
            | string[]
            | undefined) = Array.isArray(value)
            ? (value as string[])
                .map((item: string) => String(item).trim())
                .slice(0, 10)
            : [];
        } else if (
          field === "author" &&
          typeof value === "object" &&
          value !== null
        ) {
          updateData[field] = {
            name: String((value as { name?: string }).name || "").trim(),
            avatar: String((value as { avatar?: string }).avatar || "").trim(),
            bio: String((value as { bio?: string }).bio || "").trim(),
          };
        } else {
          (updateData as Record<string, unknown>)[field] = value;
        }
      }
    });

    // If title is updated, regenerate slug
    if (body.title && body.title !== existingBlog.title) {
      updateData.slug = generateSlug(body.title, existingBlog._id.toString());
    }

    // Update blog
    const result = await collection.updateOne(query, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Log activity for blog updated
    await logActivity(
      db,
      "items_activities",
      "Blog updated",
      `${updateData.title || existingBlog.title} has been updated`,
      {
        userId: existingBlog.createdBy,
        itemSlug: updateData.slug || existingBlog.slug,
        itemType: "blog",
      },
    );

    // Fetch updated blog
    const updatedBlog = await collection.findOne(query);

    // Transform for frontend
    if (!updatedBlog) {
      return NextResponse.json(
        { error: "Failed to retrieve updated blog" },
        { status: 500 },
      );
    }
    const { _id, ...rest } = updatedBlog;
    const transformedBlog = {
      ...rest,
      id: _id.toString(),
    } as BlogPost;

    return NextResponse.json({
      message: "Blog updated successfully",
      blog: transformedBlog,
    });
  } catch (error) {
    console.error("PUT /api/blogs/[id] error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          { error: "A blog with this title already exists" },
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

// DELETE - Delete blog by ID or slug (REQUIRES AUTHENTICATION)
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
    const collection: Collection<BlogDocument> = db.collection("blogs");

    // Determine query based on param
    let query: Filter<BlogDocument>;
    if (ObjectId.isValid(param)) {
      query = { _id: new ObjectId(param) };
    } else {
      query = { slug: param };
    }

    // Check if blog exists and user has permission
    const existingBlog = await collection.findOne(query);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Permission check - only admin or blog creator can delete
    if (payload.role !== "admin" && existingBlog.createdBy !== payload.userId) {
      return NextResponse.json(
        {
          error: "Forbidden - You don't have permission to delete this blog",
        },
        { status: 403 },
      );
    }

    // Delete blog
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Blog deleted successfully",
      deletedId: param,
    });
  } catch (error) {
    console.error("DELETE /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
