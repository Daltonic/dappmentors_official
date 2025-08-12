import Image from 'next/image'
import React from 'react'

export default function BlogPage() {
  return (
    <div className="w-full bg-[#2B202D] dark:bg-[#1A1A1A] text-white py-12  md:px-8 lg:px-16">
      <div className="max-w-screen-xl p-4 mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 sm:px-24">
          <p className="text-lg text-white text-opacity-45">
            Recent Blog Post
          </p>
          <h2 className=" md:text-4xl mb-4 font-cambo font-normal text-[28px] text-center">
            Stories, Insights, and Updates About Our Mission
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Blog Post 1 */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(9).png" // Replace with your image path
                alt="Hackathon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6">
              <div className="flex items-center font-semibold text-[16px] font-inter space-x-2 text-[#D2145A] ">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Empowering Youth Through Online Ment
              </h2>
              <p className="mb-4 text-white text-opacity-45">
                Discover inspiring stories from our mentorship program.
              </p>
            </div>
          </div>

          {/* Blog Post 2 */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(10).png" // Replace with your image path
                alt="Hackathon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6">
              <div className="flex items-center font-semibold text-[16px] font-inter space-x-2 text-[#D2145A] ">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Web3 for Social Good
              </h2>
              <p className="mb-4 text-white text-opacity-45">
                How decentralized technology can revolutionize charitable
                efforts.
              </p>
            </div>
          </div>

          {/* Blog Post 3 */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(11).png" // Replace with your image path
                alt="Hackathon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6">
              <div className="flex items-center font-semibold text-[16px] font-inter space-x-2 text-[#D2145A] ">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                The Impact of Gadget Donations
              </h2>
              <p className="mb-4 text-white text-opacity-45">
                Real-life testimonials from beneficiaries of our donation
                program.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
