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
  IoTimeOutline,
} from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

// TypeScript interfaces
interface FormData {
  email?: string;
}

interface FormErrors {
  email?: string;
  general?: string;
}

interface VerificationState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  userEmail?: string;
}

const PageClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [verificationState, setVerificationState] = useState<VerificationState>(
    {
      isLoading: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    },
  );

  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isResending, setIsResending] = useState<boolean>(false);

  // Get token and email from URL params
  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (email) {
      setFormData({ email: decodeURIComponent(email) });
    }

    if (token) {
      // If we have a token, verify it immediately
      verifyEmailToken(token);
    } else if (!email) {
      // No token and no email - redirect to signup
      router.push("/auth/signup");
    }
    // If we have email but no token, show the waiting/resend interface
  }, [searchParams, router]);

  // Verify email token with API
  const verifyEmailToken = async (token: string) => {
    setVerificationState((prev) => ({
      ...prev,
      isLoading: true,
      isError: false,
    }));

    try {
      const response = await fetch("/api/auth/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verify-email",
          token: token,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationState({
          isLoading: false,
          isSuccess: true,
          isError: false,
          errorMessage: "",
        });
      } else {
        setVerificationState({
          isLoading: false,
          isSuccess: false,
          isError: true,
          errorMessage: data.error || "Verification failed",
        });
      }
    } catch (error) {
      console.error("Email verification error:", error);
      setVerificationState({
        isLoading: false,
        isSuccess: false,
        isError: true,
        errorMessage: "Network error. Please try again.",
      });
    }
  };

  // Handle resend verification email
  const handleResendSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email) {
      setErrors({ email: "Email is required to resend verification." });
      return;
    }

    setIsResending(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationState((prev) => ({
          ...prev,
          errorMessage: "Verification email sent! Please check your inbox.",
        }));
      } else {
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({
            general: data.error || "Failed to resend verification email.",
          });
        }
      }
    } catch (error) {
      console.error("Resend verification error:", error);
      setErrors({
        general: "Network error. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  // Handle input change for resend form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  // Loading state during verification
  if (verificationState.isLoading) {
    return (
      <AuthLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center mb-6">
              <FaSpinner className="w-8 h-8 animate-spin text-white" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Verifying Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we confirm your email address...
            </p>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

  // Success state
  if (verificationState.isSuccess) {
    return (
      <AuthLayout>
        <div className="text-center mb-8">
          <h1 className="font-cambo text-4xl md:text-5xl font-normal tracking-tight text-gray-900 dark:text-white mb-4">
            Email
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              {" "}
              Verified!
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Welcome to the Web3 development community
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 200,
            }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6"
          >
            <IoCheckmarkCircle className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Successfully Verified!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Your email address has been confirmed. Your account is now active
            and you can access all features of Dapp Mentors.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-8">
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
              🎉 What&apos;s next?
            </h3>
            <ul className="text-green-700 dark:text-green-400 text-sm space-y-1 text-left">
              <li>• Explore our comprehensive Web3 courses</li>
              <li>• Join the developer community</li>
              <li>• Start building your first dApp</li>
              <li>• Connect with mentors and peers</li>
            </ul>
          </div>

          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/login"
                className="inline-block w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Sign In to Your Account
                  <IoArrowForward className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>

            <Link
              href="/"
              className="block text-gray-600 dark:text-gray-400 hover:text-[#D2145A] dark:hover:text-[#FF4081] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </AuthLayout>
    );
  }

  // Error state or waiting for verification
  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D2145A]/10 to-[#FF4081]/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6"
        >
          <span className="flex items-center gap-2 text-[#D2145A] font-semibold text-sm uppercase tracking-wider">
            <IoArrowBack className="w-4 h-4" />
            Back to Signup
          </span>
          <div className="w-2 h-2 bg-[#D2145A] rounded-full animate-pulse" />
        </button>

        <h1 className="font-cambo text-4xl md:text-5xl font-normal tracking-tight text-gray-900 dark:text-white mb-4">
          {verificationState.isError ? "Verification" : "Check Your"}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
            {" "}
            {verificationState.isError ? "Failed" : "Email"}
          </span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          {verificationState.isError
            ? "There was an issue verifying your email"
            : "We've sent you a verification link"}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
      >
        {verificationState.isError ? (
          <>
            {/* Error State */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-4">
                <IoClose className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Verification Failed
              </h2>
              <p className="text-red-600 dark:text-red-400 mb-4">
                {verificationState.errorMessage}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                The verification link may have expired or is invalid. Please
                request a new verification email.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Waiting State */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
                <IoMailOutline className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Verification Email Sent
              </h2>
              {formData.email && (
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We&apos;ve sent a verification link to{" "}
                  <span className="font-semibold text-[#D2145A]">
                    {formData.email}
                  </span>
                </p>
              )}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-400 text-sm">
                  <IoTimeOutline className="w-4 h-4" />
                  <span>
                    Check your inbox and click the verification link to activate
                    your account
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* General Error Message */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl mb-6 text-sm text-center"
          >
            {errors.general}
          </motion.div>
        )}

        {/* Resend Form */}
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
                  errors.email
                    ? "border-red-300 dark:border-red-600 focus:border-red-500"
                    : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                }`}
                placeholder="Enter your email address"
                disabled={isResending}
                required
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

          <motion.button
            type="submit"
            disabled={isResending}
            whileHover={{ scale: isResending ? 1 : 1.02 }}
            whileTap={{ scale: isResending ? 1 : 0.98 }}
            className={`w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
              isResending
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-xl hover:shadow-[#D2145A]/25"
            }`}
          >
            {isResending ? (
              <div className="flex items-center justify-center gap-2">
                <FaSpinner className="w-5 h-5 animate-spin" />
                Sending...
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Resend Verification Email
                <IoArrowForward className="w-5 h-5" />
              </span>
            )}
          </motion.button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 space-y-3">
          <Link
            href="/auth/login"
            className="block w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold text-center hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300"
          >
            Back to Sign In
          </Link>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Didn&apos;t receive the email? Check your spam folder or try
            resending.
          </p>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default PageClient;
