// hooks/useAuthGuard.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

export interface AuthGuardOptions {
  requireAuth?: boolean;
  requireRole?: string[];
  redirectTo?: string;
  allowedStatuses?: string[];
}

export function useAuthGuard(options: AuthGuardOptions = {}) {
  const {
    requireAuth = true,
    requireRole = [],
    redirectTo,
    allowedStatuses = ["active"],
  } = options;

  const { user, isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState<boolean>(true);

  useEffect(() => {
    // Wait for auth context to initialize
    if (isLoading) {
      setIsCheckingAuth(true);
      return;
    }

    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      const loginUrl = redirectTo || "/auth/login";
      const urlWithRedirect = `${loginUrl}?redirectTo=${encodeURIComponent(pathname)}`;
      router.push(urlWithRedirect);
      setIsAuthorized(false);
      setIsCheckingAuth(false);
      return;
    }

    // If user is authenticated, check additional requirements
    if (isAuthenticated && user) {
      // Check user status
      if (!allowedStatuses.includes(user.status)) {
        let redirectPath = "/auth/account-suspended";

        if (user.status === "inactive") {
          redirectPath = "/auth/account-inactive";
        } else if (user.status === "pending") {
          redirectPath = `/auth/verify-email?email=${encodeURIComponent(user.email)}`;
        }

        router.push(redirectPath);
        setIsAuthorized(false);
        setIsCheckingAuth(false);
        return;
      }

      // Check role requirements
      if (requireRole.length > 0 && !requireRole.includes(user.role)) {
        const fallbackUrl = redirectTo || "/dashboard";
        router.push(fallbackUrl);
        setIsAuthorized(false);
        setIsCheckingAuth(false);
        return;
      }

      // All checks passed
      setIsAuthorized(true);
    } else if (!requireAuth) {
      // No authentication required
      setIsAuthorized(true);
    }

    setIsCheckingAuth(false);
  }, [
    isLoading,
    isAuthenticated,
    user,
    requireAuth,
    requireRole,
    redirectTo,
    allowedStatuses,
    pathname,
    router,
  ]);

  return {
    isAuthorized,
    isCheckingAuth,
    user,
    isAuthenticated,
  };
}

// Specific hooks for different user roles
export function useAdminGuard(redirectTo?: string) {
  return useAuthGuard({
    requireAuth: true,
    requireRole: ["admin"],
    redirectTo,
  });
}

export function useInstructorGuard(redirectTo?: string) {
  return useAuthGuard({
    requireAuth: true,
    requireRole: ["instructor", "admin"],
    redirectTo,
  });
}

export function useUserGuard(redirectTo?: string) {
  return useAuthGuard({
    requireAuth: true,
    requireRole: ["user", "instructor", "admin"],
    redirectTo,
  });
}
