import Image from "next/image";
import React from "react";
import Button from "../shared/Button";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mike Johnson",
      role: "Project Advocate",
      title: "Highly recommend this company to anyone in need of...",
      text: "Lorem ipsum dolor sit amet consectetur. Dictum ac enim pellentesque donec mauris tincidunt purus gravida. Iaculis et lectus at diam adipiscing. Urna risus ac commodo diam.",
      avatar: "/images/testimonials/Ellipse 2026.png",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Marketing Manager",
      title: "Highly recommend this company to anyone in need of...",
      text: "Lorem ipsum dolor sit amet consectetur. Dictum ac enim pellentesque donec mauris tincidunt purus gravida. Iaculis et lectus at diam adipiscing. Urna risus ac commodo diam.",
      avatar: "/images/testimonials/Ellipse 2026.png",
    },
    {
      id: 3,
      name: "Sarah Williams",
      role: "Marketing Manager",
      title: "Highly recommend this company to anyone in need of...",
      text: "Lorem ipsum dolor sit amet consectetur. Dictum ac enim pellentesque donec mauris tincidunt purus gravida. Iaculis et lectus at diam adipiscing. Urna risus ac commodo diam.",
      avatar: "/images/testimonials/Ellipse 2026.png",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Marketing Manager",
      title: "Highly recommend this company to anyone in need of...",
      text: "Lorem ipsum dolor sit amet consectetur. Dictum ac enim pellentesque donec mauris tincidunt purus gravida. Iaculis et lectus at diam adipiscing. Urna risus ac commodo diam.",
      avatar: "/images/testimonials/Ellipse 2026.png",
    },
  ];

  return (
    <div className="min-h-fit p-6 md:p-10 bg-[#FFEFF5] dark:bg-black transition-colors duration-300">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-[10px] uppercase text-[#D2145A] font-semibold">
          Testimonials
        </h3>
        <h1 className="text-2xl lg:text-3xl font-bold mt-2 text-gray-900 dark:text-white">
          We love hearing from our users.
        </h1>
      </div>

      {/* Video Section */}
      <div className="flex items-center justify-center mb-12">
        <div className="relative w-full max-w-4xl lg:max-w-5xl h-64 md:h-96 rounded-lg overflow-hidden">
          
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="space-y-6 max-w-4xl md:max-w-2xl mx-auto">
        {testimonials.map(({ id, name, role, title, text, avatar }) => (
          <div
            key={id}
            className="bg-white dark:bg-black p-6 rounded-lg shadow-md flex flex-col sm:flex-row space-x-0 sm:space-x-4 items-center transition-colors duration-300"
          >
            {/* User Avatar */}
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
              <Image
                src={avatar}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Testimonial Content */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {title}
              </h3>
              <p className="text-[12px] font-semibold text-gray-700  dark:text-gray-200">
                {text}
              </p>
              <p className="text-sm text-[#D2145A] font-semibold mt-4">
                {name} – {role}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Button
        label="Load More"
        className="bg-[#211464] mt-10 text-white hover:bg-white hover:text-[#211464] rounded-lg p-2 font-bold"
      />
    </div>
  );
}
