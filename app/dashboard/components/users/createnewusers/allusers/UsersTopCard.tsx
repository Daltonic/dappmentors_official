import React from "react";

export default function UsersTopCards() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Card - Total Projects */}
        <div className="p-6 rounded-lg shadow-md bg-[url('/images/dashboard/bg.jpeg')] bg-cover bg-center">
          <p className="text-black text-sm font-semibold mb-2">Total Users</p>
          <h2 className="text-2xl font-bold text-black">0</h2>
        </div>

        {/* Card - Total Running */}
        <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">
            Total Donors
          </p>
          <h2 className="text-2xl font-bold text-black dark:text-white">0</h2>
        </div>

        {/* Card - Total Closed */}
        <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-2">
            Total Volunteers
          </p>
          <h2 className="text-2xl font-bold text-black dark:text-white">0</h2>
        </div>
      </div>
    </div>
  );
}
