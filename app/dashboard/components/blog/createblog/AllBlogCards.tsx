"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Blog } from "@/utils/interfaces";

const AllBlogCards = ({ post }: { post: Blog }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const formattedDate = format(new Date(post.createdAt), "MMM d, yyyy");

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?slug=${post.slug}`, {
          method: "DELETE",
        });
        if (response.ok) {
          console.log("Blog deleted");
          window.location.reload();
        } else {
          const result = await response.json();
          console.error(result.details);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="relative bg-[#F2F2F2] dark:bg-[#1A1A1A] rounded-xl shadow-md hover:scale-105 transition-transform">
      <div className="w-full h-48 relative">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            objectFit="cover"
            className="rounded-t-xl"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center rounded-t-xl">
            <p className="text-gray-600">No image available</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-[20px] font-semibold text-black dark:text-white">
          {post.title}
        </h2>
        <p className="text-xs font-light text-gray-700 dark:text-gray-300">
          Author: {post.author}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 font-light">
          📅 {formattedDate}
        </p>
      </div>

      <button
        onClick={toggleMenu}
        className="absolute top-3 right-3 bg-black p-1 rounded-full"
      >
        <MoreVertical size={20} className="text-white" />
      </button>

      {menuOpen && (
        <div className="absolute top-10 right-4 bg-white dark:bg-gray-800 shadow-md rounded p-2">
          <Link href={`/dashboard/blogUpdate?slug=${post.slug}`}>
            <button className="text-sm text-gray-700 dark:text-gray-300 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700">
              Update Blog Post
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Delete Blog Post
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBlogCards;
