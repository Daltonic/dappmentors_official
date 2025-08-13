import { recent } from "@/data/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostProp {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  slug: string;
}

const RecentBlogPage = () => {
  return (
    <section className="w-full bg-white dark:bg-[#1A1A1A] py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 dark:animate-pulse">
            <p className="text-[#D2145A] font-inter font-semibold text-xs sm:text-sm md:text-base uppercase">
              Recent Blog Post
            </p>

            <div className="w-8 sm:w-12 md:w-16 border border-[#FFBAD4]"></div>
          </div>

          <h2 className="font-cambo font-normal text-3xl md:text-5xl tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
            Stories, Insights, and Updates About Our Mission
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {recent.map((post: PostProp) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 font-medium text-sm sm:text-base">
            View All Blog Posts
          </button>
        </div>
      </div>
    </section>
  );
};

// Blog Card Component
const BlogCard = ({ post }: { post: PostProp }) => (
  <Link
    href={`/projects/${post.slug}`}
    className="block w-full max-w-[280px] sm:max-w-[320px]"
  >
    <div className="w-full bg-white dark:bg-[#2A2A2A] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col group cursor-pointer">
      {/* Image Section */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
          className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-[#D2145A] text-white px-2 py-1 rounded-md text-xs font-medium">
          {post.date}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-3 group-hover:text-[#D2145A] dark:group-hover:text-[#D2145A] transition-colors duration-300 leading-tight">
            {post.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-[#D2145A] rounded-full"></div>
              <span className="text-xs text-[#D2145A] font-medium">
                Read Article
              </span>
            </div>

            <svg
              className="w-4 h-4 text-[#D2145A] group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default RecentBlogPage;
