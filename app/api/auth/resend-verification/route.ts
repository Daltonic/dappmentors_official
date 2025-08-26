// app/api/auth/resend-verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { sendVerificationEmail } from "@/lib/email";
import { Collection } from "mongodb";
import { User } from "@/utils/interfaces";
import { resendSchema } from "@/validations/users";
import { generateVerificationToken } from "@/heplers/users";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Parse and validate request body
    const body = await request.json();

    // Validate input data
    const validationResult = resendSchema.safeParse(body);
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

    if (!user) {
      // Don't reveal if email exists or not for security
      return NextResponse.json(
        {
          message:
            "If an account with this email exists, a verification email has been sent.",
        },
        { status: 200 },
      );
    }

    // Check if user is already verified
    if (user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email already verified",
          details: {
            email:
              "This email address is already verified. You can sign in directly.",
          },
        },
        { status: 400 },
      );
    }

    // Check rate limiting (optional: implement more sophisticated rate limiting)
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Simple rate limiting: check if user was updated in the last 5 minutes
    if (user.updatedAt && user.updatedAt > fiveMinutesAgo) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          details: {
            general:
              "Please wait a few minutes before requesting another verification email.",
          },
        },
        { status: 429 },
      );
    }

    // Generate new verification token
    const emailVerificationToken = generateVerificationToken();

    // Update user with new verification token
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerificationToken,
          updatedAt: now,
        },
      },
    );

    // Send verification email
    try {
      const emailSent = await sendVerificationEmail(
        email,
        emailVerificationToken,
        user.name,
      );

      if (!emailSent) {
        console.error("Failed to send verification email to:", email);
        return NextResponse.json(
          {
            error: "Failed to send verification email. Please try again later.",
          },
          { status: 500 },
        );
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again later." },
        { status: 500 },
      );
    }

    // Log for development (remove in production)
    if (process.env.NODE_ENV === "development") {
      console.log(`Verification email sent to: ${email}`);
      console.log(`Verification token: ${emailVerificationToken}`);
      console.log(
        `Verification URL: ${process.env.NEXT_PUBLIC_APP_URL}/auth/verify-email?token=${emailVerificationToken}`,
      );
    }

    return NextResponse.json(
      {
        message:
          "Verification email sent! Please check your inbox and spam folder.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("POST /api/auth/resend-verification error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
