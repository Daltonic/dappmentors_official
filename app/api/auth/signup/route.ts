// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { slugify } from "@/utils/helper";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      authType,
      city,
      country,
    } = await req.json();

    // Validate all fields are provided
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !gender ||
      !authType ||
      !city ||
      !country
    ) {
      return NextResponse.json(
        { details: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { details: "Email already exists" },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a slug (e.g., from firstName + lastName)
    const slug = slugify(`${firstName} ${lastName}`, true);

    // Create and save the new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      slug,
      gender,
      authType,
      city,
      country,
    });
    await newUser.save();

    // Return success response (excluding password)
    const userResponse = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      slug: newUser.slug,
      gender: newUser.gender,
      authType: newUser.authType,
      city: newUser.city,
      country: newUser.country,
    };

    return NextResponse.json(
      { data: userResponse, message: "User created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { details: "Internal server error" },
      { status: 500 },
    );
  }
}
