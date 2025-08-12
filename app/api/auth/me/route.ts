import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    // Connect to the database
    await connectDB();

    // Get the token from the cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Check if the token exists
    if (!token) {
      return NextResponse.json(
        { details: "No token provided" },
        { status: 401 },
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET!) as {
      id: string;
    };

    // Fetch the user from the database, selecting specific fields
    const user = await User.findById(decoded.id).select(
      "firstName lastName email slug gender authType",
    );

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ details: "User not found" }, { status: 404 });
    }

    // Construct the user response to match the login endpoint
    const userResponse = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      slug: user.slug,
      gender: user.gender,
      authType: user.authType,
    };

    // Return the user details
    return NextResponse.json(
      { data: userResponse, message: "User details retrieved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in /me endpoint:", error);

    // Handle specific JWT errors
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      return NextResponse.json({ details: "Invalid token" }, { status: 401 });
    } else if (error instanceof Error && error.name === "TokenExpiredError") {
      return NextResponse.json({ details: "Token expired" }, { status: 401 });
    } else {
      // Handle unexpected errors
      return NextResponse.json(
        { details: "Internal server error" },
        { status: 500 },
      );
    }
  }
}
