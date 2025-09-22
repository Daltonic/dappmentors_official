"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/utils/interfaces";
import { generateGradientFromString } from "@/heplers/global";
import Avatar from "./Avatar";

interface PostCardProps {
  post: BlogPost;
}

const PostCard = ({ post }: PostCardProps) => {
  // Generate gradient based on category for visual consistency
  const gradient = generateGradientFromString(post.title);

  // Format publish date
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="group relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-200/30 dark:border-gray-700/30 hover:border-transparent max-w-[380px] mx-auto cursor-pointer"
      role="article"
      aria-labelledby={`post-title-${post.id}`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
      ></div>

      <div className="relative z-10">
        {/* Thumbnail Image */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <Image
            src={post.image || "/images/default-blog.jpg"} // Fallback image
            alt={post.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="rounded-t-3xl group-hover:scale-105 transition-transform duration-500"
            priority={post.featured} // Prioritize featured images
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

          {/* Floating Icon */}
          <div
            className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
          >
            {post.category.charAt(0).toUpperCase()}
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <Link href={`/blogs/${post.slug}`} title={post.title}>
            <h3
              id={`post-title-${post.id}`}
              className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-[#D2145A] transition-colors duration-300 line-clamp-2"
            >
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm sm:text-base line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                📅
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                ⏱️
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {post.readTime}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500" aria-hidden="true">
                👀
              </span>
              <span className="text-gray-600 dark:text-gray-300">
                {post.views} views
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

          {/* Author Info */}
          <div className="flex justify-between items-center gap-3 mb-6">
            <Avatar
              src={post.author.avatar || "/images/default-avatar.jpg"}
              alt={post.author.name}
              className="flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {post.author.bio || "Web3 Enthusiast"}
              </p>
            </div>
          </div>

          {/* CTA & Related Product */}
          <div className="flex items-center justify-between">
            <Link
              href={`/blogs/${post.slug}`}
              className="text-[#D2145A] hover:text-[#FF4081] font-semibold text-sm transition-colors duration-300"
            >
              Read More →
            </Link>
            {post.relatedProduct && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Related: {post.relatedProduct}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
