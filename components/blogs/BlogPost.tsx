"use client";

import { posts } from "@/data/global";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const categories = ["All", "Education", "Tech Support", "Mentorship", "Faith"];



export default function BlogPost() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header */}
      <h2 className="text-[#D2145A] text-[12px] font-semibold tracking-[1px] text-center uppercase">Blog Posts</h2>
      <h1 className="text-2xl font-semibold text-center">
        Stories, Insights, And Updates About Our Mission
      </h1>

      {/* Categories */}
      <div className="flex flex-wrap justify-center mt-2 text-gray-500 dark:text-gray-400">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-3 py-2 sm:px-4 transition-colors ${
              selectedCategory === category
                ? "text-black dark:text-white font-bold"
                : "hover:text-black dark:hover:text-white"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-10">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={250}
                className="w-full h-52 sm:h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-[#D2145A] text-sm">{post.date}</p>
                <h3 className="text-lg sm:text-xl font-bold mt-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
                  {post.description}
                </p>
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
