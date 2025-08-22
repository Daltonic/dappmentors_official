"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/utils/interfaces";
import BlogForm from "@/components/dashboard/blogs/BlogForm";

// Example usage component
const Page: React.FC = () => {
  const handleFormSubmit = (blogData: Partial<BlogPost>) => {
    console.log("Form submitted with data:", blogData);
    alert(`Blog ${blogData.id ? "updated" : "created"} successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-[#0A0A0A] dark:to-purple-900/20 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Edit Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <BlogForm
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Edit cancelled")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
