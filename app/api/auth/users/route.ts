// /api/auth/users/route.ts

import { generateVerificationToken, logActivity } from "@/heplers/users";
import { sendVerificationEmail } from "@/lib/email";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import { User } from "@/utils/interfaces";
import { signupSchema } from "@/validations/users";
import bcrypt from "bcryptjs";
import { Collection, Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Authentication check
    const accessToken = request.cookies.get("access-token")?.value;
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // if (payload.role !== 'admin' || payload.status !== 'active') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    // }

    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Get query parameters for pagination and filtering
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const status = url.searchParams.get("status");
    const role = url.searchParams.get("role");

    // Build filter object
    const filter: Filter<User> = {};
    if (status) filter.status = status as User["status"];
    if (role) filter.role = role as User["role"];

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch users (excluding sensitive data)
    const users = await collection
      .find(filter, {
        projection: {
          password: 0,
          emailVerificationToken: 0,
          passwordResetToken: 0,
          passwordResetExpires: 0,
        },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Map _id to id
    const mappedUsers = users.map((user) => ({
      ...user,
      id: user._id.toString(),
      _id: undefined,
    }));

    // Get total count for pagination
    const total = await collection.countDocuments(filter);

    return NextResponse.json(
      {
        users: mappedUsers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    // Parse and validate request body
    const body = await request.json();

    // Validate input data
    const validationResult = signupSchema.safeParse(body);
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

    const { firstName, lastName, email, password } = validationResult.data;

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
          details: {
            email: "An account with this email address already exists",
          },
        },
        { status: 409 },
      );
    }

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate email verification token
    const emailVerificationToken = generateVerificationToken();

    // Create user object
    const now = new Date();
    const newUser: Omit<User, "_id"> = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`,
      email,
      password: hashedPassword,
      role: "admin", // TEMPORARY: Change to 'admin' for initial setup. Revert to 'student' after creating your admin account!
      status: "pending", // Pending email verification
      joinDate: now,
      createdAt: now,
      updatedAt: now,
      emailVerified: false,
      emailVerificationToken,
      coursesEnrolled: 0,
      coursesCompleted: 0,
      posts: 0,
      comments: 0,
      authMethod: "traditional",
    };

    // Insert user into database
    const result = await collection.insertOne(newUser);

    // Log activity for new registration
    await logActivity(
      db,
      "user_registration",
      "New user registration",
      `${newUser.name} joined as ${newUser.role}`,
      {
        userId: result.insertedId.toString(),
        userName: newUser.name,
      },
    );

    // Send email verification email
    try {
      const emailSent = await sendVerificationEmail(
        email,
        emailVerificationToken,
        newUser.name,
      );

      if (!emailSent) {
        console.error("Failed to send verification email to:", email);
        // Note: We still return success since user was created successfully
        // You might want to implement a retry mechanism or notification system
      }
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Continue with success response even if email fails
    }

    // Return success response (excluding sensitive data)
    return NextResponse.json(
      {
        message:
          "Account created successfully! Please check your email to verify your account.",
        user: {
          id: result.insertedId,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          joinDate: newUser.joinDate,
          emailVerified: newUser.emailVerified,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/users error:", error);

    // Handle specific MongoDB errors
    if (error instanceof Error) {
      if (error.message.includes("E11000")) {
        return NextResponse.json(
          {
            error: "User already exists",
            details: {
              email: "An account with this email address already exists",
            },
          },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// Additional helper function for email verification (separate endpoint)
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  try {
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const body = await request.json();
    const { action, token } = body;

    if (action === "verify-email" && token) {
      // Find user by verification token
      const user = await collection.findOne({ emailVerificationToken: token });

      if (!user) {
        return NextResponse.json(
          { error: "Invalid or expired verification token" },
          { status: 400 },
        );
      }

      // Optional: Check if token is expired (e.g., 24 hours)
      const tokenCreatedAt = user.updatedAt || user.createdAt;
      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      if (tokenCreatedAt < twentyFourHoursAgo) {
        return NextResponse.json(
          {
            error:
              "Verification token has expired. Please request a new verification email.",
          },
          { status: 400 },
        );
      }

      // Update user to verified status
      await collection.updateOne(
        { _id: user._id },
        {
          $set: {
            emailVerified: true,
            status: "active",
            updatedAt: new Date(),
          },
          $unset: {
            emailVerificationToken: "",
          },
        },
      );

      return NextResponse.json(
        {
          message: "Email verified successfully! Your account is now active.",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            emailVerified: true,
            status: "active",
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { error: "Invalid action or missing parameters" },
      { status: 400 },
    );
  } catch (error) {
    console.error("PATCH /api/users error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
