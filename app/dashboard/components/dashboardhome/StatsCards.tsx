import React from "react";

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Projects (including Total Running & Total Closed) */}
      <div className="relative bg-gray-100 dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-100 dark:brightness-50"
          style={{ backgroundImage: "url('/images/dashboard/bg.jpeg')" }}
        ></div>
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Total Projects
          </h3>
          <p className="text-3xl font-bold text-black dark:text-white">0</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-indigo-500 p-4 space-y-2 rounded-lg text-center">
              <p className="text-sm text-white">Total Running</p>
              <p className="text-lg font-bold text-white">0</p>
            </div>
            <div className="bg-purple-500 p-4 space-y-2 rounded-lg text-center">
              <p className="text-sm text-white">Total Closed</p>
              <p className="text-lg font-bold text-white">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Total Donations & Total Donor (inside one div, in flex-col) */}
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold">
            Total Donations
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            $0.00
          </p>
        </div>
        <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg">
          <h3 className="text-gray-700 dark:text-gray-400 text-sm font-semibold">
            Total Donor
          </h3>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">0</p>
        </div>
      </div>

      {/* Donors Section */}
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg flex flex-col justify-center items-center text-center min-h-[120px]">
        <p className="text-gray-500 dark:text-gray-400">
          You don’t have any donor yet
        </p>
      </div>
    </div>
  );
}
