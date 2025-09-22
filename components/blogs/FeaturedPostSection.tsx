"use client";

import { useState } from "react";
import PostCard from "../shared/PostCard";
import { BlogPost } from "@/utils/interfaces";

interface FeaturedPostsSectionProps {
  blogs: BlogPost[];
}

// Featured Posts Section
const FeaturedPostsSection = ({ blogs }: FeaturedPostsSectionProps) => {
  const [visibleArticles, setVisibleArticles] = useState(3);
  const articlesPerLoad = 3;
  const totalArticles = blogs.length;
  const hasMoreArticles = visibleArticles < totalArticles;

  const handleLoadMore = () => {
    setVisibleArticles((prev) =>
      Math.min(prev + articlesPerLoad, totalArticles),
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              Featured Posts
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            Latest Web3 Tutorials & Guides
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Practical, hands-on content designed to guide you through every step
            of your Web3 development journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {blogs.slice(0, visibleArticles).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>

        {/* Call to Action */}
        {hasMoreArticles && (
          <div className="text-center mt-16">
            <button
              onClick={handleLoadMore}
              className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-10 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
              aria-label="Load more articles"
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

export default FeaturedPostsSection;
