"use client";

import React, { useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { MoreVertical } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Event } from "@/utils/interfaces";

const EventCard = ({ event }: { event: Event }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const formattedDate = format(new Date(event.date), "MMM d, yyyy | h:mm a");

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`/api/events?slug=${event.slug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Event deleted");
          window.location.reload();
        } else {
          const result = await response.json();
          console.error(result.details);
        }
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  return (
    <div className="relative bg-[#1A1A1A] rounded-xl shadow-md hover:scale-105 transition-transform">
      <div className="w-full h-48 relative">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            objectFit="cover"
            className="rounded-t-xl"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-t-xl">
            <p className="text-gray-600">No image available</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-[20px] font-semibold text-white">{event.title}</h2>
        <p className="text-xs font-light text-gray-300 flex items-center gap-1">
          <HiLocationMarker className="text-gray-300" size={12} />
          {event.location}
        </p>
        <p className="text-xs text-gray-300 font-light">📅 {formattedDate}</p>
      </div>

      <button
        onClick={toggleMenu}
        className="absolute top-3 right-3 bg-black p-1 rounded-full"
      >
        <MoreVertical size={20} className="text-white" />
      </button>

      {menuOpen && (
        <div className="absolute top-10 right-4 bg-white dark:bg-gray-800 shadow-md rounded p-2">
          <Link href={`/dashboard/eventsUpdate?slug=${event.slug}`}>
            <button className="text-sm text-gray-700 dark:text-gray-300 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              Update Event
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;
