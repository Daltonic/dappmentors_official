"use client";

import { Service } from "@/utils/interfaces";
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
  FiUsers,
  FiEdit,
  FiPackage,
  FiHelpCircle,
} from "react-icons/fi";

interface ServiceFormProps {
  service?: Service | null;
  onSubmit: (serviceData: Partial<Service>) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  description: string;
  type: Service["type"];
  price: string;
  category: string;
  duration: string;
  lead: string;
  thumbnail: string;
  featured: boolean;
  status: Service["status"];
  tags: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  duration?: string;
  lead?: string;
  thumbnail?: string;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  service = null,
  onSubmit,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(service);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    type: "Development",
    price: "",
    category: "",
    duration: "",
    lead: "",
    thumbnail: "",
    featured: false,
    status: "active",
    tags: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);

  // Categories based on service types
  const categoryOptions = {
    Education: [
      "Online Learning",
      "Events",
      "Workshops",
      "Certifications",
      "Tutorials",
    ],
    Mentorship: [
      "Personal Development",
      "Career Guidance",
      "Code Review",
      "Project Support",
    ],
    Development: [
      "Blockchain Development",
      "Web Development",
      "Smart Contracts",
      "dApp Development",
      "Full-Stack",
    ],
    Writing: [
      "Content Creation",
      "Technical Writing",
      "Documentation",
      "Whitepapers",
      "Blogs",
    ],
    Hiring: [
      "Recruitment",
      "Talent Search",
      "Screening",
      "Placement",
      "HR Services",
    ],
    Community: [
      "Networking",
      "Discord Access",
      "Events",
      "Support Groups",
      "Forums",
    ],
  };

  // Duration suggestions based on service type
  const durationSuggestions = {
    Education: ["Monthly subscription", "1-3 days", "4-6 weeks", "Ongoing"],
    Mentorship: ["1 hour sessions", "Weekly", "Monthly", "Ongoing"],
    Development: ["4-8 weeks", "8-16 weeks", "Custom", "Ongoing"],
    Writing: ["1-4 weeks", "Per project", "Ongoing"],
    Hiring: ["2-6 weeks", "Per hire", "Ongoing"],
    Community: ["Ongoing", "Lifetime", "Monthly"],
  };

  // Initialize form data based on service prop
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        type: service.type,
        price: service.price.toString(),
        category: service.category,
        duration: service.duration,
        lead: service.lead,
        thumbnail: service.thumbnail,
        featured: service.featured,
        status: service.status,
        tags: service.tags.join(", "),
      });
    } else {
      setFormData({
        title: "",
        description: "",
        type: "Development",
        price: "",
        category: "",
        duration: "",
        lead: "",
        thumbnail: "",
        featured: false,
        status: "active",
        tags: "",
      });
    }
    setErrors({});
  }, [service]);

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

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    if (!formData.lead.trim()) {
      newErrors.lead = "Lead is required";
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
      const serviceData = {
        ...formData,
        price: isNaN(parseFloat(formData.price))
          ? formData.price
          : parseFloat(formData.price),
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        updatedAt: new Date().toISOString(),
        ...(!isEditMode && {
          id: Date.now().toString(),
          clients: 0,
          rating: 0,
          totalReviews: 0,
          createdAt: new Date().toISOString(),
          deliverables: [],
        }),
      };

      await onSubmit(serviceData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeIcon = (type: Service["type"]) => {
    switch (type) {
      case "Education":
        return <FiBook className="w-5 h-5" />;
      case "Mentorship":
        return <FiUsers className="w-5 h-5" />;
      case "Development":
        return <FiPackage className="w-5 h-5" />;
      case "Writing":
        return <FiEdit className="w-5 h-5" />;
      case "Hiring":
        return <FiUser className="w-5 h-5" />;
      case "Community":
        return <FiGlobe className="w-5 h-5" />;
      default:
        return <FiHelpCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: Service["type"]) => {
    switch (type) {
      case "Education":
        return "from-blue-500 to-blue-600";
      case "Mentorship":
        return "from-purple-500 to-purple-600";
      case "Development":
        return "from-green-500 to-green-600";
      case "Writing":
        return "from-orange-500 to-orange-600";
      case "Hiring":
        return "from-indigo-500 to-indigo-600";
      case "Community":
        return "from-pink-500 to-pink-600";
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
              {isEditMode ? "Edit Service" : "Create New Service"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the service information below"
                : "Fill in the details to create a new service"}
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
                  Service Title *
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
                  placeholder="Enter a compelling title for your service"
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
                  Service Type *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      "Education",
                      "Mentorship",
                      "Development",
                      "Writing",
                      "Hiring",
                      "Community",
                    ] as const
                  ).map((type) => (
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
                  ))}
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
                      e.target.value as Service["status"],
                    )
                  }
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="coming-soon">Coming Soon</option>
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
              placeholder="Describe what clients will receive from this service"
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
                  Price *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.price
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="e.g. 150 or Custom Quote"
                />
                {errors.price && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.price}
                  </p>
                )}
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
                    placeholder="e.g. 4-8 weeks"
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

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiTag className="inline w-4 h-4 mr-1" />
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
                  placeholder="e.g. Solidity, Security, Multi-chain"
                />
              </div>
            </div>
          </div>

          {/* Category & Lead */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FiTag className="w-5 h-5 text-[#D2145A]" />
              Category & Lead
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

              {/* Lead */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FiUser className="inline w-4 h-4 mr-1" />
                  Lead/Team *
                </label>
                <input
                  type="text"
                  value={formData.lead}
                  onChange={(e) => handleInputChange("lead", e.target.value)}
                  className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                    errors.lead
                      ? "border-red-300 dark:border-red-600"
                      : "border-gray-200/50 dark:border-gray-700/50"
                  }`}
                  placeholder="Enter lead or team name"
                />
                {errors.lead && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {errors.lead}
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
                      Featured Service
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Featured services appear prominently
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
                  {isEditMode ? "Update Service" : "Create Service"}
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

export default ServiceForm;
