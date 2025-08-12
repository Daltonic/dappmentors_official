"use client";

import Image from "next/image";
import Link from "next/link";
import ToggleMode from "./ToggleMode";
import Button from "../shared/Button";
import Sidebar from "../shared/Sidebar";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { navlinks } from "@/data/global";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <div className="w-full p-4 overflow-hidden md:px-8">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center text-white">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-full relative overflow-hidden">
            <Image
              src="/images/home/Dapp Mentors 1.png"
              alt="alt"
              layout="fill"
              objectFit="cover"
              className="rounded-full object-cover object-center hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="text-white ml-2">
            <h1 className="text-lg font-bold leading-tight">DAPP MENTORS</h1>
            <span className="text-[11px] font-light text-gray-300 tracking-[5px]">
              FOUNDATION
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="bg-gray-900/30 font-bold backdrop-blur-md px-6 py-2 rounded-full shadow-lg lg:flex justify-center space-x-4 hidden">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`text-sm md:text-base hover:text-pink-500 transition-colors duration-300 ${
                pathname === item.link
                  ? "text-[#D2145A] font-bold"
                  : "hover:text-[#D2145A]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="lg:flex items-center space-x-4 hidden">
          <ToggleMode />
          <Button
            label="Login"
            onClick={handleClick}
            className="bg-white text-pink-500 hover:bg-pink-600 hover:text-white transition-colors duration-500"
          />
        </div>

        {/* Mobile Menu */}
        <div className="flex lg:hidden space-x-3 items-center">
          <ToggleMode />
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="font-bold text-2xl focus:outline-none transition-transform duration-300"
          >
            {isSideBarOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar sidebarOpened={isSideBarOpen} />
    </div>
  );
};

export default Header;
