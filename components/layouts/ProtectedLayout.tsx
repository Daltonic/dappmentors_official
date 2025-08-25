// components/layouts/ProtectedLayout.tsx
"use client";

import React, { ReactNode } from "react";
import { useAuthGuard, AuthGuardOptions } from "@/hooks/useAuthGuard";
import { motion } from "framer-motion";

interface ProtectedLayoutProps extends AuthGuardOptions {
  children: ReactNode;
  fallback?: ReactNode;
  showLoadingSpinner?: boolean;
}

export default function ProtectedLayout({
  children,
  fallback,
  showLoadingSpinner = true,
  ...guardOptions
}: ProtectedLayoutProps) {
  const { isAuthorized, isCheckingAuth } = useAuthGuard(guardOptions);

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (showLoadingSpinner) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-6 p-8"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#D2145A]/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#D2145A] rounded-full animate-spin"></div>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Authenticating...
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please wait while we verify your credentials
              </p>
            </div>
          </motion.div>
        </div>
      );
    }

    return null;
  }

  // Show content if authorized
  if (isAuthorized) {
    return <>{children}</>;
  }

  // This shouldn't happen as useAuthGuard handles redirects
  return null;
}

// Specific protected layout components
// export function AdminLayout({ children, ...props }: Omit<ProtectedLayoutProps, 'requireRole'>) {
//     return (
//         <ProtectedLayout requireRole={['admin']} {...props}>
//             {children}
//         </ProtectedLayout>
//     )
// }

// export function InstructorLayout({ children, ...props }: Omit<ProtectedLayoutProps, 'requireRole'>) {
//     return (
//         <ProtectedLayout requireRole={['instructor', 'admin']} {...props}>
//             {children}
//         </ProtectedLayout>
//     )
// }

export function UserLayout({
  children,
  ...props
}: Omit<ProtectedLayoutProps, "requireRole">) {
  return (
    <ProtectedLayout requireRole={["user", "instructor", "admin"]} {...props}>
      {children}
    </ProtectedLayout>
  );
}
