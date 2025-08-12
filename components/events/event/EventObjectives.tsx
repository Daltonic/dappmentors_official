import { EventStruct } from "@/utils/interfaces";
import React from "react";

const EventObjectives: React.FC<{ event: EventStruct }> = ({
  event,
}: {
  event: EventStruct;
}) => {
  return (
    <div className="mt-10 lg:ml-28">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
        Objective
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm md:text-base leading-relaxed">
        {event.objective}
      </p>
    </div>
  );
};

export default EventObjectives;
