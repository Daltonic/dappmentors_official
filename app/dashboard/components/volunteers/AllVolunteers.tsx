"use client";

import AllVolunteersTopCard from "./AllVolunteersTopCard";
import Button from "../shared/Button";
import usePagination from "@/app/dashboard/hooks/usePagination";
import AllVolunteersTable from "./AllVolunteersTable";
import { ChevronLeft, ChevronRight } from "lucide-react";

const volunteers = Array(10).fill({
  name: "Mark Williams",
  date: "4th of May, 2024",
  time: "10:30 pm",
  project: "Nesco Payment",
  amount: "$1,000.00",
  transactionId: "AH 283809 rd",
  avatar: "/images/dashboard/Ellipse 5.png",
});

const AllVolunteers = () => {
  const paginationButtons = usePagination();

  return (
    <div className="p-6">
      {/* Total Volunteers */}
      <AllVolunteersTopCard />

      {/* Volunteers Table */}
      <AllVolunteersTable volunteers={volunteers} />

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          label=""
          icon={<ChevronLeft size={18} />}
          className="bg-gray-200 dark:bg-gray-700"
          onClick={() => {}}
        />

        {Array.from({ length: paginationButtons }, (_, i) => i + 1).map(
          (page) => (
            <Button
              label={page}
              key={page}
              className={`${
                page === 1
                  ? "bg-[#D2145A] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => {}}
            />
          ),
        )}
        <Button
          label=""
          icon={<ChevronRight size={18} />}
          className="bg-gray-200 dark:bg-gray-700"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default AllVolunteers;
