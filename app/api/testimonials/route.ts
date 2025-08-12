import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import Testimonial, { ITestimonial } from "@/models/Testimonial";
import { slugify } from "@/utils/helper";

// GET: Fetch a single testimonial by slug or all testimonials
export async function GET(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const testimonial = await mongodbService.findOne<ITestimonial>(
        Testimonial,
        { slug },
      );
      if (!testimonial) {
        return NextResponse.json({
          details: "Testimonial not found",
          status: 404,
        });
      }
      return NextResponse.json({
        data: testimonial,
        message: "Testimonial fetched successfully",
        status: 200,
      });
    } else {
      const testimonials = await mongodbService.find<ITestimonial>(
        Testimonial,
        {},
      );
      return NextResponse.json({
        data: testimonials,
        count: testimonials.length,
        message: "Testimonials fetched successfully",
        status: 200,
      });
    }
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({
      details: "An error occurred while fetching testimonials",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}

// POST: Create a new testimonial
export async function POST(req: Request) {
  try {
    await mongodbService.connect();
    const body = await req.json();
    console.log("Received POST request body:", body);

    const { name, content, position, image, userId } = body;

    if (!name || !content || !position || !userId) {
      return NextResponse.json({
        details: "Missing required fields",
        missing: { name, content, position, userId },
        status: 400,
      });
    }

    const baseSlug = slugify(name, true);
    let slug = baseSlug;
    let counter = 1;
    while (await mongodbService.findOne<ITestimonial>(Testimonial, { slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const testimonialData = {
      name,
      content,
      position,
      image: image || "",
      slug,
      userId,
      published: false,
    };

    const newTestimonial = await mongodbService.create<ITestimonial>(
      Testimonial,
      testimonialData,
    );

    if (!newTestimonial) {
      return NextResponse.json({
        details: "Failed to create testimonial",
        status: 500,
      });
    }

    const savedTestimonial = await mongodbService.findOne<ITestimonial>(
      Testimonial,
      { _id: newTestimonial._id },
    );
    if (!savedTestimonial) {
      return NextResponse.json({
        details: "Testimonial created but not found in database",
        status: 500,
      });
    }

    return NextResponse.json({
      data: newTestimonial,
      message: "Testimonial created successfully",
      status: 201,
    });
  } catch (error) {
    console.error(
      "POST Error:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({
      details: "An error occurred while creating the testimonial",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}

// PATCH: Update an existing testimonial by slug
export async function PATCH(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const { name, content, position, image } = await req.json();
    if (!name || !content || !position) {
      return NextResponse.json({
        details: "Missing required fields",
        status: 400,
      });
    }

    const existingTestimonial = await mongodbService.find<ITestimonial>(
      Testimonial,
      { slug },
    );
    if (!existingTestimonial[0]) {
      return NextResponse.json({
        details: "Testimonial not found",
        status: 404,
      });
    }

    const newSlug =
      existingTestimonial[0].name === name ? slug : slugify(name, true);
    const updatedTestimonial = await mongodbService.update<ITestimonial>(
      Testimonial,
      { slug },
      {
        name,
        content,
        position,
        image: image || "",
        slug: newSlug,
      },
    );

    if (!updatedTestimonial) {
      return NextResponse.json({
        details: "Testimonial not found",
        status: 404,
      });
    }

    return NextResponse.json({
      data: updatedTestimonial,
      message: "Testimonial updated successfully",
      status: 200,
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({
      details: "An error occurred while updating the testimonial",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}

// DELETE: Remove a testimonial by slug
export async function DELETE(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const deletedTestimonial = await mongodbService.delete(Testimonial, {
      slug,
    });
    if (!deletedTestimonial) {
      return NextResponse.json({
        details: "Testimonial not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Testimonial deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({
      details: "An error occurred while deleting the testimonial",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
