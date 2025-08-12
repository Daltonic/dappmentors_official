"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-full bg-gray-200  rounded-full">
      {/* Dropdown Menu - With transitions */}
      <div
        className={`absolute bottom-full w-full mb-2 bg-white  rounded-2xl shadow-md shadow-gray-300 
                transform transition-all duration-300 ease-in-out origin-bottom
                ${
                  isOpen
                    ? "opacity-100 scale-y-100 translate-y-0"
                    : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
                }`}
      >
        <ul className="py-2">
          <Link
            href="/dashboard/account"
            className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-semibold rounded-full transition-colors duration-200"
          >
            My Account
          </Link>
          <li className="px-4 py-2 text-[#D2145A] hover:bg-gray-100 cursor-pointer rounded-full font-semibold transition-colors duration-200">
            Logout
          </li>
        </ul>
      </div>

      {/* Dropdown Toggle - With transitions */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-2 rounded-full shadow-sm bg-gray-100 dark:bg-[#1E1E1E] hover:bg-gray-100 dark:text-white transition-colors duration-200"
      >
        <div className="flex items-center gap-2">
          <Image
            src="/images/dashboard/Ellipse 5.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="font-medium">Mark Williams</span>
        </div>

        <div className="transform transition-transform duration-300">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-white" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-white" />
          )}
        </div>
      </button>
    </div>
  );
};

export default UserDropdown;
