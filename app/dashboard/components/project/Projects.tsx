"use client";

import { FiFolderPlus } from "react-icons/fi";
import Button from "../shared/Button";
import Link from "next/link";
import { useState } from "react";
import AllProjectsPage from "./createproject/AllProjectsPage";
import TopStatsCards from "../shared/TopStatsCards";
import { ProjectProps } from "@/utils/interfaces";

export default function Projects() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projects = [];

  // Toggle view
  const handleSeeMore = () => setShowAllProjects(true);

  return (
    <div className="p-6 rounded-lg">
      {/* 🔹 Top Stats Cards */}
      <TopStatsCards />

      {/* 🔹 Projects Section */}
      {showAllProjects || projects.length > 0 ? (
        <AllProjectsPage />
      ) : (
        <EmptyProjects handleSeeMore={handleSeeMore} />
      )}
    </div>
  );
}

const EmptyProjects = ({ handleSeeMore }: ProjectProps) => {
  return (
    <div className="p-6 bg-white dark:bg-black rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-black dark:text-white mb-4">
          All Projects
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

      <div className="py-20">
        <div className="flex flex-col items-center justify-center py-16">
          <FiFolderPlus className="text-gray-500 dark:text-gray-400 text-5xl mb-3" />
          <p className="text-gray-700 dark:text-gray-300 text-center">
            You {"don't"} have any projects yet
          </p>

          {/* Create New Project Button */}
          <Link href="/dashboard/createProject">
            <Button
              label="Create New Project"
              className="mt-6 bg-[#D2145A] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto dark:bg-white dark:text-[#D2145A] dark:hover:bg-[#D2145A] dark:hover:text-white transition-colors duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
