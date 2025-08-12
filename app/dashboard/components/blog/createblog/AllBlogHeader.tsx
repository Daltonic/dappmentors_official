"use client";

import { useState } from "react";
import Link from "next/link";
import Blog from "../Blog";

export default function AllBlogHeader() {
  const [handleBack, setHandleBack] = useState(false);

  const handleGoBack = () => setHandleBack(true);

  if (handleBack) return <Blog />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <Link href="/dashboard/blogUpdate">
          <button className="py-2 px-4 bg-[#D2145A] text-white rounded-lg">
            Update
          </button>
        </Link>
      </div>

      <button
        onClick={handleGoBack}
        className="mb-4 text-sm hover:text-[#D2145A] transition all duration-500"
      >
        ←Back
      </button>
    </div>
  );
}
