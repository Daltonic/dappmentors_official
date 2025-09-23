"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaPlus,
  FaFileAlt,
  FaCheck,
  FaPen,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";
import { BlogPost } from "@/utils/interfaces";
import Controls from "@/components/dashboard/blogs/Controls";
import BlogTable from "@/components/dashboard/blogs/BlogTable";
import PostCard from "@/components/dashboard/blogs/PostCard";
import { blogApiService } from "@/services/blogApiService";
import { toast } from "react-toastify";

// EmptyState Component (unchanged)
const EmptyState: React.FC<{ searchTerm: string }> = ({ searchTerm }) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
      <FaBoxOpen className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      No posts found
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      {searchTerm
        ? `No posts match "${searchTerm}"`
        : "Get started by creating your first post"}
    </p>
    <Link
      href="/dashboard/blogs/new"
      className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
    >
      Create Post
    </Link>
  </div>
);

// Header Component (unchanged)
const Header: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
        Blog Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your blog posts and content
      </p>
    </div>
    <Link
      href="/dashboard/blogs/new"
      className="relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3
            rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group"
    >
      <span className="relative z-10 flex items-center gap-2">
        Create Post
        <FaPlus className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </Link>
  </div>
);

// StatsCards Component (unchanged)
const StatsCards: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  const stats = [
    {
      label: "Total Posts",
      value: posts.length,
      color: "from-blue-500 to-blue-600",
      icon: <FaFileAlt className="text-white text-2xl" />,
    },
    {
      label: "Published",
      value: posts.filter((p) => p.status === "published").length,
      color: "from-green-500 to-green-600",
      icon: <FaCheck className="text-white text-2xl" />,
    },
    {
      label: "Drafts",
      value: posts.filter((p) => p.status === "draft").length,
      color: "from-yellow-500 to-yellow-600",
      icon: <FaPen className="text-white text-2xl" />,
    },
    {
      label: "Total Views",
      value: posts.reduce((sum, p) => sum + p.views, 0).toLocaleString(),
      color: "from-purple-500 to-purple-600",
      icon: <FaEye className="text-white text-2xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {stat.label}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// BlogGrid Component (updated to use currentPosts)
const BlogGrid: React.FC<{
  posts: BlogPost[];
  selectedPosts: Set<string>;
  onToggle: (id: string) => void;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: BlogPost["status"]) => string;
  handleDelete: (id: string) => void;
}> = ({
  posts,
  selectedPosts,
  onToggle,
  getCategoryColor,
  getStatusColor,
  handleDelete,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        selected={selectedPosts.has(post.id)}
        onToggle={() => onToggle(post.id)}
        getCategoryColor={getCategoryColor}
        getStatusColor={getStatusColor}
        handleDelete={handleDelete}
      />
    ))}
  </div>
);

// PaginationFooter Component (copied from services for grid)
const PaginationFooter: React.FC<{
  currentPage: number;
  itemsPerPage: number;
  total: number;
  selectedCount: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, itemsPerPage, total, selectedCount, onPageChange }) => {
  const from = (currentPage - 1) * itemsPerPage + 1;
  const to = Math.min(currentPage * itemsPerPage, total);
  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
        <span>
          Showing {from}-{to} of {total} posts
          {selectedCount > 0 && ` (${selectedCount} selected)`}
        </span>
        <div className="flex items-center gap-4">
          <span>Rows per page: {itemsPerPage}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
const Page: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | BlogPost["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof BlogPost;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all blogs once
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const params = { limit: 100 };
      const response = await blogApiService.getBlogs(params);
      if (response.data) {
        setBlogs(response.data.blogs);
      }
      setLoading(false);
    };
    fetchBlogs();
  }, []); // Fetch once on mount

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, selectedTab]);

  // Filtered posts (client-side)
  const filteredPosts = useMemo(() => {
    return blogs.filter(
      (post) =>
        (statusFilter === "all" || post.status === statusFilter) &&
        (selectedTab === "all" || post.category === selectedTab) &&
        (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [blogs, searchTerm, statusFilter, selectedTab]);

  // Sorted posts (client-side)
  const sortedPosts = useMemo(() => {
    if (!sortConfig) return filteredPosts;
    return [...filteredPosts].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string" && typeof bVal === "string") {
        const cmp = aVal.localeCompare(bVal);
        return sortConfig.direction === "asc" ? cmp : -cmp;
      } else if (typeof aVal === "number" && typeof bVal === "number") {
        const cmp = aVal - bVal;
        return sortConfig.direction === "asc" ? cmp : -cmp;
      } else if (
        sortConfig.key === "publishDate" ||
        sortConfig.key === "updatedAt"
      ) {
        const aDate = new Date(aVal as string);
        const bDate = new Date(bVal as string);
        const cmp = aDate.getTime() - bDate.getTime();
        return sortConfig.direction === "asc" ? cmp : -cmp;
      }
      return 0;
    });
  }, [filteredPosts, sortConfig]);

  // Paginated posts (client-side)
  const currentPosts = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return sortedPosts.slice(indexOfFirst, indexOfLast);
  }, [sortedPosts, currentPage, itemsPerPage]);

  // const totalPosts = sortedPosts.length;

  const handleSort = (key: keyof BlogPost) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const togglePostSelection = (postId: string) => {
    setSelectedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleAllPosts = () => {
    setSelectedPosts((prev) => {
      const newSet = new Set(prev);
      const allSelected = currentPosts.every((post) => newSet.has(post.id));
      if (allSelected) {
        currentPosts.forEach((post) => newSet.delete(post.id));
      } else {
        currentPosts.forEach((post) => newSet.add(post.id));
      }
      return newSet;
    });
  };

  const getCategoryColor = useCallback((category: string) => {
    const colors = {
      "Blockchain Development":
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "Web3 Development":
        "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      DeFi: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "NFT Development":
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "Frontend Development":
        "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      Security:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  }, []);

  const getStatusColor = useCallback((status: BlogPost["status"]) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const response = await blogApiService.deleteBlog(id);
      if (response.data) {
        setBlogs((prev) => prev.filter((p) => p.id !== id));
        if (selectedPosts.has(id)) {
          setSelectedPosts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }
        toast.success("Post deleted successfully");
      } else {
        toast.error("Failed to delete post");
      }
    }
  };

  const handleBlogsUpdate = useCallback((updatedBlogs: BlogPost[]) => {
    setBlogs((prev) =>
      prev.map((post) => updatedBlogs.find((u) => u.id === post.id) || post),
    );
  }, []);

  const handleBulkDelete = useCallback((ids: string[]) => {
    setBlogs((prev) => prev.filter((p) => !ids.includes(p.id)));
    setSelectedPosts((prev) => {
      const newSet = new Set(prev);
      ids.forEach((id) => newSet.delete(id));
      return newSet;
    });
  }, []);

  const uniqueCategories = useMemo(() => {
    const cats = new Set(blogs.map((post) => post.category));
    return ["all", ...Array.from(cats).sort()];
  }, [blogs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsCards posts={blogs} />
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedTab}
          setSelectedCategory={setSelectedTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedPosts={selectedPosts}
          uniqueCategories={uniqueCategories}
          onBlogsUpdate={handleBlogsUpdate}
          onBulkDelete={handleBulkDelete}
        />
        {sortedPosts.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : viewMode === "grid" ? (
          <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <BlogGrid
              posts={currentPosts}
              selectedPosts={selectedPosts}
              onToggle={togglePostSelection}
              getCategoryColor={getCategoryColor}
              getStatusColor={getStatusColor}
              handleDelete={handleDelete}
            />
            {sortedPosts.length > 0 && (
              <PaginationFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                total={sortedPosts.length}
                selectedCount={selectedPosts.size}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <BlogTable
            posts={currentPosts}
            currentPage={currentPage}
            totalPosts={sortedPosts.length}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            selectedPosts={selectedPosts}
            onToggle={togglePostSelection}
            toggleAll={toggleAllPosts}
            sortConfig={sortConfig}
            onSort={handleSort}
            getCategoryColor={getCategoryColor}
            getStatusColor={getStatusColor}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
