import React, { Suspense } from "react";
import UpdateTestimonial from "../components/testimonials/updatetestimonials/UpdateTestimonials";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateTestimonial />
    </Suspense>
  );
}
