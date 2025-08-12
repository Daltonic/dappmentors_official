import { DonationCardProps } from "@/utils/interfaces";
import React from "react";

const DonationCard = ({ title, value }: DonationCardProps) => {
  return (
    <div className="bg-white dark:bg-black p-4 py-12 rounded-xl shadow-md text-white ">
      <h3 className="text-sm md:text-lg font-semibold text-gray-700 dark:text-gray-400">
        {title}
      </h3>
      <p className="text-2xl font-bold md:text-3xl">{value}</p>
    </div>
  );
};

export default DonationCard;
