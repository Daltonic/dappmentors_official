"use client";

import { useState, useEffect } from "react";
import AllEventsHeader from "./AllEventsHeader";
import Button from "../../shared/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Event } from "@/utils/interfaces";
import EventCard from "./AllEventsCard";

export default function AllEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/events");
      const data = await response.json();
      if (data.status === 200) {
        setEvents(data.data);
      } else {
        setError(data.details || "Failed to fetch events");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (events.length === 0)
    return <div className="p-4 text-center">No events available</div>;

  return (
    <div className="p-4 bg-white dark:bg-black rounded-lg">
      <div className="dark:bg-black p-2 rounded-2xl">
        <AllEventsHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {currentEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <Button
              label=""
              icon={<ChevronLeft size={18} />}
              className="bg-gray-200 dark:bg-gray-700"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                label={page.toString()}
                key={page}
                className={`${
                  page === currentPage
                    ? "bg-[#D2145A] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(page)}
              />
            ))}
            <Button
              label=""
              icon={<ChevronRight size={18} />}
              className="bg-gray-200 dark:bg-gray-700"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
