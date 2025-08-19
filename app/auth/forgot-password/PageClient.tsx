"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  IoArrowBack,
  IoArrowForward,
  IoCheckmarkCircle,
  IoMailOutline,
} from "react-icons/io5";
import { IoInformationCircle } from "react-icons/io5"; // For info box
import { IoHelpCircleOutline } from "react-icons/io5"; // For help section
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import { useRouter } from "next/navigation";

// TypeScript interfaces
interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

const PageClient: React.FC = () => {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle successful password reset request
      console.log("Password reset email sent to:", formData.email);
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({
        general: "Failed to send reset email. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form to try again
  const handleTryAgain = () => {
    setIsSuccess(false);
    setFormData({ email: "" });
    setErrors({});
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
          {isSuccess ? "Check Your" : "Reset Your"}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
            {isSuccess ? " Email" : " Password"}
          </span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isSuccess
            ? "We've sent password reset instructions to your email"
            : "Enter your email to receive password reset instructions"}
        </p>
      </div>

      {/* Success State */}
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
          >
            <IoCheckmarkCircle className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Email Sent Successfully!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            We&apos;ve sent password reset instructions to{" "}
            <span className="font-semibold text-[#D2145A]">
              {formData.email}
            </span>
            . Please check your inbox and follow the instructions to reset your
            password.
          </p>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6">
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              <strong>Didn&apos;t receive the email?</strong> Check your spam
              folder or wait a few minutes for delivery.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              type="button"
              onClick={handleTryAgain}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300"
            >
              Send to Different Email
            </motion.button>

            <Link
              href="/auth/login"
              className="block w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold text-lg hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 text-center"
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      ) : (
        /* Forgot Password Form */
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
                  placeholder="Enter your email address"
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

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <IoInformationCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-700 dark:text-blue-400 text-sm">
                  <p className="font-medium mb-1">What happens next?</p>
                  <p>
                    We&apos;ll send you a secure link to reset your password.
                    The link will be valid for 24 hours.
                  </p>
                </div>
              </div>
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
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  Sending Reset Link...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Reset Link
                  <IoArrowForward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </motion.button>

            {/* Alternative Actions */}
            <div className="text-center">
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#D2145A] transition-colors font-medium"
              >
                Remember your password? Sign in instead
              </Link>
            </div>
          </form>
        </motion.div>
      )}

      {/* Help Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8"
      >
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-white/10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Need Help?
          </h3>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-start gap-2">
              <IoHelpCircleOutline className="w-4 h-4 text-[#D2145A] mt-0.5 flex-shrink-0" />
              <span>Make sure to check your spam or junk folder</span>
            </div>

            <div className="flex items-start gap-2">
              <IoHelpCircleOutline className="w-4 h-4 text-[#D2145A] mt-0.5 flex-shrink-0" />
              <span>Reset links expire after 24 hours for security</span>
            </div>

            <div className="flex items-start gap-2">
              <IoHelpCircleOutline className="w-4 h-4 text-[#D2145A] mt-0.5 flex-shrink-0" />
              <span>
                Still having trouble?{" "}
                <Link
                  href="/contact"
                  className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-medium"
                >
                  Contact Support
                </Link>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-6"
      >
        <p className="text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-semibold"
          >
            Sign up here
          </Link>
        </p>
      </motion.div>
    </AuthLayout>
  );
};

export default PageClient;
