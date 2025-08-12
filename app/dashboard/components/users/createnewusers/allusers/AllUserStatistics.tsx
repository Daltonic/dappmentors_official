import React from "react";

const AllUserStatistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {[
        { title: "Total Users", count: 4000 },
        { title: "Total Donors", count: 2000 },
        { title: "Total Volunteers", count: 2000 },
      ].map((stat, index) => (
        <div
          key={index}
          className="px-6 py-8 bg-white dark:bg-black rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
        >
          <h2 className="text-gray-700 text-lg font-semibold">{stat.title}</h2>
          <h1 className="text-3xl font-bold">{stat.count}</h1>
        </div>
      ))}
    </div>
  );
};

export default AllUserStatistics;
