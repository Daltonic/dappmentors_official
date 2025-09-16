// data/global.ts remains the same, no changes needed

// middleware.ts (Updated to redirect to first available route based on role)
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

// Helper function to get required roles for a pathname
function getRequiredRoles(pathname: string): string[] | null {
  for (const page of dashboardPages) {
    if (
      pathname === page.path ||
      (page.path !== "/dashboard" && pathname.startsWith(page.path))
    ) {
      return page.roles;
    }
  }
  return null;
}

// Helper function to get the default route for a given role
function getDefaultRoute(role: string): string {
  const firstPage = dashboardPages.find((page) => page.roles.includes(role));
  return firstPage ? firstPage.path : "/auth/login"; // Fallback to login if no route available
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

  const accessToken = request.cookies.get("access-token")?.value;
  const refreshToken = request.cookies.get("refresh-token")?.value;
  const isProtectedRoute = matchesRoute(pathname, protectedRoutes);

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (accessToken) {
    const tokenPayload = await verifyAccessToken(accessToken);

    if (tokenPayload) {
      if (tokenPayload.status === "banned") {
        url.pathname = "/auth/account-suspended";
        return NextResponse.redirect(url);
      }
      if (tokenPayload.status === "inactive") {
        url.pathname = "/auth/account-inactive";
        return NextResponse.redirect(url);
      }

      const requiredRoles = getRequiredRoles(pathname);
      if (requiredRoles && !requiredRoles.includes(tokenPayload.role)) {
        url.pathname = getDefaultRoute(tokenPayload.role);
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }
  }

  if (refreshToken) {
    try {
      const refreshResponse = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: { Cookie: request.headers.get("cookie") || "" },
        },
      );

      if (refreshResponse.ok) {
        const data = await refreshResponse.json();
        if (data.user) {
          const requiredRoles = getRequiredRoles(pathname);
          if (requiredRoles && !requiredRoles.includes(data.user.role)) {
            url.pathname = getDefaultRoute(data.user.role);
            return NextResponse.redirect(url);
          }
          const response = NextResponse.next();
          const setCookieHeaders = refreshResponse.headers.get("set-cookie");
          if (setCookieHeaders) {
            response.headers.set("set-cookie", setCookieHeaders);
          }
          return response;
        }
      }
    } catch (error) {
      console.error("Token refresh failed in middleware:", error);
    }
  }

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
