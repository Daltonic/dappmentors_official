"use client";
import { DashboardStats, QuickAction, User } from "@/utils/interfaces";
import StatsCards from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import UserManagement from "@/components/dashboard/UserManagement";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

import {
  FaUsers,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaChalkboardTeacher,
  FaUserShield,
  FaUserGraduate,
  FaPlus,
  FaEdit,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

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

const sampleUsers: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "instructor",
    status: "active",
    joinDate: "2024-01-15",
    lastActivity: "2 hours ago",
    avatar: <FaChalkboardTeacher className="text-white" />,
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
    avatar: <FaUserGraduate className="text-white" />,
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
    avatar: <FaUserShield className="text-white" />,
  },
  {
    id: "4",
    name: "David Brown",
    email: "david@example.com",
    role: "student",
    status: "inactive",
    joinDate: "2024-03-10",
    lastActivity: "1 week ago",
    avatar: <FaUserGraduate className="text-white" />,
    coursesEnrolled: 3,
    coursesCompleted: 1,
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
