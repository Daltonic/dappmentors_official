import { PostStruct } from "@/utils/interfaces";
import Image from "next/image";
import React from "react";

const BlogPostImage: React.FC<{ post: PostStruct }> = ({
  post,
}: {
  post: PostStruct;
}) => {
  return (
    <div className="relative w-full h-[273px] rounded-lg overflow-hidden">
      <Image
        src={post.image}
        alt="Fundraiser Event"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
};

export default BlogPostImage;
