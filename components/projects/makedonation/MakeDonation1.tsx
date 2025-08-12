"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBitcoin, FaEthereum, FaMoneyBillWave, FaEllipsisH } from "react-icons/fa";

export default function MakeDonation() {
  const currencies = [
    { name: "Fiat", icon: <FaMoneyBillWave className="text-green-500 text-3xl" /> },
    { name: "Bitcoin", icon: <FaBitcoin className="text-yellow-500 text-3xl" /> },
    { name: "Ethereum", icon: <FaEthereum className="text-gray-400 text-3xl" /> },
    { name: "More", icon: <FaEllipsisH className="text-gray-500 text-3xl" /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-4 md:p-6 bg-pink-100 dark:bg-gray-900 space-y-6">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-full overflow-hidden relative">
            {/* <Image
              src="/images/home/Dapp Mentors 1.png"
              alt="Dapp Mentors Logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full hover:scale-105 transition-transform duration-300"
            /> */}
          </div>
          <div className="leading-none">
            <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">DAPP MENTORS</h1>
            <span className="text-xs md:text-sm font-light text-gray-700 dark:text-gray-300 tracking-[3px]">FOUNDATION</span>
          </div>
        </Link>

        <button className="text-sm text-gray-700 dark:text-gray-300 mb-4">← Back</button>

        <h2 className="text-[#D2145A] font-semibold text-sm md:text-base">MAKE DONATION</h2>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Hackathon Competitions</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
          Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world.
        </p>

        {/* Target Amount Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-black text-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-sm md:text-base">TARGET AMOUNT</p>
            <p className="text-xl md:text-2xl font-bold">$50,000</p>
          </div>
          <div className="bg-black text-white dark:bg-gray-800 p-4 rounded-lg text-center">
            <p className="text-sm md:text-base">TOTAL AMOUNT RAISED</p>
            <p className="text-xl md:text-2xl font-bold">$50,000</p>
          </div>
        </div>

        <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg overflow-hidden">
          <Image
            src="/images/home/Content(4).png"
            alt="Hackathon Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-4 md:p-6 flex flex-col bg-gray-50 dark:bg-gray-800 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Make Donation</h2>

        <label className="block text-gray-700 dark:text-gray-300 text-sm md:text-base">Donation Amount</label>
        <input
          type="text"
          placeholder="$ Enter donation amount"
          className="w-full p-3 md:p-4 border rounded-lg bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        />

        <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">Select a crypto or fiat.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {currencies.map((currency) => (
            <button
              key={currency.name}
              className="flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-lg border bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              {currency.icon}
              <span className="text-xs md:text-sm font-medium">{currency.name}</span>
            </button>
          ))}
        </div>

        {/* Crypto Address Display */}
        <div className="mt-4 text-center">
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">Please send $600 worth of BTC to this address</p>
          <p className="font-mono text-sm md:text-lg text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-700 p-2 rounded-lg mt-2">
            15nxjpPaLkvtdyJCfzahvkaJRCsBEbKrVy
          </p>
        </div>

        <button className="bg-[#D2145A] text-white text-lg md:text-xl font-semibold py-3 rounded-lg hover:bg-red-600 transition-color duration-500">
          Donate now
        </button>
      </div>
    </div>
  );
}
