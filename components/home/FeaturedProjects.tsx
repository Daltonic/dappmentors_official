import React from 'react'
import Image from 'next/image'
import Button from '../shared/Button'

const FeaturedProjects = () => {
  return (
    <section className="w-full bg-[#2B202D] dark:bg-[#1A1A1A] text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-screen-xl p-4 mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-lg text-white text-opacity-45">Featured Projects</p>
          <h2 className=" md:text-4xl mb-4 font-cambo font-normal text-[28px] text-center">
            Some of our recent campaigns that helped touch lives
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project 1: Hackathon */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content.png" // Replace with your image path
                alt="Hackathon"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6">
              <h3 className="text-xl font-bold mb-2 ">
                Hackathon Competitions
              </h3>
              <p className="mb-4 text-white text-opacity-45">
                Dive into the future of technology with our Hackathon
                Competition. It brings together developers, designers, and
                innovators to create groundbreaking solutions.
              </p>
              <Button
                label="See more"
                className="font-semibold hover:underline bg-[#D2145A] text-[#FFFFFF] hover:text-[#D2145A]
                hover:bg-white transition-colors  duration-500 border border-[#D2145A]"
              />
            </div>
          </div>

          {/* Project 2: Computer Gadget Donations */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content(1).png" // Replace with your image path
                alt="Computer Gadget Donations"
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="py-6">
              <h3 className="text-xl font-bold mb-2">
                Computer Gadget Donations
              </h3>
              <p className="mb-4 text-white text-opacity-45">
                Help us bridge the digital divide. Through our Computer Gadget
                Donations program, we provide essential tools to underserved
                communities.
              </p>
              <Button
                label="See more"
                className="font-semibold hover:underline bg-[#D2145A] text-[#FFFFFF] hover:text-[#D2145A] hover:bg-white transition-colors  duration-500 border border-[#D2145A]"
              />
            </div>
          </div>

          {/* Project 3: Web3 Events */}
          <div className="overflow-hidden">
            <div className="relative h-60 rounded-lg overflow-hidden">
              <Image
                src="/images/home/Content 2.png" // Replace with your image path
                alt="Web3 Events"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="py-6">
              <h3 className="text-xl font-bold mb-2">Web3 Events</h3>
              <p className="mb-4 text-white text-opacity-45">
                Innovation thrives in collaboration. Our Web3 initiatives
                include workshops, seminars, and events to educate and inspire
                the next generation.
              </p>
              <Button
                label="See more"
                className="font-semibold hover:underline bg-[#D2145A] text-[#FFFFFF] hover:text-[#D2145A] hover:bg-white transition-colors  duration-500 border border-[#D2145A]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProjects
