import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import {
  FaChartPie,
  FaBox,
  FaPen,
  FaUsers,
  FaCog,
  FaBell,
  FaSignOutAlt,
  FaCircle, // Added FaCircle for status indicators
} from "react-icons/fa";
import ToggleMode from "../shared/ToggleMode";

type DashboardSidebarProps = {
  userName: string;
  userAvatar: string;
  notificationCount: number;
  isCollapsed: boolean;
  onToggleCollapse: (collapsed: boolean) => void;
  onPageChange: (pageInfo: {
    title: string;
    breadcrumb: string;
    date: string;
  }) => void;
};

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  userName,
  userAvatar = "👨‍💻",
  notificationCount = 0,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const pathname = usePathname();

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  const dashboardNavLinks = [
    {
      label: "Overview",
      link: "/dashboard",
      icon: <FaChartPie className="text-lg" />,
      badge: null,
    },
    {
      label: "Products",
      link: "/dashboard/products",
      icon: <FaBox className="text-lg" />,
      badge: "12",
    },
    {
      label: "Blogs",
      link: "/dashboard/blogs",
      icon: <FaPen className="text-lg" />,
      badge: null,
    },
    {
      label: "Users",
      link: "/dashboard/users",
      icon: <FaUsers className="text-lg" />,
      badge: "24",
    },
    {
      label: "Settings",
      link: "/dashboard/settings",
      icon: <FaCog className="text-lg" />,
      badge: null,
    },
  ];

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleDesktopToggle = () => {
    onToggleCollapse?.(!isCollapsed);
  };

  const isActiveLink = (link: string) => {
    return (
      pathname === link || (link !== "/dashboard" && pathname.startsWith(link))
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={handleMobileToggle}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-all duration-300 shadow-lg"
      >
        <FaChartPie size={20} />
      </button>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex fixed left-0 top-0 h-screen bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-200/50 dark:border-gray-700/50 z-30 shadow-2xl
          transition-all duration-500 ease-in-out flex-col
          ${isCollapsed ? "w-20" : "w-80"}
        `}
      >
        {/* Desktop Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : ""}`}
            >
              <div className="relative group">
                <div className="h-12 w-12 rounded-2xl overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Dashboard Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2145A] to-[#FF4081] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                    Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {greeting}, {userName}! 👋
                  </p>
                </div>
              )}
            </div>

            {/* Desktop Toggle Button */}
            <button
              onClick={handleDesktopToggle}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              {isCollapsed ? (
                <IoChevronForward size={20} />
              ) : (
                <IoChevronBack size={20} />
              )}
            </button>
          </div>

          {/* User Profile Card */}
          {!isCollapsed && (
            <div className="mt-4 p-4 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-2xl border border-[#D2145A]/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl flex items-center justify-center text-2xl">
                  {userAvatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {userName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed User Avatar */}
          {isCollapsed && (
            <div className="mt-4 flex justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl flex items-center justify-center text-2xl">
                {userAvatar}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`flex-1 overflow-y-auto py-6 ${isCollapsed ? "px-3" : "px-6"}`}
        >
          <div className="space-y-2">
            {dashboardNavLinks.map((item, i) => (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => setHoveredItem(i)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.link}
                  className={`
                    group flex items-center w-full p-4 rounded-2xl font-semibold relative
                    transition-all duration-300 hover:scale-[0.98] active:scale-95
                    ${isCollapsed ? "justify-center" : ""}
                    ${
                      isActiveLink(item.link)
                        ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] border border-[#D2145A]/20"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-[#D2145A] dark:hover:text-[#FF4081]"
                    }
                  `}
                >
                  <div
                    className={`flex items-center gap-3 ${isCollapsed ? "" : "w-full"}`}
                  >
                    {item.icon}
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-2 py-1 text-xs bg-[#D2145A]/10 text-[#D2145A] rounded-full font-medium">
                              {item.badge}
                            </span>
                          )}
                          {isActiveLink(item.link) && (
                            <FaCircle className="w-2 h-2 text-[#D2145A] animate-pulse" />
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Hover effect indicator */}
                  <div
                    className={`
                      absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 
                      bg-gradient-to-b from-[#D2145A] to-[#FF4081] rounded-r-full
                      transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:h-8
                    `}
                  />
                </Link>

                {/* Tooltip for collapsed state */}
                {isCollapsed && hoveredItem === i && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap z-50 shadow-lg">
                    {item.label}
                    {item.badge && (
                      <span className="ml-2 px-2 py-1 text-xs bg-[#D2145A] text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-100"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          className={`border-t border-gray-200/50 dark:border-gray-700/50 p-6 flex-shrink-0 ${isCollapsed ? "px-3" : ""}`}
        >
          <div className="space-y-4">
            {/* Quick Actions */}
            {!isCollapsed && (
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg active:scale-95 text-sm">
                  + New
                </button>
                <button className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-sm">
                  Reports
                </button>
              </div>
            )}

            {/* Bottom Navigation */}
            <div
              className={`flex ${isCollapsed ? "flex-col space-y-2" : "justify-between items-center"}`}
            >
              <div
                className={`flex ${isCollapsed ? "flex-col space-y-2" : "space-x-2"}`}
              >
                <ToggleMode />
                <button className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 relative">
                  <FaBell size={16} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D2145A] text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>
                <button className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-red-500 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300">
                  <FaSignOutAlt size={16} />
                </button>
              </div>

              {/* Status Indicators */}
              {!isCollapsed && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <FaCircle className="w-2 h-2 text-green-500 animate-pulse" />{" "}
                    {/* Replaced div with FaCircle */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Online
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCircle className="w-2 h-2 text-[#D2145A]" />{" "}
                    {/* Replaced div with FaCircle */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      v2.1
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] lg:hidden
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-200/50 dark:border-gray-700/50
          transform transition-transform duration-500 ease-in-out
          z-50 shadow-2xl
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="h-12 w-12 rounded-2xl overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Dashboard Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    priority
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2145A] to-[#FF4081] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  {greeting}, {userName}! 👋
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* Mobile User Profile Card */}
          <div className="mt-4 p-4 bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-2xl border border-[#D2145A]/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl flex items-center justify-center text-2xl">
                {userAvatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {userName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="px-6 py-6 space-y-2 overflow-y-auto h-[calc(100vh-300px)]">
          {dashboardNavLinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              onClick={() => setIsMobileOpen(false)}
              className={`
                group flex items-center w-full p-4 rounded-2xl font-semibold relative
                transition-all duration-300 hover:scale-[0.98] active:scale-95
                ${
                  isActiveLink(item.link)
                    ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] border border-[#D2145A]/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-[#D2145A] dark:hover:text-[#FF4081]"
                }
              `}
            >
              <div className="flex items-center gap-3 w-full">
                {item.icon}
                <span className="flex-1">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2 py-1 text-xs bg-[#D2145A]/10 text-[#D2145A] rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                  {isActiveLink(item.link) && (
                    <FaCircle className="w-2 h-2 text-[#D2145A] animate-pulse" />
                  )}
                </div>
              </div>

              <div
                className={`
                  absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-0 
                  bg-gradient-to-b from-[#D2145A] to-[#FF4081] rounded-r-full
                  transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:h-8
                `}
              />
            </Link>
          ))}
        </div>

        {/* Mobile Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg active:scale-95 text-sm">
                + New Product
              </button>
              <button className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-sm">
                View Reports
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ToggleMode />
                <button className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300 relative">
                  <FaBell size={16} />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D2145A] text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FaCircle className="w-2 h-2 text-green-500 animate-pulse" />{" "}
                  {/* Replaced div with FaCircle */}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCircle className="w-2 h-2 text-[#D2145A]" />{" "}
                  {/* Replaced div with FaCircle */}
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    v2.1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
