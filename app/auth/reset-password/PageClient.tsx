"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import AuthLayout from "@/components/layouts/AuthLayout";
import {
  IoArrowBack,
  IoCheckmarkCircle,
  IoEyeOutline,
  IoEyeOffOutline,
  IoInformationCircle,
  IoArrowForward,
  IoClose,
} from "react-icons/io5";
import { FaSpinner } from "react-icons/fa"; // For loading spinner
import { useRouter, useSearchParams } from "next/navigation";

// TypeScript interfaces
interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password?: string;
  confirmPassword?: string;
  general?: string;
}

const PageClient: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState<boolean>(true);

  // Get token from URL params
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      // In real implementation, validate token with backend
      validateToken(tokenParam);
    } else {
      setIsValidToken(false);
    }
  }, [searchParams]);

  // Validate token (simulate API call)
  const validateToken = async (tokenParam: string) => {
    console.log("Validating token:", tokenParam);
    try {
      // Simulate token validation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // For demo purposes, assume token is valid
      // In real implementation, make API call to validate
      setIsValidToken(true);
    } catch {
      setIsValidToken(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (
    password: string,
  ): { strength: number; text: string; color: string } => {
    let strength = 0;
    const requirements = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /\d/.test(password),
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    ];

    strength = requirements.filter(Boolean).length;

    if (strength <= 2) return { strength, text: "Weak", color: "text-red-500" };
    if (strength <= 3)
      return { strength, text: "Fair", color: "text-yellow-500" };
    if (strength <= 4)
      return { strength, text: "Good", color: "text-blue-500" };
    return { strength, text: "Strong", color: "text-green-500" };
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

      // Handle successful password reset
      console.log("Password reset successful for token:", token);
      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({
        general:
          "Failed to reset password. Please try again or request a new reset link.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Invalid token view
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
              <IoClose className="w-8 h-8 text-white" />{" "}
              {/* Using IoClose from io5 for invalid state */}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Invalid Reset Link
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              This password reset link is invalid or has expired. Please request
              a new password reset link.
            </p>

            <div className="space-y-3">
              <Link
                href="/forgot-password"
                className="block w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300 text-center"
              >
                Request New Reset Link
              </Link>

              <Link
                href="/auth/login"
                className="block w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/20 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-semibold text-lg hover:bg-white/70 dark:hover:bg-white/10 transition-all duration-300 text-center"
              >
                Back to Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

  const passwordStrength = getPasswordStrength(formData.password);

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
          {isSuccess ? "Password" : "Create New"}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D2145A] to-[#FF4081] animate-pulse">
            {isSuccess ? " Updated!" : " Password"}
          </span>
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isSuccess
            ? "Your password has been successfully updated"
            : "Choose a strong password to secure your account"}
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
            Password Reset Complete!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Your password has been successfully updated. You can now sign in to
            your account with your new password.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-6">
            <p className="text-green-700 dark:text-green-400 text-sm">
              <strong>Security Tip:</strong> For your account security, consider
              enabling two-factor authentication after signing in.
            </p>
          </div>

          {/* Action Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/login"
              className="inline-block w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300 text-center"
            >
              Continue to Sign In
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        /* Reset Password Form */
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
            {/* New Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.password
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Enter your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.password && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-6 h-1 rounded-full transition-all duration-300 ${
                            level <= passwordStrength.strength
                              ? level <= 2
                                ? "bg-red-400"
                                : level <= 3
                                  ? "bg-yellow-400"
                                  : level <= 4
                                    ? "bg-blue-400"
                                    : "bg-green-400"
                              : "bg-gray-200 dark:bg-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span
                      className={`text-xs font-medium ${passwordStrength.color}`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                </motion.div>
              )}

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

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 bg-white/50 dark:bg-white/5 border-2 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 transition-all duration-300 ${
                    errors.confirmPassword
                      ? "border-red-300 dark:border-red-600 focus:border-red-500"
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border-[#FF4081]"
                  }`}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  {showConfirmPassword ? (
                    <IoEyeOffOutline className="w-5 h-5" />
                  ) : (
                    <IoEyeOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <IoInformationCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-blue-700 dark:text-blue-400 text-sm">
                  <p className="font-medium mb-1">Password Requirements:</p>
                  <div className="space-y-1">
                    <p
                      className={
                        formData.password.length >= 8
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }
                    >
                      • At least 8 characters long
                    </p>
                    <p
                      className={
                        /[A-Z]/.test(formData.password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }
                    >
                      • One uppercase letter
                    </p>
                    <p
                      className={
                        /[a-z]/.test(formData.password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }
                    >
                      • One lowercase letter
                    </p>
                    <p
                      className={
                        /\d/.test(formData.password)
                          ? "text-green-600 dark:text-green-400"
                          : ""
                      }
                    >
                      • At least one number
                    </p>
                  </div>
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
                  Updating Password...
                </div>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Update Password
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
