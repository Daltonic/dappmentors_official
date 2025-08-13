import Image from "next/image";
import React from "react";
import Button from "../shared/Button";

const AboutSection = () => {
  return (
    // <section className="max-w-screen-xl p-4 mx-auto min-h-fit dark:text-white px-4 md:px-[30px] lg:px-[80px] flex items-center justify-center  dark:bg-medium py-16">
    <section className="w-full min-h-fit dark:text-white px-4 md:px-[30px] lg:px-[80px] flex items-center justify-center bg-white dark:bg-[#1A1A1A] py-16">
      <div className="max-w-screen-xl p-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[550px] relative">
          <Image
            src="/images/home/learner.jpg" // Replace with your image path
            alt="Web3 Empowerment"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 lg:space-y-12">
          {/* About Us Heading */}
          <div className="flex items-center gap-3 dark:animate-pulse">
            <p className="text-[#D2145A] font-inter font-semibold text-xs sm:text-sm md:text-base uppercase">
              ABOUT US
            </p>
            <div className="w-12 md:w-16 border border-[#FFBAD4]"></div>
          </div>

          {/* Main Heading */}
          <h1 className="font-cambo font-normal text-2xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 dark:text-white">
            Empowering the Future Through Web3 Education
          </h1>

          {/* Description */}
          <p className="font-inter text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            At Dapp Mentors, we provide software services, educational content,
            and support to help individuals and groups transition from
            traditional Web 2.0 to decentralized Web 3.0 development. Our focus
            is on the merger of AI and Blockchain technologies to drive
            innovation and learning.
          </p>

          {/* Learn More Button */}
          <Button
            label="Explore Courses"
            className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A]
            h-[56px] rounded-lg transition-colors duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
