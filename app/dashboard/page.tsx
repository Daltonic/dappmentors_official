"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Types and Interfaces
interface DashboardStats {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "instructor" | "student";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActivity: string;
  avatar: string;
  coursesEnrolled?: number;
  coursesCompleted?: number;
}

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

// Sample Data
const sampleStats: DashboardStats[] = [
  {
    label: "Total Users",
    value: "2,847",
    change: 12.5,
    trend: "up",
    icon: "👥",
  },
  {
    label: "Active Courses",
    value: "156",
    change: 8.2,
    trend: "up",
    icon: "📚",
  },
  {
    label: "Monthly Revenue",
    value: "$47.2k",
    change: -2.1,
    trend: "down",
    icon: "💰",
  },
  {
    label: "Completion Rate",
    value: "94.8%",
    change: 5.3,
    trend: "up",
    icon: "📈",
  },
];

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "instructor",
    status: "active",
    joinDate: "2024-01-15",
    lastActivity: "2 hours ago",
    avatar: "👩‍🏫",
    coursesEnrolled: 12,
    coursesCompleted: 8,
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "student",
    status: "active",
    joinDate: "2024-02-20",
    lastActivity: "1 day ago",
    avatar: "👨‍💼",
    coursesEnrolled: 5,
    coursesCompleted: 3,
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "admin",
    status: "active",
    joinDate: "2023-12-01",
    lastActivity: "30 minutes ago",
    avatar: "👩‍💻",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-03-10",
    lastActivity: "1 week ago",
    avatar: "👨‍🎓",
    coursesEnrolled: 3,
    coursesCompleted: 1,
  },
];

const quickActions: QuickAction[] = [
  {
    id: "1",
    title: "Add User",
    description: "Create new user account",
    icon: "➕",
    href: "/dashboard/users/create",
  },
  {
    id: "2",
    title: "New Course",
    description: "Create educational content",
    icon: "📝",
    href: "/dashboard/courses/create",
  },
  {
    id: "3",
    title: "Analytics",
    description: "View detailed reports",
    icon: "📊",
    href: "/dashboard/analytics",
  },
  {
    id: "4",
    title: "Settings",
    description: "System configuration",
    icon: "⚙️",
    href: "/dashboard/settings",
  },
];

// Stats Cards Component
const StatsCards: React.FC<{ stats: DashboardStats[] }> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  stat.trend === "up"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : stat.trend === "down"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                <span>
                  {stat.trend === "up"
                    ? "↗️"
                    : stat.trend === "down"
                      ? "↘️"
                      : "→"}
                </span>
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Quick Actions Component
const QuickActions: React.FC<{ actions: QuickAction[] }> = ({ actions }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white">
          Quick Actions
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent hover:shadow-2xl transition-all duration-500 text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {action.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {action.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// User Management Component
const UserManagement: React.FC<{ users: User[] }> = ({ users }) => {
  const [selectedTab, setSelectedTab] = useState<
    "all" | "admin" | "instructor" | "student"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUserModal, setShowUserModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesRole = selectedTab === "all" || user.role === selectedTab;
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "instructor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "student":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white">
          User Management
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUserModal(true)}
          className="relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Add User
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 mb-6 shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 transition-all duration-300"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "admin", "instructor", "student"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 capitalize ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-[#D2145A]/10 hover:to-[#FF4081]/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid gap-6">
        {filteredUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent hover:shadow-2xl transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {user.email}
                    </p>
                    <div className="flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    Last active: {user.lastActivity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                  {user.coursesEnrolled && (
                    <div className="mt-2 flex gap-4 text-sm">
                      <span className="text-[#D2145A] dark:text-[#FF4081]">
                        📚 {user.coursesEnrolled} enrolled
                      </span>
                      <span className="text-green-600 dark:text-green-400">
                        ✅ {user.coursesCompleted} completed
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 ml-4">
                  <button className="p-2 text-[#D2145A] hover:bg-[#FF4081]/10 dark:text-[#FF4081] dark:hover:bg-[#FF4081]/20 rounded-lg transition-colors duration-300">
                    ✏️
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50 rounded-lg transition-colors duration-300">
                    👁️
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-300">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add User Modal */}
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
              className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-8 w-full max-w-md border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white mb-6">
                Add New User
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50">
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
                <button className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden">
                  <span className="relative z-10">Add User</span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Activity Feed Component
const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: "1",
      icon: "👤",
      title: "New user registration",
      description: "Alice Johnson joined as instructor",
      time: "5 min ago",
      color: "text-[#D2145A]",
    },
    {
      id: "2",
      icon: "📚",
      title: "Course completed",
      description: "Bob Smith finished React Masterclass",
      time: "12 min ago",
      color: "text-green-500",
    },
    {
      id: "3",
      icon: "💰",
      title: "Payment received",
      description: "$299 from course enrollment",
      time: "1 hour ago",
      color: "text-yellow-500",
    },
    {
      id: "4",
      icon: "⭐",
      title: "New review",
      description: "5-star review on Advanced JavaScript",
      time: "2 hours ago",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-xl font-cambo font-normal text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FF4081]/10 dark:hover:bg-[#FF4081]/20 transition-colors duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  activity.color === "text-[#D2145A]"
                    ? "bg-[#D2145A]/20 dark:bg-[#FF4081]/20"
                    : activity.color === "text-green-500"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : activity.color === "text-yellow-500"
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : "bg-purple-100 dark:bg-purple-900/30"
                }`}
              >
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
const Page: React.FC = () => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-black dark:to-purple-900/20 transition-colors duration-300`}
    >
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
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Stats Cards */}
        <StatsCards stats={sampleStats} />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <UserManagement users={sampleUsers} />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ActivityFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
