"use client";

import MarketingLayout from "@/components/layouts/MarketingLayout";
import { NextPage } from "next";
import { useParams } from "next/navigation";

const Page: NextPage = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined; // ✅ Type casting
  console.log("slug", slug);

  // const post = posts.find((post: PostStruct) => post.slug == slug)

  return (
    <MarketingLayout>
      <div className="max-w-full mx-auto px-4 md:px-10 py-10 bg-white dark:bg-gray-900 ">
        <div className="max-w-[1000px] mx-auto p-4 space-y-8">
          <h4>Hello</h4>
        </div>
      </div>
    </MarketingLayout>
  );
};

export default Page;
