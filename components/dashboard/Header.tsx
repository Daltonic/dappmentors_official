import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const Header: React.FC<HeaderProps> = ({
  userName,
  userAvatar = "👨‍💻",
  notificationCount = 3,
}) => {
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentHour = new Date().getHours(); // 10:38 PM WAT on Aug 19, 2025
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  return (
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
                {["Overview", "Products", "Blogs", "Users", "Settings"].map(
                  (item, i) => (
                    <button
                      key={i}
                      className={`
                                            relative px-3 py-2 font-semibold text-sm transition-all duration-300 rounded-xl
                                            ${
                                              i === 0
                                                ? "text-[#D2145A] bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10"
                                                : "text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                                            }
                                        `}
                    >
                      {item}
                      {i === 0 && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D2145A] rounded-full animate-pulse" />
                      )}
                    </button>
                  ),
                )}
              </div>
            </div>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search - Desktop Only */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 transition-all backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                🔍
              </div>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-300"
              >
                🔔
                {notificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D2145A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {[
                        {
                          title: "New student enrollment",
                          time: "5 min ago",
                          type: "success",
                        },
                        {
                          title: "Course review submitted",
                          time: "1 hour ago",
                          type: "info",
                        },
                        {
                          title: "Payment received",
                          time: "2 hours ago",
                          type: "success",
                        },
                      ].map((notification, index) => (
                        <div
                          key={index}
                          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "info"
                                  ? "bg-blue-500"
                                  : notification.type === "success"
                                    ? "bg-green-500"
                                    : "bg-yellow-500"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
  );
};

export default Header;
