"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTh,
  FaListUl,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaUserSlash,
  FaPlus,
  FaEdit,
  FaEye,
  FaTrash,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUserCheck,
  FaUsers,
  FaUserPlus,
  FaEnvelope,
  FaCommentDots,
} from "react-icons/fa";
import Image from "next/image";

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  status: "active" | "inactive" | "banned";
  joinDate: string;
  lastLogin: string;
  posts: number;
  comments: number;
  avatar: string;
  updatedAt: string;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-08-20",
    posts: 15,
    comments: 45,
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    updatedAt: "2024-08-20",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2024-02-20",
    lastLogin: "2024-08-19",
    posts: 8,
    comments: 32,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    updatedAt: "2024-08-19",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-03-10",
    lastLogin: "2024-08-18",
    posts: 25,
    comments: 78,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    updatedAt: "2024-08-18",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    joinDate: "2024-04-05",
    lastLogin: "2024-07-15",
    posts: 5,
    comments: 12,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    updatedAt: "2024-07-15",
  },
  {
    id: "5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "user",
    status: "banned",
    joinDate: "2024-05-12",
    lastLogin: "2024-06-01",
    posts: 3,
    comments: 8,
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    updatedAt: "2024-06-01",
  },
  {
    id: "6",
    name: "Eve Franklin",
    email: "eve@example.com",
    role: "moderator",
    status: "active",
    joinDate: "2024-01-30",
    lastLogin: "2024-08-21",
    posts: 12,
    comments: 56,
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    updatedAt: "2024-08-21",
  },
];

// Header Component
const Header: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
        User Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your platform users and roles
      </p>
    </div>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onCreate}
      className="relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group"
    >
      <span className="relative z-10 flex items-center gap-2">
        Add User
        <FaPlus className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </motion.button>
  </div>
);

// StatsCards Component
const StatsCards: React.FC<{ users: User[] }> = ({ users }) => {
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      color: "from-blue-500 to-blue-600",
      icon: <FaUsers className="text-white text-2xl" />,
    },
    {
      label: "Active Users",
      value: users.filter((u) => u.status === "active").length,
      color: "from-green-500 to-green-600",
      icon: <FaUserCheck className="text-white text-2xl" />,
    },
    {
      label: "New Users",
      value: users.filter(
        (u) =>
          new Date(u.joinDate) >
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      ).length,
      color: "from-yellow-500 to-yellow-600",
      icon: <FaUserPlus className="text-white text-2xl" />,
    },
    {
      label: "Total Comments",
      value: users.reduce((sum, u) => sum + u.comments, 0).toLocaleString(),
      color: "from-purple-500 to-purple-600",
      icon: <FaCommentDots className="text-white text-2xl" />,
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

// Controls Component
const Controls: React.FC<{
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedRole: "all" | string;
  setSelectedRole: React.Dispatch<React.SetStateAction<"all" | string>>;
  statusFilter: "all" | User["status"];
  setStatusFilter: React.Dispatch<React.SetStateAction<"all" | User["status"]>>;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedUsers: Set<string>;
  uniqueRoles: string[];
}> = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedUsers,
  uniqueRoles,
}) => (
  <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
    <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
      {/* Search */}
      <div className="flex-1 max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {/* Role Filter */}
        <div className="flex gap-2">
          {uniqueRoles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 capitalize text-sm ${
                selectedRole === role
                  ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#D2145A]/10 hover:to-[#FF4081]/10"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | User["status"])
          }
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="banned">Banned</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <FaTh className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "table"
                ? "bg-white dark:bg-gray-700 shadow-sm"
                : "hover:bg-white/50 dark:hover:bg-gray-700/50"
            }`}
          >
            <FaListUl className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.size > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
            Activate Selected ({selectedUsers.size})
          </button>
          <button className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 rounded-xl text-sm font-medium hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
            Deactivate Selected
          </button>
          <button className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors">
            Delete Selected
          </button>
        </div>
      )}
    </div>
  </div>
);

const Page: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | User["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Unique roles from mock data
  const uniqueRoles = useMemo(() => {
    const roles = new Set(mockUsers.map((user) => user.role));
    return ["all", ...Array.from(roles)];
  }, []);

  // Filter users
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [selectedRole, statusFilter, searchTerm]);

  // Sort users
  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
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
  }, [filteredUsers, sortConfig]);

  const handleSort = (key: keyof User) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const toggleAllUsers = () => {
    if (selectedUsers.size === sortedUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(sortedUsers.map((user) => user.id)));
    }
  };

  const getRoleColor = (role: string) => {
    const colors = {
      admin: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
      moderator:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      user: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    };
    return (
      colors[role as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    );
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "banned":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const SortIcon: React.FC<{ column: keyof User }> = ({ column }) => {
    if (!sortConfig || sortConfig.key !== column) {
      return <FaSort className="w-4 h-4 opacity-30" />;
    }

    return sortConfig.direction === "asc" ? (
      <FaSortUp className="w-4 h-4 text-[#D2145A]" />
    ) : (
      <FaSortDown className="w-4 h-4 text-[#D2145A]" />
    );
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
        <FaUserSlash className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        No users found
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        {searchTerm
          ? `No users match "${searchTerm}"`
          : "Get started by adding your first user"}
      </p>
      <button
        onClick={() => setShowUserModal(true)}
        className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
      >
        Add User
      </button>
    </div>
  );

  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={user.avatar}
          alt={user.name}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ objectFit: "cover" }}
          unoptimized
        />
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selectedUsers.has(user.id)}
            onChange={() => toggleUserSelection(user.id)}
            className="w-4 h-4 text-[#D2145A] bg-white/90 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
          />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(user.status)}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-10">
        {/* Role and Posts */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getRoleColor(user.role)}`}
          >
            {user.role}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.posts}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              posts
            </div>
          </div>
        </div>

        {/* Name and Email */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {user.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex items-center gap-2">
          <FaEnvelope /> {user.email}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Joined:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.joinDate}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Last Login:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.lastLogin}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Comments:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.comments}
            </span>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header onCreate={() => setShowUserModal(true)} />
        <StatsCards users={mockUsers} />
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedUsers={selectedUsers}
          uniqueRoles={uniqueRoles}
        />
        {sortedUsers.length === 0 ? (
          <EmptyState />
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full">
                <thead>
                  <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                    <th className="text-left px-4 py-4 w-12">
                      <input
                        type="checkbox"
                        checked={
                          selectedUsers.size === sortedUsers.length &&
                          sortedUsers.length > 0
                        }
                        onChange={toggleAllUsers}
                        className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                      />
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[300px]"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center gap-2">
                        User
                        <SortIcon column="name" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                      onClick={() => handleSort("role")}
                    >
                      <div className="flex items-center gap-2">
                        Role
                        <SortIcon column="role" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center gap-2">
                        Status
                        <SortIcon column="status" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                      onClick={() => handleSort("joinDate")}
                    >
                      <div className="flex items-center gap-2">
                        Joined
                        <SortIcon column="joinDate" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                      onClick={() => handleSort("lastLogin")}
                    >
                      <div className="flex items-center gap-2">
                        Last Login
                        <SortIcon column="lastLogin" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                      onClick={() => handleSort("posts")}
                    >
                      <div className="flex items-center gap-2">
                        Posts
                        <SortIcon column="posts" />
                      </div>
                    </th>
                    <th
                      className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                      onClick={() => handleSort("comments")}
                    >
                      <div className="flex items-center gap-2">
                        Comments
                        <SortIcon column="comments" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 min-w-[120px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 group"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={user.avatar}
                            alt={user.name}
                            width={48}
                            height={32}
                            className="w-12 h-8 object-cover rounded-lg flex-shrink-0"
                            unoptimized
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                              {user.name}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-1">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                              user.status === "active"
                                ? "bg-green-400"
                                : user.status === "inactive"
                                  ? "bg-yellow-400"
                                  : "bg-red-400"
                            }`}
                          />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-900 dark:text-white">
                        {user.joinDate}
                      </td>
                      <td className="px-4 py-4 text-gray-900 dark:text-white">
                        {user.lastLogin}
                      </td>
                      <td className="px-4 py-4 text-gray-900 dark:text-white">
                        {user.posts}
                      </td>
                      <td className="px-4 py-4 text-gray-900 dark:text-white">
                        {user.comments}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            className="p-2 text-[#D2145A] hover:bg-[#FF4081]/10 dark:text-[#FF4081] dark:hover:bg-[#FF4081]/20 rounded-lg transition-all duration-300 hover:scale-110"
                            title="Edit user"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-lg transition-all duration-300 hover:scale-110"
                            title="View details"
                          >
                            <FaEye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 hover:scale-110"
                            title="Delete user"
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

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
                <span>
                  Showing {sortedUsers.length} of {mockUsers.length} users
                  {selectedUsers.size > 0 &&
                    ` (${selectedUsers.size} selected)`}
                </span>
                <div className="flex items-center gap-4">
                  <span>Rows per page: 50</span>
                  <div className="flex gap-2">
                    <button
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      disabled
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      disabled
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <AnimatePresence>
          {showUserModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowUserModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl p-8 w-full max-w-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
                    Add New User
                  </h3>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                        placeholder="Enter user name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                        placeholder="Enter user email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300">
                        <option value="user">User</option>
                        <option value="moderator">Moderator</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Status
                      </label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="banned">Banned</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group">
                    <span className="relative z-10">Add User</span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Page;
