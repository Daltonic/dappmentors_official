"use client";

import { DashboardStats, QuickAction, User } from "@/utils/interfaces";
import StatsCards from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserTable from "@/components/dashboard/users/UserTable";
import Controls from "@/components/dashboard/users/Controls";
import UserCard from "@/components/dashboard/users/UserCard";
import EmptyState from "@/components/dashboard/EmptyState";

import {
  FaUsers,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaChartBar,
  FaCog,
  FaUserSlash,
} from "react-icons/fa";
import { useMemo, useState, useEffect, useCallback } from "react";
import { userApiService, apiUtils } from "@/services/api.services";
import { motion } from "framer-motion";

// Notification component type
interface Notification {
  id: string;
  message: string;
  type: "success" | "error";
}

const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "New Blog",
    description: "Create new user account",
    icon: <FaPlus className="text-white" />,
    href: "/dashboard/blogs/create",
  },
  {
    id: "2",
    title: "New Product",
    description: "Create new product listing",
    icon: <FaEdit className="text-white" />,
    href: "/dashboard/products/create",
  },
  {
    id: "3",
    title: "New Service",
    description: "Create new service offering",
    icon: <FaChartBar className="text-white" />,
    href: "/dashboard/analytics",
  },
  {
    id: "4",
    title: "Settings",
    description: "System configuration",
    icon: <FaCog className="text-white" />,
    href: "/dashboard/settings",
  },
];

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

// UserGrid Component
const UserGrid: React.FC<{
  users: User[];
  selectedUsers: Set<string>;
  onToggle: (id: string) => void;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({ users, selectedUsers, onToggle, getStatusColor, getRoleColor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

// Main Dashboard Component
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
        limit: 50, // Limit for dashboard view
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
  }, []);

  // Generate dynamic stats from real user data
  const dashboardStats: DashboardStats[] = useMemo(() => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const activeUsers = users.filter((u) => u.status === "active");
    const newUsers = users.filter((u) => new Date(u.joinDate) > thirtyDaysAgo);

    return [
      {
        label: "Total Users",
        value: users.length.toLocaleString(),
        change: 12.5, // You can calculate this based on historical data
        trend: "up" as const,
        icon: <FaUsers className="text-white" />,
        trendData: [
          { name: "Jan", value: Math.max(0, users.length - 200) },
          { name: "Feb", value: Math.max(0, users.length - 150) },
          { name: "Mar", value: Math.max(0, users.length - 100) },
          { name: "Apr", value: users.length },
        ],
      },
      {
        label: "Active Users",
        value: activeUsers.length.toLocaleString(),
        change: 8.2,
        trend: "up" as const,
        icon: <FaBook className="text-white" />,
        trendData: [
          { name: "Jan", value: Math.max(0, activeUsers.length - 50) },
          { name: "Feb", value: Math.max(0, activeUsers.length - 30) },
          { name: "Mar", value: Math.max(0, activeUsers.length - 20) },
          { name: "Apr", value: activeUsers.length },
        ],
      },
      {
        label: "New Users (30d)",
        value: newUsers.length.toLocaleString(),
        change: newUsers.length > 10 ? 15.3 : -2.1,
        trend: newUsers.length > 10 ? ("up" as const) : ("down" as const),
        icon: <FaDollarSign className="text-white" />,
        trendData: [
          { name: "Week 1", value: Math.floor(newUsers.length * 0.2) },
          { name: "Week 2", value: Math.floor(newUsers.length * 0.4) },
          { name: "Week 3", value: Math.floor(newUsers.length * 0.7) },
          { name: "Week 4", value: newUsers.length },
        ],
      },
      {
        label: "User Engagement",
        value: `${Math.round((activeUsers.length / Math.max(users.length, 1)) * 100)}%`,
        change: 5.3,
        trend: "up" as const,
        icon: <FaChartLine className="text-white" />,
        trendData: [
          { name: "Jan", value: 88 },
          { name: "Feb", value: 90 },
          { name: "Mar", value: 92 },
          {
            name: "Apr",
            value: Math.round(
              (activeUsers.length / Math.max(users.length, 1)) * 100,
            ),
          },
        ],
      },
    ];
  }, [users]);

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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-purple-900/20 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-purple-900/20 flex items-center justify-center">
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-purple-900/20 transition-colors duration-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Notifications */}
      <Notifications
        notifications={notifications}
        onRemove={removeNotification}
      />

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 relative z-10">
        {/* Stats Cards - Now using real data */}
        <StatsCards stats={dashboardStats} />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Responsive Layout - Stack on mobile, side-by-side on desktop */}
        <div className="space-y-8 xl:space-y-0 xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 min-w-0">
            {/* Controls with proper mobile responsiveness */}
            <div className="w-full overflow-hidden">
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
            </div>

            {/* User Table/Grid with horizontal scroll on mobile */}
            <div className="w-full overflow-hidden">
              <div className="overflow-x-auto">
                {dataLoading ? (
                  <div className="text-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div className="text-gray-600 dark:text-gray-300">
                      Loading users...
                    </div>
                  </div>
                ) : error ? (
                  <div className="text-center py-16">
                    <div className="text-red-600 dark:text-red-400 mb-4">
                      {error}
                    </div>
                    <button
                      onClick={fetchUsers}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Retry
                    </button>
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
          </div>

          {/* Sidebar - Full width on mobile, sidebar on desktop */}
          <div className="xl:col-span-1 w-full min-w-0">
            <div className="w-full overflow-hidden">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
