// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: Request) {
  // This tells ESLint that the parameter is intentionally unused.
  void req;

  try {
    await connectDB();

    // Retrieve all users, excluding the password field
    const users = await User.find({}).select("-password");

    return NextResponse.json(
      { data: users, message: "Users retrieved successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Users route error:", error);
    return NextResponse.json(
      { details: "Internal server error" },
      { status: 500 },
    );
  }
}
