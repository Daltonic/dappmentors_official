"use client";

import { BlogPost } from "@/utils/interfaces";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FiSave,
  FiClock,
  FiUser,
  FiTag,
  FiBook,
  FiStar,
  FiImage,
  FiFileText,
  FiCalendar,
  FiLink,
} from "react-icons/fi";

interface BlogPostFormProps {
  blogPost?: BlogPost | null;
  onSubmit: (blogPostData: Partial<BlogPost>) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishDate: string;
  topics: string;
  imageSrc: string;
  alt: string;
  icon: string;
  gradient: string;
  featured: boolean;
  relatedProduct: string;
  status: BlogPost["status"];
  author: string;
}

interface FormErrors {
  title?: string;
  excerpt?: string;
  category?: string;
  readTime?: string;
  publishDate?: string;
  author?: string;
  imageSrc?: string;
  alt?: string;
}

const BlogForm: React.FC<BlogPostFormProps> = ({
  blogPost = null,
  onSubmit,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(blogPost);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    excerpt: "",
    category: "",
    readTime: "",
    publishDate: "",
    topics: "",
    imageSrc: "",
    alt: "",
    icon: "",
    gradient: "",
    featured: false,
    relatedProduct: "",
    status: "draft",
    author: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Categories based on mock data
  const categoryOptions = [
    "Blockchain Development",
    "Web3 Development",
    "DeFi",
    "NFT Development",
    "Frontend Development",
    "Security",
  ];

  // Read time suggestions
  const readTimeSuggestions = [
    "5 min",
    "8 min",
    "10 min",
    "12 min",
    "15 min",
    "20 min",
  ];

  // Initialize form data based on blogPost prop
  useEffect(() => {
    if (blogPost) {
      setFormData({
        title: blogPost.title,
        excerpt: blogPost.excerpt,
        category: blogPost.category,
        readTime: blogPost.readTime,
        publishDate: blogPost.publishDate,
        topics: blogPost.topics.join(", "),
        imageSrc: blogPost.imageSrc,
        alt: blogPost.alt,
        icon: blogPost.icon,
        gradient: blogPost.gradient,
        featured: blogPost.featured,
        relatedProduct: blogPost.relatedProduct,
        status: blogPost.status,
        author: blogPost.author,
      });
    } else {
      setFormData({
        title: "",
        excerpt: "",
        category: "",
        readTime: "",
        publishDate: "",
        topics: "",
        imageSrc: "",
        alt: "",
        icon: "",
        gradient: "",
        featured: false,
        relatedProduct: "",
        status: "draft",
        author: "",
      });
    }
    setErrors({});
  }, [blogPost]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = "Excerpt is required";
    } else if (formData.excerpt.length < 10) {
      newErrors.excerpt = "Excerpt must be at least 10 characters";
    } else if (formData.excerpt.length > 500) {
      newErrors.excerpt = "Excerpt must be less than 500 characters";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.readTime.trim()) {
      newErrors.readTime = "Read time is required";
    }

    if (!formData.publishDate) {
      newErrors.publishDate = "Publish date is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }

    if (formData.imageSrc && !isValidUrl(formData.imageSrc)) {
      newErrors.imageSrc = "Please enter a valid URL";
    }

    if (formData.imageSrc && !formData.alt.trim()) {
      newErrors.alt = "Alt text is required when providing an image";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string): boolean => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const blogPostData = {
        ...formData,
        topics: formData.topics
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        updatedAt: new Date().toISOString().split("T")[0],
        ...(!isEditMode && {
          id: Date.now().toString(),
          views: 0,
          comments: 0,
          createdAt: new Date().toISOString().split("T")[0],
        }),
      };

      await onSubmit(blogPostData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl text-white">
            <FiFileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
              {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the blog post information below"
                : "Fill in the details to create a new blog post"}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiFileText className="w-5 h-5 text-[#D2145A]" />
              Basic Information
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Title */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.title
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="Enter a compelling title for your blog post"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.category
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    handleInputChange(
                      "status",
                      e.target.value as BlogPost["status"],
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              rows={4}
              value={formData.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
                errors.excerpt
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-200/50 dark:border-gray-700/50"
              }`}
              placeholder="Provide a brief summary of the blog post"
            />
            <div className="flex justify-between items-center mt-2">
              {errors.excerpt ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.excerpt}
                </p>
              ) : (
                <div />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.excerpt.length}/500
              </p>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTag className="w-5 h-5 text-[#D2145A]" />
              Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Read Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiClock className="inline w-4 h-4 mr-1" />
                  Read Time *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) =>
                      handleInputChange("readTime", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                      errors.readTime
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                    placeholder="e.g. 8 min"
                    list="readtime-suggestions"
                  />
                  <datalist id="readtime-suggestions">
                    {readTimeSuggestions.map((suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                </div>
                {errors.readTime && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.readTime}
                  </p>
                )}
              </div>

              {/* Publish Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiCalendar className="inline w-4 h-4 mr-1" />
                  Publish Date *
                </label>
                <input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) =>
                    handleInputChange("publishDate", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.publishDate
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                />
                {errors.publishDate && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.publishDate}
                  </p>
                )}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.author
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.author}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiBook className="w-5 h-5 text-[#D2145A]" />
              Content
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Topics */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Topics (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.topics}
                  onChange={(e) => handleInputChange("topics", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g. Blockchain, Crypto, Decentralization"
                />
              </div>

              {/* Related Product */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiLink className="inline w-4 h-4 mr-1" />
                  Related Product
                </label>
                <input
                  type="text"
                  value={formData.relatedProduct}
                  onChange={(e) =>
                    handleInputChange("relatedProduct", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g. Complete Solidity Course"
                />
              </div>
            </div>
          </div>

          {/* Media & Design */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiImage className="w-5 h-5 text-[#D2145A]" />
              Media & Design
            </h3>

            <div className="space-y-6">
              {/* Image Src & Alt */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.imageSrc}
                    onChange={(e) =>
                      handleInputChange("imageSrc", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                      errors.imageSrc
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageSrc && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.imageSrc}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.alt}
                    onChange={(e) => handleInputChange("alt", e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                      errors.alt
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                    placeholder="Image description"
                  />
                  {errors.alt && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                      {errors.alt}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Preview */}
              {formData.imageSrc && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setShowImagePreview(!showImagePreview)}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                  >
                    {showImagePreview ? "Hide Preview" : "Show Preview"}
                  </button>
                </div>
              )}
              {showImagePreview && formData.imageSrc && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <Image
                    src={formData.imageSrc}
                    alt={formData.alt || "Image preview"}
                    width={400}
                    height={160}
                    className="w-full max-w-md h-40 object-cover rounded-lg"
                    onError={() => setShowImagePreview(false)}
                    unoptimized
                  />
                </div>
              )}

              {/* Icon & Gradient */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Icon/Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => handleInputChange("icon", e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g. 🔗"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Gradient Class
                  </label>
                  <input
                    type="text"
                    value={formData.gradient}
                    onChange={(e) =>
                      handleInputChange("gradient", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                    placeholder="e.g. from-blue-500 to-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiStar className="w-5 h-5 text-[#D2145A]" />
              Settings
            </h3>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    handleInputChange("featured", e.target.checked)
                  }
                  className="w-5 h-5 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                />
                <label htmlFor="featured" className="ml-3 cursor-pointer">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Featured Post
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Featured posts appear prominently on the blog page
                  </div>
                </label>
              </div>
              <FiStar
                className={`w-6 h-6 ${formData.featured ? "text-yellow-500" : "text-gray-300"}`}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="w-4 h-4" />
                  {isEditMode ? "Update Blog Post" : "Create Blog Post"}
                </>
              )}
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
