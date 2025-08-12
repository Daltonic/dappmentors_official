"use client";

import { useState } from "react";
import { store } from "@/store";

import Navbar from "./components/dashboardhome/Navbar";
import Sidebar from "./components/dashboardhome/Sidebar";
import { Provider } from "react-redux";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        {/* 🔹 Sidebar - Fixed in lg, slide-in on mobile */}
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* 🔹 Main Content Wrapper */}
        <div className="flex-1 flex flex-col transition-all duration-300 lg:pl-64">
          <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* 🔹 Content Section */}
          <div className="w-full min-h-screen bg-[#F4F4F5] text-black dark:text-white dark:bg-[#1A1A1A] transition-all duration-300 pt-10">
            <div className="max-w-screen-xl mx-auto ">
              <Provider store={store}>{children}</Provider>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
