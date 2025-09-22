"use client";

import ProductCard from "../shared/ProductCard";
import { Product } from "@/utils/interfaces";
import { useState } from "react";

interface BootcampsSectionProps {
  products: Product[];
}

const BootcampsSection = ({ products }: BootcampsSectionProps) => {
  const [visibleBootcamps, setVisibleBootcamps] = useState(3); // Start with 3 bootcamps
  const bootcampsPerLoad = 3; // Number of bootcamps to load each time
  const bootcamps = products;
  const totalBootcamps = bootcamps.length; // Total number of bootcamps
  const displayedBootcamps = bootcamps.slice(0, visibleBootcamps);
  const hasMoreBootcamps = visibleBootcamps < totalBootcamps; // Check if more bootcamps can be loaded

  const handleLoadMore = () => {
    setVisibleBootcamps((prev) =>
      Math.min(prev + bootcampsPerLoad, totalBootcamps),
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Intensive Web3 Bootcamps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Accelerate your Web3 expertise with our immersive bootcamps designed
            to transform you into a confident blockchain developer.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {displayedBootcamps.map((bootcamp) => (
            <ProductCard product={bootcamp} key={bootcamp.id} />
          ))}
        </div>

        {hasMoreBootcamps && (
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

export default BootcampsSection;
