"use client";

import Image from "next/image";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaGoogle, FaApple, FaTwitter } from "react-icons/fa";
import LoginSignUpNav from "@/components/shared/LoginSignUpNav";
import Link from "next/link";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.details || "Login failed");
      }

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log("user", data.data);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="flex min-h-fit p-4 sm:px-6 items-center justify-center transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:max-w-5xl flex flex-col justify-center items-center p-6 transition-colors mx-auto">
            <div className="w-full">
              <LoginSignUpNav />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-center mt-4 text-gray-900 dark:text-white">
              Welcome back!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            <form
              className="w-full max-w-sm sm:max-w-md mt-6"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Email
                </label>
                <div className="relative">
                  <MdEmail
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={22}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                  Password
                </label>
                <div className="relative">
                  <RiLockPasswordFill
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
                    size={22}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter password"
                    required
                  />
                </div>
              </div>
              <Link
                href="/auth/forgotpassword"
                className="text-[#D2145A] text-sm block mt-1"
              >
                Forgot login details?
              </Link>
              <button
                type="submit"
                className="w-full bg-[#211464] text-white py-3 rounded-lg mt-4 hover:bg-[#1A0E30] transition text-lg font-medium"
              >
                Login
              </button>
            </form>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
              {"Don't"} have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-[#211464] dark:text-[#D2145A] font-medium"
              >
                Sign Up
              </Link>
            </p>
            <div className="text-center text-gray-400 dark:text-gray-500 my-4">
              or
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaGoogle className="text-red-500" size={20} />
                <span>Google</span>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaApple className="text-black dark:text-white" size={20} />
                <span>Apple</span>
              </button>
              <button className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <FaTwitter className="text-blue-400" size={20} />
                <span>Twitter</span>
              </button>
            </div>
            <div className="w-full text-center mt-10 py-4 text-gray-500 dark:text-gray-400 text-sm">
              YFF © 2024. All rights reserved.
            </div>
          </div>
          <div className="hidden w-[800px] lg:block h-auto">
            <div className="relative h-full">
              <Image
                src="/images/login_signup/Container.png"
                alt="Background Image"
                layout="fill"
                className="object-cover rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
