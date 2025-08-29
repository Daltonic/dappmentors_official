"use client";

import { Product } from "@/utils/interfaces";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSave,
  FiDollarSign,
  FiClock,
  FiUser,
  FiTag,
  FiBook,
  FiStar,
  FiImage,
  FiFileText,
  FiGlobe,
} from "react-icons/fi";

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (productData: Partial<Product>) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  description: string;
  type: Product["type"];
  price: string;
  category: string;
  difficulty: Product["difficulty"];
  duration: string;
  instructor: string;
  thumbnail: string;
  featured: boolean;
  status: Product["status"];
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  duration?: string;
  instructor?: string;
  thumbnail?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product = null,
  onSubmit,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(product);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    type: "Course",
    price: "",
    category: "",
    difficulty: "Beginner",
    duration: "",
    instructor: "",
    thumbnail: "",
    featured: false,
    status: "draft",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Categories based on product types
  const categoryOptions = {
    Course: [
      "Blockchain Development",
      "Web3 Development",
      "Frontend Development",
      "Backend Development",
      "Full Stack Development",
      "Mobile Development",
      "DevOps",
      "Security",
      "Data Science",
      "Machine Learning",
    ],
    Bootcamp: [
      "Full Stack Bootcamp",
      "Blockchain Bootcamp",
      "Web3 Bootcamp",
      "Frontend Bootcamp",
      "Backend Bootcamp",
      "DevOps Bootcamp",
      "Security Bootcamp",
    ],
    eBook: [
      "Programming",
      "Blockchain",
      "Web Development",
      "Security",
      "DeFi",
      "NFT Development",
      "Smart Contracts",
      "Career Development",
    ],
    Codebase: [
      "Web Applications",
      "Mobile Apps",
      "Smart Contracts",
      "DeFi Protocols",
      "NFT Marketplace",
      "Trading Bots",
      "APIs",
      "Tools & Utilities",
    ],
  };

  // Duration suggestions based on product type
  const durationSuggestions = {
    Course: [
      "4 weeks",
      "6 weeks",
      "8 weeks",
      "10 weeks",
      "12 weeks",
      "16 weeks",
    ],
    Bootcamp: [
      "6 weeks",
      "8 weeks",
      "12 weeks",
      "16 weeks",
      "20 weeks",
      "24 weeks",
    ],
    eBook: [
      "50 pages",
      "100 pages",
      "150 pages",
      "200 pages",
      "250 pages",
      "300+ pages",
    ],
    Codebase: ["Basic", "Intermediate", "Advanced", "Full Stack", "Enterprise"],
  };

  // Initialize form data based on product prop
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        description: product.description,
        type: product.type,
        price: product.price.toString(),
        category: product.category,
        difficulty: product.difficulty,
        duration: product.duration,
        instructor: product.instructor,
        thumbnail: product.thumbnail,
        featured: product.featured,
        status: product.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        type: "Course",
        price: "",
        category: "",
        difficulty: "Beginner",
        duration: "",
        instructor: "",
        thumbnail: "",
        featured: false,
        status: "draft",
      });
    }
    setErrors({});
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.price) {
      newErrors.price = "Price is required";
    } else {
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        newErrors.price = "Price must be a valid number";
      } else if (price > 10000) {
        newErrors.price = "Price cannot exceed $10,000";
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = "Instructor is required";
    }

    if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
      newErrors.thumbnail = "Please enter a valid URL";
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
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        updatedAt: new Date(),
        ...(!isEditMode && {
          id: Date.now().toString(),
          enrollments: 0,
          rating: 0,
          totalReviews: 0,
          createdAt: new Date(),
        }),
      };

      await onSubmit(productData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: Product["type"]) => {
    switch (type) {
      case "Course":
        return <FiBook className="w-5 h-5" />;
      case "Bootcamp":
        return <FiStar className="w-5 h-5" />;
      case "eBook":
        return <FiFileText className="w-5 h-5" />;
      case "Codebase":
        return <FiGlobe className="w-5 h-5" />;
      default:
        return <FiBook className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Product["type"]) => {
    switch (type) {
      case "Course":
        return "from-blue-500 to-blue-600";
      case "Bootcamp":
        return "from-purple-500 to-purple-600";
      case "eBook":
        return "from-green-500 to-green-600";
      case "Codebase":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      className={`bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg ${className}`}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 bg-gradient-to-r ${getTypeColor(formData.type)} rounded-xl text-white`}
          >
            {getTypeIcon(formData.type)}
          </div>
          <div>
            <h2 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
              {isEditMode ? "Edit Product" : "Create New Product"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the product information below"
                : "Fill in the details to create a new product"}
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
                  Product Title *
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
                  placeholder="Enter a compelling title for your product"
                />
                {errors.title && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Product Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["Course", "Bootcamp", "eBook", "Codebase"] as const).map(
                    (type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          handleInputChange("type", type);
                          handleInputChange("category", ""); // Reset category when type changes
                        }}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium ${
                          formData.type === type
                            ? `bg-gradient-to-r ${getTypeColor(type)} text-white border-transparent shadow-lg`
                            : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        {getTypeIcon(type)}
                        {type}
                      </button>
                    ),
                  )}
                </div>
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
                      e.target.value as Product["status"],
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

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
                errors.description
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-200/50 dark:border-gray-700/50"
              }`}
              placeholder="Describe what students will learn and achieve from this product"
            />
            <div className="flex justify-between items-center mt-2">
              {errors.description ? (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.description}
                </p>
              ) : (
                <div />
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Pricing & Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiDollarSign className="w-5 h-5 text-[#D2145A]" />
              Pricing & Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiDollarSign className="inline w-4 h-4 mr-1" />
                  Price (USD) *
                </label>
                <input
                  type="number"
                  min="0"
                  max="10000"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.price
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.price}
                  </p>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiStar className="inline w-4 h-4 mr-1" />
                  Difficulty *
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    handleInputChange(
                      "difficulty",
                      e.target.value as Product["difficulty"],
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiClock className="inline w-4 h-4 mr-1" />
                  Duration *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) =>
                      handleInputChange("duration", e.target.value)
                    }
                    className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                      errors.duration
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                    placeholder="e.g. 8 weeks"
                    list="duration-suggestions"
                  />
                  <datalist id="duration-suggestions">
                    {durationSuggestions[formData.type].map((suggestion) => (
                      <option key={suggestion} value={suggestion} />
                    ))}
                  </datalist>
                </div>
                {errors.duration && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Category & Instructor */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTag className="w-5 h-5 text-[#D2145A]" />
              Category & Instructor
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Category *
                </label>
                <div className="relative">
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
                    {categoryOptions[formData.type].map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.category && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Instructor */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Instructor *
                </label>
                <input
                  type="text"
                  value={formData.instructor}
                  onChange={(e) =>
                    handleInputChange("instructor", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.instructor
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="Enter instructor name"
                />
                {errors.instructor && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.instructor}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Media & Settings */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiImage className="w-5 h-5 text-[#D2145A]" />
              Media & Settings
            </h3>

            <div className="space-y-6">
              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Thumbnail URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={formData.thumbnail}
                    onChange={(e) =>
                      handleInputChange("thumbnail", e.target.value)
                    }
                    className={`flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                      errors.thumbnail
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-200/50 dark:border-gray-700/50"
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.thumbnail && (
                    <button
                      type="button"
                      onClick={() => setShowImagePreview(!showImagePreview)}
                      className="px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiImage className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {errors.thumbnail && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.thumbnail}
                  </p>
                )}

                {/* Image Preview */}
                {showImagePreview && formData.thumbnail && (
                  <Image
                    src={formData.thumbnail}
                    alt="Thumbnail preview"
                    width={400}
                    height={160}
                    className="w-full max-w-md h-40 object-cover rounded-lg"
                    onError={() => setShowImagePreview(false)}
                    unoptimized
                  />
                )}
              </div>

              {/* Featured Toggle */}
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
                      Featured Product
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Featured products appear prominently on the homepage
                    </div>
                  </label>
                </div>
                <FiStar
                  className={`w-6 h-6 ${formData.featured ? "text-yellow-500" : "text-gray-300"}`}
                />
              </div>
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
                  {isEditMode ? "Update Product" : "Create Product"}
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

export default ProductForm;
