"use client";

import React, { useState } from "react";
import { FiFolderPlus, FiMoreVertical } from "react-icons/fi";
import Image from "next/image";

interface Project {
  id: number;
  title: string;
  image: string;
  raised: number;
  goal: number;
}

const initialProjects: Project[] = [
  {
    id: 1,
    title: "Hackathon Competitions",
    image: "/images/home/Content.png",
    raised: 25000,
    goal: 50000,
  },
  {
    id: 2,
    title: "Hackathon Competitions",
    image: "/images/home/Content.png",
    raised: 0,
    goal: 50000,
  },
  {
    id: 3,
    title: "Hackathon Competitions",
    image: "/images/home/Content.png",
    raised: 25000,
    goal: 50000,
  },
];

export default function RecentProjects() {
  const [showProjects, setShowProjects] = useState(false); // Start with "No projects yet"

  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
          Recent Projects{" "}
          <span className="bg-[#D2145A] text-white text-xs px-2 py-1 rounded-full">
            {showProjects ? initialProjects.length : 0}
          </span>
        </h1>
        <div className="flex gap-3">
          {/* 🔹 See More Button */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="text-sm px-3 py-1 border rounded-lg text-[#D2145A] border-[#D2145A] hover:bg-[#D2145A] hover:text-white transition"
          >
            {showProjects ? "Hide" : "See More"}
          </button>
        </div>
      </div>

      {/* 🔹 Conditional Rendering */}
      {!showProjects ? (
        // ❌ Show "No Projects Yet" Message First
        <div className="flex flex-col items-center justify-center py-24">
          <FiFolderPlus className="text-gray-400 dark:text-gray-500 text-5xl mb-3" />
          <p className="text-gray-600 dark:text-white text-center">
            You don&apos;t have any projects yet
          </p>
        </div>
      ) : (
        // ✅ Show Project Cards When "See More" is Clicked
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initialProjects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-100 dark:bg-[#1A1A1A] p-4 rounded-lg shadow-sm"
            >
              {/* 🔹 Project Image */}
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="rounded-lg w-full h-40 object-cover"
                />
                {/* Options Menu */}
                <div className="absolute top-2 right-2 bg-white dark:bg-black p-2 rounded-full shadow-md cursor-pointer">
                  <FiMoreVertical className="text-gray-600 dark:text-gray-400" />
                </div>
              </div>

              {/* 🔹 Project Title */}
              <h3 className="mt-3 text-lg font-semibold text-black dark:text-white">
                {project.title}
              </h3>

              {/* 🔹 Progress */}
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 mt-2">
                <span>Raised: ${project.raised.toLocaleString()}</span>
                <span>Goal: ${project.goal.toLocaleString()}</span>
              </div>

              {/* 🔹 Progress Bar */}
              <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 mt-2 relative">
                <div
                  className="bg-[#D2145A] h-2 rounded-full"
                  style={{ width: `${(project.raised / project.goal) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
