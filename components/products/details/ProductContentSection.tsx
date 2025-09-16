"use client";

import { ModuleWithLessons } from "@/utils/interfaces";
import { useState } from "react";

// Course Content/Modules Section
interface ProductContentProps {
  modules?: ModuleWithLessons[];
  includes: string[];
}

const ProductContentSection: React.FC<ProductContentProps> = ({
  modules,
  includes,
}) => {
  const [activeModule, setActiveModule] = useState<number>(0);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Course Content
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Structured learning path with hands-on projects and real-world
            applications
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Modules */}
          {modules && modules.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                Course Modules
              </h3>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      activeModule === index
                        ? "bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 border-2 border-[#D2145A]/30"
                        : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
                    }`}
                    onClick={() => setActiveModule(index)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {module.title}
                      </h4>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {module.duration}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {module.description}
                    </p>
                    <div className="text-sm text-[#D2145A] font-medium">
                      {module.lessons.length} lessons
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's Included */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              What&apos;s Included
            </h3>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
              <div className="space-y-4">
                {includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-white text-sm font-bold mt-0.5">
                      ✓
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductContentSection;
