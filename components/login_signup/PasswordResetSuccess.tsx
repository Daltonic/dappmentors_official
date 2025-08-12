import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginSignUpNav from "../shared/LoginSignUpNav";
import { FaCheckCircle } from "react-icons/fa";

export default function PasswordResetSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:px-6 transition-colors bg-gray-100 dark:bg-gray-900">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Left Section - Success Message */}
        <div className="w-full md:max-w-5xl flex flex-col justify-center items-center text-center p-8 sm:p-12">
          {/* Logo & Support Button */}
          <LoginSignUpNav />

          {/* Success Icon */}
          <FaCheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mt-6" />

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mt-4">
            Successful
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-sm">
            Your password has been successfully reset. Click below to log in.
          </p>

          {/* Proceed to Login Button */}
          <Link href="/auth/login">
            <button className="w-full bg-[#211464] text-white px-4 py-3 rounded-lg hover:bg-[#1A0E30] dark:hover:bg-[#3A1D65] transition text-lg font-medium mt-6">
              Proceed to Login
            </button>
          </Link>

          {/* Footer */}
          <div className="text-center mt-10 text-gray-500 dark:text-gray-400 text-sm">
            YFF © 2024. All rights reserved.
          </div>
        </div>

        {/* Right Section - Background Image */}
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
