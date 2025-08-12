"use client";

import { useState } from "react";
import ProfileForm from "./ProfileForm";
import Security from "./Security";
import { AccountFormData } from "@/utils/interfaces";

export default function MyAccount() {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  const handleProfileSubmit = (data: AccountFormData) => {
    console.log("Updated Profile:", data);
  };

  return (
    <div className="p-6 h-screen">
      <div className="dark:bg-[#0F0F0F] mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Tabs */}
        <div className="flex border-b border-gray-600">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-medium ${
              activeTab === "profile"
                ? "text-[#E91764] border-b-2 border-[#E91764]"
                : "text-gray-400"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 font-medium ${
              activeTab === "security"
                ? "text-[#E91764] border-b-2 border-[#E91764]"
                : "text-gray-400"
            }`}
          >
            Security
          </button>
        </div>

        {/* Profile Form */}
        {activeTab === "profile" && (
          <ProfileForm onSubmit={handleProfileSubmit} />
        )}

        {/* Security Tab Placeholder */}
        {activeTab === "security" && <Security />}
      </div>
    </div>
  );
}
