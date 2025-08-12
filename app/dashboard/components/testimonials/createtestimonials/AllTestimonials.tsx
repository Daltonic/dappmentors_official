"use client";

import { useState, useEffect } from "react";
import AllTestimonialsHeader from "./AllTestimonialsHeader";
import { MoreVertical } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface Testimonial {
  _id: string;
  name: string;
  slug: string;
  content: string;
  position: string;
  image: string;
  createdAt: string;
}

export default function AllTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/testimonials", { cache: "no-store" });
      const data = await response.json();
      console.log("Fetched testimonials:", data);
      if (response.ok && data.status === 200) {
        setTestimonials(data.data || []);
      } else {
        setError(data.details || "Failed to fetch testimonials");
      }
    } catch (err) {
      setError(
        `Error fetching testimonials: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (slug: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      try {
        const response = await fetch(`/api/testimonials?slug=${slug}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (response.ok) {
          setTestimonials((prev) => prev.filter((t) => t.slug !== slug));
        } else {
          setError(result.details || "Failed to delete testimonial");
        }
      } catch (err) {
        setError(
          `Error deleting testimonial: ${err instanceof Error ? err.message : "Unknown error"}`,
        );
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (testimonials.length === 0)
    return <div className="p-4 text-center">No testimonials available</div>;

  return (
    <div className="p-6">
      <div className="p-6 bg-white dark:bg-black rounded-lg">
        <AllTestimonialsHeader />
        <button
          onClick={fetchTestimonials}
          className="mb-4 p-2 bg-[#D2145A] text Power-white rounded-lg hover:bg-pink-500"
        >
          Refresh Testimonials
        </button>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="relative p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-[#1A1A1A]"
            >
              <div className="flex justify-end mb-4">
                <button
                  onClick={() =>
                    setMenuOpen(
                      menuOpen === testimonial._id ? null : testimonial._id,
                    )
                  }
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
                {menuOpen === testimonial._id && (
                  <div className="absolute top-10 right-4 bg-white dark:bg-gray-800 shadow-md rounded p-2 z-10">
                    <Link
                      href={`/dashboard/updateTestimonials?slug=${testimonial.slug}`}
                    >
                      <button className="text-sm text-gray-700 dark:text-gray-300 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Update Testimonial
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(testimonial.slug)}
                      className="text-sm text-red-600 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Delete Testimonial
                    </button>
                  </div>
                )}
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-400 text-sm leading-tight">
                {testimonial.content}
              </p>
              <p className="text-sm font-semibold text-[#D2145A] mb-1">
                {testimonial.name} - {testimonial.position}
              </p>
              <p className="text-xs text-black dark:text-white">
                Date Created:{" "}
                {format(new Date(testimonial.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
