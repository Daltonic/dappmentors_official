"use client";

import React, { useState } from "react";
import {
  FaUser,
  FaCog,
  FaBell,
  FaShieldAlt,
  FaSave,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import {
  NotificationSettings,
  PasswordData,
  SystemSettings,
  UserProfile,
} from "@/utils/interfaces";
import ProfileTab from "@/components/dashboard/settings/ProfileTab";
import SystemTab from "@/components/dashboard/settings/SystemTab";
import NotificationsTab from "@/components/dashboard/settings/NotificationsTab";
import SecurityTab from "@/components/dashboard/settings/SecurityTab";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Header Component
const Header: React.FC = () => (
  <div className="mb-8">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
      Settings
    </h1>
    <p className="text-gray-600 dark:text-gray-400">
      Manage your account settings and system preferences
    </p>
  </div>
);

// Sidebar Component
const Sidebar: React.FC<{
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "system", label: "System", icon: <FaCog /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "security", label: "Security", icon: <FaShieldAlt /> },
  ];

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 sticky top-8">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

// AccountOverview Component
const AccountOverview: React.FC = () => (
  <div className="mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Account Overview
    </h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center p-4 bg-gradient-to-br from-[#D2145A]/10 to-[#FF4081]/10 dark:from-[#D2145A]/20 dark:to-[#FF4081]/20 rounded-xl">
        <div className="text-2xl font-bold text-[#D2145A] dark:text-[#FF4081]">
          156
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Total Logins
        </div>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          24h
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Last Login
        </div>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
          98%
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
      </div>
      <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
        <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
          High
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Security Level
        </div>
      </div>
    </div>
  </div>
);

// ThemeSelector Component
const ThemeSelector: React.FC<{
  systemSettings: SystemSettings;
  handleSystemChange: (
    field: keyof SystemSettings,
    value: string | boolean | number,
  ) => void;
}> = ({ systemSettings, handleSystemChange }) => (
  <div className="mt-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <span className="text-[#D2145A]">
        {systemSettings.darkMode ? <FaMoon /> : <FaSun />}
      </span>
      Appearance
    </h3>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Toggle between light and dark themes
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={systemSettings.darkMode}
          onChange={(e) => handleSystemChange("darkMode", e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D2145A]/30 dark:peer-focus:ring-[#D2145A]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#D2145A]"></div>
      </label>
    </div>
  </div>
);

// DangerZone Component
const DangerZone: React.FC = () => (
  <div className="mt-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-[#D2145A] dark:text-[#FF4081] mb-4">
      Danger Zone
    </h3>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Export Data
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Download a copy of all your data
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Export Data
        </button>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-900 dark:text-white">
            Delete Account
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Permanently delete your account and all data
          </p>
        </div>
        <button className="px-4 py-2 bg-[#D2145A] text-white rounded-lg hover:bg-[#FF4081] transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  </div>
);

// SaveButton Component
const SaveButton: React.FC<{
  unsavedChanges: boolean;
  handleSave: () => void;
}> = ({ unsavedChanges, handleSave }) =>
  unsavedChanges && (
    <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-amber-800 dark:text-amber-300">
          You have unsaved changes
        </p>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-2 rounded-lg hover:from-[#B01148] hover:to-[#E63971] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <FaSave />
          Save Changes
        </button>
      </div>
    </div>
  );

// Main Page Component
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Platform administrator with 5+ years of experience in educational technology.",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2024",
  });

  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    siteName: "EduPlatform",
    siteDescription: "Advanced Learning Management System",
    maintenanceMode: false,
    userRegistration: true,
    emailNotifications: true,
    dataRetentionDays: 90,
    maxFileSize: 50,
    darkMode: false,
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNewUsers: true,
    emailNewContent: true,
    emailSystemUpdates: true,
    emailWeeklyReports: false,
    browserNotifications: true,
    mobileNotifications: false,
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const handleProfileChange = (field: keyof UserProfile, value: string) => {
    setUserProfile((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleSystemChange = (
    field: keyof SystemSettings,
    value: string | boolean | number,
  ) => {
    setSystemSettings((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleNotificationChange = (
    field: keyof NotificationSettings,
    value: boolean,
  ) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // Simulate save operation
    console.log("Saving settings...", {
      userProfile,
      systemSettings,
      notifications,
    });
    setUnsavedChanges(false);

    // Show success toast
    toast.success("Settings saved successfully!");
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: systemSettings.darkMode ? "dark" : "light",
      });
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: systemSettings.darkMode ? "dark" : "light",
      });
      return;
    }

    console.log("Changing password...");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    toast.success("Password changed successfully!");
  };

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

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Header />
        <div className="grid lg:grid-cols-4 gap-8">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-8">
              {activeTab === "profile" && (
                <ProfileTab
                  userProfile={userProfile}
                  handleProfileChange={handleProfileChange}
                />
              )}
              {activeTab === "system" && (
                <SystemTab
                  systemSettings={systemSettings}
                  handleSystemChange={handleSystemChange}
                />
              )}
              {activeTab === "notifications" && (
                <NotificationsTab
                  notifications={notifications}
                  handleNotificationChange={handleNotificationChange}
                />
              )}
              {activeTab === "security" && (
                <SecurityTab
                  passwordData={passwordData}
                  setPasswordData={setPasswordData}
                  handlePasswordChange={handlePasswordChange}
                />
              )}
              <SaveButton
                unsavedChanges={unsavedChanges}
                handleSave={handleSave}
              />
            </div>
            <AccountOverview />
            <ThemeSelector
              systemSettings={systemSettings}
              handleSystemChange={handleSystemChange}
            />
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
