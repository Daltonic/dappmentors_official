import { PostStruct } from "@/utils/interfaces";
import React from "react";

const BlogPostHeader: React.FC<{ post: PostStruct }> = ({
  post,
}: {
  post: PostStruct;
}) => {
  return (
    <div>
      <header className="sm:p-6 leading-relaxed">
        <p className="text-sm text-[#D2145A] font-semibold uppercase">
          Blog Posts Details
        </p>
        <h1 className="text-3xl font-bold mt-2 leading-tight">{post.title}</h1>
        <p className="text-gray-600 mt-2 leading-relaxed">{post.description}</p>
        <div className="mt-3 text-sm">
          <p className="text-gray-700">Author: John Doe</p>
          <p className="text-[#D2145A] font-semibold">{post.date}</p>
        </div>
      </header>
    </div>
  );
};

export default BlogPostHeader;
