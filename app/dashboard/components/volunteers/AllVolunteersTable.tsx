"use client";

import Image from "next/image";
import AllVolunteersHeader from "./AllVolunteersHeader";
import { AllVolunteersTableProps, Volunteer } from "@/utils/interfaces";

const AllVolunteersTable = ({ volunteers }: AllVolunteersTableProps) => {
  return (
    <div className="bg-white dark:bg-black p-4 md:p-6 rounded-lg">
      {/* All Volunteers Header */}
      <AllVolunteersHeader />

      <div className="w-full overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm dark:bg-[#1A1A1A] whitespace-nowrap">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-black text-left text-gray-600">
              <th className="py-2 px-3">S/N</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Date</th>
              <th className="py-2 px-3 hidden md:table-cell">Time</th>
              <th className="py-2 px-3 hidden md:table-cell">Project</th>
              <th className="py-2 px-3 hidden md:table-cell">Amount</th>
              <th className="py-2 px-3 hidden md:table-cell">Transaction ID</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer: Volunteer, index: number) => (
              <tr
                key={index}
                className="border-b-2 border-gray-300 dark:border-black"
              >
                <td className="py-2 px-3">{index + 1}</td>
                <td className="py-2 px-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={volunteer.avatar}
                      width={30}
                      height={30}
                      alt="Avatar"
                      className="rounded-full"
                    />
                    <span className="truncate">{volunteer.name}</span>
                  </div>
                </td>
                <td className="py-2 px-3">{volunteer.date}</td>
                <td className="py-2 px-3 hidden md:table-cell">
                  {volunteer.time}
                </td>
                <td className="py-2 px-3 hidden md:table-cell">
                  {volunteer.project}
                </td>
                <td className="py-2 px-3 hidden md:table-cell">
                  {volunteer.amount}
                </td>
                <td className="py-2 px-3 text-blue-500 hidden md:table-cell">
                  {volunteer.transactionId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVolunteersTable;
