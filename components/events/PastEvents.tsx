import { events } from '@/data/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

export default function PastEvents() {
  return (
    <div className="min-h-fit p-4 md:p-8 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-sm font-semibold tracking-widest text-[#D2145A]">
          PAST EVENTS
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">
          List of past events, workshops, <br className="hidden md:block" />{' '}
          seminars, and mentorship sessions.
        </h2>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {events.map((event, i) => (
          <Link
            href={`/events/${event.slug}`}
            key={i}
            className="rounded-lg shadow-md overflow-hidden relative h-72 md:h-80"
          >
            {/* Image Container */}
            <div className="relative w-full h-48">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Event Details */}
            <div className="p-4">
              <h3 className="text-lg sm:text-xl font-bold">{event.title}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <FaMapMarkerAlt className="text-[#D2145A]" />
                <p className="text-sm sm:text-base">Ikeja, Lagos, Nigeria.</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
