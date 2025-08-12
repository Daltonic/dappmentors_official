import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginSignUpNav from "../shared/LoginSignUpNav";

export default function CheckEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:px-6 transition-colors">
      <div className="flex w-full max-w-6xl overflow-hidden flex-col lg:flex-row">
        {/* Left Section - Email Verification Message */}
        <div className="w-full md:max-w-5xl flex flex-col justify-center p-8 sm:p-12 items-center text-center">
          {/* Logo & Support Button */}
          <LoginSignUpNav />

          {/* Email Icon */}
          <div className="flex items-center justify-center bg-[#FFEFF5] p-4 rounded-full mb-4">
            <div className="w-16 h-16 relative">
              <Image
                src="/images/login_signup/Group.png" // Replace with actual email icon path
                alt="Email Icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Check your email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-sm">
            We sent a verification link to{" "}
            <span className="font-semibold text-black dark:text-white">
              olivia@example.com
            </span>
            . Please click the link in the email to verify your account.
          </p>

          {/* Resend Email */}
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            {"Didn’t"} receive an email?{" "}
            <Link href="#" className="text-[#D2145A] font-medium">
              Resend
            </Link>
          </p>

          {/* Back to Login Button */}
          <Link href="/auth/login">
            
            <button className="w-full max-w-xs bg-[#211464] text-white py-3 px-4 rounded-lg hover:bg-[#1A0E30] dark:hover:bg-[#3A1D65] transition text-lg font-medium mt-6">Back to Login</button>
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
