import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import { slugify } from "@/utils/helper";
import Event, { IEvent } from "@/models/Event";

// GET: Fetch a single event if `slug` is provided, otherwise fetch all events
export async function GET(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const event = await mongodbService.findOne<IEvent>(Event, { slug });
    if (!event) {
      return NextResponse.json({ details: "Event not found", status: 404 });
    }
    return NextResponse.json({
      data: event,
      message: "Event fetched successfully",
      status: 200,
    });
  } else {
    const events = await mongodbService.find<IEvent>(Event, {});
    return NextResponse.json({
      data: events,
      count: events.length,
      message: "Events fetched successfully",
      status: 200,
    });
  }
}

// POST: Create a new event
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
    aboutEvent,
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
    !aboutEvent ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const slug = slugify(title, true);
  const existingEvent = await mongodbService.find<IEvent>(Event, { slug });
  if (existingEvent.length > 0) {
    return NextResponse.json({ details: "Title must be unique", status: 400 });
  }

  const newEvent = await mongodbService.create<IEvent>(Event, {
    title,
    description,
    date,
    location,
    slug,
    userId,
    image,
    targetAmount,
    aboutEvent,
    storiesImpact,
    conclusion,
    gallery: gallery || [],
  });

  if (!newEvent) {
    return NextResponse.json({
      details: "Event creation failed",
      status: 400,
    });
  }

  return NextResponse.json({
    data: newEvent,
    message: "Event created successfully",
    status: 201,
  });
}

// PATCH: Update an existing event by its slug
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
    aboutEvent,
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
    !aboutEvent ||
    !storiesImpact ||
    !conclusion
  ) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const existingEvent = await mongodbService.find<IEvent>(Event, { slug });
  if (!existingEvent[0]) {
    return NextResponse.json({ details: "Event not found", status: 404 });
  }

  const newSlug =
    existingEvent[0].title === title ? slug : slugify(title, true);

  const updatedEvent = await mongodbService.update<IEvent>(
    Event,
    { slug },
    {
      title,
      description,
      date,
      location,
      slug: newSlug,
      image,
      targetAmount,
      aboutEvent,
      storiesImpact,
      conclusion,
      gallery: gallery || [],
    },
  );

  if (!updatedEvent) {
    return NextResponse.json({ details: "Event not found", status: 404 });
  }

  return NextResponse.json({
    data: updatedEvent,
    message: "Event updated successfully",
    status: 200,
  });
}

// DELETE: Remove an event by its slug
export async function DELETE(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const deletedEvent = await mongodbService.delete(Event, { slug });
    if (!deletedEvent) {
      return NextResponse.json({ details: "Event not found", status: 404 });
    }

    return NextResponse.json({
      message: "Event deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({
      details: "An error occurred while deleting the event",
      status: 500,
    });
  }
}
