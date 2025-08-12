"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiFolderPlus } from "react-icons/fi";

interface Donation {
  id: number;
  name: string;
  date: string;
  time: string;
  project: string;
  amount: string;
  transactionId: string;
  avatar: string;
}

// 🔹 Store the FULL donation list
const allDonations: Donation[] = [
  {
    id: 1,
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283909 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  },
  {
    id: 2,
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283909 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  },
  {
    id: 3,
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283909 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  },
  {
    id: 4,
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283909 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  },
  {
    id: 5,
    name: "Mark Williams",
    date: "4th of May, 2024",
    time: "10:30 pm",
    project: "Nesco Payment",
    amount: "$1,000.00",
    transactionId: "AH 283909 rd",
    avatar: "/images/dashboard/Ellipse 5.png",
  },
];

export default function RecentDonations() {
  const [showDonations, setShowDonations] = useState(false);

  return (
    <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
      {/* 🔹 Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-black dark:text-white flex items-center gap-2">
          Recent Donations{" "}
          <span className="bg-[#D2145A] text-white text-xs px-2 py-1 rounded-full">
            {showDonations ? allDonations.length : 0}
          </span>
        </h1>

        {/* 🔹 See More Button */}
        <button
          onClick={() => setShowDonations(!showDonations)}
          className="text-sm px-3 py-1 border rounded-lg text-[#D2145A] border-[#D2145A] hover:bg-[#D2145A] hover:text-white transition"
        >
          {showDonations ? "Hide" : "See More"}
        </button>
      </div>

      {/* 🔹 Conditional Rendering */}
      {!showDonations ? (
        // ❌ Show "No Donations Yet" Message
        <div className="flex flex-col items-center justify-center py-24">
          <FiFolderPlus className="text-gray-400 dark:text-gray-500 text-5xl mb-3" />
          <p className="text-gray-600 dark:text-white text-center">
            You don&apos;t have any donations yet
          </p>
        </div>
      ) : (
        // ✅ Show Donations Table
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800 text-left text-black dark:text-white">
                <th className="px-4 py-3 text-sm font-semibold">S/N</th>
                <th className="px-4 py-3 text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-sm font-semibold">Time</th>
                <th className="px-4 py-3 text-sm font-semibold">Project</th>
                <th className="px-4 py-3 text-sm font-semibold">Amount</th>
                <th className="px-4 py-3 text-sm font-semibold">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {allDonations.map((donation, index) => (
                <tr
                  key={donation.id}
                  className="border-b border-gray-300 dark:border-gray-700 text-black dark:text-white"
                >
                  <td className="px-4 py-3 text-sm">{index + 1}</td>
                  <td className="px-4 py-3 flex items-center gap-2 text-sm">
                    <Image
                      src={donation.avatar}
                      alt={donation.name}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {donation.name}
                  </td>
                  <td className="px-4 py-3 text-sm">{donation.date}</td>
                  <td className="px-4 py-3 text-sm">{donation.time}</td>
                  <td className="px-4 py-3 text-sm">{donation.project}</td>
                  <td className="px-4 py-3 text-sm">{donation.amount}</td>
                  <td className="px-4 py-3 text-sm">
                    {donation.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
