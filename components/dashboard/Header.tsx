import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import ToggleMode from "../shared/ToggleMode";

interface HeaderProps {
  userName: string;
  userAvatar?: string;
  notificationCount?: number;
}

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  isOpen,
  onClose,
  userName,
  userAvatar = "👨‍💻",
}) => {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  const dashboardNavLinks = [
    { label: "Overview", link: "/dashboard", icon: "📊" },
    { label: "Products", link: "/dashboard/products", icon: "📦" },
    { label: "Blogs", link: "/dashboard/blogs", icon: "📝" },
    { label: "Users", link: "/dashboard/users", icon: "👥" },
    { label: "Analytics", link: "/dashboard/analytics", icon: "📈" },
    { label: "Settings", link: "/dashboard/settings", icon: "⚙️" },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 max-w-[85vw] lg:hidden
          bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
          border-r border-gray-200/50 dark:border-gray-700/50
          transform transition-transform duration-500 ease-in-out
          z-50 shadow-2xl
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
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
                {/* Animated ring around logo */}
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

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300"
            >
              <IoClose size={24} />
            </button>
          </div>

          {/* User Profile Card */}
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

        {/* Navigation Links */}
        <div className="px-6 py-6 space-y-2 overflow-y-auto h-[calc(100vh-300px)]">
          {dashboardNavLinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              onClick={handleLinkClick}
              className={`
                group flex items-center w-full p-4 rounded-2xl font-semibold relative
                transition-all duration-300 hover:scale-[0.98] active:scale-95
                ${
                  i === 0
                    ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] border border-[#D2145A]/20"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-[#D2145A] dark:hover:text-[#FF4081]"
                }
              `}
            >
              <div className="flex items-center gap-3 w-full">
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {i === 0 && (
                  <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse"></div>
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
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-4">
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg active:scale-95 text-sm">
                + New Product
              </button>
              <button className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 text-sm">
                View Reports
              </button>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center space-x-4 pt-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Online
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#D2145A] rounded-full"></div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Dashboard v2.1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Header: React.FC<HeaderProps> = ({ userName, userAvatar = "👨‍💻" }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  return (
    <>
      <header
        className={`
          fixed top-0 w-full z-50 transition-all duration-500 ease-in-out
          ${
            isScrolled
              ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-700/20 shadow-lg"
              : "bg-white/90 dark:bg-black/90 backdrop-blur-sm border-b border-gray-100/50 dark:border-gray-800/50"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section - Dashboard Version */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
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
                  {/* Animated ring around logo */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2145A] to-[#FF4081] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-[#D2145A] transition-colors duration-300">
                    Dashboard
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {greeting}, {userName}! 👋
                  </p>
                </div>
              </Link>
            </div>

            {/* Center Navigation - Desktop */}
            <nav className="hidden lg:block">
              <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-2 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-center space-x-6">
                  {[
                    { label: "Overview", link: "/dashboard" },
                    { label: "Products", link: "/dashboard/products" },
                    { label: "Blogs", link: "/dashboard/blogs" },
                    { label: "Users", link: "/dashboard/users" },
                    { label: "Settings", link: "/dashboard/settings" },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      className={`
                        relative px-3 py-2 font-semibold text-sm transition-all duration-300 rounded-xl
                        ${
                          i === 0
                            ? "text-[#D2145A] bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10"
                            : "text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                        }
                      `}
                    >
                      {item.label}
                      {i === 0 && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D2145A] rounded-full animate-pulse" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ToggleMode />

              {/* User Avatar */}
              <div className="w-10 h-10 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl flex items-center justify-center text-2xl cursor-pointer hover:scale-105 transition-transform duration-300">
                {userAvatar}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                className={`
                  lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-300
                  ${isSideBarOpen ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A]" : ""}
                `}
              >
                {isSideBarOpen ? (
                  <IoClose size={24} />
                ) : (
                  <GiHamburgerMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Mobile Sidebar */}
      <DashboardSidebar
        isOpen={isSideBarOpen}
        onClose={() => setIsSideBarOpen(false)}
        userName={userName}
        userAvatar={userAvatar}
      />
    </>
  );
};

export default Header;
