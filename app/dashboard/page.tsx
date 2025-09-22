"use client";

import { DashboardStats, QuickAction, User } from "@/utils/interfaces";
import StatsCards from "@/components/dashboard/StatsCard";
import QuickActions from "@/components/dashboard/QuickActions";
import ActivityFeed from "@/components/dashboard/ActivityFeed";

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
import { useMemo, useState, useEffect, useCallback } from "react";
import { userApiService, apiUtils } from "@/services/api.services";
import TransactionTable from "@/components/dashboard/users/TransactionsTable";

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

// Main Dashboard Component
const Page: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [dataLoading, setDataLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // Fetch users using the API service
  const fetchUsers = useCallback(async () => {
    try {
      // setDataLoading(true);
      // setError(null);

      const response = await userApiService.getUsers({
        limit: 100,
        status: "all",
        role: "all",
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
        console.log(errorMessage);
      }
    } catch (error) {
      // const errorMessage = "Failed to fetch users. Please try again.";
      // setError(errorMessage);
      console.error("Error fetching users:", error);
    } finally {
      // setDataLoading(false);
    }
  }, []);

  // Fetch users when auth state changes or filters change
  useEffect(() => {
    fetchUsers();
    // setDataLoading(false);
  }, [fetchUsers]); // Added authState.isAuthorized

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
        change: 12.5,
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

  return (
    <div className="min-h-screen p-4 md:p-8">
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
              {/* Transactions records */}
              <TransactionTable />
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
