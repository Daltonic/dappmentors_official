import Image from "next/image";
import React from "react";

const SuccessStories = () => {
  return (
    <div className="min-h-fit flex items-center justify-center py-4 px-4">
      <div className="p-4 max-w-5xl grid lg:grid-cols-2 w-full">
        {/* Left Section */}
        <div className="md:pr-6 md:w-full">
          <h3 className="text-[10px] text-[#D2145A] font-semibold tracking-[2px] mb-2">
            OUR SUCCESS STORIES
          </h3>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">
            Impressed by the level of attention and care
          </h1>
          <p className="text-gray-800 dark:text-gray-400 mb-4 text-[14px]">
            Lorem ipsum dolor sit amet consectetur. Ipsum quis vel sit euismod
            eu ridiculus metus. Metus elit faucibus habitasse at orci proin sit
            aliquet urna. Eget molestie eros mauris urna amet. Aliquam facilisis
            neque vitae at risus ultrices mus felis venenatis.
          </p>
          <p className="text-gray-800 dark:text-gray-400 text-[14px]">
            Lorem ipsum dolor sit amet consectetur. Ipsum quis vel sit euismod
            eu ridiculus metus. Metus elit faucibus habitasse at orci proin sit
            aliquet urna. Eget molestie eros mauris urna amet. Aliquam facilisis
            neque vitae at risus ultrices mus felis venenatis.
          </p>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-64 md:h-80 mt-8 md:mt-0">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src="/images/home/Content 2.png" // Replace with your image path
              alt="Mission and Vision"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-4 left-4 rounded-lg p-4 w-64 bg-[#FFEFF5]">
            <p className="text-[14px] mb-1">⭐⭐⭐⭐⭐</p>
            <p className="text-lg text-[#211464] font-semibold">
              4.5 of 5 Stars Rating
            </p>
            <p className="">
              <span className="text-[10px] mt-4 text-[#D2145A] font-bold">
                ⭐ Average rating from 1,000 reviews.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;


