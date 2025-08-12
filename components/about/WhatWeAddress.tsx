import React from "react";

export default function WhatWeAddress() {
  return (
    <div className="w-full bg-[#1B1325]">

    <div className="min-h-fit max-w-screen-lg mx-auto py-8 text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="lg:w-1/2 p-6 rounded-lg">
          <h3 className="text-xs font-semibold text-[#A97EBE] tracking-widest">
            WHAT WE ADDRESS
          </h3>
          <h2 className="text-3xl font-bold mt-2 leading-snug">
            At DMF, we prioritize transparency, and inclusivity.
          </h2>
          <p className="text-gray-300 mt-4">
            In today’s rapidly evolving digital landscape, many communities
            still lack access to basic technology and educational resources. We
            focus on closing this gap by addressing:
          </p>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 px-4 lg:px-0 space-y-6">
          {[
            {
              title: "Digital Inequality",
              description:
                "Providing computer gadgets to individuals and schools in need.",
            },
            {
              title: "Skill Development",
              description:
                "Offering online mentorship programs to nurture tech talent.",
            },
            {
              title: "Innovation Opportunities",
              description:
                "Organizing hackathons to foster creativity and problem-solving skills.",
            },
            {
              title: "Financial Barriers",
              description:
                "Disbursing grants to support budding innovators and underfunded projects.",
            },
          ].map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-[#D6A3F4]">
                {index + 1}. {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
              {index !== 3 && (
                <hr className="border-t border-[#49355B] mt-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
