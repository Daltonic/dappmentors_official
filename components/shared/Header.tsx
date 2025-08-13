"use client";

import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import ToggleMode from "../home/ToggleMode";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { navlinks } from "@/data/global";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <div className="border-b border-[#F2F2F2] dark:border-[#1A1A1A] fixed bg-white dark:bg-black w-full z-50 md:px-8">
      <div className="max-w-screen-xl p-4 mx-auto py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-[40px] w-[40px] md:h-[40px] md:w-[40px] rounded-full relative overflow-hidden">
            <Image
              src="/images/home/Dapp Mentors 1.png"
              alt="alt"
              layout="fill"
              objectFit="cover"
              className="rounded-full object-cover object-center h-auto hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
          <div className="ml-2">
            <h1 className="text-lg font-bold leading-none">DAPP MENTORS</h1>
          </div>
        </Link>

        {/* Navigation Menu (Each Link is Separate for Custom Styling) */}
        <div className="bg-[#F2F2F2] dark:bg-[#1A1A1A] px-8 py-3 rounded-full lg:flex justify-center space-x-6 hidden">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className={`hover:text-[#D2145A] transition-colors duration-300 ${
                pathname === item.link
                  ? "text-[#D2145A] font-bold"
                  : "hover:text-[#D2145A]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section (Toggle & Button) */}
        <div className="lg:flex items-center space-x-4 hidden">
          <ToggleMode />
          <Button
            label="Login"
            onClick={handleClick}
            className="bg-[#D2145A] hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] text-white py-2 rounded-lg font-semibold  transition-colors duration-500"
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden space-x-4 items-center">
          <ToggleMode />
          <button
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            className="font-bold text-2xl"
          >
            {isSideBarOpen ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <Sidebar sidebarOpened={isSideBarOpen} />
    </div>
  );
};

export default Header;
