"use client";

import { BlogPost } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTh,
  FaListUl,
  FaCog,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useApiState } from "@/services/api.services";
import {
  BulkBlogUpdateResponse,
  BulkBlogDeleteResponse,
  blogApiService,
} from "@/services/blogApiService";
import { toast } from "react-toastify";

// Props interface for the Blog Controls component
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: "all" | string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<"all" | string>>;
  statusFilter: "all" | BlogPost["status"];
  setStatusFilter: React.Dispatch<
    React.SetStateAction<"all" | BlogPost["status"]>
  >;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedPosts: Set<string>;
  uniqueCategories: string[];
  onBulkPublish?: (postIds: string[]) => void;
  onBulkArchive?: (postIds: string[]) => void;
  onBulkDelete?: (postIds: string[]) => void;
  onBlogsUpdate?: (blogs: BlogPost[]) => void;
}

// Blog Controls Component
const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedPosts,
  uniqueCategories,
  onBulkPublish,
  onBulkArchive,
  onBulkDelete,
  onBlogsUpdate,
}) => {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // API states for bulk operations
  const statusApi = useApiState<BulkBlogUpdateResponse>();
  const deleteApi = useApiState<BulkBlogDeleteResponse>();

  // Refs for dropdown menus
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);
  const deleteMenuRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  // Define available status change actions for bulk operations
  const getBulkStatusActions = () => {
    const availableStatuses: BlogPost["status"][] = [
      "published",
      "draft",
      "archived",
    ];
    return availableStatuses.map((status) => ({
      label: `Set to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      status: status,
    }));
  };

  const statusActions = getBulkStatusActions();

  // Handle bulk status change (publish or archive)
  const handleBulkStatusChange = async (newStatus: BlogPost["status"]) => {
    const selectedPostIds = Array.from(selectedPosts);

    if (selectedPostIds.length === 0) {
      toast.error("No posts selected");
      return;
    }

    setIsStatusMenuOpen(false);

    await statusApi.execute(
      () => blogApiService.bulkUpdateStatus(selectedPostIds, newStatus),
      (data) => {
        toast.success(data.message || `Posts ${newStatus} successfully`);

        if (data.blogs && onBlogsUpdate) {
          onBlogsUpdate(data.blogs);
        }

        if (newStatus === "published" && onBulkPublish) {
          onBulkPublish(selectedPostIds);
        } else if (newStatus === "archived" && onBulkArchive) {
          onBulkArchive(selectedPostIds);
        }

        console.log(
          `Successfully changed status for ${selectedPostIds.length} posts to ${newStatus}`,
        );
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk status change failed:", errorMessage);
      },
    );
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    const selectedPostIds = Array.from(selectedPosts);

    if (selectedPostIds.length === 0) {
      toast.error("No posts selected");
      return;
    }

    setIsDeleteConfirmOpen(false);

    await deleteApi.execute(
      () => blogApiService.bulkDeleteBlogs(selectedPostIds),
      (data) => {
        toast.success(data.message || "Posts deleted successfully");

        if (onBulkDelete) {
          onBulkDelete(selectedPostIds);
        }

        console.log(`Successfully deleted ${data.deletedCount} posts`);
      },
      (errorMessage) => {
        toast.error(errorMessage);
        console.error("Bulk delete failed:", errorMessage);
      },
    );
  };

  // Close dropdown menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(event.target as Node)
      ) {
        setIsStatusMenuOpen(false);
      }

      if (
        deleteMenuRef.current &&
        !deleteMenuRef.current.contains(event.target as Node) &&
        deleteButtonRef.current &&
        !deleteButtonRef.current.contains(event.target as Node)
      ) {
        setIsDeleteConfirmOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Category Filter (Dropdown) */}
          <select
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value as "all" | string)
            }
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | BlogPost["status"])
            }
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaTh className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "table"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaListUl className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPosts.size > 0 && (
          <div className="flex flex-wrap gap-2">
            {/* Status Change Dropdown */}
            <div className="relative">
              <button
                ref={statusButtonRef}
                disabled={statusApi.loading}
                className={`bg-gradient-to-r from-blue-900/30 to-blue-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  statusApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !statusApi.loading && setIsStatusMenuOpen(!isStatusMenuOpen)
                }
              >
                {statusApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaCog className="w-4 h-4" />
                )}
                Status ({selectedPosts.size})
              </button>

              {isStatusMenuOpen && !statusApi.loading && (
                <motion.div
                  ref={statusMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {statusActions.map((action) => (
                    <button
                      key={action.status}
                      onClick={() => handleBulkStatusChange(action.status)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Delete Posts Dropdown */}
            <div className="relative">
              <button
                ref={deleteButtonRef}
                disabled={deleteApi.loading}
                className={`bg-gradient-to-r from-red-900/30 to-red-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  deleteApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !deleteApi.loading &&
                  setIsDeleteConfirmOpen(!isDeleteConfirmOpen)
                }
              >
                {deleteApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaTrash className="w-4 h-4" />
                )}
                Delete ({selectedPosts.size})
              </button>

              {isDeleteConfirmOpen && !deleteApi.loading && (
                <motion.div
                  ref={deleteMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[250px] p-4"
                >
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Are you sure you want to delete {selectedPosts.size} post
                    {selectedPosts.size > 1 ? "s" : ""}?
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsDeleteConfirmOpen(false)}
                      className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
