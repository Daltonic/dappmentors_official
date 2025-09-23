// /components/dashboard/blogs/BlogForm.tsx
"use client";

import { BlogPost } from "@/utils/interfaces";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSave,
  FiFileText,
  FiUser,
  FiStar,
  FiImage,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
  FiCalendar,
  FiTag,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { blogApiService } from "@/services/blogApiService";
import MarkdownEditor from "./MarkdownEditor";

// Refined BlogPost interface

interface BlogFormProps {
  blog?: BlogPost | null;
  onSubmit?: (blogData: Partial<BlogPost>) => void;
  onSuccess?: (blog: BlogPost) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  publishDate: string;
  topics: string[];
  image: string;
  featured: boolean;
  status: BlogPost["status"];
  authorName: string;
  authorAvatar: string;
  authorBio: string;
  relatedProduct: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  excerpt?: string;
  category?: string;
  publishDate?: string;
  topics?: string;
  image?: string;
  authorName?: string;
  authorAvatar?: string;
  authorBio?: string;
  relatedProduct?: string;
  submit?: string;
}

// Default icons/emojis for blog images
const DEFAULT_ICONS = [
  "🚀",
  "💻",
  "🔗",
  "📱",
  "🌐",
  "⚡",
  "🔧",
  "📊",
  "🎯",
  "🌟",
  "🔥",
  "💡",
];

const isValidUrl = (string: string): boolean => {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
};

const BlogForm: React.FC<BlogFormProps> = ({
  blog = null,
  onSubmit,
  onSuccess,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(blog);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    publishDate: "",
    topics: [],
    image: DEFAULT_ICONS[0],
    featured: false,
    status: "draft",
    authorName: "",
    authorAvatar: "",
    authorBio: "",
    relatedProduct: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newTopic, setNewTopic] = useState("");

  // Initialize form data based on blog prop
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        excerpt: blog.excerpt,
        category: blog.category,
        publishDate: new Date(blog.publishDate).toISOString().split("T")[0],
        topics: blog.topics || [],
        image: blog.image || DEFAULT_ICONS[0],
        featured: blog.featured,
        status: blog.status,
        authorName: blog.author.name,
        authorAvatar: blog.author.avatar,
        authorBio: blog.author.bio,
        relatedProduct: blog.relatedProduct || "",
      });
    } else {
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        category: "",
        publishDate: new Date().toISOString().split("T")[0], // Default to today
        topics: [],
        image: DEFAULT_ICONS[0],
        featured: false,
        status: "draft",
        authorName: "",
        authorAvatar: "",
        authorBio: "",
        relatedProduct: "",
      });
    }
    setErrors({});
  }, [blog]);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // Step 1: Basic Information
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
      } else if (formData.excerpt.length > 300) {
        newErrors.excerpt = "Excerpt must be less than 300 characters";
      }

      if (!formData.category.trim()) {
        newErrors.category = "Category is required";
      }

      if (!formData.publishDate) {
        newErrors.publishDate = "Publish date is required";
      }
    } else if (step === 2) {
      // Step 2: Content and Topics
      if (!formData.content.trim()) {
        newErrors.content = "Content is required";
      } else if (formData.content.length < 100) {
        newErrors.content = "Content must be at least 100 characters";
      }

      if (formData.topics.length > 10) {
        newErrors.topics = "Maximum 10 topics allowed";
      }
    } else if (step === 3) {
      // Step 3: Author, Media, and Settings
      if (!formData.authorName.trim()) {
        newErrors.authorName = "Author name is required";
      }

      if (formData.image && !isValidUrl(formData.image)) {
        newErrors.image = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addTopic = () => {
    if (newTopic.trim() && formData.topics.length < 10) {
      setFormData((prev) => ({
        ...prev,
        topics: [...prev.topics, newTopic.trim()],
      }));
      setNewTopic("");
    }
  };

  const removeTopic = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index),
    }));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const publishDate = new Date(formData.publishDate);
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: formData.excerpt.trim(),
        category: formData.category.trim(),
        publishDate,
        topics: formData.topics,
        image: formData.image.trim(),
        featured: formData.featured,
        status: formData.status,
        author: {
          name: formData.authorName.trim(),
          avatar: formData.authorAvatar.trim(),
          bio: formData.authorBio.trim(),
        },
        relatedProduct: formData.relatedProduct.trim() || undefined,
      };

      let response;

      if (isEditMode && blog) {
        response = await blogApiService.updateBlog(blog.id, blogData);
      } else {
        response = await blogApiService.createBlog(blogData);
      }

      if (response.data) {
        if (onSubmit) {
          onSubmit(blogData);
        }

        if (onSuccess) {
          onSuccess(response.data.blog);
        }

        if (!isEditMode) {
          setFormData({
            title: "",
            content: "",
            excerpt: "",
            category: "",
            publishDate: new Date().toISOString().split("T")[0],
            topics: [],
            image: DEFAULT_ICONS[0],
            featured: false,
            status: "draft",
            authorName: "",
            authorAvatar: "",
            authorBio: "",
            relatedProduct: "",
          });
          setCurrentStep(1);
        }
      } else {
        setErrors({
          submit:
            response.error || "An error occurred while saving the blog post",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-xl text-white`}
          >
            <FiFileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
              {isEditMode ? "Edit Blog Post" : "Create New Blog Post"} - Step{" "}
              {currentStep}/3
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the blog post information below"
                : "Fill in the details to create a new blog post"}
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span
              className={`text-sm ${currentStep === 1 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Basic Info
            </span>
            <span
              className={`text-sm ${currentStep === 2 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Content & Topics
            </span>
            <span
              className={`text-sm ${currentStep === 3 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Author & Media
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-8">
        {/* Display submission errors */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm">
              {errors.submit}
            </p>
          </div>
        )}

        <div className="space-y-8">
          {currentStep === 1 && (
            <>
              <BasicInformationSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <ContentSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
              <TopicsSection
                formData={formData}
                newTopic={newTopic}
                setNewTopic={setNewTopic}
                addTopic={addTopic}
                removeTopic={removeTopic}
                errors={errors}
              />
            </>
          )}
          {currentStep === 3 && (
            <>
              <AuthorSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
              <MediaSettingsSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                showImagePreview={showImagePreview}
                setShowImagePreview={setShowImagePreview}
                defaultIcons={DEFAULT_ICONS}
              />
            </>
          )}
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
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
            >
              <FiArrowLeft className="inline w-4 h-4 mr-2" />
              Previous
            </button>
          )}
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Next
                <FiArrowRight className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
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
          )}
        </div>
      </form>
    </div>
  );
};

interface BasicInformationSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => void;
  errors: FormErrors;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-[#D2145A]" />
        Basic Information
      </h3>

      <div className="space-y-6">
        {/* Title */}
        <div>
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

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Excerpt *
          </label>
          <textarea
            rows={3}
            value={formData.excerpt}
            onChange={(e) => handleInputChange("excerpt", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
              errors.excerpt
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="A short summary of the post"
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
              {formData.excerpt.length}/300
            </p>
          </div>
        </div>

        {/* Category, Publish Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                errors.category
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-200/50 dark:border-gray-700/50"
              }`}
              placeholder="e.g. Solana"
            />
            {errors.category && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.category}
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
              onChange={(e) => handleInputChange("publishDate", e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

interface ContentSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => void;
  errors: FormErrors;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-[#D2145A]" />
        Post Content
      </h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Content (Markdown supported) *
        </label>

        <MarkdownEditor
          value={formData.content}
          onChange={(value) => handleInputChange("content", value)}
          placeholder="# Your Blog Title

          Start writing your blog content here. You can use markdown formatting:

          ## Subheading

          Write your introduction paragraph...

          ### Code Examples

          ```javascript
          const example = () => {
            console.log('Hello, World!');
          };
          ```

          - Bullet points work too
          - Add as many as you need

          [Link to external resource](https://example.com)

          ![Image description](https://image-url.com/image.jpg)

          > This is a blockquote for highlighting important information.

          Continue writing your content..."
          error={errors.content}
          height="500px"
          className="w-full"
        />

        {errors.content && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.content}
          </p>
        )}

        {/* Content Guidelines */}
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
            Content Writing Tips:
          </h4>
          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Use descriptive headings to structure your content</li>
            <li>• Include code examples and practical demonstrations</li>
            <li>• Add images to illustrate key concepts</li>
            <li>• Use blockquotes for important callouts</li>
            <li>• Link to relevant external resources</li>
            <li>• Keep paragraphs concise and readable</li>
          </ul>
        </div>

        <div className="mt-2 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>Markdown syntax supported</span>
          <span>{formData.content.length} characters</span>
        </div>
      </div>
    </div>
  );
};

interface TopicsSectionProps {
  formData: FormData;
  newTopic: string;
  setNewTopic: (value: string) => void;
  addTopic: () => void;
  removeTopic: (index: number) => void;
  errors: FormErrors;
}

const TopicsSection: React.FC<TopicsSectionProps> = ({
  formData,
  newTopic,
  setNewTopic,
  addTopic,
  removeTopic,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiTag className="w-5 h-5 text-[#D2145A]" />
        Topics/Tags
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Add a topic (e.g. Solana)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTopic();
              }
            }}
          />
          <button
            type="button"
            onClick={addTopic}
            disabled={!newTopic.trim() || formData.topics.length >= 10}
            className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {errors.topics && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.topics}
          </p>
        )}

        {formData.topics.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.topics.length}/10 topics
            </p>
            <AnimatePresence>
              {formData.topics.map((topic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {topic}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeTopic(index)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FiMinus className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

interface AuthorSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => void;
  errors: FormErrors;
}

const AuthorSection: React.FC<AuthorSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiUser className="w-5 h-5 text-[#D2145A]" />
        Author Information
      </h3>

      <div className="space-y-6">
        {/* Author Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            value={formData.authorName}
            onChange={(e) => handleInputChange("authorName", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.authorName
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. Alex Thompson"
          />
          {errors.authorName && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.authorName}
            </p>
          )}
        </div>

        {/* Author Avatar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Author Avatar (Emoji or URL)
          </label>
          <input
            type="text"
            value={formData.authorAvatar}
            onChange={(e) => handleInputChange("authorAvatar", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.authorAvatar
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. 👨‍💻 or https://avatar.url"
          />
          {errors.authorAvatar && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.authorAvatar}
            </p>
          )}
        </div>

        {/* Author Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Author Bio
          </label>
          <textarea
            rows={3}
            value={formData.authorBio}
            onChange={(e) => handleInputChange("authorBio", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
              errors.authorBio
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Short bio of the author"
          />
          {errors.authorBio && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.authorBio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface MediaSettingsSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[],
  ) => void;
  errors: FormErrors;
  showImagePreview: boolean;
  setShowImagePreview: (value: boolean) => void;
  defaultIcons: string[];
}

const MediaSettingsSection: React.FC<MediaSettingsSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  showImagePreview,
  setShowImagePreview,
  defaultIcons,
}) => {
  return (
    <div className="space-y-6">
      {/* Media Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiImage className="w-5 h-5 text-[#D2145A]" />
          Media
        </h3>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Featured Image (Emoji or URL)
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) => handleInputChange("image", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.image
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Enter emoji or image URL"
          />
          <div className="grid grid-cols-6 gap-2">
            {defaultIcons.map((icon, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleInputChange("image", icon)}
                className={`p-2 text-lg border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  formData.image === icon
                    ? "border-[#D2145A] bg-[#D2145A]/10"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
          {errors.image && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.image}
            </p>
          )}

          {/* Image Preview */}
          <AnimatePresence>
            {showImagePreview &&
              formData.image &&
              isValidUrl(formData.image) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="mt-4"
                >
                  <Image
                    src={formData.image}
                    alt="Featured image preview"
                    width={400}
                    height={200}
                    className="w-full max-w-md h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    onError={() => setShowImagePreview(false)}
                    unoptimized
                  />
                </motion.div>
              )}
          </AnimatePresence>
          {formData.image && isValidUrl(formData.image) && (
            <button
              type="button"
              onClick={() => setShowImagePreview(!showImagePreview)}
              className="mt-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {showImagePreview ? "Hide Preview" : "Show Preview"}
            </button>
          )}
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiSettings className="w-5 h-5 text-[#D2145A]" />
          Settings
        </h3>

        <div className="space-y-4">
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Featured */}
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
                  Featured posts appear prominently
                </div>
              </label>
            </div>
            <FiStar
              className={`w-6 h-6 ${formData.featured ? "text-yellow-500" : "text-gray-300"}`}
            />
          </div>

          {/* Related Product */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Related Product/Service
            </label>
            <input
              type="text"
              value={formData.relatedProduct}
              onChange={(e) =>
                handleInputChange("relatedProduct", e.target.value)
              }
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
              placeholder="e.g. Solana Development Course"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
