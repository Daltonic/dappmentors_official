import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { details: "Email and password are required" },
        { status: 400 },
      );
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { details: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { details: "Invalid email or password" },
        { status: 401 },
      );
    }

    // Prepare user response (excluding password)
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      slug: user.slug,
      gender: user.gender,
      authType: user.authType,
    };

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, // Payload: minimal data (user ID)
      process.env.NEXT_PRIVATE_JWT_SECRET!, // Secret key from .env
      { expiresIn: "1h" }, // Token expires in 1 hour
    );

    // Create response and set HTTP-only cookie
    const response = NextResponse.json(
      { data: userResponse, message: "Login successful" },
      { status: 200 },
    );
    response.cookies.set("token", token, {
      httpOnly: true, // Prevents JavaScript access (mitigates XSS)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: "strict", // Prevents CSRF
      maxAge: 60 * 60, // 1 hour in seconds
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { details: "Internal server error" },
      { status: 500 },
    );
  }
}
