"use client";

import React, { useState } from "react";
import Button from "../shared/Button";
import { FiFolderPlus } from "react-icons/fi";
import AllVolunteers from "./AllVolunteers";

export default function Volunteers() {
  const [showAllVolunteers, setShowAllVolunteers] = useState(false);

  const handleSeeMore = () => setShowAllVolunteers(true);

  if (showAllVolunteers) {
    return <AllVolunteers />;
  }

  return (
    <div className="p-6 h-screen">
      <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md border border-dashed border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold text-black dark:text-white mb-4">
            Volunteers
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

        <div className="flex flex-col items-center justify-center py-16">
          <FiFolderPlus className="text-gray-500 dark:text-gray-400 text-5xl mb-3" />
          <p className="text-gray-700 dark:text-gray-300 text-center">
            You {"don't"} have any Volunteers yet
          </p>
        </div>
      </div>
    </div>
  );
}
