import Image from "next/image";
import React from "react";
import Button from "../shared/Button";

const EmpowerSection = () => {
  return (
    <section className="max-w-screen-xl p-4 mx-auto min-h-fit dark:text-white px-4 md:px-[30px] lg:px-[80px] flex items-center justify-center  dark:bg-medium py-16">
      <div className="w-full max-w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-24">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-[300px] md:h-[500px] relative">
          <Image
            src="/images/home/EmpowerSection.jpeg" // Replace with your image path
            alt="Empowerment"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 lg:space-y-12">
          {/* About Us Heading */}
          <div className="flex items-center gap-3">
            <p className="text-[#D2145A] font-inter font-semibold text-sm md:text-base">
              ABOUT US
            </p>
            <div className="w-12 md:w-16 border border-[#FFBAD4]"></div>
          </div>

          {/* Main Heading */}
          <h1 className="font-cambo font-normal text-2xl md:text-4xl lg:text-5xl tracking-tight text-gray-900 dark:text-white">
            Empowering the Next Generation Through Technology
          </h1>

          {/* Description */}
          <p className="font-inter text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
            At Dapp Mentors Foundation, we believe in the transformative power of
            technology to uplift communities. We are dedicated to empowering
            young people with the skills and resources they need to thrive in the
            digital age.
          </p>

          {/* Learn More Button */}
          <Button
            label="Learn more"
            className="bg-[#D2145A] text-white hover:bg-white hover:text-[#D2145A] hover:border hover:border-[#D2145A] w-[135px] h-[56px] rounded-lg transition-colors duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default EmpowerSection;