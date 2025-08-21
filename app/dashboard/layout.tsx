"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import Link from "next/link";
import { FaPlus, FaCircle } from "react-icons/fa";

type Particle = {
  top: string;
  left: string;
  color: string;
  baseSize: number;
  duration: number;
  xAmp: number;
  yAmp: number;
  scaleMax: number;
  scaleMin: number;
  opacityBase: number;
  opacityDelta: number;
  delay: number;
};

type PageInfo = {
  title: string;
  breadcrumb: string;
  date: string;
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userName = "John Doe";
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [currentPageInfo, setCurrentPageInfo] = useState<PageInfo>({
    title: "Dashboard Overview",
    breadcrumb: "Dashboard/Overview",
    date: "",
  });
  const pathname = usePathname();

  const particleCount = 20;
  const colorPalette = ["#D2145A", "#FF4081", "#a855f7"];

  // Generate particles once on mount
  useEffect(() => {
    const generatedParticles = Array.from({ length: particleCount }).map(() => {
      const duration = 10 + Math.random() * 10; // 10-20 seconds
      return {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        baseSize: Math.random() * 8 + 4,
        duration,
        xAmp: (Math.random() - 0.5) * 40, // slight movement: +/- 20px
        yAmp: (Math.random() - 0.5) * 40, // slight movement: +/- 20px
        scaleMax: 1 + Math.random() * 0.5, // 1 to 1.5
        scaleMin: 0.7 + Math.random() * 0.3, // 0.7 to 1
        opacityBase: 0.3 + Math.random() * 0.3, // 0.3-0.6 base opacity
        opacityDelta: Math.random() * 0.1, // 0-0.1 delta for variation
        delay: Math.random() * 5, // initial delay 0-5s for staggering
      };
    });
    setParticles(generatedParticles);
  }, []);

  // Get current date formatted
  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get page information based on pathname
  const getPageInfo = (pathname: string) => {
    const pageMap: Record<string, { title: string; breadcrumb: string }> = {
      "/dashboard": {
        title: "Dashboard Overview",
        breadcrumb: "Dashboard/Overview",
      },
      "/dashboard/products": {
        title: "Products Management",
        breadcrumb: "Dashboard/Products",
      },
      "/dashboard/blogs": {
        title: "Blog Posts",
        breadcrumb: "Dashboard/Blogs",
      },
      "/dashboard/users": {
        title: "User Management",
        breadcrumb: "Dashboard/Users",
      },
      "/dashboard/settings": {
        title: "System Settings",
        breadcrumb: "Dashboard/Settings",
      },
    };

    // Handle nested routes
    for (const [path, info] of Object.entries(pageMap)) {
      if (pathname === path) {
        return info;
      }
      if (path !== "/dashboard" && pathname.startsWith(path + "/")) {
        // Handle sub-pages like /dashboard/products/123
        const subPage = pathname.replace(path + "/", "");
        const formattedSubPage =
          subPage.charAt(0).toUpperCase() + subPage.slice(1);
        return {
          title: `${info.title} - ${formattedSubPage}`,
          breadcrumb: `${info.breadcrumb}/${formattedSubPage}`,
        };
      }
    }

    // Default fallback
    return { title: "Dashboard", breadcrumb: "Dashboard" };
  };

  // Get breadcrumb items for navigation
  const getBreadcrumbItems = (pathname: string) => {
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");
    const items = [];

    // Always start with Dashboard
    items.push({ label: "Dashboard", href: "/dashboard", isActive: false });

    if (pathSegments.length > 1) {
      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const href = "/" + pathSegments.slice(0, i + 1).join("/");
        const isActive = i === pathSegments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        items.push({ label, href, isActive });
      }
    } else {
      // If we're on /dashboard, mark it as active
      items[0].isActive = true;
    }

    return items;
  };

  // Update page info when pathname changes
  useEffect(() => {
    const pageInfo = getPageInfo(pathname);
    setCurrentPageInfo({
      ...pageInfo,
      date: getCurrentDate(),
    });
  }, [pathname]);

  // Handle sidebar collapse state
  const handleSidebarToggle = (collapsed: boolean) => {
    setIsSidebarCollapsed(collapsed);
  };

  // Handle page info updates from sidebar
  const handlePageChange = (pageInfo: PageInfo) => {
    setCurrentPageInfo(pageInfo);
  };

  const breadcrumbItems = getBreadcrumbItems(pathname);

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        userName={userName}
        userAvatar="👨‍💻"
        notificationCount={3}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        onPageChange={handlePageChange}
      />

      {/* Main Content Area */}
      <div
        className={`
          flex-1 min-h-screen relative transition-all duration-500 ease-in-out
          bg-gradient-to-br from-gray-50 via-white to-gray-100
          dark:from-gray-900 dark:via-black dark:to-gray-900
          text-black dark:text-white w-full
          ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-80"}
        `}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: p.top,
                left: p.left,
                width: p.baseSize,
                height: p.baseSize,
                backgroundColor: p.color,
                borderRadius: "50%",
              }}
              animate={{
                x: [0, p.xAmp, 0, -p.xAmp, 0],
                y: [0, p.yAmp, 0, -p.yAmp, 0],
                scale: [1, p.scaleMax, 1, p.scaleMin, 1],
                opacity: [
                  p.opacityBase,
                  p.opacityBase + p.opacityDelta,
                  p.opacityBase,
                  p.opacityBase - p.opacityDelta,
                  p.opacityBase,
                ],
              }}
              transition={{
                duration: p.duration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Top Bar for Mobile - Shows when sidebar is closed */}
        <div className="lg:hidden relative z-20">
          <div className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between px-4">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                {currentPageInfo.title}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {currentPageInfo.date}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {userName}
                </p>
                <p className="text-xs text-[#D2145A] dark:text-[#FF4081]">
                  Administrator
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl flex items-center justify-center text-2xl">
                👨‍💻
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Header Bar - Dynamic content */}
        <div className="hidden lg:block relative z-20">
          <div className="h-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30 flex items-center justify-between px-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {currentPageInfo.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {currentPageInfo.date}
              </p>
            </div>

            {/* Quick Stats - Only show on dashboard overview */}
            {pathname === "/dashboard" && (
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#D2145A]">24</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Active Users
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#FF4081]">12</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    New Orders
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">98%</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Uptime
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Breadcrumb Navigation */}
        <div className="relative z-20 px-4 lg:px-8 py-4 w-full">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.href}>
                {index > 0 && (
                  <span className="text-gray-400 dark:text-gray-600">/</span>
                )}
                {item.isActive ? (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-[#D2145A] dark:hover:text-[#FF4081] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <main className="relative z-10 px-4 lg:px-8 pb-8 w-full">
          <div className="w-full max-w-none lg:max-w-7xl mx-auto">
            {/* Content Container with subtle background */}
            <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl lg:rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-1">
              <div className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm rounded-xl lg:rounded-[22px] border border-gray-200/30 dark:border-gray-700/30 p-4 lg:p-6 xl:p-8">
                {children}
              </div>
            </div>
          </div>
        </main>

        {/* Floating Action Button for Mobile - Context-aware */}
        <div className="lg:hidden fixed bottom-6 right-6 z-30">
          <button
            className="w-14 h-14 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            title={`Add new ${breadcrumbItems[breadcrumbItems.length - 1]?.label.toLowerCase() || "item"}`}
          >
            <FaPlus className="w-6 h-6" />
          </button>
        </div>

        {/* Footer */}
        <footer className="relative z-20 px-4 lg:px-8 py-6 w-full">
          <div className="w-full max-w-none lg:max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
                <span>
                  ©{new Date().getFullYear()} Dashboard. All rights reserved.
                </span>
                <div className="flex items-center gap-2">
                  <FaCircle className="w-2 h-2 text-green-500 animate-pulse" />
                  <span>All systems operational</span>
                </div>
              </div>
              <div className="flex items-center gap-4 lg:gap-6">
                <Link
                  href="/privacy"
                  className="hover:text-[#D2145A] transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      <div className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-25 opacity-0 pointer-events-none transition-opacity duration-300" />
    </div>
  );
}
