import React from 'react'
import Image from 'next/image'

const UpcomingEvents = () => {
  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl p-4 mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 lg:w-[636px] h-auto gap-[12px] mx-auto">
          <p className="text-lg text-[#D2145A]">Upcoming Events</p>
          <h2 className=" md:text-4xl mb-4 font-cambo font-normal text-[28px] text-center">
            Increase in the awareness among people about various issues
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project 1: Hackathon */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(3).png" // Replace with your image path
                alt="Hackathon"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="py-6 space-y-3">
              <div className="flex items-center font-bold text-[16px] font-inter space-x-2 text-[#D2145A]">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 dark:text-[#F5F5F5]">
                Web3 Summit 2024
              </h3>
              <p className="mb-4 dark:text-gray-500">
                Learn from industry leaders about blockchain and decentralized
                applications.
              </p>
            </div>
          </div>

          {/* Project 2: Computer Gadget Donations */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(4).png" // Replace with your image path
                alt="Computer Gadget Donations"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6 space-y-3">
              <div className="flex items-center font-bold text-[16px] font-inter space-x-2 text-[#D2145A]">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h3 className="text-xl font-bold text-[#393838] mb-2 dark:text-[#F5F5F5]">
                Hack4Good 1.0
              </h3>
              <p className="mb-4 dark:text-gray-500">
                Collaborate with tech enthusiasts to solve pressing community
                challenges.
              </p>
            </div>
          </div>

          {/* Project 3: Web3 Events */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(5).png" // Replace with your image path
                alt="Web3 Events"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6 space-y-3">
              <div className="flex items-center font-bold text-[16px] font-inter space-x-2 text-[#D2145A]">
                <div className="h-[8px] w-[8px] bg-[#D2145A] rounded-full"></div>
                <small>Nov 21, 2023</small>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1A] dark:text-white mb-2">
                Gadget Drive
              </h3>
              <p className="mb-4 dark:text-gray-500">
                Innovation thrives in collaboration. Our Web3 initiatives
                include workshops, seminars, and events to educate and inspire
                the next generation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
