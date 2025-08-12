import { EventStruct } from "@/utils/interfaces";
import React from "react";

const EventHeader: React.FC<{ event: EventStruct }> = ({
  event,
}: {
  event: EventStruct;
}) => {
  return (
    <div className="text-center">
      <h3 className="text-xs md:text-sm font-semibold tracking-widest text-[#D2145A]">
        EVENT DETAILS
      </h3>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-gray-900 dark:text-white">
        {event.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm md:text-base leading-relaxed">
        {event.description}
      </p>
    </div>
  );
};

export default EventHeader;
