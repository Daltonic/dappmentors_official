"use client";
import { DashboardStats, QuickAction, User } from "@/utils/interfaces";
import StatsCards from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UserTable from "@/components/dashboard/users/UserTable";
import Controls from "@/components/dashboard/users/Controls";

import {
  FaUsers,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaPlus,
  FaEdit,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { useMemo, useState } from "react";

// Sample Data
const sampleStats: DashboardStats[] = [
  {
    label: "Total Users",
    value: "2,847",
    change: 12.5,
    trend: "up",
    icon: <FaUsers className="text-white" />,
    trendData: [
      { name: "Jan", value: 2200 },
      { name: "Feb", value: 2400 },
      { name: "Mar", value: 2600 },
      { name: "Apr", value: 2847 },
    ],
  },
  {
    label: "Active Courses",
    value: "156",
    change: 8.2,
    trend: "up",
    icon: <FaBook className="text-white" />,
    trendData: [
      { name: "Jan", value: 120 },
      { name: "Feb", value: 130 },
      { name: "Mar", value: 140 },
      { name: "Apr", value: 156 },
    ],
  },
  {
    label: "Monthly Revenue",
    value: "$47.2k",
    change: -2.1,
    trend: "down",
    icon: <FaDollarSign className="text-white" />,
    trendData: [
      { name: "Jan", value: 50000 },
      { name: "Feb", value: 48000 },
      { name: "Mar", value: 47000 },
      { name: "Apr", value: 47200 },
    ],
  },
  {
    label: "Completion Rate",
    value: "94.8%",
    change: 5.3,
    trend: "up",
    icon: <FaChartLine className="text-white" />,
    trendData: [
      { name: "Jan", value: 88 },
      { name: "Feb", value: 90 },
      { name: "Mar", value: 92 },
      { name: "Apr", value: 94.8 },
    ],
  },
];

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
    title: "New Course",
    description: "Create educational content",
    icon: <FaEdit className="text-white" />,
    href: "/dashboard/products/create",
  },
  {
    id: "3",
    title: "Analytics",
    description: "View detailed reports",
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

// Main Dashboard Component
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

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 relative z-10">
        {/* Stats Cards */}
        <StatsCards stats={sampleStats} />

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
              />
            </div>

            {/* User Table with horizontal scroll on mobile */}
            <div className="w-full overflow-hidden">
              <div className="overflow-x-auto">
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
