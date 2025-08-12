import { PostStruct } from "@/utils/interfaces";
import React from "react";

const BlogPostStoriesOfImpact: React.FC<{ post: PostStruct }> = ({
  post,
}: {
  post: PostStruct;
}) => {
  return (
    <section className="sm:p-6 leading-relaxed">
      <h2 className="text-2xl font-semibold">Stories of Impact</h2>
      <p className="dark:text-gray-400">{post.description}</p>
    </section>
  );
};

export default BlogPostStoriesOfImpact;
