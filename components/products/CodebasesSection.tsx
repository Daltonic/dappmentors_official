"use client";

import { Product } from "@/utils/interfaces";
import Link from "next/link";

interface CodebasesSectionProps {
  products: Product[];
}

const CodebasesSection = ({ products }: CodebasesSectionProps) => {
  const codebases = products;

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Production-Ready Codebases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Jump-start your Web3 projects with our professionally developed,
            fully functional codebases designed for seamless integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {codebases.map((codebase) => (
            <div
              key={codebase.id}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {"💻"}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${codebase.price}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {"100+"} downloads
                    </div>
                  </div>
                </div>

                <Link
                  href={`/products/${codebase.slug}`}
                  title={codebase.title}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2 mb-4">
                    {codebase.title}
                  </h3>
                </Link>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {codebase.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(codebase.technologies || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 text-[#D2145A] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="space-y-3 mb-8">
                  {(codebase.features || []).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Download Codebase
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodebasesSection;
