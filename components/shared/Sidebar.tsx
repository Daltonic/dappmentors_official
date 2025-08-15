"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";
import { navlinks } from "@/data/global";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface SidebarProps {
  sidebarOpened: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpened, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);
  const prevPath = useRef(pathname);

  // Close sidebar when the route changes (but skip on first render)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prevPath.current = pathname;
      return;
    }
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      if (sidebarOpened && onClose) {
        onClose();
      }
    }
  }, [pathname, sidebarOpened, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpened]);

  const handleLogin = () => {
    router.push("/auth/login");
    if (onClose) onClose();
  };

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-80 max-w-[85vw] lg:hidden
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl
        border-r border-gray-200/50 dark:border-gray-700/50
        transform transition-transform duration-500 ease-in-out
        z-50 shadow-2xl
        ${sidebarOpened ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-white group-hover:text-[#D2145A] transition-colors duration-300">
              DAPP MENTORS
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Blockchain Academy
            </p>
          </div>
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
        </div>
      </div>

      {/* Navigation Links */}
      <div className="px-6 py-8 space-y-3 overflow-y-auto h-[calc(100vh-350px)]">
        {navlinks.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            onClick={handleLinkClick}
            className={`
              group flex items-center w-full p-4 rounded-2xl font-semibold relative
              transition-all duration-300 hover:scale-[0.98] active:scale-95
              ${
                pathname === item.link
                  ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] border border-[#D2145A]/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/80 hover:text-[#D2145A] dark:hover:text-[#FF4081]"
              }
            `}
          >
            <div className="flex items-center justify-between w-full">
              <span>{item.label}</span>
              {pathname === item.link && (
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
            ></div>
          </Link>
        ))}
      </div>

      {/* Enhanced CTA Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="space-y-4">
          {/* Login Button */}
          <Button
            label="Login"
            onClick={handleLogin}
            className="
              w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] 
              text-white font-semibold py-4 px-6 rounded-2xl
              hover:scale-105 transition-all duration-300
              hover:shadow-lg active:scale-95
            "
          />

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-4 pt-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 cursor-pointer">
                <span className="text-sm">📺</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 cursor-pointer">
                <span className="text-sm">💼</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 cursor-pointer">
                <span className="text-sm">🐦</span>
              </div>
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#D2145A] hover:text-white transition-all duration-300 cursor-pointer">
                <span className="text-sm">💬</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Join 5,450+ Web3 developers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
