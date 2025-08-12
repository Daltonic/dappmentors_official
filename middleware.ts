import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    return NextResponse.next();
  } catch (error) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.set("token", "", { expires: new Date(0) });
    console.error(error);

    return response;
  }
}

export const config = {
  matcher: "/dashboard/:path*",
};
