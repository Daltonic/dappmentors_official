"use client";

import React, { useState } from "react";
import Projects from "../Projects";
import Link from "next/link";
import Button from "../../shared/Button";
import { FiArrowLeft } from "react-icons/fi";

export default function AllProjectHeader() {
  const [activeTab, setActiveTab] = useState("Active Projects");
  const [handleBack, setHandleBack] = useState(false);

  const handleGoBack = () => setHandleBack(true);

  if (handleBack) return <Projects />;
  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold dark:text-white">All Projects</h1>
        <div className="grid grid-cols-2 md:flex gap-4 p-4 mt-4 md:mt-0 rounded-3xl bg-[#F4F4F5] dark:bg-[#1A1A1A]">
          <Button
            label="Active Projects"
            className={`${
              activeTab === "Active Projects"
                ? "bg-[#D2145A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:!text-white"
            } text-xs sm:text-sm md:text-base whitespace-nowrap rounded-3xl`}
            onClick={() => setActiveTab("Active Projects")}
          />

          <Button
            label=" Closed Project"
            className={`${
              activeTab === "Closed Project"
                ? "bg-[#D2145A] text-white"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            } text-xs sm:text-sm md:text-base whitespace-nowrap rounded-3xl flex justify-center`}
            onClick={() => setActiveTab("Closed Project")}
          />

          <Link href="/dashboard/update">
            <Button
              label=" Update"
              className={`${
                activeTab === "Update Project"
                  ? "bg-[#D2145A] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              } text-xs sm:text-sm md:text-base whitespace-nowrap rounded-3xl`}
              onClick={() => setActiveTab("Update Project")}
            />
          </Link>
        </div>
      </div>
      {/* Back Button, This button is to be delete, because i created it for testing purpose */}
      <Button
        label="Back"
        icon={<FiArrowLeft size={20} />}
        className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-4 py-2 flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-700"
        onClick={handleGoBack}
      />
    </div>
  );
}
