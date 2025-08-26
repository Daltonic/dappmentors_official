// app/api/auth/reset-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Collection } from "mongodb";
import { User } from "@/utils/interfaces";
import { resetPasswordSchema } from "@/validations/users";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users"); // Parse and validate request body
    const body = await request.json();

    // Validate input data
    const validationResult = resetPasswordSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.reduce(
        (acc, err) => {
          acc[err.path[0] as string] = err.message;
          return acc;
        },
        {} as Record<string, string>,
      );

      return NextResponse.json(
        {
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    const { token, password } = validationResult.data;

    // Find user by password reset token
    const user = await collection.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }, // Token must not be expired
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid or expired reset token",
          details: {
            token:
              "The password reset link is invalid or has expired. Please request a new one.",
          },
        },
        { status: 400 },
      );
    }

    // Check if user's email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email not verified",
          details: {
            general:
              "Please verify your email address before resetting your password.",
          },
        },
        { status: 400 },
      );
    }

    // Hash the new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user's password and clear reset token
    const now = new Date();
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: now,
        },
        $unset: {
          passwordResetToken: "",
          passwordResetExpires: "",
        },
      },
    );

    // Log for development (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log(`Password successfully reset for user: ${user.email}`);
    }

    return NextResponse.json(
      {
        message:
          "Password has been successfully reset. You can now sign in with your new password.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
} // GET endpoint to validate reset token
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        {
          error: "Token is required",
          valid: false,
        },
        { status: 400 },
      );
    }

    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Find user by password reset token
    const user = await collection.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }, // Token must not be expired
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid or expired reset token",
          valid: false,
        },
        { status: 400 },
      );
    }

    // Check if user's email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email not verified",
          valid: false,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Token is valid",
        valid: true,
        email: user.email, // Return email for display purposes
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/auth/reset-password error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        valid: false,
      },
      { status: 500 },
    );
  }
}
