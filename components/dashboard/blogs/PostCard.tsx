import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaEye, FaTrash } from "react-icons/fa";
import { BlogPost } from "@/utils/interfaces";

// PostCard Component
const PostCard: React.FC<{
  post: BlogPost;
  selected: boolean;
  onToggle: () => void;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: BlogPost["status"]) => string;
}> = ({ post, selected, onToggle, getCategoryColor, getStatusColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Thumbnail */}
    <div className="relative h-48 overflow-hidden">
      <Image
        src={post.imageSrc}
        alt={post.alt}
        width={400}
        height={192}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        style={{ objectFit: "cover" }}
        priority
      />

      <div className="absolute top-4 left-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onToggle}
          className="w-4 h-4 text-[#D2145A] bg-white/90 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
        />
      </div>
      <div className="absolute top-4 right-4 flex gap-2">
        {post.featured && (
          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(post.status)}`}
        >
          {post.status}
        </span>
      </div>
    </div>

    <div className="p-6 relative z-10">
      {/* Category and Views */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(post.category)}`}
        >
          {post.category}
        </span>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {post.views.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">views</div>
        </div>
      </div>

      {/* Title and Excerpt */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
        {post.excerpt}
      </p>

      {/* Meta Information */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Read Time:</span>
          <span className="text-gray-700 dark:text-gray-300">
            {post.readTime}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">
            Publish Date:
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            {post.publishDate}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Author:</span>
          <span className="text-gray-700 dark:text-gray-300">
            {post.author}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 dark:text-gray-400">Comments:</span>
          <span className="text-gray-700 dark:text-gray-300">
            {post.comments}
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {post.topics.map((topic) => (
            <span
              key={topic}
              className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-2 px-4 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300">
          Edit
        </button>
        <button className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors">
          <FaEye className="w-5 h-5" />
        </button>
        <button className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-xl transition-colors">
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default PostCard;
