import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import { slugify } from "@/utils/helper";
import Project, { IProject } from "@/models/Project";

// GET: Fetch a single project if `slug` is provided, otherwise fetch all projects
export async function GET(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const project = await mongodbService.findOne<IProject>(Project, { slug });
    if (!project) {
      return NextResponse.json({ details: "Project not found", status: 404 });
    }
    return NextResponse.json({
      data: project,
      message: "Project fetched successfully",
      status: 200,
    });
  } else {
    const projects = await mongodbService.find<IProject>(Project, {});
    return NextResponse.json({
      data: projects,
      count: projects.length,
      message: "Projects fetched successfully",
      status: 200,
    });
  }
}

// POST: Create a new project
export async function POST(req: Request) {
  await mongodbService.connect();
  const {
    title,
    description,
    date,
    location,
    userId,
    image,
    targetAmount,
    aboutProject,
    storiesImpact,
    conclusion,
    gallery,
  } = await req.json();

  if (
    !title ||
    !description ||
    !date ||
    !location ||
    !userId ||
    !image ||
    !targetAmount ||
    !aboutProject ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const slug = slugify(title, true);
  const existingProject = await mongodbService.find<IProject>(Project, {
    slug,
  });
  if (existingProject.length > 0) {
    return NextResponse.json({ details: "Title must be unique", status: 400 });
  }

  const newProject = await mongodbService.create<IProject>(Project, {
    title,
    description,
    date,
    location,
    slug,
    userId,
    image,
    targetAmount,
    aboutProject,
    storiesImpact,
    conclusion,
    gallery: gallery || [],
    raised: 0,
    completed: false,
  });

  if (!newProject) {
    return NextResponse.json({
      details: "Project creation failed",
      status: 400,
    });
  }

  return NextResponse.json({
    data: newProject,
    message: "Project created successfully",
    status: 201,
  });
}

// PATCH: Update an existing project by its slug
export async function PATCH(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ details: "Slug is required", status: 400 });
  }

  const {
    title,
    description,
    date,
    location,
    image,
    targetAmount,
    aboutProject,
    storiesImpact,
    conclusion,
    gallery,
  } = await req.json();

  if (
    !title ||
    !description ||
    !date ||
    !location ||
    !image ||
    !targetAmount ||
    !aboutProject ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const existingProject = await mongodbService.find<IProject>(Project, {
    slug,
  });
  if (!existingProject[0]) {
    return NextResponse.json({ details: "Project not found", status: 404 });
  }

  const newSlug =
    existingProject[0].title === title ? slug : slugify(title, true);

  const updatedProject = await mongodbService.update<IProject>(
    Project,
    { slug },
    {
      title,
      description,
      date,
      location,
      slug: newSlug,
      image,
      targetAmount,
      aboutProject,
      storiesImpact,
      conclusion,
      gallery: gallery || [],
    },
  );

  if (!updatedProject) {
    return NextResponse.json({ details: "Project not found", status: 404 });
  }

  return NextResponse.json({
    data: updatedProject,
    message: "Project updated successfully",
    status: 200,
  });
}

// DELETE: Remove a project by its slug
export async function DELETE(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const deletedProject = await mongodbService.delete(Project, { slug });
    if (!deletedProject) {
      return NextResponse.json({ details: "Project not found", status: 404 });
    }

    return NextResponse.json({
      message: "Project deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({
      details: "An error occurred while deleting the project",
      status: 500,
    });
  }
}
