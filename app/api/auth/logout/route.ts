// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Create response
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 },
    );

    console.log(request.cookies.get("access-token"));

    // Clear all authentication cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 0, // Expire immediately
      path: "/",
    };

    response.cookies.set("access-token", "", cookieOptions);
    response.cookies.set("refresh-token", "", cookieOptions);

    // Clear user session cookie (not httpOnly, so different options)
    response.cookies.set("user-session", "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("POST /api/auth/logout error:", error);
    return NextResponse.json({ error: "Failed to logout" }, { status: 500 });
  }
}
