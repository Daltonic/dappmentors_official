import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import Blog, { IBlog } from "@/models/Blog";
import { slugify } from "@/utils/helper";

export async function GET(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const blog = await mongodbService.findOne<IBlog>(Blog, { slug });
    if (!blog) {
      return NextResponse.json({ details: "Blog not found", status: 404 });
    }
    return NextResponse.json({
      data: blog,
      message: "Blog fetched successfully",
      status: 200,
    });
  } else {
    const blogs = await mongodbService.find<IBlog>(Blog, {});
    return NextResponse.json({
      data: blogs,
      count: blogs.length,
      message: "Blogs fetched successfully",
      status: 200,
    });
  }
}

export async function POST(req: Request) {
  await mongodbService.connect();
  const {
    title,
    content,
    author,
    userId,
    image,
    targetAmount,
    storiesImpact,
    conclusion,
    gallery,
  } = await req.json();

  if (
    !title ||
    !content ||
    !author ||
    !userId ||
    !image ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const slug = slugify(title, true);
  const existingBlog = await mongodbService.find<IBlog>(Blog, { slug });
  if (existingBlog.length > 0) {
    return NextResponse.json({ details: "Title must be unique", status: 400 });
  }

  const newBlog = await mongodbService.create<IBlog>(Blog, {
    title,
    content,
    author,
    slug,
    userId,
    image,
    targetAmount,
    storiesImpact,
    conclusion,
    gallery: gallery || [],
  });

  if (!newBlog) {
    return NextResponse.json({ details: "Blog creation failed", status: 400 });
  }

  return NextResponse.json({
    data: newBlog,
    message: "Blog created successfully",
    status: 201,
  });
}

export async function PATCH(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ details: "Slug is required", status: 400 });
  }

  const {
    title,
    content,
    author,
    image,
    targetAmount,
    storiesImpact,
    conclusion,
    gallery,
  } = await req.json();

  if (
    !title ||
    !content ||
    !author ||
    !image ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const existingBlog = await mongodbService.find<IBlog>(Blog, { slug });
  if (!existingBlog[0]) {
    return NextResponse.json({ details: "Blog not found", status: 404 });
  }

  const newSlug = existingBlog[0].title === title ? slug : slugify(title, true);

  const updatedBlog = await mongodbService.update<IBlog>(
    Blog,
    { slug },
    {
      title,
      content,
      author,
      slug: newSlug,
      image,
      targetAmount,
      storiesImpact,
      conclusion,
      gallery: gallery || [],
    },
  );

  if (!updatedBlog) {
    return NextResponse.json({ details: "Blog not found", status: 404 });
  }

  return NextResponse.json({
    data: updatedBlog,
    message: "Blog updated successfully",
    status: 200,
  });
}

export async function DELETE(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const deletedBlog = await mongodbService.delete(Blog, { slug });
    if (!deletedBlog) {
      return NextResponse.json({ details: "Blog not found", status: 404 });
    }

    return NextResponse.json({
      message: "Blog deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      details: "An error occurred while deleting the blog",
      status: 500,
    });
  }
}
