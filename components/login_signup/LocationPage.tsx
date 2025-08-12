"use client";

import Image from "next/image";
import React, { useState, FormEvent } from "react";
import LoginSignUpNav from "@/components/shared/LoginSignUpNav";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LocationPage() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!city || !country) {
      setError("City and country are required");
      return;
    }

    // Retrieve signup data from localStorage
    const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");

    if (!signupData.firstName || !signupData.email || !signupData.password) {
      setError("Previous step data missing. Please start over.");
      return;
    }

    // Combine data and submit to API
    const completeData = {
      ...signupData,
      city,
      country,
    };

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completeData),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.details);
      return;
    }

    // Clear temporary data
    localStorage.removeItem("signupData");

    // Redirect to login page
    router.push("/auth/login");
  };

  return (
    <div className="flex min-h-fit items-center justify-center p-4 sm:px-6 transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col lg:flex-row">
        <div className="w-full md:max-w-5xl flex flex-col justify-center p-8">
          <LoginSignUpNav />
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-6 text-center">
            ← Your Location
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
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                required
              >
                <option value="">Choose country</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Japan">Japan</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
                City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D2145A] transition"
                required
              >
                <option value="">Choose city</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Tokyo">Tokyo</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#211464] text-white py-3 rounded-lg hover:bg-[#1A0E30] transition text-lg font-medium"
            >
              Next
            </button>
          </form>
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
