import React from "react";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { PiCurrencyCircleDollarLight } from "react-icons/pi"; // Fiat icon
import { HiDotsHorizontal } from "react-icons/hi"; // More options
import Button from "../shared/Button";

const DonationForm = () => {
  return (
    <div className="flex justify-center items-center min-h-fit">
      <div className="bg-[#F2F2F2] dark:bg-[#1A1A1A] rounded-lg p-6 w-full max-w-md">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Cause
          </label>
          <select className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white">
            <option>Choose a cause</option>
          </select>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Amount
          </label>
          <input
            type="text"
            placeholder="$ Enter amount"
            className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white"
          />
        </div>

        {/* Crypto/Fiat Selection */}
        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium mb-2">
            Select a crypto or fiat.
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <PiCurrencyCircleDollarLight className="text-3xl text-yellow-500" />
              <span className="text-sm text-gray-800 dark:text-gray-300 mt-1">Fiat</span>
            </button>
            <button className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaBitcoin className="text-3xl text-orange-500" />
              <span className="text-sm text-gray-800 dark:text-gray-300 mt-1">Bitcoin</span>
            </button>
            <button className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <FaEthereum className="text-3xl text-blue-500" />
              <span className="text-sm text-gray-800 dark:text-gray-300 mt-1">Ethereum</span>
            </button>
            <button className="flex flex-col items-center p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <HiDotsHorizontal className="text-3xl text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-800 dark:text-gray-300 mt-1">More</span>
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-medium">
            Note
          </label>
          <textarea
            placeholder="Enter your note"
            className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-black text-black dark:text-white"
          ></textarea>
        </div>

        {/* Donate Button */}
        <Button
          className="mt-6 w-full font-bold bg-[#D2145A] text-white py-2 rounded-md hover:bg-white hover:border hover:border-[#D2145A] hover:text-[#D2145A]"
          label="Donate now"
        />
      </div>
    </div>
  );
};

export default DonationForm;
