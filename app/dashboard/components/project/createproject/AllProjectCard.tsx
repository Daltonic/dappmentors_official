"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { HiLocationMarker } from "react-icons/hi";
import { MoreVertical } from "lucide-react";
import { Project } from "@/utils/interfaces";

const ProjectCard = ({ project }: { project: Project }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Safely access properties with fallback values
  const title = project.title || "Untitled Project";
  const location = project.location || "Unknown Location";
  const description = project.description || "No description available";
  const raised = typeof project.raised === "number" ? project.raised : 0;
  const targetAmount =
    typeof project.targetAmount === "number" ? project.targetAmount : 0;
  const completed = project.completed || false;

  // Safely format the date
  const dateObj = project.date ? new Date(project.date) : null;
  const formattedDate =
    dateObj && !isNaN(dateObj.getTime())
      ? format(dateObj, "MMM d, yyyy")
      : "No date available";

  const progress = targetAmount > 0 ? (raised / targetAmount) * 100 : 0;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/projects?slug=${project.slug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Project deleted");
          window.location.reload();
        } else {
          const result = await response.json();
          console.error(result.details);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <div className="relative bg-[#1A1A1A] rounded-xl shadow-md hover:scale-105 transition-transform">
      <div className="w-full h-48 relative">
        {project.image ? (
          <Image
            src={project.image}
            alt={title}
            fill
            className="rounded-t-xl object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-t-xl">
            <p className="text-gray-600">No image available</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-[20px] font-semibold text-white">{title}</h2>
        <p className="text-xs font-light text-gray-300 flex items-center gap-1">
          <HiLocationMarker className="text-gray-300" size={12} />
          {location}
        </p>
        <p className="text-xs text-gray-300 font-light">📅 {formattedDate}</p>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="text-xs text-gray-300">
          Raised: ${raised.toLocaleString()} of ${targetAmount.toLocaleString()}{" "}
          ({progress.toFixed(1)}%)
        </p>
        <p className="text-xs text-gray-300">
          Status: {completed ? "Completed" : "In Progress"}
        </p>
      </div>

      <button
        onClick={toggleMenu}
        className="absolute top-3 right-3 bg-black p-1 rounded-full"
      >
        <MoreVertical size={20} className="text-white" />
      </button>

      {menuOpen && (
        <div className="absolute top-10 right-4 bg-white dark:bg-gray-800 shadow-md rounded p-2">
          <Link href={`/dashboard/update?slug=${project.slug}`}>
            <button className="text-sm text-gray-700 dark:text-gray-300 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              Update Project
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
