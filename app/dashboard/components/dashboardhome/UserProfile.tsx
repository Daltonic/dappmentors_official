import { useAuth } from "@/hooks/useAuth";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-full space-x-2 cursor-pointer pl-1 pr-2 py-1"
      >
        {/* Profile Image */}
        <div className="relative h-6 w-6 rounded-full overflow-hidden">
          <Image
            src="/images/dashboard/Ellipse 5.png"
            alt="User Profile"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        {/* Dynamic Arrow Icon */}
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-4 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1
          transform origin-top scale-y-100 opacity-100 transition-all duration-200 ease-in-out"
          style={{
            animation: "dropdownFade 0.2s ease-in-out",
          }}
        >
          <button
            onClick={logout}
            className="block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100
            dark:hover:bg-gray-700 transition-colors duration-150"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
