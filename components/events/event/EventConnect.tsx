import { EventStruct } from "@/utils/interfaces";
import React from "react";

const EventConnect: React.FC<{ event: EventStruct }> = ({
  event,
}: {
  event: EventStruct;
}) => {
  return (
    <div className="mt-8 lg:ml-28">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
        How to Get Involved
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base leading-relaxed">
        {event.involvement}
      </p>
    </div>
  );
};

export default EventConnect;
