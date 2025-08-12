import { project } from "@/data/global";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto p-4  md:p-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-[12px] tracking-[2px] font-semibold text-[#D2145A]">
          OUR PROJECTS
        </h3>
        <h2 className="text-2xl font-bold dark:text-white">
          Our charity helps those people who have no hope
        </h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-6 mt-4 mb-6 flex-wrap">
        {["All", "Upcoming", "Ongoing", "Completed"].map((tab, idx) => (
          <button
            key={idx}
            className="text-sm font-semibold text-[#D2145A] hover:underline dark:text-[#D2145A]"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {project.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  {project.description}
                </p>
                <p className="text-sm font-semibold mt-4 dark:text-white">
                  {project.completed ? (
                    <span>Completed: ${project.raised}</span>
                  ) : (
                    <>
                      Raised: ${project.raised} / Goal: ${project.goal}
                    </>
                  )}
                </p>
                {/* Progress bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className="bg-[#D2145A] h-2 rounded-full"
                    style={{
                      width: `${(project.raised / project.goal) * 100}%`,
                    }}
                  ></div>
                </div>
                <button className="w-full bg-[#D2145A] hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] text-white py-2 rounded-lg font-semibold mt-4 transition-colors duration-500 dark:hover:bg-gray-200 dark:hover:text-[#D2145A]">
                  Donate
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
        <button className="p-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
          <FaChevronLeft />
        </button>

        {[1, 2, 3, 4, 5, 6].map((num) => (
          <span
            key={num}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#D2145A] text-white rounded-full hover:bg-white hover:text-[#D2145A] cursor-pointer transition-colors duration-300 font-bold"
          >
            {num}
          </span>
        ))}

        <button className="p-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
