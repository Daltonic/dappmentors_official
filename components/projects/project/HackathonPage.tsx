"use client";

import Image from "next/image";

export default function HackathonPage() {
  return (
    <div className="max-w-6xl mx-auto px-5">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        A Quick Glance of Hackathon Competitions Project!
      </h1>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-300 mt-4">
        Lorem Ipsum, giving information on its origins, as well as a random
        Lipsum generator. It is sometimes known for information on its origins,
        as well as a random Lipsum gem, giving information on its origins.
      </p>

      {/* Images Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="rounded-lg overflow-hidden relative h-60">
          <Image
            src="/images/home/Content(3).png"
            alt="Hackathon Image 1"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="rounded-lg overflow-hidden relative h-60">
          <Image
            src="/images/home/Content(21).png"
            alt="Hackathon Image 2"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        <div className="rounded-lg overflow-hidden relative h-60">
          <Image
            src="/images/home/dmf.jpeg"
            alt="Hackathon Image 3"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
