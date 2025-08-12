import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosContact } from "react-icons/io";
import ToggleMode from "../home/ToggleMode";

const LoginSignUpNav = () => {
  return (
    <div className="w-full flex justify-between items-center mb-8">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-[25px] w-[25px] md:h-[30px] md:w-[30px] rounded-full relative overflow-hidden">
          <Image
            src="/images/home/Dapp Mentors 1.png"
            alt="alt"
            layout="fill"
            objectFit="cover"
            className="rounded-full object-cover object-center h-auto hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
        <div className="ml-2 dark:text-white">
          <h1 className="text-[14px] md:text-lg tracking-normal md:tracking-[5px] font-bold leading-none">DAPP MENTORS</h1>
          <span className="text-[10px] font-light tracking-[3px] md:tracking-[8px] leading-none">
            FOUNDATION
          </span>
        </div>
      </Link>

      <div className="flex items-center space-x-4">
        <ToggleMode />
        <button className="flex items-center gap-2 border border-[#211464] dark:border-white px-2 py-1 sm:px-4 sm:py-3 rounded-2xl text-sm">
          <IoIosContact className="text-[#211464] dark:text-white" size={20} />
          <span className="hidden md:block dark:text-white font-semibold">Contact Support</span>
        </button>
      </div>
    </div>
  );
};

export default LoginSignUpNav;
