"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ToggleMode from "@/components/shared/ToggleMode";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { IoSearch, IoMenu } from "react-icons/io5";
import UserProfile from "./UserProfile";
import Button from "../shared/Button";
import Image from "next/image";
import Notification from "../shared/Notification";
import { buttonLinks, menuLinks } from "@/data/global";

// Define the SearchResult type
interface SearchResult {
  type: string;
  data: {
    slug?: string;
    title?: string;
    name?: string;
    _id?: string;
  };
}

// Pages that should always show "New Project"
const defaultButtonPages = [
  "/dashboard",
  "/dashboard/volunteers",
  "/dashboard/donations",
];

export default function Navbar({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  const pathname = usePathname() ?? "";
  const activePage = menuLinks.find((link) => link.href === pathname)?.name;

  const buttonLabel = defaultButtonPages.includes(pathname)
    ? "New Project"
    : `New ${
        Object.keys(buttonLinks)
          .find((key) => pathname.includes(key))
          ?.split("/")
          .pop()
          ?.toLowerCase() || ""
      }`;

  const buttonLink = buttonLinks[pathname] || "/dashboard/createProject";

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]); // Replace any[] with SearchResult[]

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300); // 300ms delay to debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  // Fetch search results from the API
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        throw new Error("Search failed");
      }
      const data = await response.json();
      setSearchResults(data.results || []); // Assume data.results is SearchResult[]
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  // Helper function to determine the link for each result type
  const getLink = (result: SearchResult) => {
    switch (result.type) {
      case "blog":
      case "event":
      case "project":
      case "testimonial":
        return `/${result.type}s/${result.data.slug || ""}`;
      case "user":
      case "donation":
        return `/${result.type}s/${result.data._id || ""}`;
      default:
        return "#";
    }
  };

  // Helper function to determine the display name for each result type
  const getDisplayName = (result: SearchResult) => {
    return result.data.title || result.data.name || "Untitled";
  };

  return (
    <div className="shadow-md gap-3 sticky top-0 z-40 bg-white dark:bg-black">
      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row w-full py-4 px-4">
        {/* Top Section: Logo, ToggleMode, Notification & Sidebar Menu */}
        <div className="flex justify-between lg:justify-end items-center w-full lg:w-auto lg:gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 md:h-12 md:w-12 rounded-full overflow-hidden relative">
              <Image
                src="/images/home/Dapp Mentors 1.png"
                alt="DAPP MENTORS Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="text-black dark:text-white">
              <h1 className="text-[15px] font-bold md:text-lg lg:tracking-[2px] leading-tight">
                DAPP MENTORS
              </h1>
              <span className="text-[10px] font-light text-gray-800 dark:text-gray-400 tracking-[5px]">
                FOUNDATION
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 lg:hidden">
            <ToggleMode />
            <Notification />
            <div className="hidden lg:block">
              <UserProfile />
            </div>
            <button
              onClick={toggleSidebar}
              className="block lg:hidden text-gray-600 dark:text-gray-300"
            >
              <IoMenu size={24} />
            </button>
          </div>
        </div>

        {/* Search, Button, and Active Page Name Section */}
        <div className="flex flex-col md:flex-row lg:flex-1 gap-3 items-center">
          {/* Active Page Name (Hidden on small screens) */}
          {activePage && (
            <h2 className="hidden lg:block text-xl font-semibold text-gray-800 dark:text-white">
              {activePage}
            </h2>
          )}

          {/* Search Bar with Dropdown */}
          <div className="relative w-full sm:flex-1">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pl-12 border border-gray-300 bg-[#F4F4F5] dark:bg-[#1A1A1A] dark:border-gray-600 rounded-lg dark:text-white focus:outline-none"
            />
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="p-2 border-b last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Link href={getLink(result)} className="text-blue-500">
                      {getDisplayName(result)}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* New Button */}
          <Link href={buttonLink}>
            <Button
              label={buttonLabel}
              icon={<FiPlusCircle size={20} />}
              className="bg-[#D2145A] text-white px-4 py-2 flex items-center justify-center gap-2 w-full md:w-auto rounded-lg dark:hover:bg-white dark:hover:text-[#D2145A] hover:border-[#D2145A] transition-colors duration-500"
            />
          </Link>

          <div className="lg:flex items-center gap-3 hidden">
            <ToggleMode />
            <Notification />
            <div className="hidden lg:block">
              <UserProfile />
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-600 dark:text-gray-300"
            >
              <IoMenu size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
