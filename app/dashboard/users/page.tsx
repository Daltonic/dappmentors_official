"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import EmptyState from "@/components/dashboard/EmptyState";
// Commented out to prevent any potential redirects from the auth guard
// import { useAdminGuard } from "@/hooks/useAuthGuard";

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
        selected={selectedUsers.has(user.id!)}
        onToggle={() => onToggle(user.id!)}
        getStatusColor={getStatusColor}
        getRoleColor={getRoleColor}
      />
    ))}
  </div>
);

const Page: React.FC = () => {
  // Removed auth guard hook to prevent any redirects
  // const { isAuthorized, isCheckingAuth } = useAdminGuard();

  // Manual auth state management to avoid redirects
  const [authState, setAuthState] = useState<{
    isAuthorized: boolean | null;
    isCheckingAuth: boolean;
    authError: string | null;
  }>({
    isAuthorized: null,
    isCheckingAuth: true,
    authError: null,
  });

  const [users, setUsers] = useState<User[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Check auth without redirecting
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First, try to fetch users - if successful, user is authorized
        const res = await fetch("/api/auth/users?limit=1", {
          credentials: "include",
          method: "GET",
        });

        if (res.ok) {
          setAuthState({
            isAuthorized: true,
            isCheckingAuth: false,
            authError: null,
          });
        } else if (res.status === 401) {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError: "Not authenticated. Please log in.",
          });
        } else if (res.status === 403) {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError: "Access denied. Admin privileges required.",
          });
        } else {
          setAuthState({
            isAuthorized: false,
            isCheckingAuth: false,
            authError: `Authentication check failed: ${res.status}`,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState({
          isAuthorized: false,
          isCheckingAuth: false,
          authError: "Failed to check authentication status.",
        });
      }
    };

    checkAuth();
  }, []);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      // Only fetch if we're authorized or still checking
      if (authState.isAuthorized === false) {
        setDataLoading(false);
        return;
      }

      try {
        setDataLoading(true);
        setError(null);

        const res = await fetch("/api/auth/users?limit=100", {
          credentials: "include",
          method: "GET",
        });

        if (!res.ok) {
          if (res.status === 401) {
            throw new Error("Unauthorized - Please log in");
          } else if (res.status === 403) {
            throw new Error("Forbidden - Admin access required");
          } else {
            throw new Error(`Failed to fetch users: ${res.status}`);
          }
        }

        const data = await res.json();

        if (!data.users || !Array.isArray(data.users)) {
          throw new Error("Invalid response format");
        }

        setUsers(
          data.users.map((user: User) => ({
            ...user,
            joinDate: new Date(user.joinDate),
            lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
          })),
        );
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch users",
        );
      } finally {
        setDataLoading(false);
      }
    };

    // Only fetch users if we're authorized
    if (authState.isAuthorized === true) {
      fetchUsers();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [authState.isAuthorized]);

  // Unique roles from fetched users
  const uniqueRoles = useMemo(() => {
    const roles = new Set(users.map((user) => user.role));
    return ["all", ...Array.from(roles).sort()];
  }, [users]);

  // Filter users client-side
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole = selectedRole === "all" || user.role === selectedRole;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, selectedRole, statusFilter, searchTerm]);

  // Sort users
  const sortedUsers = useMemo(() => {
    if (!sortConfig) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      let comparison = 0;

      if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
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
      setSelectedUsers(
        new Set(sortedUsers.map((user) => user.id).filter(Boolean) as string[]),
      );
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
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  // Show loading state while checking authentication
  if (authState.isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  // Show access denied without redirecting
  if (!authState.isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserSlash className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {authState.authError ||
              "You don't have permission to access this page."}
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 mr-4"
          >
            Go to Login
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Show error state without redirecting
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserSlash className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Users
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Main content - only shown when authorized
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        <StatsCards users={users} />
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
        {dataLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">
              Loading users...
            </div>
          </div>
        ) : sortedUsers.length === 0 ? (
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
            allUsersLength={users.length}
            getStatusColor={getStatusColor}
            getRoleColor={getRoleColor}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
