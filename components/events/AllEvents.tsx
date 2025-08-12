import { events, months } from '@/data/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaChevronLeft, FaChevronRight, FaMapMarkerAlt } from 'react-icons/fa'
import { IoCalendarOutline } from 'react-icons/io5'

export default function AllEvents() {
  return (
    <div className="min-h-fit p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-sm font-semibold tracking-widest text-[#D2145A]">
          ALL EVENTS
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          List of upcoming events, workshops, <br /> seminars, and mentorship
          sessions.
        </h2>
      </div>

      {/* Month Tabs */}
      <div className="flex flex-wrap justify-center gap-4 my-8">
        {months.map((month, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-sm font-medium rounded-lg ${
              index === 0
                ? 'bg-[#D2145A] text-white'
                : 'bg-gray-200 dark:bg-gray-800'
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <Link key={i} href={`/events/${event.slug}`}>
            <div className="rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300">
              {/* Event Image */}
              <div className="relative w-full h-96">
                <Image
                  src={event.image}
                  alt="Event"
                  layout="fill"
                  objectFit="cover"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute px-16 bottom-0 w-full text-white flex justify-around py-2 bg-black bg-opacity-50">
                  <div className="text-center px-3 py-1 bg-[#D2145A]">
                    <p className="text-lg font-semibold">00</p>
                    <p className="text-xs">Days</p>
                  </div>
                  <div className="text-center px-3 py-1 bg-[#D2145A]">
                    <p className="text-lg font-semibold">00</p>
                    <p className="text-xs">Hours</p>
                  </div>
                  <div className="text-center px-3 py-1 bg-[#D2145A]">
                    <p className="text-lg font-semibold">00</p>
                    <p className="text-xs">Minutes</p>
                  </div>
                  <div className="text-center px-3 py-1 bg-[#D2145A]">
                    <p className="text-lg font-semibold">00</p>
                    <p className="text-xs">Sec</p>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <FaMapMarkerAlt className="text-[#D2145A]" />
                  <p className="text-sm">Ikeja, Lagos, Nigeria.</p>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <IoCalendarOutline className="text-[#D2145A]" />
                  <p className="text-sm">Nov 21, 2023 | 10:25 PM</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
              <button className="p-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                <FaChevronLeft />
              </button>
      
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <span
                  key={num}
                  className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-[#D2145A] text-white rounded-full hover:bg-white hover:text-[#D2145A] cursor-pointer transition-colors duration-300 font-bold"
                >
                  {num}
                </span>
              ))}
      
              <button className="p-3 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-600">
                <FaChevronRight />
              </button>
            </div>
    </div>
  )
}
