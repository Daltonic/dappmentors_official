"use client";

import { FiFolderPlus } from "react-icons/fi";
import Button from "../shared/Button";
import Link from "next/link";
import { useState } from "react";
import TopStatsCards from "../shared/TopStatsCards";
import AllEvents from "./createnewevents/AllEvents";
import { EventsProps } from "@/utils/interfaces";

export default function Events() {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const events = []; // Replace with actual data

  // Toggle view
  const handleViewMore = () => setShowAllEvents(true);

  // Render AllEventsPage when showAllEvents is true

  return (
    <div className="p-6 rounded-lg shadow-md">
      {/* 🔹 Top Stats Cards */}
      <TopStatsCards />

      {/* 🔹 Events Section */}
      {showAllEvents || events.length > 0 ? (
        <AllEvents />
      ) : (
        <EmptyEvents handleViewMore={handleViewMore} />
      )}
    </div>
  );
}

const EmptyEvents = ({ handleViewMore }: EventsProps) => {
  return (
    <div className="p-6 bg-white dark:bg-black rounded-lg shadow-md border border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white">
          Upcoming Events
        </h1>

        {/* 🔹 See More Button */}
        <div className="w-full sm:w-auto">
          <Button
            label="View All"
            className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
            onClick={handleViewMore}
          />
        </div>
      </div>

      {/* Empty State */}
      {Events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <FiFolderPlus className="text-gray-400 dark:text-gray-500 text-6xl mb-4" />
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            No events available at the moment
          </p>

          {/* Create New Event Button */}
          <Link href="/dashboard/createNewEvent">
            <Button
              label="Create New Event"
              className="mt-6 bg-[#D2145A] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 w-full md:w-auto text-sm font-semibold dark:bg-white dark:text-[#D2145A] dark:hover:bg-[#D2145A] dark:hover:text-white transition-colors duration-300"
            />
          </Link>
        </div>
      ) : (
        <div>{/* TODO: Render Event list here */}</div>
      )}
    </div>
  );
};
