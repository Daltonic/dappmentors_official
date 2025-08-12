"use client";

import { useState, useEffect } from "react";
import AllBlogHeader from "./AllBlogHeader";
import Button from "../../shared/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Blog } from "@/utils/interfaces";
import AllBlogCards from "./AllBlogCards";

export default function AllBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/blogs");
      const data = await response.json();
      if (data.status === 200) {
        setBlogs(data.data);
      } else {
        setError(data.details || "Failed to fetch blogs");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error)
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  if (blogs.length === 0)
    return <div className="p-4 text-center">No blogs available</div>;

  return (
    <div className="p-4 bg-white dark:bg-black rounded-lg">
      <div className="dark:bg-black p-2 rounded-2xl">
        <AllBlogHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
          {currentBlogs.map((blog) => (
            <AllBlogCards key={blog._id} post={blog} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <Button
              label=""
              icon={<ChevronLeft size={18} />}
              className="bg-gray-200 dark:bg-gray-700"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                label={page.toString()}
                key={page}
                className={`${
                  page === currentPage
                    ? "bg-[#D2145A] text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                }`}
                onClick={() => setCurrentPage(page)}
              />
            ))}
            <Button
              label=""
              icon={<ChevronRight size={18} />}
              className="bg-gray-200 dark:bg-gray-700"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
