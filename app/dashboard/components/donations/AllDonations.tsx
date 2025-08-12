
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DonationPage from "./DonationPage";

export default function AllDonations() {
  const [activeTab, setActiveTab] = useState("top");
  const [handleGoBack, setHandleGoBack] = useState(false);

  const handleBack = () => setHandleGoBack(true);

  if (handleGoBack) return <DonationPage />;

  const topDonors = Array(4).fill({
    name: "Mark Williams",
    donations: 14,
    amount: "$1,000.00",
    avatar: "/images/dashboard/Ellipse 5.png",
  });

  const donations = Array(10).fill({
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283809 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  });

  return (
    <div className="max-w-6xl mx-auto rounded-lg">
      <button onClick={handleBack} className="mb-4 text-sm hover:text-[#D2145A] transition all duration-500">
        ← Go Back
      </button>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="flex flex-col gap-4 h-full">
          <div className="bg-white dark:bg-black p-4 py-12 rounded-lg shadow-sm flex-1">
            <p className="text-gray-500">Total Donations</p>
            <h2 className="text-2xl sm:text-3xl font-bold">$23,000.00</h2>
          </div>
          <div className="bg-white dark:bg-black p-4 py-12 rounded-lg shadow-sm flex-1">
            <p className="text-gray-500">Total Donors</p>
            <h2 className="text-2xl sm:text-3xl font-bold">1000</h2>
          </div>
        </div>

        {/* Donors Section */}
        <div className="bg-white dark:bg-black p-4 rounded-lg shadow-sm h-full">
          <div className="flex flex-col sm:flex-row justify-between border-b border-gray-300 pb-2 gap-2">
            <h3 className="text-base sm:text-lg font-semibold">Donors</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab("top")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md whitespace-nowrap ${
                  activeTab === "top" ? "bg-black text-white" : "text-gray-500"
                }`}
              >
                Top Donors
              </button>
              <button
                onClick={() => setActiveTab("latest")}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md whitespace-nowrap ${
                  activeTab === "latest"
                    ? "bg-black text-white"
                    : "text-gray-500"
                }`}
              >
                Latest Donors
              </button>
            </div>
          </div>
          <div className="mt-4 space-y-4">
            {topDonors.map((donor, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <Image
                    src={donor.avatar}
                    width={40}
                    height={40}
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{donor.name}</p>
                    <p className="text-gray-500 text-sm">
                      {donor.donations} donations
                    </p>
                  </div>
                </div>
                <p className="font-bold">{donor.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Donations Table */}
      <div className="bg-white dark:bg-black p-4 sm:p-6 rounded-lg shadow-sm mt-6">
        <h3 className="text-lg font-semibold mb-4">All Donations</h3>
        <div className="overflow-x-auto dark:bg-[#1A1A1A] rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300 dark:border-black text-left text-gray-600">
                <th className="py-2 px-3">S/N</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3 hidden md:table-cell">Time</th>
                <th className="py-2 px-3 hidden md:table-cell">Project</th>
                <th className="py-2 px-3 hidden md:table-cell">Amount</th>
                <th className="py-2 px-3 hidden md:table-cell">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-300 dark:border-black"
                >
                  <td className="py-2 px-3">{index + 1}</td>
                  <td className="py-2 px-3 flex items-center gap-2">
                    <Image
                      src={donation.avatar}
                      width={30}
                      height={30}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    {donation.name}
                  </td>
                  <td className="py-2 px-3">{donation.date}</td>
                  <td className="py-2 px-3 hidden md:table-cell">
                    {donation.time}
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell">
                    {donation.project}
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell">
                    {donation.amount}
                  </td>
                  <td className="py-2 px-3 text-blue-500 hidden md:table-cell">
                    {donation.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button className="p-2 rounded-md bg-gray-300 dark:bg-[#1A1A1A] hover:bg-gray-400">
            <FaChevronLeft />
          </button>
          <div className="flex space-x-2">
            {[1, 2, 3, "...", 9, 10].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md ${
                  page === 1 ? "bg-black text-[#D2145A]" : "text-gray-500"
                } hidden sm:inline-block`}
              >
                {page}
              </button>
            ))}
            {[1, 2, 3].map((page, index) => (
              <button
                key={index}
                className={`px-3 py-1 rounded-md ${
                  page === 1 ? "bg-black text-white" : "text-gray-500"
                } sm:hidden`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-2 rounded-md bg-gray-300 dark:bg-[#1A1A1A] hover:bg-gray-400">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
