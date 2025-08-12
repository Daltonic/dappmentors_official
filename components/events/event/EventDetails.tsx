import { EventStruct } from "@/utils/interfaces";
import React from "react";

const EventDetails: React.FC<{ event: EventStruct }> = ({
  event,
}: {
  event: EventStruct;
}) => {
  console.log(event);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">LOCATION</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Ikeja, Lagos, Nigeria.
        </p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">DATE</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          Nov 21, 2023
        </p>
      </div>
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">TIME</p>
        <p className="text-lg font-semibold text-gray-900 dark:text-white">
          10:25 PM
        </p>
      </div>
    </div>
  );
};

export default EventDetails;
