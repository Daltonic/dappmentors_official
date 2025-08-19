// app/auth/verify-email/PageClient.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoClose,
  IoMailOutline,
  IoArrowForward,
} from "react-icons/io5";
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import { useRouter, useSearchParams } from "next/navigation";

// TypeScript interfaces
interface FormData {
  email?: string; // Optional for resend
}

interface FormErrors {
  general?: string;
}

const PageClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isValidToken, setIsValidToken] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Get token from URL params
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      validateToken(tokenParam);
      console.log("Token: ", token);
    } else {
      setIsValidToken(false);
    }
  }, [searchParams, token]);

  // Validate token (simulate API call)
  const validateToken = async (tokenParam: string) => {
    console.log("Validating token:", tokenParam);
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assume token is valid for demo
      setIsSuccess(true);
    } catch {
      setIsValidToken(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend email form submission (if needed for invalid token)
  const handleResendSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email) {
      setErrors({ general: "Email is required to resend verification." });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSuccess(true); // Simulate success
    } catch {
      setErrors({
        general: "Failed to resend verification email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change for resend form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  if (isLoading) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <FaSpinner className="w-8 h-8 animate-spin text-[#D2145A] mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Verifying your email...
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (!isValidToken) {
    return (
      <AuthLayout>
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
          >
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6">
              <IoClose className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Invalid Verification Link
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              This email verification link is invalid or has expired. Please
              request a new verification email.
            </p>

            <form onSubmit={handleResendSubmit} className="space-y-4">
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
                    value={formData.email || ""}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                      errors.general
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                    }`}
                    placeholder="Enter your email address"
                    disabled={isLoading}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <IoMailOutline className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

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
                    Sending...
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Resend Verification Email
                    <IoArrowForward className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </motion.button>
            </form>

            <Link
              href="/auth/login"
              className="block w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold text-lg hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 text-center mt-4"
            >
              Back to Sign In
            </Link>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

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
          Verify Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
            {" "}
            Email
          </span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isSuccess
            ? "Your email has been successfully verified!"
            : "Confirming your email address"}
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
            Email Verified!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Your email address has been successfully verified. You can now
            access all features of Dapp Mentors.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-6">
            <p className="text-green-700 dark:text-green-400 text-sm">
              <strong>Next Steps:</strong> Explore our Web3 courses or join the
              community to start your journey.
            </p>
          </div>

          {/* Action Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/login"
              className="inline-block w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300 text-center"
            >
              Sign In Now
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center h-40">
            <FaSpinner className="w-8 h-8 animate-spin text-[#D2145A] mb-4" />
            <p className="text-gray-600 dark:text-gray-300">
              Verifying email...
            </p>
          </div>
        </motion.div>
      )}
    </AuthLayout>
  );
};

export default PageClient;
