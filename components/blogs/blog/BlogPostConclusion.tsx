import { PostStruct } from "@/utils/interfaces";
import React from "react";

const BlogPostConclusion: React.FC<{ post: PostStruct }> = ({
  post,
}: {
  post: PostStruct;
}) => {
  return (
    <section className="sm:p-6 leading-relaxed">
      <h2 className="text-2xl font-semibold"></h2>
      <p className="dark:text-gray-400">{post.description}</p>
    </section>
  );
};

export default BlogPostConclusion;
