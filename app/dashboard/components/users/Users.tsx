"use client";

import React, { useState } from "react";
import Button from "../shared/Button";
import { FiFolderPlus } from "react-icons/fi";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import UsersTopCards from "./createnewusers/allusers/UsersTopCard";

export default function Users() {
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleSeeMore = () => setShowAllUsers(true);

  if (showAllUsers) {
  }

  return (
    <div className="p-6">
      <UsersTopCards />
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md border border-dashed border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-black dark:text-white mb-4">
            All Users
          </h1>

          {/* 🔹 See More Button */}
          <div className="mt-4 flex justify-center">
            <Button
              label="See More"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleSeeMore}
            />
          </div>
        </div>

        {/* Empty State */}

        <div className="flex flex-col items-center justify-center py-24">
          <FiFolderPlus className="text-gray-500 dark:text-gray-400 text-5xl mb-3" />
          <p className="text-gray-700 dark:text-gray-300 text-center">
            You {"don't"} have any Volunteers yet
          </p>

          {/* Create New Volunteers Button */}
          <Link href="/dashboard/createNewUsers">
            <Button
              icon={<FaPlus size={14} />}
              label="Add New Users"
              className="mt-6 bg-[#D2145A] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto dark:bg-white dark:text-[#D2145A] dark:hover:bg-[#D2145A] dark:hover:text-white transition-colors duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
