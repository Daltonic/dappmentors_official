"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  FaUserSlash,
  FaUserCheck,
  FaUsers,
  FaUserPlus,
  FaCommentDots,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { User } from "@/utils/interfaces";
import Controls from "@/components/dashboard/users/Controls";
import UserCard from "@/components/dashboard/users/UserCard";
import UserTable from "@/components/dashboard/users/UserTable";
import { userApiService, apiUtils } from "@/services/api.services";
import EmptyState from "@/components/dashboard/EmptyState";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import TransactionTable from "@/components/dashboard/users/TransactionsTable";

// Notification component type
interface Notification {
  id: string;
  message: string;
  type: "success" | "error";
}

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

// PaginationFooter Component
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
          Showing {from}-{to} of {total} users
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

// UserGrid Component
const UserGrid: React.FC<{
  users: User[];
  selectedUsers: Set<string>;
  onToggle: (id: string) => void;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({ users, selectedUsers, onToggle, getStatusColor, getRoleColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
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

// Notifications Component
const Notifications: React.FC<{
  notifications: Notification[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-[300px] max-w-[500px] ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span className="text-sm flex-1">{notification.message}</span>
          <button
            onClick={() => onRemove(notification.id)}
            className="ml-3 text-white hover:text-gray-200 font-bold text-lg"
          >
            ×
          </button>
        </motion.div>
      ))}
    </div>
  );
};

const Page: React.FC = () => {
  // Auth and data state
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
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // UI state
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Notification helper
  const addNotification = useCallback(
    (message: string, type: "success" | "error") => {
      const id = Math.random().toString(36).substr(2, 9);
      const notification: Notification = { id, message, type };

      setNotifications((prev) => [...prev, notification]);

      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 5000);
    },
    [],
  );

  // Remove notification manually
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

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

  // Fetch users using the API service
  const fetchUsers = useCallback(async () => {
    if (authState.isAuthorized === false) {
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      setError(null);

      const response = await userApiService.getUsers({
        limit: 100,
        status: statusFilter === "all" ? undefined : statusFilter,
        role: selectedRole === "all" ? undefined : selectedRole,
      });

      if (apiUtils.isSuccess(response)) {
        const processedUsers = response.data.users.map((user: User) => ({
          ...user,
          joinDate: new Date(user.joinDate),
          lastLogin: user.lastLogin ? new Date(user.lastLogin) : undefined,
        }));

        setUsers(processedUsers);
      } else {
        const errorMessage = apiUtils.handleApiError(
          apiUtils.getErrorMessage(response),
        );
        setError(errorMessage);
        addNotification(errorMessage, "error");
      }
    } catch (error) {
      const errorMessage = "Failed to fetch users. Please try again.";
      setError(errorMessage);
      addNotification(errorMessage, "error");
      console.error("Error fetching users:", error);
    } finally {
      setDataLoading(false);
    }
  }, [authState.isAuthorized, statusFilter, selectedRole, addNotification]);

  // Fetch users when auth state changes or filters change
  useEffect(() => {
    if (authState.isAuthorized === true) {
      fetchUsers();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [fetchUsers]);

  // Update users after bulk operations
  const handleUsersUpdate = useCallback((updatedUsers: User[]) => {
    // Update the main users array with the updated users
    setUsers((prevUsers) => {
      const updatedUserMap = new Map(
        updatedUsers.map((user) => [user.id, user]),
      );

      return prevUsers.map((user) =>
        updatedUserMap.has(user.id)
          ? {
              ...updatedUserMap.get(user.id)!,
              joinDate: new Date(updatedUserMap.get(user.id)!.joinDate),
              lastLogin: updatedUserMap.get(user.id)!.lastLogin
                ? new Date(updatedUserMap.get(user.id)!.lastLogin!)
                : undefined,
            }
          : user,
      );
    });

    // Clear selected users after successful update
    setSelectedUsers(new Set());

    // Optionally refresh the user list to ensure consistency
    // fetchUsers();
  }, []);

  // Legacy callback handlers for backward compatibility
  const handleBulkRoleChange = (userIds: string[], newRole: string) => {
    console.log("Legacy bulk role change callback:", { userIds, newRole });
    // This is now handled by the API integration in Controls component
  };

  const handleBulkStatusChange = (
    userIds: string[],
    newStatus: User["status"],
  ) => {
    console.log("Legacy bulk status change callback:", { userIds, newStatus });
    // This is now handled by the API integration in Controls component
  };

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

  // Paginate users
  const currentUsers = useMemo(() => {
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    return sortedUsers.slice(indexOfFirst, indexOfLast);
  }, [sortedUsers, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole, statusFilter]);

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

  const toggleAllUsers = useCallback(() => {
    setSelectedUsers((prev) => {
      const newSet = new Set(prev);
      const allCurrentSelected = currentUsers.every((user) =>
        newSet.has(user.id!),
      );
      if (allCurrentSelected) {
        currentUsers.forEach((user) => newSet.delete(user.id!));
      } else {
        currentUsers.forEach((user) => newSet.add(user.id!));
      }
      return newSet;
    });
  }, [currentUsers]);

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

  // Fetch users and transactions when auth state changes or filters change
  useEffect(() => {
    if (authState.isAuthorized === true) {
      fetchUsers();
    } else if (authState.isAuthorized === false) {
      setDataLoading(false);
    }
  }, [authState.isAuthorized, fetchUsers]);

  // Show loading state while checking authentication
  if (authState.isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
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
  if (error && !dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUserSlash className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Users
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button
            onClick={fetchUsers}
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
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Notifications */}
        <Notifications
          notifications={notifications}
          onRemove={removeNotification}
        />

        <DashboardHeader
          title="Users Management"
          subtitle="Manage your platform users and roles"
        />
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
          onBulkRoleChange={handleBulkRoleChange}
          onBulkStatusChange={handleBulkStatusChange}
          onUsersUpdate={handleUsersUpdate}
          onNotification={addNotification}
        />

        {dataLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-gray-600 dark:text-gray-300">
              Loading users...
            </div>
          </div>
        ) : sortedUsers.length === 0 ? (
          <EmptyState
            searchTerm={searchTerm}
            title="No users found"
            subtitle={(term) =>
              term
                ? `No users match "${term}". Try adjusting your search or filters.`
                : "You haven't added any users yet. Start by inviting new users."
            }
            icon={<FaUserPlus className="w-8 h-8 text-gray-400" />}
          />
        ) : viewMode === "grid" ? (
          <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
            <UserGrid
              users={currentUsers}
              selectedUsers={selectedUsers}
              onToggle={toggleUserSelection}
              getStatusColor={getStatusColor}
              getRoleColor={getRoleColor}
            />
            {sortedUsers.length > 0 && (
              <PaginationFooter
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                total={sortedUsers.length}
                selectedCount={selectedUsers.size}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <UserTable
            users={currentUsers}
            totalUsers={sortedUsers.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            selectedUsers={selectedUsers}
            onToggle={toggleUserSelection}
            toggleAll={toggleAllUsers}
            sortConfig={sortConfig}
            onSort={handleSort}
            getStatusColor={getStatusColor}
            getRoleColor={getRoleColor}
          />
        )}

        {/* Transactions Section */}
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
          Platform Transactions
        </h3>
        <TransactionTable />
      </div>
    </div>
  );
};

export default Page;
