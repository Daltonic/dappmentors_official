// /api/blogs/route.ts

import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { BlogPost, BlogStatus } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { generateSlug } from "@/heplers/global";
import { logActivity } from "@/heplers/users";

interface BlogDocument extends Omit<BlogPost, "id"> {
  _id: ObjectId;
  createdBy: string;
  slug: string;
}

// GET - List all blogs with filtering and pagination (PUBLIC ACCESS)
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<BlogDocument> = db.collection("blogs");

    // Parse query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const category = url.searchParams.get("category") || "";
    const featured = url.searchParams.get("featured");
    const sortBy = url.searchParams.get("sortBy") || "publishDate";
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
    const filter: Filter<BlogDocument> = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { slug: { $regex: search, $options: "i" } },
        { topics: { $in: [new RegExp(search, "i")] } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (category) filter.category = category;
    if (featured !== null && featured !== undefined) {
      filter.featured = featured === "true";
    }

    // Apply access-based filtering
    if (!payload) {
      // Public access - only published blogs
      filter.status = "published";
    } else {
      // Authenticated access
      if (status) filter.status = status as BlogStatus;

      // Non-admin users can only see published blogs (unless they're the creator)
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
    const [blogs, totalBlogs] = await Promise.all([
      collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
      collection.countDocuments(filter),
    ]);

    // Transform blogs for frontend
    const transformedBlogs = blogs.map(
      (blog) =>
        ({
          ...blog,
          id: blog._id.toString(),
          _id: undefined,
        }) as BlogPost,
    );

    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      blogs: transformedBlogs,
      pagination: {
        currentPage: page,
        totalPages,
        totalBlogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        search,
        status: payload ? status : "published",
        category,
        featured,
      },
    });
  } catch (error) {
    console.error("GET /api/blogs error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// POST - Create new blog (REQUIRES AUTHENTICATION)
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

    // Check if user has permission to create blogs
    if (payload.role !== "admin" && payload.role !== "author") {
      return NextResponse.json(
        {
          error: "Forbidden - Admin or Author access required",
        },
        { status: 403 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<Omit<BlogDocument, "_id">> =
      db.collection("blogs");

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "content",
      "excerpt",
      "category",
      "publishDate",
      "author.name",
    ];
    const missingFields = requiredFields.filter((field) => {
      if (field === "author.name") {
        return !body.author || !body.author.name;
      }
      return !body[field];
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 },
      );
    }

    // Basic validations (can be expanded)
    if (body.title.length < 3 || body.title.length > 100) {
      return NextResponse.json(
        { error: "Title must be between 3 and 100 characters" },
        { status: 400 },
      );
    }

    if (body.excerpt.length < 10 || body.excerpt.length > 300) {
      return NextResponse.json(
        { error: "Excerpt must be between 10 and 300 characters" },
        { status: 400 },
      );
    }

    if (body.content.length < 100) {
      return NextResponse.json(
        { error: "Content must be at least 100 characters" },
        { status: 400 },
      );
    }

    // Generate unique slug
    const slug = generateSlug(body.title, new ObjectId().toString());

    // Prepare blog document
    const now = new Date();
    const blogData: Omit<BlogDocument, "_id"> = {
      slug,
      title: body.title.trim().slice(0, 100),
      content: body.content.trim(),
      excerpt: body.excerpt.trim().slice(0, 300),
      category: body.category.trim(),
      readTime: body.readTime || "5 min",
      publishDate: new Date(body.publishDate),
      updatedAt: now,
      topics: Array.isArray(body.topics)
        ? body.topics.map((topic: string) => String(topic).trim()).slice(0, 10)
        : [],
      image: body.image?.trim() || "",
      featured: Boolean(body.featured),
      status: (body.status || "draft") as BlogStatus,
      views: 0,
      comments: 0,
      author: {
        name: String(body.author.name || "")
          .trim()
          .slice(0, 100),
        avatar: body.author.avatar ? String(body.author.avatar).trim() : "",
        bio: body.author.bio
          ? String(body.author.bio).trim().slice(0, 500)
          : "",
      },
      relatedProduct: body.relatedProduct
        ? String(body.relatedProduct).trim()
        : undefined,
      createdBy: payload.userId,
    };

    // Insert blog
    const result = await collection.insertOne(blogData);

    // Log activity for blog creation
    await logActivity(
      db,
      "items_activities",
      "Blog created",
      `${blogData.title} has been created`,
      {
        userId: blogData.createdBy,
        itemSlug: blogData.slug,
        itemType: "blog",
      },
    );

    // Fetch the created blog
    const createdBlog = await collection.findOne({ _id: result.insertedId });

    if (!createdBlog) {
      return NextResponse.json(
        { error: "Failed to retrieve created blog" },
        { status: 500 },
      );
    }

    // Transform for frontend
    const transformedBlog = {
      ...createdBlog,
      id: createdBlog._id.toString(),
      _id: undefined,
      slug: createdBlog.slug,
    } as BlogPost;

    return NextResponse.json(
      {
        message: "Blog created successfully",
        blog: transformedBlog,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/blogs error:", error);

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
