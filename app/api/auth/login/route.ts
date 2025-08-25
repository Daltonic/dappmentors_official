// app/api/auth/login/route.ts (Updated)
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/utils/interfaces";
import { loginSchema } from "@/validations/users";
import {
  generateAccessToken,
  generateRefreshToken,
  createJWTPayload,
  createSessionData,
} from "@/lib/jwt";
import bcrypt from "bcryptjs";
import { Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Parse and validate request body
    const body = await request.json();

    // Validate input data
    const validationResult = loginSchema.safeParse(body);
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

    const { email, password, rememberMe } = validationResult.data;

    // Find user by email
    const user = await collection.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
          details: {
            general:
              "Invalid email or password. Please check your credentials and try again.",
          },
        },
        { status: 401 },
      );
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          error: "Invalid credentials",
          details: {
            general:
              "Invalid email or password. Please check your credentials and try again.",
          },
        },
        { status: 401 },
      );
    }

    // Check if user is banned
    if (user.status === "banned") {
      return NextResponse.json(
        {
          error: "Account banned",
          details: {
            general:
              "Your account has been banned. Please contact support for assistance.",
          },
        },
        { status: 403 },
      );
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Email not verified",
          details: {
            general: "Please verify your email address before signing in.",
          },
          redirectTo: `/auth/verify-email?email=${encodeURIComponent(email)}`,
        },
        { status: 403 },
      );
    }

    // Check if account is inactive
    if (user.status === "inactive") {
      return NextResponse.json(
        {
          error: "Account inactive",
          details: {
            general:
              "Your account is currently inactive. Please contact support for assistance.",
          },
        },
        { status: 403 },
      );
    }

    // Update user's last login and activity
    const now = new Date();
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          lastLogin: now,
          lastActivity: now,
          updatedAt: now,
          // Set status to active if it was pending (after email verification)
          ...(user.status === "pending" && { status: "active" }),
        },
      },
    );

    // Create JWT tokens
    const jwtPayload = createJWTPayload(user);
    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    // Create user session data (excluding sensitive information)
    const userSession = createSessionData(user);

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful! Welcome back.",
        user: userSession,
        accessToken, // Include access token for client-side usage
      },
      { status: 200 },
    );

    // Set HTTP-only cookies for session management
    const isProduction = process.env.NODE_ENV === "production";
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days or 24 hours

    // Set access token cookie (short-lived)
    response.cookies.set("access-token", await accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    // Set refresh token cookie (longer-lived)
    response.cookies.set("refresh-token", await refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: maxAge,
      path: "/",
    });

    // Set user session cookie (for client-side access)
    response.cookies.set("user-session", JSON.stringify(userSession), {
      httpOnly: false, // Allow client-side access
      secure: isProduction,
      sameSite: "strict",
      maxAge: maxAge,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/auth/login error:", error);

    // Handle specific errors
    if (error instanceof Error) {
      // Handle any database connection errors
      if (error.message.includes("connection")) {
        return NextResponse.json(
          {
            error: "Service temporarily unavailable",
            details: {
              general:
                "Unable to connect to the database. Please try again later.",
            },
          },
          { status: 503 },
        );
      }
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: {
          general: "An unexpected error occurred. Please try again later.",
        },
      },
      { status: 500 },
    );
  }
}
