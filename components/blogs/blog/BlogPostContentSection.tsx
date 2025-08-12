import { PostStruct } from "@/utils/interfaces";
import React from "react";

const BlogPostContentSection = ({ post }: { post: PostStruct }) => {
  return (
    <section className="sm:p-6 leading-relaxed">
      <p className="dark:text-gray-400">{post.description}</p>
    </section>
  );
};

export default BlogPostContentSection;
