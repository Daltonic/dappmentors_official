import { recent } from "@/data/global";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecentBlogPage() {
  return (
    <div className="w-full bg-[#2B202D] dark:bg-[#1A1A1A] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl p-4 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:px-24">
          <p className="text-sm text-[#D2145A]">Recent Blog Post</p>
          <h2 className="md:text-4xl mb-4 font-cambo font-normal text-[28px] text-center">
            Stories, Insights, and Updates About Our Mission
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recent.map((recent) => (
            <Link key={recent.id} href={`/projects/${recent.slug}`}>
              <div className="overflow-hidden">
                <div className="relative h-60 rounded-lg overflow-hidden">
                  <Image
                    src={recent.image}
                    alt={recent.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="py-6">
                  <div className="flex items-center font-semibold text-[16px] font-inter space-x-2 text-[#D2145A]">
                    <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                    <small>{recent.date}</small>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    {recent.title}
                  </h2>
                  <p className="mb-4 text-white text-opacity-45">
                    {recent.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
