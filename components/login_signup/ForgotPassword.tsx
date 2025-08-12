"use client";

import Image from "next/image";
import React, { useState, FormEvent } from "react";
import LoginSignUpNav from "@/components/shared/LoginSignUpNav";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || "Failed to send reset PIN");
      }

      setMessage("Reset PIN sent. Check console for PIN.");
      setTimeout(() => router.push("/auth/setnewpassword"), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:px-6 transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col lg:flex-row">
        <div className="w-full md:max-w-5xl flex flex-col justify-center items-center text-center p-8 sm:p-12">
          <LoginSignUpNav />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-6">
            ← Forgot Password
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-sm">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <form
            className="w-full max-w-sm sm:max-w-md mt-6"
            onSubmit={handleSubmit}
          >
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1 text-left">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
              placeholder="Enter your email address"
              required
            />
            <button
              type="submit"
              className="w-full max-w-xs bg-[#211464] text-white py-3 px-4 rounded-lg hover:bg-[#1A0E30] transition text-lg font-medium mt-6"
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
