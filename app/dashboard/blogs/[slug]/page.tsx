"use client";

import { motion } from "framer-motion";
import { BlogPost } from "@/utils/interfaces";
import BlogForm from "@/components/dashboard/blogs/BlogForm";

// Example usage component
const Page: React.FC = () => {
  // Mock product for editing example
  const mockBlog: BlogPost = {
    id: "1",
    title: "Understanding Blockchain Fundamentals",
    excerpt:
      "Dive into the basics of blockchain technology and its applications in modern development",
    category: "Blockchain Development",
    readTime: "8 min",
    publishDate: "2024-08-15",
    topics: ["Blockchain", "Crypto", "Decentralization"],
    imageSrc:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=240&fit=crop",
    alt: "Blockchain illustration",
    icon: "🔗",
    gradient: "from-blue-500 to-purple-500",
    featured: true,
    relatedProduct: "Complete Solidity Course",
    status: "published",
    views: 1247,
    comments: 45,
    author: "Darlington Gospel",
    updatedAt: "2024-08-20",
  };

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
            blogPost={mockBlog}
            onSubmit={handleFormSubmit}
            onCancel={() => console.log("Edit cancelled")}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
