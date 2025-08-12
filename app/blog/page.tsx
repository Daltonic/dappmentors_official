import BlogPost from "@/components/blogs/BlogPost";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import React from "react";

const BlogPage = () => {
  return (
    <MarketingLayout>
      <div className="max-w-screen-xl mx-auto space-y-10">
        <BlogPost />
      </div>
    </MarketingLayout>
  );
};

export default BlogPage;
