"use client";

import {
  FAQs,
  Service,
  ServiceFeature,
  ServicePackage,
} from "@/utils/interfaces";
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
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
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
  subtitle: string;
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
  deliverables: string[];
  technologies: string;
  blockchains: string;
  clients: string;
  rating: string;
  totalReviews: string;
  features: ServiceFeature[];
  packages: ServicePackage[];
  faqs: FAQs[];
}

interface FormErrors {
  title?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  category?: string;
  duration?: string;
  lead?: string;
  thumbnail?: string;
  deliverables?: string;
  technologies?: string;
  blockchains?: string;
  features?: string;
  packages?: string;
  faqs?: string;
  submit?: string;
}

type ServiceType =
  | "Education"
  | "Mentorship"
  | "Development"
  | "Writing"
  | "Hiring"
  | "Community";

interface CategoryOptions {
  Education: string[];
  Mentorship: string[];
  Development: string[];
  Writing: string[];
  Hiring: string[];
  Community: string[];
}

interface DurationSuggestions {
  Education: string[];
  Mentorship: string[];
  Development: string[];
  Writing: string[];
  Hiring: string[];
  Community: string[];
}

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
    subtitle: "",
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
    deliverables: [],
    technologies: "",
    blockchains: "",
    clients: "0",
    rating: "0",
    totalReviews: "0",
    features: [],
    packages: [],
    faqs: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newDeliverable, setNewDeliverable] = useState("");
  const [newFeatureIcon, setNewFeatureIcon] = useState("");
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDescription, setNewFeatureDescription] = useState("");
  const [newPackageName, setNewPackageName] = useState("");
  const [newPackagePrice, setNewPackagePrice] = useState("");
  const [newPackageDuration, setNewPackageDuration] = useState("");
  const [newPackageFeatures, setNewPackageFeatures] = useState("");
  const [newPackagePopular, setNewPackagePopular] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Categories based on service types
  const categoryOptions: CategoryOptions = {
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
  const durationSuggestions: DurationSuggestions = {
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
        subtitle: service.subtitle || "",
        description: service.description,
        type: service.type,
        price: service.price.toString(),
        category: service.category,
        duration: service.duration,
        lead: service.lead,
        thumbnail: service.thumbnail || "",
        featured: service.featured,
        status: service.status,
        tags: (service.tags || []).join(", "),
        deliverables: service.deliverables || [],
        technologies: (service.technologies || []).join(", "),
        blockchains: (service.blockchains || []).join(", "),
        clients: (service.clients || 0).toString(),
        rating: (service.rating || 0).toString(),
        totalReviews: (service.totalReviews || 0).toString(),
        features: service.features || [],
        packages: service.packages || [],
        faqs: service.faqs || [],
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
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
        deliverables: [],
        technologies: "",
        blockchains: "",
        clients: "0",
        rating: "0",
        totalReviews: "0",
        features: [],
        packages: [],
        faqs: [],
      });
    }
    setErrors({});
  }, [service]);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // Step 1: Basic Information and Description
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      } else if (formData.title.length < 3) {
        newErrors.title = "Title must be at least 3 characters";
      } else if (formData.title.length > 100) {
        newErrors.title = "Title must be less than 100 characters";
      }

      if (formData.subtitle && formData.subtitle.length > 150) {
        newErrors.subtitle = "Subtitle must be less than 150 characters";
      }

      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      } else if (formData.description.length < 10) {
        newErrors.description = "Description must be at least 10 characters";
      } else if (formData.description.length > 1000) {
        newErrors.description = "Description must be less than 1000 characters";
      }
    } else if (step === 2) {
      // Step 2: Pricing, Category, and Technical Details
      if (!formData.price.trim()) {
        newErrors.price = "Price is required";
      }

      if (!formData.category.trim()) {
        newErrors.category = "Category is required";
      } else if (formData.category.length > 50) {
        newErrors.category = "Category must be less than 50 characters";
      }

      if (!formData.duration.trim()) {
        newErrors.duration = "Duration is required";
      } else if (formData.duration.length > 100) {
        newErrors.duration = "Duration must be less than 100 characters";
      }

      if (!formData.lead.trim()) {
        newErrors.lead = "Lead is required";
      } else if (formData.lead.length < 2) {
        newErrors.lead = "Lead must be at least 2 characters";
      } else if (formData.lead.length > 100) {
        newErrors.lead = "Lead must be less than 100 characters";
      }

      const techArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (techArray.length > 20) {
        newErrors.technologies = "Maximum 20 technologies allowed";
      }

      const blockchainArray = formData.blockchains
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);
      if (blockchainArray.length > 15) {
        newErrors.blockchains = "Maximum 15 blockchains allowed";
      }
    } else if (step === 3) {
      // Step 3: Features, Packages, Deliverables, and Media
      if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
        newErrors.thumbnail = "Please enter a valid URL";
      }

      if (formData.deliverables.length > 20) {
        newErrors.deliverables = "Maximum 20 deliverables allowed";
      }

      if (formData.features.length > 10) {
        newErrors.features = "Maximum 10 features allowed";
      }

      if (formData.packages.length > 5) {
        newErrors.packages = "Maximum 5 packages allowed";
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
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addDeliverable = () => {
    if (newDeliverable.trim() && formData.deliverables.length < 20) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()],
      }));
      setNewDeliverable("");
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (
      newFeatureTitle.trim() &&
      newFeatureDescription.trim() &&
      formData.features.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [
          ...prev.features,
          {
            icon: newFeatureIcon.trim() || "📦",
            title: newFeatureTitle.trim(),
            description: newFeatureDescription.trim(),
          },
        ],
      }));
      setNewFeatureIcon("");
      setNewFeatureTitle("");
      setNewFeatureDescription("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addPackage = () => {
    if (
      newPackageName.trim() &&
      newPackagePrice.trim() &&
      newPackageDuration.trim() &&
      formData.packages.length < 5
    ) {
      const features = newPackageFeatures
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);
      setFormData((prev) => ({
        ...prev,
        packages: [
          ...prev.packages,
          {
            name: newPackageName.trim(),
            price: newPackagePrice.trim(),
            duration: newPackageDuration.trim(),
            features,
            popular: newPackagePopular,
          },
        ],
      }));
      setNewPackageName("");
      setNewPackagePrice("");
      setNewPackageDuration("");
      setNewPackageFeatures("");
      setNewPackagePopular(false);
    }
  };

  const removePackage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.filter((_, i) => i !== index),
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

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
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
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        type: formData.type,
        price: isNaN(parseFloat(formData.price))
          ? formData.price.trim()
          : parseFloat(formData.price),
        category: formData.category.trim(),
        duration: formData.duration.trim(),
        lead: formData.lead.trim(),
        thumbnail: formData.thumbnail.trim(),
        featured: formData.featured,
        status: formData.status,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        deliverables: formData.deliverables,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        blockchains: formData.blockchains
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        clients: parseInt(formData.clients) || 0,
        rating: parseFloat(formData.rating) || 0,
        totalReviews: parseInt(formData.totalReviews) || 0,
        features: formData.features,
        packages: formData.packages,
        faqs: formData.faqs,
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
            subtitle: "",
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
            deliverables: [],
            technologies: "",
            blockchains: "",
            clients: "0",
            rating: "0",
            totalReviews: "0",
            features: [],
            packages: [],
            faqs: [],
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

  const getTypeIcon = (type: ServiceType): React.ReactElement => {
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

  const getTypeColor = (type: ServiceType): string => {
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
      className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl ${className}`}
    >
      {/* Header */}
      <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <div
            className={`p-3 bg-gradient-to-r ${getTypeColor(formData.type)} rounded-xl text-white`}
          >
            {getTypeIcon(formData.type)}
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
              Basic Info
            </span>
            <span
              className={`text-sm ${currentStep === 2 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Pricing & Tech
            </span>
            <span
              className={`text-sm ${currentStep === 3 ? "text-[#D2145A] font-semibold" : "text-gray-500"}`}
            >
              Features & Media
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
                getTypeIcon={getTypeIcon}
                getTypeColor={getTypeColor}
              />
              <DescriptionSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            </>
          )}
          {currentStep === 2 && (
            <>
              <PricingDetailsSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                durationSuggestions={durationSuggestions}
              />
              <CategoryLeadSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                categoryOptions={categoryOptions}
              />
              <TechStackSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            </>
          )}
          {currentStep === 3 && (
            <>
              <FeaturesSectionForm
                formData={formData}
                newFeatureIcon={newFeatureIcon}
                setNewFeatureIcon={setNewFeatureIcon}
                newFeatureTitle={newFeatureTitle}
                setNewFeatureTitle={setNewFeatureTitle}
                newFeatureDescription={newFeatureDescription}
                setNewFeatureDescription={setNewFeatureDescription}
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
                newPackageDuration={newPackageDuration}
                setNewPackageDuration={setNewPackageDuration}
                newPackageFeatures={newPackageFeatures}
                setNewPackageFeatures={setNewPackageFeatures}
                newPackagePopular={newPackagePopular}
                setNewPackagePopular={setNewPackagePopular}
                addPackage={addPackage}
                removePackage={removePackage}
                errors={errors}
              />
              <DeliverablesSection
                formData={formData}
                errors={errors}
                newDeliverable={newDeliverable}
                setNewDeliverable={setNewDeliverable}
                addDeliverable={addDeliverable}
                removeDeliverable={removeDeliverable}
              />
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
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  getTypeIcon: (type: ServiceType) => React.ReactElement;
  getTypeColor: (type: ServiceType) => string;
}

const BasicInformationSection: React.FC<BasicInformationSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  getTypeIcon,
  getTypeColor,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-[#D2145A]" />
        Basic Information
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => handleInputChange("subtitle", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.subtitle
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Enter a subtitle for your service"
          />
          {errors.subtitle && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.subtitle}
            </p>
          )}
        </div>

        {/* Type */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Service Type *
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {(
              [
                "Education",
                "Mentorship",
                "Development",
                "Writing",
                "Hiring",
                "Community",
              ] as ServiceType[]
            ).map((type, index) => (
              <motion.button
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
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
              </motion.button>
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
  );
};

interface DescriptionSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiFileText className="w-5 h-5 text-[#D2145A]" />
        Description
      </h3>
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
  );
};

interface PricingDetailsSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  durationSuggestions: DurationSuggestions;
}

const PricingDetailsSection: React.FC<PricingDetailsSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  durationSuggestions,
}) => {
  return (
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
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                errors.duration
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-200/50 dark:border-gray-700/50"
              }`}
              placeholder="e.g. 4-8 weeks"
              list="duration-suggestions"
            />
            <datalist id="duration-suggestions">
              {durationSuggestions[formData.type].map((suggestion: string) => (
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
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Maximum 10 tags allowed
          </p>
        </div>
      </div>
    </div>
  );
};

interface CategoryLeadSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  categoryOptions: CategoryOptions;
}

const CategoryLeadSection: React.FC<CategoryLeadSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  categoryOptions,
}) => {
  return (
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
              onChange={(e) => handleInputChange("category", e.target.value)}
              className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
                errors.category
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-200/50 dark:border-gray-700/50"
              }`}
            >
              <option value="">Select a category</option>
              {categoryOptions[formData.type].map((category: string) => (
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
  );
};

interface TechStackSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData,
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({
  formData,
  handleInputChange,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiGlobe className="w-5 h-5 text-[#D2145A]" />
        Technology Stack
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Technologies (comma-separated)
          </label>
          <input
            type="text"
            value={formData.technologies}
            onChange={(e) => handleInputChange("technologies", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.technologies
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. Solidity, Hardhat, OpenZeppelin"
          />
          {errors.technologies && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.technologies}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Maximum 20 technologies allowed
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Blockchains (comma-separated)
          </label>
          <input
            type="text"
            value={formData.blockchains}
            onChange={(e) => handleInputChange("blockchains", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.blockchains
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. Ethereum, Polygon, Binance Smart Chain"
          />
          {errors.blockchains && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.blockchains}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Maximum 15 blockchains allowed
          </p>
        </div>
      </div>
    </div>
  );
};

interface FeaturesSectionFormProps {
  formData: FormData;
  newFeatureIcon: string;
  setNewFeatureIcon: (value: string) => void;
  newFeatureTitle: string;
  setNewFeatureTitle: (value: string) => void;
  newFeatureDescription: string;
  setNewFeatureDescription: (value: string) => void;
  addFeature: () => void;
  removeFeature: (index: number) => void;
  errors: FormErrors;
}

const FeaturesSectionForm: React.FC<FeaturesSectionFormProps> = ({
  formData,
  newFeatureIcon,
  setNewFeatureIcon,
  newFeatureTitle,
  setNewFeatureTitle,
  newFeatureDescription,
  setNewFeatureDescription,
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={newFeatureIcon}
            onChange={(e) => setNewFeatureIcon(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Icon (e.g. 📦)"
          />
          <input
            type="text"
            value={newFeatureTitle}
            onChange={(e) => setNewFeatureTitle(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Feature title"
          />
          <input
            type="text"
            value={newFeatureDescription}
            onChange={(e) => setNewFeatureDescription(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Feature description"
          />
        </div>
        <button
          type="button"
          onClick={addFeature}
          disabled={
            !newFeatureTitle.trim() ||
            !newFeatureDescription.trim() ||
            formData.features.length >= 10
          }
          className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-5 h-5 inline mr-2" /> Add Feature
        </button>
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
                  <span className="text-xl">{feature.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {feature.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </div>
                  </div>
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
  newPackageDuration: string;
  setNewPackageDuration: (value: string) => void;
  newPackageFeatures: string;
  setNewPackageFeatures: (value: string) => void;
  newPackagePopular: boolean;
  setNewPackagePopular: (value: boolean) => void;
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
  newPackageDuration,
  setNewPackageDuration,
  newPackageFeatures,
  setNewPackageFeatures,
  newPackagePopular,
  setNewPackagePopular,
  addPackage,
  removePackage,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiPackage className="w-5 h-5 text-[#D2145A]" />
        Packages
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={newPackageName}
            onChange={(e) => setNewPackageName(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Package name"
          />
          <input
            type="text"
            value={newPackagePrice}
            onChange={(e) => setNewPackagePrice(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Price"
          />
          <input
            type="text"
            value={newPackageDuration}
            onChange={(e) => setNewPackageDuration(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Duration"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newPackagePopular}
              onChange={(e) => setNewPackagePopular(e.target.checked)}
              className="w-5 h-5 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
            />
            <label className="text-sm text-gray-700 dark:text-gray-300">
              Popular
            </label>
          </div>
        </div>
        <div className="lg:col-span-4">
          <input
            type="text"
            value={newPackageFeatures}
            onChange={(e) => setNewPackageFeatures(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Features (comma-separated)"
          />
        </div>
        <button
          type="button"
          onClick={addPackage}
          disabled={
            !newPackageName.trim() ||
            !newPackagePrice.trim() ||
            !newPackageDuration.trim() ||
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
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        {pkg.name}
                      </h4>
                      {pkg.popular && (
                        <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Price: {pkg.price} • Duration: {pkg.duration}
                    </div>
                    {pkg.features.length > 0 && (
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        Features: {pkg.features.join(", ")}
                      </div>
                    )}
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

interface DeliverablesSectionProps {
  formData: FormData;
  errors: FormErrors;
  newDeliverable: string;
  setNewDeliverable: (value: string) => void;
  addDeliverable: () => void;
  removeDeliverable: (index: number) => void;
}

const DeliverablesSection: React.FC<DeliverablesSectionProps> = ({
  formData,
  errors,
  newDeliverable,
  setNewDeliverable,
  addDeliverable,
  removeDeliverable,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiPackage className="w-5 h-5 text-[#D2145A]" />
        Deliverables
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newDeliverable}
            onChange={(e) => setNewDeliverable(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Add a deliverable (e.g. Complete source code)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addDeliverable();
              }
            }}
          />
          <button
            type="button"
            onClick={addDeliverable}
            disabled={
              !newDeliverable.trim() || formData.deliverables.length >= 20
            }
            className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {errors.deliverables && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.deliverables}
          </p>
        )}

        {formData.deliverables.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.deliverables.length}/20 deliverables
            </p>
            <AnimatePresence>
              {formData.deliverables.map((deliverable, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {deliverable}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDeliverable(index)}
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
    value:
      | string
      | boolean
      | string[]
      | ServiceFeature[]
      | ServicePackage[]
      | FAQs[],
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
