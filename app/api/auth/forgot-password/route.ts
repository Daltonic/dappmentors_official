// app/api/auth/forgot-password/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendPasswordResetEmail } from "@/lib/email";
import { Collection } from "mongodb";
import { User } from "@/utils/interfaces";
import { forgotPasswordSchema } from "@/validations/users";
import { generateVerificationToken } from "@/heplers/users";

export async function POST(request: NextRequest): Promise<NextResponse> {
  console.log("Forgot password request received");

  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Parse and validate request body
    const body = await request.json();

    // Validate input data
    const validationResult = forgotPasswordSchema.safeParse(body);
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

    const { email } = validationResult.data;

    // Find user by email
    const user = await collection.findOne({ email });

    // Always return success message for security (don't reveal if email exists)
    const successMessage =
      "If an account with this email exists, a password reset link has been sent.";

    if (!user) {
      return NextResponse.json(
        {
          message: successMessage,
        },
        { status: 200 },
      );
    }

    // Check if user's email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email not verified",
          details: {
            email:
              "Please verify your email address before requesting a password reset.",
          },
        },
        { status: 400 },
      );
    }

    // Check rate limiting - prevent spam requests
    const now = new Date();
    const fifteenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);

    // Check if user has requested reset recently
    if (
      user.passwordResetToken &&
      user.updatedAt &&
      user.updatedAt > fifteenMinutesAgo
    ) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          details: {
            general:
              "Please wait 15 minutes before requesting another password reset.",
          },
        },
        { status: 429 },
      );
    }

    // Generate password reset token (expires in 1 hour)
    const passwordResetToken = generateVerificationToken();
    const passwordResetExpires = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour

    // Update user with password reset token
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          passwordResetToken,
          passwordResetExpires,
          updatedAt: now,
        },
      },
    );

    // Send password reset email
    try {
      const emailSent = await sendPasswordResetEmail(
        email,
        passwordResetToken,
        user.name,
      );

      if (!emailSent) {
        console.error("Failed to send password reset email to:", email);
        return NextResponse.json(
          {
            error:
              "Failed to send password reset email. Please try again later.",
          },
          { status: 500 },
        );
      }
    } catch (emailError) {
      console.error("Password reset email sending error:", emailError);
      return NextResponse.json(
        {
          error: "Failed to send password reset email. Please try again later.",
        },
        { status: 500 },
      );
    }

    // Log for development (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log(`Password reset email sent to: ${email}`);
      console.log(`Reset token: ${passwordResetToken}`);
      console.log(
        `Reset URL: ${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${passwordResetToken}`,
      );
    }

    return NextResponse.json(
      {
        message: successMessage,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/auth/forgot-password error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
