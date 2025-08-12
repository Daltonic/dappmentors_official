import MarketingLayout from "@/components/layouts/MarketingLayout";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import React from "react";
import Button from "@/components/shared/Button";

export default function ContactPage() {
  return (
    <MarketingLayout>
      <div className="min-h-fit flex items-center justify-center p-6">
        <div className="p-8 md:flex md:space-x-8 w-full max-w-5xl">
          {/* Left Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Contact us if you have a question and we will answer within a
              week.
            </p>
            <div>
              <small className="font-semibold text-[12px]">Call Us:</small>
              <div className="flex items-center mb-2">
                <FaPhoneAlt className="text-[#D2145A] mr-3" />
                <span className="text-gray-700 dark:text-gray-500">
                  +123 4567 890
                </span>
              </div>
            </div>

            <div>
              <small className="font-semibold text-[12px]">Email Us:</small>
              <div className="flex items-center mb-2">
                <FaEnvelope className="text-[#D2145A] mr-3" />
                <span className="text-gray-700 dark:text-gray-500">
                  mail@organizationname.com
                </span>
              </div>
            </div>

            <div>
              <small className=" font-semibold text-[12px]">
                Office Address
              </small>
              <div className="flex items-center mb-2">
                <FaMapMarkerAlt className="text-[#D2145A] mr-3" />
                <span className="text-gray-700 dark:text-gray-500">
                  1782 Ademola Adetokumbo Crescent, Abuja, Nigeria.
                </span>
              </div>
            </div>

            <div>
              <small className="font-semibold text-[12px]">Follow Us:</small>
              <div className="flex space-x-4">
                <FaTwitter className="text-[#D2145A] text-xl cursor-pointer hover:opacity-75" />
                <FaLinkedin className="text-[#D2145A] text-xl cursor-pointer hover:opacity-75" />
                <FaInstagram className="text-[#D2145A] text-xl cursor-pointer hover:opacity-75" />
                <FaFacebook className="text-[#D2145A] text-xl cursor-pointer hover:opacity-75" />
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-[#D2145A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full p-3 border rounded-lg focus:outline-[#D2145A] focus:ring-1 focus:ring-[#D2145A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-[#D2145A]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-3 border rounded-lg focus:outline-[#D2145A] focus:ring-1 focus:ring-[#D2145A]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organization/Company <span className="text-[#D2145A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your organization"
                  className="w-full p-3 border rounded-lg focus:outline-[#D2145A] focus:ring-1 focus:ring-[#D2145A]"
                />
              </div>
              <Button
                label="Send Message"
                className="w-full bg-[#D2145A] hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] text-white py-2 rounded-lg font-semibold transition-colors duration-500"
              />
            </form>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
