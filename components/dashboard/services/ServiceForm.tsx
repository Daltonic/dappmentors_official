// Updated components/dashboard/services/ServiceForm.tsx
"use client";

import { FAQs, Service, Package, ServiceType } from "@/utils/interfaces";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiSave,
  FiDollarSign,
  FiUser,
  FiStar,
  FiImage,
  FiFileText,
  FiHelpCircle,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
} from "react-icons/fi";
import {
  serviceApiService,
  CreateServiceData,
  UpdateServiceData,
} from "@/services/serviceApiService";
import { motion, AnimatePresence } from "framer-motion";

interface ServiceFormProps {
  service?: Service | null;
  onSubmit?: (serviceData: Partial<Service>) => void;
  onSuccess?: (service: Service) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  description: string;
  price: string;
  featured: boolean;
  status: Service["status"];
  thumbnail: string;
  features: string[];
  faqs: FAQs[];
  icon: string;
  clients: string;
  packages: Package[];
  type: ServiceType;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  thumbnail?: string;
  features?: string;
  faqs?: string;
  icon?: string;
  clients?: string;
  packages?: string;
  submit?: string;
  type?: string;
}

// Default icons for different service types
const DEFAULT_ICONS = [
  "💼",
  "🎨",
  "📱",
  "💻",
  "🚀",
  "⚡",
  "🔧",
  "📊",
  "🎯",
  "🌟",
  "🔥",
  "💡",
  "🎪",
  "🎭",
  "🎬",
  "📝",
];

const ServiceForm: React.FC<ServiceFormProps> = ({
  service = null,
  onSubmit,
  onSuccess,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(service);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
    featured: false,
    status: "active",
    thumbnail: "",
    features: [],
    faqs: [],
    icon: DEFAULT_ICONS[0],
    clients: "0",
    packages: [],
    type: "Education", // Default type
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newPackageName, setNewPackageName] = useState("");
  const [newPackagePrice, setNewPackagePrice] = useState("");
  const [newPackageFeatures, setNewPackageFeatures] = useState("");

  // Initialize form data based on service prop
  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title,
        description: service.description,
        price: service.price.toString(),
        featured: service.featured,
        status: service.status,
        thumbnail: service.thumbnail || "",
        features: service.features || [],
        faqs: service.faqs || [],
        icon: service.icon || DEFAULT_ICONS[0],
        clients: service.clients.toString() || "0",
        packages: service.packages || [],
        type: service.type || "Education", // Set type from service or default
      });
    } else {
      setFormData({
        title: "",
        description: "",
        price: "",
        featured: false,
        status: "active",
        thumbnail: "",
        features: [],
        faqs: [],
        icon: DEFAULT_ICONS[0],
        clients: "0",
        packages: [],
        type: "Education", // Default type
      });
    }
    setErrors({});
  }, [service]);

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

      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      } else if (formData.description.length < 10) {
        newErrors.description = "Description must be at least 10 characters";
      } else if (formData.description.length > 1000) {
        newErrors.description = "Description must be less than 1000 characters";
      }

      if (!formData.icon.trim()) {
        newErrors.icon = "Icon is required";
      }

      if (!formData.price.trim()) {
        newErrors.price = "Price is required";
      }

      if (!formData.type) {
        newErrors.type = "Service type is required"; // Validate type
      }
    } else if (step === 2) {
      // Step 2: Features, Packages, and Client Info
      if (formData.clients && isNaN(parseInt(formData.clients))) {
        newErrors.clients = "Clients must be a number";
      }

      if (formData.features.length > 10) {
        newErrors.features = "Maximum 10 features allowed";
      }

      if (formData.packages.length > 5) {
        newErrors.packages = "Maximum 5 packages allowed";
      }
    } else if (step === 3) {
      // Step 3: FAQs, Media, and Settings
      if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
        newErrors.thumbnail = "Please enter a valid URL";
      }

      if (formData.faqs.length > 10) {
        newErrors.faqs = "Maximum 10 FAQs allowed";
      }
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
    value: string | boolean | string[] | FAQs[] | Package[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim() && formData.features.length < 10) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addFAQ = () => {
    if (newQuestion.trim() && newAnswer.trim() && formData.faqs.length < 10) {
      setFormData((prev) => ({
        ...prev,
        faqs: [
          ...prev.faqs,
          {
            question: newQuestion.trim(),
            answer: newAnswer.trim(),
          },
        ],
      }));
      setNewQuestion("");
      setNewAnswer("");
    }
  };

  const removeFAQ = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const addPackage = () => {
    if (
      newPackageName.trim() &&
      newPackagePrice.trim() &&
      formData.packages.length < 5
    ) {
      const featuresArray = newPackageFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      const packagePrice = isNaN(parseFloat(newPackagePrice))
        ? newPackagePrice.trim()
        : parseFloat(newPackagePrice);
      setFormData((prev) => ({
        ...prev,
        packages: [
          ...prev.packages,
          {
            name: newPackageName.trim(),
            price: String(packagePrice),
            features: featuresArray,
          },
        ],
      }));
      setNewPackageName("");
      setNewPackagePrice("");
      setNewPackageFeatures("");
    }
  };

  const removePackage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
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
      const serviceData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: isNaN(parseFloat(formData.price))
          ? formData.price.trim()
          : parseFloat(formData.price),
        featured: formData.featured,
        status: formData.status,
        thumbnail: formData.thumbnail.trim(),
        features: formData.features,
        faqs: formData.faqs,
        icon: formData.icon.trim(),
        clients: parseInt(formData.clients) || 0,
        packages: formData.packages,
        type: formData.type,
      };

      let response;

      if (isEditMode && service) {
        const updateData: UpdateServiceData = serviceData;
        response = await serviceApiService.updateService(
          service.id,
          updateData,
        );
      } else {
        const createData: CreateServiceData = serviceData;
        response = await serviceApiService.createService(createData);
      }

      if (response.data) {
        if (onSubmit) {
          onSubmit(response.data.service);
        }

        if (onSuccess) {
          onSuccess(response.data.service);
        }

        if (!isEditMode) {
          setFormData({
            title: "",
            description: "",
            price: "",
            featured: false,
            status: "active",
            thumbnail: "",
            features: [],
            faqs: [],
            icon: DEFAULT_ICONS[0],
            clients: "0",
            packages: [],
            type: "Education", // Default type
          });
          setCurrentStep(1); // Reset to first step
        }
      } else {
        setErrors({
          submit:
            response.error || "An error occurred while saving the service",
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
              {isEditMode ? "Edit Service" : "Create New Service"} - Step{" "}
              {currentStep}/3
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the service information below"
                : "Fill in the details to create a new service"}
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span
              className={`text-sm ${currentStep === 1 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Basic Info & Pricing
            </span>
            <span
              className={`text-sm ${currentStep === 2 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Features & Packages
            </span>
            <span
              className={`text-sm ${currentStep === 3 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              FAQs & Media
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
                defaultIcons={DEFAULT_ICONS}
              />
              <PricingSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <ClientInfoSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
              <FeaturesSectionForm
                formData={formData}
                newFeature={newFeature}
                setNewFeature={setNewFeature}
                addFeature={addFeature}
                removeFeature={removeFeature}
                errors={errors}
              />
              <PackagesSection
                formData={formData}
                newPackageName={newPackageName}
                setNewPackageName={setNewPackageName}
                newPackagePrice={newPackagePrice}
                setNewPackagePrice={setNewPackagePrice}
                newPackageFeatures={newPackageFeatures}
                setNewPackageFeatures={setNewPackageFeatures}
                addPackage={addPackage}
                removePackage={removePackage}
                errors={errors}
              />
            </>
          )}
          {currentStep === 3 && (
            <>
              <FAQsSection
                formData={formData}
                newQuestion={newQuestion}
                setNewQuestion={setNewQuestion}
                newAnswer={newAnswer}
                setNewAnswer={setNewAnswer}
                addFAQ={addFAQ}
                removeFAQ={removeFAQ}
                errors={errors}
              />
              <MediaSettingsSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                showImagePreview={showImagePreview}
                setShowImagePreview={setShowImagePreview}
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
                    {isEditMode ? "Update Service" : "Create Service"}
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
    value: string | boolean | string[] | FAQs[] | Package[] | ServiceType,
  ) => void; // Update handleInputChange type
  errors: FormErrors;
  defaultIcons: string[];
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  defaultIcons,
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
              {formData.description.length}/1000
            </p>
          </div>
        </div>

        {/* Icon & Status & Type */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Icon *
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => handleInputChange("icon", e.target.value)}
                className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                  errors.icon
                    ? "border-red-300 dark:border-red-600"
                    : "border-gray-200/50 dark:border-gray-700/50"
                }`}
                placeholder="Enter custom icon or select from below"
              />
              <div className="grid grid-cols-8 gap-2">
                {defaultIcons.map((icon, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleInputChange("icon", icon)}
                    className={`p-2 text-lg border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      formData.icon === icon
                        ? "border-[#D2145A] bg-[#D2145A]/10"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            {errors.icon && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.icon}
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
                handleInputChange("status", e.target.value as Service["status"])
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
    </div>
  );
};

interface PricingSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[] | FAQs[] | Package[],
  ) => void;
  errors: FormErrors;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiDollarSign className="w-5 h-5 text-[#D2145A]" />
        Pricing
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Service Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Type *
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              handleInputChange("type", e.target.value as ServiceType)
            }
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          >
            <option value="Hiring">Hiring</option>
            <option value="Education">Education</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Professional">Professional</option>
            <option value="Writing">Writing</option>
          </select>
          {errors.type && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.type}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ClientInfoSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[] | FAQs[] | Package[],
  ) => void;
  errors: FormErrors;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiUser className="w-5 h-5 text-[#D2145A]" />
        Client Information
      </h3>

      <div>
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          <FiUser className="inline w-4 h-4 mr-1" />
          Clients Served
        </label>
        <input
          type="number"
          value={formData.clients}
          onChange={(e) => handleInputChange("clients", e.target.value)}
          className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
            errors.clients
              ? "border-red-300 dark:border-red-600"
              : "border-gray-200/50 dark:border-gray-700/50"
          }`}
          placeholder="e.g. 100"
          min="0"
        />
        {errors.clients && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">
            {errors.clients}
          </p>
        )}
      </div>
    </div>
  );
};

interface FeaturesSectionFormProps {
  formData: FormData;
  newFeature: string;
  setNewFeature: (value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  errors: FormErrors;
}

const FeaturesSectionForm: React.FC<FeaturesSectionFormProps> = ({
  formData,
  newFeature,
  setNewFeature,
  addFeature,
  removeFeature,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiStar className="w-5 h-5 text-[#D2145A]" />
        Features
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Add a feature (e.g. Solidity & Rust)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
          />
          <button
            type="button"
            onClick={addFeature}
            disabled={!newFeature.trim() || formData.features.length >= 10}
            className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {errors.features && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.features}
          </p>
        )}

        {formData.features.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.features.length}/10 features
            </p>
            <AnimatePresence>
              {formData.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
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

interface PackagesSectionProps {
  formData: FormData;
  newPackageName: string;
  setNewPackageName: (value: string) => void;
  newPackagePrice: string;
  setNewPackagePrice: (value: string) => void;
  newPackageFeatures: string;
  setNewPackageFeatures: (value: string) => void;
  addPackage: () => void;
  removePackage: (index: number) => void;
  errors: FormErrors;
}

const PackagesSection: React.FC<PackagesSectionProps> = ({
  formData,
  newPackageName,
  setNewPackageName,
  newPackagePrice,
  setNewPackagePrice,
  newPackageFeatures,
  setNewPackageFeatures,
  addPackage,
  removePackage,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiDollarSign className="w-5 h-5 text-[#D2145A]" />
        Packages
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            value={newPackageName}
            onChange={(e) => setNewPackageName(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Package Name (e.g. Basic)"
          />
          <input
            type="text"
            value={newPackagePrice}
            onChange={(e) => setNewPackagePrice(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Price (e.g. 99 or Custom)"
          />
          <input
            type="text"
            value={newPackageFeatures}
            onChange={(e) => setNewPackageFeatures(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Features (comma-separated)"
          />
        </div>
        <button
          type="button"
          onClick={addPackage}
          disabled={
            !newPackageName.trim() ||
            !newPackagePrice.trim() ||
            formData.packages.length >= 5
          }
          className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-5 h-5 inline mr-2" /> Add Package
        </button>
        {errors.packages && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.packages}
          </p>
        )}

        {formData.packages.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.packages.length}/5 packages
            </p>
            <AnimatePresence>
              {formData.packages.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {pkg.name} - {pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Features: {pkg.features.join(", ")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePackage(index)}
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

interface FAQsSectionProps {
  formData: FormData;
  newQuestion: string;
  setNewQuestion: (value: string) => void;
  newAnswer: string;
  setNewAnswer: (value: string) => void;
  addFAQ: () => void;
  removeFAQ: (index: number) => void;
  errors: FormErrors;
}

const FAQsSection: React.FC<FAQsSectionProps> = ({
  formData,
  newQuestion,
  setNewQuestion,
  newAnswer,
  setNewAnswer,
  addFAQ,
  removeFAQ,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiHelpCircle className="w-5 h-5 text-[#D2145A]" />
        FAQs
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Question"
          />
          <textarea
            rows={2}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Answer"
          />
        </div>
        <button
          type="button"
          onClick={addFAQ}
          disabled={
            !newQuestion.trim() ||
            !newAnswer.trim() ||
            formData.faqs.length >= 10
          }
          className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-5 h-5 inline mr-2" /> Add FAQ
        </button>
        {errors.faqs && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.faqs}
          </p>
        )}

        {formData.faqs.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.faqs.length}/10 FAQs
            </p>
            <AnimatePresence>
              {formData.faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Q: {faq.question}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      A: {faq.answer}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
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

interface MediaSettingsSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value: string | boolean | string[] | FAQs[] | Package[],
  ) => void;
  errors: FormErrors;
  showImagePreview: boolean;
  setShowImagePreview: (value: boolean) => void;
}

const MediaSettingsSection: React.FC<MediaSettingsSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  showImagePreview,
  setShowImagePreview,
}) => {
  return (
    <div className="space-y-6">
      {/* Thumbnail Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiImage className="w-5 h-5 text-[#D2145A]" />
          Media
        </h3>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Thumbnail URL
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              value={formData.thumbnail}
              onChange={(e) => handleInputChange("thumbnail", e.target.value)}
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
          <AnimatePresence>
            {showImagePreview && formData.thumbnail && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-4"
              >
                <Image
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  width={400}
                  height={160}
                  className="w-full max-w-md h-40 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  onError={() => setShowImagePreview(false)}
                  unoptimized
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiSettings className="w-5 h-5 text-[#D2145A]" />
          Settings
        </h3>

        {/* Featured Toggle */}
        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => handleInputChange("featured", e.target.checked)}
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
  );
};

export default ServiceForm;
