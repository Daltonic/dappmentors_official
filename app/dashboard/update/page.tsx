import React, { Suspense } from "react";
import UpdatePage from "../components/project/updateproject/UpdateProject";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePage />
    </Suspense>
  );
}
