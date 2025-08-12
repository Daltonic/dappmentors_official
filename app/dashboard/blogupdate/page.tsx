import React, { Suspense } from "react";
import UpdateBlog from "../components/blog/blogupdate/UpdateBlog";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdateBlog />
    </Suspense>
  );
}
