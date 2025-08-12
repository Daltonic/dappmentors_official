"use client"

import BlogPostConclusion from "@/components/blogs/blog/BlogPostConclusion";
import BlogPostContentSection from "@/components/blogs/blog/BlogPostContentSection";
import BlogPostHeader from "@/components/blogs/blog/BlogPostHeader";
import BlogPostImage from "@/components/blogs/blog/BlogPostImage";
import BlogPostStoriesOfImpact from "@/components/blogs/blog/BlogPostStoriesOfImpact";
import MarketingLayout from "@/components/layouts/MarketingLayout";
import { posts } from "@/data/global";
import { PostStruct } from "@/utils/interfaces";
import { NextPage } from "next";
import { useParams } from "next/navigation";

const Page: NextPage = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined; // ✅ Type casting

  const post = posts.find((post: PostStruct) => post.slug == slug)
  

  return (
    <MarketingLayout>
      <div className="max-w-full mx-auto px-4 md:px-10 py-10 bg-white dark:bg-gray-900 ">
        <div className="max-w-[1000px] mx-auto p-4 space-y-8">
          <BlogPostHeader post={post!}/>
          <BlogPostImage post={post!}/>
          <BlogPostContentSection post={post!}/>
          <BlogPostStoriesOfImpact post={post!}/>
          <BlogPostConclusion post={post!}/>
        </div>
        
      </div>
    </MarketingLayout>
  );
};

export default Page;
