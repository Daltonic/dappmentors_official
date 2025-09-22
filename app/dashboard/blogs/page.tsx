// Blogs Management

"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaPlus,
  FaFileAlt,
  FaCheck,
  FaPen,
  FaEye,
} from "react-icons/fa";
import Link from "next/link";
import { BlogPost } from "@/utils/interfaces";
import Controls from "@/components/dashboard/blogs/Controls";
import BlogTable from "@/components/dashboard/blogs/BlogTable";
import PostCard from "@/components/dashboard/blogs/PostCard";
import { sampleBlogPost } from "@/data/global";

// Mock data for blog posts
const mockPosts: BlogPost[] = [sampleBlogPost];

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

// Header Component
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

// StatsCards Component
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

// BlogGrid Component
const BlogGrid: React.FC<{
  posts: BlogPost[];
  selectedPosts: Set<string>;
  onToggle: (id: string) => void;
  getCategoryColor: (category: string) => string;
  getStatusColor: (status: BlogPost["status"]) => string;
}> = ({ posts, selectedPosts, onToggle, getCategoryColor, getStatusColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {posts.map((post) => (
      <PostCard
        key={post.id}
        post={post}
        selected={selectedPosts.has(post.id.toString())}
        onToggle={() => onToggle(post.id.toString())}
        getCategoryColor={getCategoryColor}
        getStatusColor={getStatusColor}
      />
    ))}
  </div>
);

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

  // Unique categories for tabs
  const uniqueCategories = useMemo(() => {
    const cats = new Set(mockPosts.map((post) => post.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return mockPosts.filter((post) => {
      const matchesCategory =
        selectedTab === "all" || post.category === selectedTab;
      const matchesStatus =
        statusFilter === "all" || post.status === statusFilter;
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.topics.some((topic) =>
          topic.toLowerCase().includes(searchTerm.toLowerCase()),
        ) ||
        post.author.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [selectedTab, statusFilter, searchTerm]);

  // Sort posts
  const sortedPosts = useMemo(() => {
    if (!sortConfig) return filteredPosts;

    return [...filteredPosts].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        const comparison = aValue - bValue;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  }, [filteredPosts, sortConfig]);

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
    if (selectedPosts.size === sortedPosts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(sortedPosts.map((post) => post.id.toString())));
    }
  };

  const getCategoryColor = (category: string) => {
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
  };

  const getStatusColor = (status: BlogPost["status"]) => {
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
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsCards posts={mockPosts} />
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedPosts={selectedPosts}
          uniqueCategories={uniqueCategories}
        />
        {sortedPosts.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : viewMode === "grid" ? (
          <BlogGrid
            posts={sortedPosts}
            selectedPosts={selectedPosts}
            onToggle={togglePostSelection}
            getCategoryColor={getCategoryColor}
            getStatusColor={getStatusColor}
          />
        ) : (
          <BlogTable
            posts={sortedPosts}
            selectedPosts={selectedPosts}
            onToggle={togglePostSelection}
            toggleAll={toggleAllPosts}
            sortConfig={sortConfig}
            onSort={handleSort}
            allPostsLength={mockPosts.length}
            getCategoryColor={getCategoryColor}
            getStatusColor={getStatusColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
