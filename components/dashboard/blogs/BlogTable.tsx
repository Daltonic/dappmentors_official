import React from "react";
import Image from "next/image";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import {
  FiChevronLeft as FiChevronLeft,
  FiChevronRight as FiChevronRight,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { BlogPost } from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import Link from "next/link";

// SortIcon Component (unchanged)
const SortIcon: React.FC<{
  column: keyof BlogPost;
  sortConfig: { key: keyof BlogPost; direction: "asc" | "desc" } | null;
}> = ({ column, sortConfig }) => {
  if (!sortConfig || sortConfig.key !== column) {
    return <FaSort className="w-4 h-4 opacity-30" />;
  }

  return sortConfig.direction === "asc" ? (
    <FaSortUp className="w-4 h-4 text-[#D2145A]" />
  ) : (
    <FaSortDown className="w-4 h-4 text-[#D2145A]" />
  );
};

// BlogTable Component (updated props and footer)
const BlogTable: React.FC<{
  posts: BlogPost[];
  totalPosts: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
  selectedPosts: Set<string>;
  onToggle: (id: string) => void;
  toggleAll: () => void;
  sortConfig: { key: keyof BlogPost; direction: "asc" | "desc" } | null;
  onSort: (key: keyof BlogPost) => void;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: BlogPost["status"]) => string;
  handleDelete: (id: string) => void;
}> = ({
  posts,
  totalPosts,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  selectedPosts,
  onToggle,
  toggleAll,
  sortConfig,
  onSort,
  getCategoryColor,
  getStatusColor,
  handleDelete,
}) => {
  const router = useRouter();

  // Compute pagination
  const totalPages = Math.ceil(totalPosts / itemsPerPage);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-4 w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedPosts.size === posts.length && posts.length > 0
                  }
                  onChange={toggleAll}
                  className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                />
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[300px]"
                onClick={() => onSort("title")}
              >
                <div className="flex items-center gap-2">
                  Post
                  <SortIcon column="title" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => onSort("category")}
              >
                <div className="flex items-center gap-2">
                  Category
                  <SortIcon column="category" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon column="status" sortConfig={sortConfig} />
                </div>
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[100px]">
                Read Time
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => onSort("publishDate")}
              >
                <div className="flex items-center gap-2">
                  Published
                  <SortIcon column="publishDate" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("views")}
              >
                <div className="flex items-center gap-2">
                  Views
                  <SortIcon column="views" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("comments")}
              >
                <div className="flex items-center gap-2">
                  Comments
                  <SortIcon column="comments" sortConfig={sortConfig} />
                </div>
              </th>
              <th className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">
                Updated
              </th>
              <th className="text-right px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <motion.tr
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 group"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.has(post.id)}
                    onChange={() => onToggle(post.id)}
                    className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={48}
                      height={32}
                      className="w-12 h-8 object-cover rounded-lg flex-shrink-0"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                        {post.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-1">
                        {post.author.name} • {post.category}
                      </p>
                      {post.featured && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}
                  >
                    {post.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                        post.status === "published"
                          ? "bg-green-400"
                          : post.status === "draft"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                      }`}
                    />
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {post.readTime}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {new Date(
                    post.publishDate || Date.now(),
                  ).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {post.views.toLocaleString()}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {post.comments}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(
                      post.updatedAt || Date.now(),
                    ).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      className="p-2 text-[#D2145A] hover:bg-[#FF4081]/10 dark:text-[#FF4081] dark:hover:bg-[#FF4081]/20 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Edit post"
                      onClick={() => router.push(`/dashboard/blogs/${post.id}`)}
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <Link
                      className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="View details"
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                    >
                      <FaEye className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Delete post"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer (updated to client-side pagination) */}
      <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
          <span>
            Showing {posts.length} of {totalPosts} posts
            {selectedPosts.size > 0 && ` (${selectedPosts.size} selected)`}
          </span>
          <div className="flex items-center gap-4">
            <span>Rows per page: {itemsPerPage}</span>
            <div className="flex gap-2">
              <button
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                disabled={!hasPrevPage}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <FiChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                disabled={!hasNextPage}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <FiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogTable;
