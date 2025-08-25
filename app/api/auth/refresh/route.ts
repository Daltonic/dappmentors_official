// app/api/auth/refresh/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/utils/interfaces";
import {
  verifyRefreshToken,
  generateAccessToken,
  generateRefreshToken,
  createJWTPayload,
  createSessionData,
} from "@/lib/jwt";
import { Collection } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get refresh token from cookies
    const refreshToken = request.cookies.get("refresh-token")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token not provided" },
        { status: 401 },
      );
    }

    // Verify refresh token
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired refresh token" },
        { status: 401 },
      );
    }

    // Get user from database to ensure they still exist and are active
    const db = await connectToDatabase();
    const collection: Collection<User> = db.collection("users");

    const user = await collection.findOne({
      _id: new ObjectId(payload.userId),
      status: { $ne: "banned" }, // Ensure user is not banned
      emailVerified: true, // Ensure email is still verified
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found or account suspended" },
        { status: 401 },
      );
    }

    // Generate new tokens
    const newJwtPayload = createJWTPayload(user);
    const newAccessToken = generateAccessToken(newJwtPayload);
    const newRefreshToken = generateRefreshToken(newJwtPayload);

    // Update user's last activity
    await collection.updateOne(
      { _id: user._id },
      {
        $set: {
          lastActivity: new Date(),
          updatedAt: new Date(),
        },
      },
    );

    // Create updated session data
    const userSession = createSessionData(user);

    // Create response
    const response = NextResponse.json(
      {
        message: "Token refreshed successfully",
        user: userSession,
        accessToken: newAccessToken,
      },
      { status: 200 },
    );

    // Update cookies
    const isProduction = process.env.NODE_ENV === "production";

    // Set new access token cookie
    response.cookies.set("access-token", await newAccessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 15 * 60, // 15 minutes
      path: "/",
    });

    // Set new refresh token cookie
    response.cookies.set("refresh-token", await newRefreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    // Update user session cookie
    response.cookies.set("user-session", JSON.stringify(userSession), {
      httpOnly: false,
      secure: isProduction,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/auth/refresh error:", error);
    return NextResponse.json(
      { error: "Failed to refresh token" },
      { status: 500 },
    );
  }
}
