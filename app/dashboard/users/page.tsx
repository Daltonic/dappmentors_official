"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaUserSlash,
  FaUserCheck,
  FaUsers,
  FaUserPlus,
  FaCommentDots,
} from "react-icons/fa";
import { User } from "@/utils/interfaces";
import Controls from "@/components/dashboard/users/Controls";
import UserCard from "@/components/dashboard/users/UserCard";
import UserTable from "@/components/dashboard/users/UserTable";

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
    role: "instructor",
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
    role: "student",
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
    role: "student",
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
    role: "student",
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
    role: "instructor",
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
const Header: React.FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
    <div>
      <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
        User Management
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Manage your platform users and roles
      </p>
    </div>
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
      value: users
        .reduce((sum, u) => sum + (u.comments ?? 0), 0)
        .toLocaleString(),
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

// EmptyState Component
const EmptyState: React.FC<{ searchTerm: string }> = ({ searchTerm }) => (
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
    <button className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300">
      Add User
    </button>
  </div>
);

// UserGrid Component
const UserGrid: React.FC<{
  users: User[];
  selectedUsers: Set<string>;
  onToggle: (id: string) => void;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({ users, selectedUsers, onToggle, getStatusColor, getRoleColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
        selected={selectedUsers.has(user.id)}
        onToggle={() => onToggle(user.id)}
        getStatusColor={getStatusColor}
        getRoleColor={getRoleColor}
      />
    ))}
  </div>
);

const Page: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<"all" | string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | User["status"]>(
    "all",
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof User;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

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
      instructor:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      student:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
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
          <EmptyState searchTerm={searchTerm} />
        ) : viewMode === "grid" ? (
          <UserGrid
            users={sortedUsers}
            selectedUsers={selectedUsers}
            onToggle={toggleUserSelection}
            getStatusColor={getStatusColor}
            getRoleColor={getRoleColor}
          />
        ) : (
          <UserTable
            users={sortedUsers}
            selectedUsers={selectedUsers}
            onToggle={toggleUserSelection}
            toggleAll={toggleAllUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
            allUsersLength={mockUsers.length}
            getStatusColor={getStatusColor}
            getRoleColor={getRoleColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
