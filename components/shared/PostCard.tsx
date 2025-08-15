"use client";

import Image from "next/image";
import { PostProp } from "@/utils/interfaces";

const PostCard = ({ post }: { post: PostProp }) => (
  <div className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent w-full max-w-[380px]">
    <div
      className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
    ></div>

    <div className="relative z-10">
      {/* Thumbnail Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={post.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* Floating Icon */}
        <div
          className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${post.gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        >
          {post.icon}
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {post.category}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">📅</span>
            <span className="text-gray-600 dark:text-gray-300">
              {post.publishDate}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">⏱️</span>
            <span className="text-gray-600 dark:text-gray-300">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Topics */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {topic}
            </span>
          ))}
          {post.topics.length > 3 && (
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium">
              +{post.topics.length - 3} more
            </span>
          )}
        </div>

        {/* CTA & Related Product */}
        <div className="flex items-center justify-between mb-6">
          <button className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-sm transition-colors duration-300">
            Read More →
          </button>
        </div>

        <div className="bg-gradient-to-r from-[#D2145A]/5 to-[#FF4081]/5 rounded-xl p-4 border border-[#D2145A]/20">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Related:</strong> {post.relatedProduct}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default PostCard;
