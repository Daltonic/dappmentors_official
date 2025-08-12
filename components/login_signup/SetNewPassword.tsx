"use client";

import Image from "next/image";
import React, { useState, FormEvent } from "react";
import LoginSignUpNav from "@/components/shared/LoginSignUpNav";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SetNewPassword() {
  const [resetPin, setResetPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !resetPin || !newPassword || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/recover-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, resetPin, newPassword, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || "Password reset failed");
      }

      router.push("/auth/passwordresetsuccess");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="flex min-h-fit items-center justify-center p-4 sm:px-6 transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col lg:flex-row">
        <div className="w-full md:max-w-5xl flex flex-col justify-center p-8 sm:p-12">
          <LoginSignUpNav />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-6 text-center">
            Set New Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form
            className="w-full max-w-sm sm:max-w-md mt-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Reset PIN
              </label>
              <input
                type="text"
                value={resetPin}
                onChange={(e) => setResetPin(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                placeholder="Enter reset PIN"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#211464] text-white py-3 rounded-lg hover:bg-[#1A0E30] transition text-lg font-medium"
            >
              Reset Password
            </button>
          </form>
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
            YFF © 2024. All rights reserved.
          </div>
        </div>
        <div className="hidden lg:block w-[800px] relative">
          <Image
            src="/images/login_signup/Container.png"
            alt="Background Image"
            layout="fill"
            className="object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
}
