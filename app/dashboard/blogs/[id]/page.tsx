"use client";

import { useState, useEffect, use } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/utils/interfaces";
import BlogForm from "@/components/dashboard/blogs/BlogForm";
import { toast } from "react-toastify";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();
  const { id } = use(params); // Unwrap params using React.use()
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data.blog);
      } catch (err) {
        console.error("Fetch blog error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleFormSubmit = async (blogData: Partial<BlogPost>) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blogData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update blog");
      }

      await response.json();
      toast.success("Blog updated successfully!", {
        onClose: () => router.push("/dashboard/blogs"), // Redirect after toast closes
      });
    } catch (err) {
      console.error("Update blog error:", err);
      toast.error(err instanceof Error ? err.message : "An error occurred", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 dark:text-gray-300">
            Loading blog...
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-4 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Error Loading Blog
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {error || "Blog not found"}
          </p>
          <button
            onClick={() => router.push("/dashboard/blogs")}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl sm:max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-cambo font-normal text-gray-900 dark:text-white mb-4">
            Update Blog Record
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            A single form component that automatically detects create/edit mode
            based on props
          </p>
        </div>

        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BlogForm
            blog={blog}
            onSubmit={handleFormSubmit}
            onCancel={() => router.back()}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
