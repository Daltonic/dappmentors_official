"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import LoginSignUpNav from "@/components/shared/LoginSignUpNav";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Added password field
  const [gender, setGender] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!firstName || !lastName || !email || !password || !gender) {
      setError("All fields are required");
      return;
    }

    // Store data in localStorage temporarily
    const signupData = {
      firstName,
      lastName,
      email,
      password,
      gender,
      authType: "email",
    };
    localStorage.setItem("signupData", JSON.stringify(signupData));

    // Redirect to location page
    router.push("/auth/location");
  };

  return (
    <div className="flex min-h-fit p-4 sm:px-6 items-center justify-center transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col">
        <div className="flex flex-col justify-center lg:flex-row">
          <div className="w-full md:max-w-5xl flex flex-col justify-center p-8 sm:p-12">
            <LoginSignUpNav />
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mt-6 text-center">
              Sign Up
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-center">
              Lorem ipsum dolor sit amet consectetur.
            </p>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="flex justify-center w-full">
              <form
                className="w-full max-w-sm sm:max-w-md mt-6"
                onSubmit={handleSubmit}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Gender
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-radio text-[#D2145A]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Male
                      </span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                        className="form-radio text-[#D2145A]"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        Female
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#211464] text-white py-3 rounded-lg mt-4 hover:bg-[#1A0E30] transition text-lg font-medium"
                >
                  Next
                </button>
              </form>
            </div>
            <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-[#211464] dark:text-[#D2145A] font-medium"
              >
                Login
              </Link>
            </p>
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
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
