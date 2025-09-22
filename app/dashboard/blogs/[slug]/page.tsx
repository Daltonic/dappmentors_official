"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/utils/interfaces";
import BlogForm from "@/components/dashboard/blogs/BlogForm";
import { sampleBlogPost } from "@/data/global";

// Example usage component
const Page: React.FC = () => {
  // Mock product for editing example
  const mockBlog: BlogPost = sampleBlogPost;

  const handleFormSubmit = (blogData: Partial<BlogPost>) => {
    console.log("Form submitted with data:", blogData);
    alert(`Blog ${blogData.id ? "updated" : "created"} successfully!`);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BlogForm
            blog={mockBlog}
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Edit cancelled")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
