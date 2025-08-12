"use client";

import React, { useState } from "react";
import Button from "../shared/Button";

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="p-6 mt-10 bg-white dark:bg-black rounded-lg shadow-md w-full mx-auto space-y-8">
      <h2 className="text-gray-700 dark:text-gray-400 text-sm mb-2">
        Current Password
      </h2>
      <input
        type="password"
        placeholder="Enter current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full p-2 bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-gray-600 rounded-lg mb-4 text-white"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            New Password
          </h2>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-gray-600 rounded-lg text-white"
          />
        </div>
        <div>
          <h2 className="text-gray-700 dark:text-gray-400 text-sm mb-2">
            Confirm New Password
          </h2>
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-gray-600 rounded-lg text-white"
          />
        </div>
      </div>

      <Button
        label="Save Changes"
        className="mt-6 bg-[#D2145A] text-white px-4 py-2 flex items-center justify-center gap-2 w-full md:w-auto dark:hover:bg-white dark:hover:text-[#D2145A] hover:border-[#D2145A] transition-colors duration-500 rounded-lg"
      />
    </div>
  );
}
