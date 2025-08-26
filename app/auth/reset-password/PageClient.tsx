// app/auth/reset-password/PageClient.tsx
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
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [isTokenChecking, setIsTokenChecking] = useState<boolean>(true);

  // Get token from URL params
  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
      validateToken(tokenParam);
    } else {
      setIsValidToken(false);
      setIsTokenChecking(false);
    }
  }, [searchParams]);

  // Validate token with API
  const validateToken = async (tokenParam: string) => {
    setIsTokenChecking(true);
    try {
      const response = await fetch(
        `/api/auth/reset-password?token=${tokenParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok && data.valid) {
        setIsValidToken(true);
      } else {
        setIsValidToken(false);
        setErrors({
          general: data.error || "Invalid or expired reset token.",
        });
      }
    } catch (error) {
      console.error("Token validation error:", error);
      setIsValidToken(false);
      setErrors({
        general: "Network error. Please try again.",
      });
    } finally {
      setIsTokenChecking(false);
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
    if (errors.general) {
      setErrors((prev) => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm() || !token) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
      } else {
        if (data.details) {
          setErrors(data.details);
        } else {
          setErrors({
            general: data.error || "Failed to reset password.",
          });
        }
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setErrors({
        general: "Network error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state during token check
  if (isTokenChecking) {
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
              Validating Reset Link
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we verify your password reset token...
            </p>
          </motion.div>
        </div>
      </AuthLayout>
    );
  }

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
                href="/auth/forgot-password"
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
            Password Reset Complete!
          </h2>

          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            Your password has been successfully updated. You can now sign in to
            your account with your new password.
          </p>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-8">
            <p className="text-green-700 dark:text-green-400 text-sm">
              <strong>Security Tip:</strong> For your account security, consider
              enabling two-factor authentication after signing in.
            </p>
          </div>

          {/* Action Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/auth/login"
              className="inline-block w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-[#D2145A]/25 transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2">
                Continue to Sign In
                <IoArrowForward className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ) : (
        /* Reset Password Form */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl"
        >
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

          <form onSubmit={handleSubmit} className="space-y-4">
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
                  required
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
                      : "border-gray-200 dark:border-white/20 focus:border-[#D2145A] dark:focus:border[#FF4081]"
                  }`}
                  placeholder="Confirm your new password"
                  disabled={isLoading}
                  required
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
                  <IoArrowForward className="w-5 h-5" />
                </span>
              )}
            </motion.button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-white/10 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[#D2145A] dark:hover:text-[#FF4081] transition-colors font-medium"
            >
              Remember your password? Sign in instead
            </Link>
          </div>
        </motion.div>
      )}

      {/* Sign Up Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center mt-6 text-gray-600 dark:text-gray-400"
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-[#D2145A] hover:text-[#FF4081] transition-colors font-semibold"
        >
          Sign up here
        </Link>
      </motion.div>
    </AuthLayout>
  );
};

export default PageClient;
