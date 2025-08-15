"use client";

import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState, useEffect } from "react";
import ToggleMode from "./ToggleMode";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { navlinks } from "@/data/global";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Handle scroll effect for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    router.push("/auth/login");
  };

  const closeSidebar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      {/* Header */}
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
            {/* Logo with Enhanced Styling */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="h-12 w-12 rounded-2xl overflow-hidden relative group-hover:scale-110 transition-transform duration-500">
                  <Image
                    src="/assets/images/logo.png"
                    alt="Dapp Mentors Logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl"
                    priority
                  />
                </div>
                {/* Animated ring around logo */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D2145A] to-[#FF4081] opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-pulse"></div>
              </div>

              <div className="hidden sm:block">
                <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-[#D2145A] transition-colors duration-300">
                  DAPP MENTORS
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Blockchain Academy
                </p>
              </div>
            </Link>

            {/* Enhanced Navigation Menu */}
            <nav className="hidden lg:block">
              <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm px-8 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex justify-center space-x-8">
                  {navlinks.map((item, i) => (
                    <Link
                      key={i}
                      href={item.link}
                      className={`
                        relative px-3 py-2 font-semibold transition-all duration-300 rounded-xl
                        ${
                          pathname === item.link
                            ? "text-[#D2145A] bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10"
                            : "text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                        }
                      `}
                    >
                      {item.label}
                      {/* Active indicator */}
                      {pathname === item.link && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#D2145A] rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* Enhanced Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <ToggleMode />
              <Button
                label="Login"
                onClick={handleClick}
                className="
                  bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white 
                  hover:from-white hover:to-white hover:text-[#D2145A] 
                  border-2 border-transparent hover:border-[#D2145A]
                  px-6 py-3 rounded-xl font-semibold text-sm
                  transition-all duration-300 hover:scale-105 hover:shadow-lg
                  backdrop-blur-sm
                "
              />
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="flex lg:hidden items-center space-x-3">
              <ToggleMode />
              <button
                onClick={() => {
                  console.log(
                    "Hamburger clicked, current state:",
                    isSideBarOpen,
                  );
                  setIsSideBarOpen(!isSideBarOpen);
                }}
                className={`
                  relative p-2 rounded-xl font-bold text-2xl transition-all duration-300 z-50
                  ${
                    isSideBarOpen
                      ? "text-[#D2145A] bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#D2145A] dark:hover:text-[#FF4081] hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
                  }
                `}
              >
                <div
                  className={`transition-transform duration-300 ${isSideBarOpen ? "rotate-180" : "rotate-0"}`}
                >
                  {isSideBarOpen ? (
                    <IoClose className="transition-transform duration-300" />
                  ) : (
                    <GiHamburgerMenu className="transition-transform duration-300" />
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Sidebar */}
      {isSideBarOpen && (
        <>
          {/* Overlay for mobile sidebar */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
          <Sidebar sidebarOpened={isSideBarOpen} onClose={closeSidebar} />
        </>
      )}
    </>
  );
};

export default Header;
