import { EventStruct } from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

const EventImage: React.FC<{ event: EventStruct }> = ({
  event,
}: {
  event: EventStruct;
}) => {
  return (
    <div className="relative w-full h-[180px] md:h-[280px] lg:h-[360px] mt-6">
      <Image
        src={event.image}
        alt={event.title}
        layout="fill"
        objectFit="cover"
        className="rounded-lg"
      />
    </div>
  );
};

export default EventImage;
