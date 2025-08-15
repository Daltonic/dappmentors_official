"use client";

import { useState } from "react";
import { postx } from "@/data/global";
import { PostProp } from "@/utils/interfaces";
import PostCard from "./PostCard";

const AllPostsSection = () => {
  const [visiblePosts, setVisiblePosts] = useState(3); // Start with 3 posts
  const postsPerLoad = 3; // Load 3 more posts each time
  const allPosts: PostProp[] = postx;

  const totalPosts = allPosts.length;
  const hasMorePosts = visiblePosts < totalPosts;

  const handleLoadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + postsPerLoad, totalPosts));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-[#1A1A1A] dark:to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#D2145A] to-[#FFBAD4]"></div>
            <span className="text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
              All Posts
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-[#FFBAD4] to-[#D2145A]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
            All Blog Posts
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Explore our complete collection of Web3 tutorials, guides, and
            insights covering everything from smart contracts to DeFi.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.slice(0, visiblePosts).map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>

        {/* Call to Action */}
        {hasMorePosts && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-500 hover:scale-105 hover:shadow-xl overflow-hidden"
              aria-label="Load more posts"
            >
              <span className="relative z-10 flex items-center gap-2">
                Load More Posts
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPostsSection;
