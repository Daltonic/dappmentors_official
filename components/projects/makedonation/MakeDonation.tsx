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
    <div className="flex flex-col p-4 lg:flex-row min-h-screen">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-6 bg-pink-100 dark:bg-gray-900 space-y-4">
        <Link href="/" className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 md:h-10 md:w-10 rounded-full overflow-hidden relative">
            <Image
              src="/images/home/Dapp Mentors 1.png"
              alt="Dapp Mentors Logo"
              layout="fill"
              objectFit="cover"
              className="rounded-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="ml-2 leading-none">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">DAPP MENTORS</h1>
            <span className="text-[11px] font-light text-gray-700 dark:text-gray-300 tracking-[5px]">
              FOUNDATION
            </span>
          </div>
        </Link>

        <button className="text-sm text-gray-700 dark:text-gray-300 mb-4">← Back</button>

        <h2 className="text-[#D2145A] font-semibold text-sm">MAKE DONATION</h2>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Hackathon Competitions</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Lambda is a dynamic charity donation organization committed to making a positive impact on communities around the world.
        </p>

        <div className="flex gap-4 mb-6">
          <div className="bg-black text-white dark:bg-gray-800 dark:text-gray-100 p-4 rounded-lg text-center w-1/2">
            <p className="text-sm">TARGET AMOUNT</p>
            <p className="text-xl font-bold">$50,000</p>
          </div>
          <div className="bg-black text-white dark:bg-gray-800 dark:text-gray-100 p-4 rounded-lg text-center w-1/2">
            <p className="text-sm">TOTAL AMOUNT RAISED</p>
            <p className="text-xl font-bold">$50,000</p>
          </div>
        </div>

        {/* Image with layout-fill and object-cover */}
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
          <Image
            src="/images/home/Content(4).png"
            alt="Hackathon Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 p-6 flex flex-col bg-gray-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Make Donation</h2>

        <label className="block mb-2 text-gray-700 dark:text-gray-300">Donation Amount</label>
        <input
          type="text"
          placeholder="$ Enter donation amount"
          className="w-full p-3 border rounded-lg mb-6 bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        />

        <p className="text-gray-700 dark:text-gray-300 mb-2">Select a crypto or fiat.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {currencies.map((currency, i) => (
            <button
              key={i}
              className="flex flex-col items-center justify-center gap-1 px-4 py-3 rounded-lg border text-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              {currency.icon}
              <span className="text-xs font-medium">{currency.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
