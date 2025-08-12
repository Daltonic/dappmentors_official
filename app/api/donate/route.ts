import { NextResponse } from "next/server";
import mongodbService from "@/services/mongodb.service";
import Donation, { IDonation } from "@/models/Donation";
import { slugify } from "@/utils/helper";

// GET: Fetch a single donation if `slug` is provided, otherwise fetch all donations
export async function GET(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const donation = await mongodbService.findOne<IDonation>(Donation, {
      slug,
    });
    if (!donation) {
      return NextResponse.json({ details: "Donation not found", status: 404 });
    }
    return NextResponse.json({
      data: donation,
      message: "Donation fetched successfully",
      status: 200,
    });
  } else {
    const donations = await mongodbService.find<IDonation>(Donation, {});
    return NextResponse.json({
      data: donations,
      count: donations.length,
      message: "Donations fetched successfully",
      status: 200,
    });
  }
}

// POST: Create a new donation
export async function POST(req: Request) {
  await mongodbService.connect();
  const { name, email, amount, currency, message, userId } = await req.json();

  if (!name || !email || !amount || !currency) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const slug = slugify(name, true);
  const newDonation = await mongodbService.create<IDonation>(Donation, {
    name,
    email,
    amount,
    currency,
    message,
    slug,
    userId,
  });
  if (!newDonation) {
    return NextResponse.json({
      details: "Donation creation failed",
      status: 400,
    });
  }

  return NextResponse.json({
    data: newDonation,
    message: "Donation created successfully",
    status: 201,
  });
}

// PATCH: Update an existing donation by its slug
export async function PATCH(req: Request) {
  await mongodbService.connect();
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ details: "Slug is required", status: 400 });
  }

  const { name, email, amount, currency, message } = await req.json();
  if (!name || !email || !amount || !currency) {
    return NextResponse.json({
      details: "Missing required fields",
      status: 400,
    });
  }

  const existingDonation = await mongodbService.find<IDonation>(Donation, {
    slug,
  });
  if (!existingDonation[0]) {
    return NextResponse.json({ details: "Donation not found", status: 404 });
  }

  const newSlug =
    existingDonation[0].name === name ? slug : slugify(name, true);
  const updatedDonation = await mongodbService.update<IDonation>(
    Donation,
    { slug },
    { name, email, amount, currency, message, slug: newSlug },
  );

  if (!updatedDonation) {
    return NextResponse.json({ details: "Donation not found", status: 404 });
  }

  return NextResponse.json({
    data: updatedDonation,
    message: "Donation updated successfully",
    status: 200,
  });
}

// DELETE: Remove a donation by its slug
export async function DELETE(req: Request) {
  try {
    await mongodbService.connect();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ details: "Slug is required", status: 400 });
    }

    const deletedDonation = await mongodbService.delete(Donation, { slug });
    if (!deletedDonation) {
      return NextResponse.json({ details: "Donation not found", status: 404 });
    }

    return NextResponse.json({
      message: "Donation deleted successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting donation:", error);
    return NextResponse.json({
      details: "An error occurred while deleting the donation",
      status: 500,
    });
  }
}
