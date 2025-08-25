// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { dashboardPages } from "./data/global";

// Define protected routes based on dashboard pages
const protectedRoutes = dashboardPages.map((page) => page.path);

// Helper function to check if a path matches any pattern
function matchesRoute(pathname: string, routes: string[]): boolean {
  return routes.some((route) => {
    if (route.endsWith("*")) {
      return pathname.startsWith(route.slice(0, -1));
    }
    return pathname.startsWith(route);
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Skip middleware for static files, API routes (except auth), and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get("access-token")?.value;
  const refreshToken = request.cookies.get("refresh-token")?.value;

  // Check if the current path is protected
  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);

  // If not protected, allow access
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // If no tokens and trying to access protected route, redirect to login
  if (!accessToken && !refreshToken) {
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  // If we have an access token, verify it
  if (accessToken) {
    const tokenPayload = verifyAccessToken(accessToken);

    if (tokenPayload) {
      // Token is valid

      // Check if user is banned or inactive
      if (tokenPayload.status === "banned") {
        url.pathname = "/auth/account-suspended";
        return NextResponse.redirect(url);
      }

      if (tokenPayload.status === "inactive") {
        url.pathname = "/auth/account-inactive";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }
  }

  // If access token is invalid but we have a refresh token, attempt to refresh
  if (refreshToken) {
    try {
      const refreshResponse = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: {
            Cookie: request.headers.get("cookie") || "",
          },
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        if (data.user) {
          // Successfully refreshed, allow access
          console.log("Token refreshed successfully in middleware");
        }
        // Create response with new tokens
        const response = NextResponse.next();

        // Copy new cookies from refresh response
        const setCookieHeaders = refreshResponse.headers.get("set-cookie");
        if (setCookieHeaders) {
          response.headers.set("set-cookie", setCookieHeaders);
        }

        return response;
      }
    } catch (error) {
      console.error("Token refresh failed in middleware:", error);
    }
  }

  // If we reach here, authentication failed
  // Clear any invalid cookies
  const loginUrl = new URL("/auth/login", request.url);
  loginUrl.searchParams.set("redirectTo", pathname);
  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete("access-token");
  response.cookies.delete("refresh-token");
  response.cookies.delete("user-session");
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    "/((?!api/(?!auth)|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
