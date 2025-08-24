"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  IoArrowBack,
  IoPersonOutline,
  IoMailOutline,
  IoEyeOutline,
  IoEyeOffOutline,
  IoArrowForward,
} from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { useRouter } from "next/navigation";

// TypeScript interfaces
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  general?: string;
}

const PageClient: React.FC = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      newErrors.general =
        "You must accept the Terms of Service and Privacy Policy to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear specific error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear general error if terms checkbox was the issue
    if (name === "acceptTerms" && errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          acceptTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({ general: data.error || "Registration failed" });
        }
        return;
      }

      // Success - redirect to verification page
      router.push(
        "/auth/verify-email?email=" + encodeURIComponent(formData.email),
      );
    } catch (error) {
      console.error("Signup error:", error);
      setErrors({
        general: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      {/* Header Section */}
      <div className="text-center mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
        >
          <span className="flex items-center gap-2 text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
            <IoArrowBack className="w-4 h-4" />
            Go Back
          </span>
          <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse" />
        </button>

        <h1 className="font-cambo text-4xl md:text-5xl font-normal tracking-tight text-gray-900 dark:text-white mb-4">
          Create Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
            {" "}
            Account
          </span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          Join the Web3 development community
        </p>
      </div>

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
      >
        {/* General Error Message */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm"
          >
            {errors.general}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name Field */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                First Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.firstName
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Enter first name"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <IoPersonOutline className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            {/* Last Name Field */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.lastName
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Enter last name"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <IoPersonOutline className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.email
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <IoMailOutline className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.password
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Create password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            {/* Terms and Conditions */}
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 text-[#D2145A] bg-white/50 dark:bg-white/5 border-gray-300 dark:border-white/20 rounded focus:ring-[#D2145A] focus:ring-2 mt-0.5"
                disabled={isLoading}
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-medium"
                >
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className={`w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isLoading
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:shadow-[#D2145A]/25"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
                <IoArrowForward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            )}
          </motion.button>
        </form>

        {/* Social Login Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-white/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white/80 dark:bg-white/10 px-4 text-gray-500 dark:text-gray-400">
              Or sign up with
            </span>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
          >
            <FcGoogle className="w-5 h-5" />
            Google
          </button>

          <button
            type="button"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 disabled:opacity-50"
          >
            <FaXTwitter className="w-5 h-5" />
            Twitter
          </button>
        </div>
      </motion.div>

      {/* Sign In Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-semibold"
          >
            Sign in here
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default PageClient;
