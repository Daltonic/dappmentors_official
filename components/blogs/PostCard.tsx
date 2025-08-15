"use client";

import Image from "next/image";
import { PostProp } from "@/utils/interfaces";

const PostCard = ({ post }: { post: PostProp }) => (
  <article className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent cursor-pointer">
    <div className="mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 bg-gradient-to-r ${post.gradient} rounded-full flex items-center justify-center text-lg group-hover:scale-110 transition-all duration-300 shadow-sm`}
          >
            {post.icon}
          </div>
          <span
            className={`bg-gradient-to-r ${post.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}
          >
            {post.category}
          </span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {post.publishDate}
        </span>
      </div>

      {/* Header Image */}
      <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
        <Image
          src={post.imageSrc}
          alt={post.alt}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
          className="group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-[#D2145A] transition-colors duration-300">
        {post.title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.topics.slice(0, 2).map((topic, idx) => (
          <span
            key={idx}
            className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
          >
            {topic}
          </span>
        ))}
        {post.topics.length > 2 && (
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
            +{post.topics.length - 2}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          ⏱️ {post.readTime}
        </span>
        <span className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-xs transition-colors duration-300">
          Read →
        </span>
      </div>
    </div>
  </article>
);

export default PostCard;
