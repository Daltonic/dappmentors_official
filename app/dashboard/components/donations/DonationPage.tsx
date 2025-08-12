"use client";

import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiFolderPlus } from "react-icons/fi";
import DonationCard from "./DonationCard";
import Image from "next/image";
import AllDonations from "./AllDonations";

export default function DonationPage() {
  // Sample donation data
  const allDonations = [
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
  ];

  const [showAllDonations, setShowAllDonations] = useState(false);

  const handleSeeMore = () => setShowAllDonations(true);

  if (showAllDonations) {
    return <AllDonations />;
  }

  return (
    <div className="max-w-6xl mx-auto rounded-lg">
      {/* Top Section: Stats & Donors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Left Column: Donation Stats */}
        <div className="flex flex-col gap-4 flex-1">
          <DonationCard title="Total Donations" value="$0.00" />
          <DonationCard title="Total Donor" value="0" />
        </div>

        {/* Right Column: Donors */}
        <div className="flex-1 bg-white dark:bg-black p-4 py-12 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FaHeart className="mx-auto text-gray-500 text-3xl mb-2" />
            <p className="text-gray-500">You {"don't"} have any donor yet</p>
          </div>
        </div>
      </div>

      {/* All Donations Section */}
      <div>
        <div className=" flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">All Donations</h2>
          <button
            onClick={handleSeeMore}
            className="mb-4 text-sm px-3 py-1 border rounded-lg text-[#D2145A] border-[#D2145A] hover:bg-[#D2145A] hover:text-white transition"
          >
            {showAllDonations ? "Hide" : "See More"}
          </button>
        </div>
        {!showAllDonations ? (
          <div className="flex flex-col items-center justify-center py-32  rounded-lg bg-white dark:bg-black">
            <FiFolderPlus className="text-gray-400 text-5xl mb-3" />
            <p className="text-gray-500">
              You {"don't"} have any donations yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-left text-white">
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
                    className="border-b border-gray-700 text-white"
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
    </div>
  );
}
