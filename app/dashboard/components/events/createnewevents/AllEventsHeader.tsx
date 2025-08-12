"use client";

import { useState } from "react";
import Button from "../../shared/Button";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import Events from "../Events";

export default function AllEventsHeader() {
  const [activeTab, setActiveTab] = useState("Active Events");
  const [handleBack, setHandleBack] = useState(false);

  const handleGoBack = () => setHandleBack(true);

  if (handleBack) return <Events />;

  return (
    <div>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">All Events</h1>
        <div className="w-full md:w-1/2 grid grid-cols-2 md:flex space-x-4 gap-4 mt-4 md:mt-0 rounded-3xl p-2 bg-[#F4F4F5] dark:bg-[#1A1A1A]">
          <Button
            label="Active Events"
            className={`${
              activeTab === "Active Events"
                ? "bg-[#D2145A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:!text-white"
            } p-3 text-xs sm:text-sm md:text-base whitespace-nowrap rounded-3xl`}
            onClick={() => setActiveTab("Active Events")}
          />

          <Button
            label="Closed Events"
            className={`${
              activeTab === "Closed Events"
                ? "bg-[#D2145A] text-white"
                : " bg-gray-200 dark:bg-gray-700 text-black dark:!text-white"
            } p-3 text-xs flex justify-center items-center sm:text-sm md:text-base whitespace-nowrap rounded-3xl`}
            onClick={() => setActiveTab("Closed Events")}
          />

          <Link href="/dashboard/eventsUpdate" className="w-full">
            <Button
              label="Update"
              className={`${
                activeTab === "Update Events"
                  ? "bg-[#D2145A] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:!text-white"
              }  text-xs sm:text-sm md:text-base whitespace-nowrap rounded-3xl`}
              onClick={() => setActiveTab("Update Events")}
            />
          </Link>
        </div>
      </div>
      <Button
        label="Back"
        icon={<FiArrowLeft size={20} />}
        className=" text-white p-4 flex items-center gap-2 text-[17px] bg-[#D2145A]"
        onClick={handleGoBack}
      />
    </div>
  );
}
