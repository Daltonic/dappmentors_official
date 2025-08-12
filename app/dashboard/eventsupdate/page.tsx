import React from "react";
import UpdateEvents from "../components/events/eventsupdate/UpdateEvents";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateEvents />
    </Suspense>
  );
}
