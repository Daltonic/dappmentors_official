"use client";

import ProductCard from "../shared/ProductCard";
import { Product } from "@/utils/interfaces";
import { useState } from "react";

interface CoursesSectionProps {
  products: Product[];
}

const CoursesSection = ({ products }: CoursesSectionProps) => {
  const [visibleCourses, setVisibleCourses] = useState(3); // Start with 3 courses
  const coursesPerLoad = 3; // Number of courses to load each time
  const courses = products;
  const totalCourses = courses.length; // Total number of courses
  const displayedCourses = courses.slice(0, visibleCourses);
  const hasMoreCourses = visibleCourses < totalCourses; // Check if more courses can be loaded

  const handleLoadMore = () => {
    setVisibleCourses((prev) => Math.min(prev + coursesPerLoad, totalCourses));
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Premium Courses
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            In-Depth Video Courses
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Comprehensive, expert-led online courses covering Solidity, Rust,
            and modern tech stacks with hands-on projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {displayedCourses.map((course) => (
            <ProductCard product={course} key={course.id} />
          ))}
        </div>

        {hasMoreCourses && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
