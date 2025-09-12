"use client";

import {
  FAQs,
  Product,
  ProductFeature,
  ProductModule,
  ProductTestimonial,
  ProductType,
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
  FiHelpCircle,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiArrowRight,
  FiAward,
  FiPackage,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import {
  productApiService,
  CreateProductData,
  UpdateProductData,
} from "@/services/productApiService"; // Assume this exists, similar to serviceApiService

interface ProductFormProps {
  product?: Product | null;
  onSubmit?: (productData: Partial<Product>) => void;
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormData {
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  type: ProductType;
  price: string;
  originalPrice: string;
  currency: string;
  category: string;
  difficulty: string;
  level: string;
  duration: string;
  language: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  thumbnail: string;
  videoPreviewUrl: string;
  featured: boolean;
  status: Product["status"];
  tags: string;
  technologies: string;
  includes: string[];
  rating: string;
  totalReviews: string;
  studentsEnrolled: string;
  features: ProductFeature[];
  modules: ProductModule[];
  testimonials: ProductTestimonial[];
  faqs: FAQs[];
}

interface FormErrors {
  title?: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  price?: string;
  originalPrice?: string;
  currency?: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  language?: string;
  instructor?: {
    name?: string;
    bio?: string;
    avatar?: string;
    credentials?: string;
  };
  thumbnail?: string;
  videoPreviewUrl?: string;
  tags?: string;
  technologies?: string;
  includes?: string;
  features?: string;
  modules?: string;
  testimonials?: string;
  faqs?: string;
  submit?: string;
}

interface CategoryOptions {
  Course: string[];
  Bootcamp: string[];
  eBook: string[];
  Codebase: string[];
}

interface DurationSuggestions {
  Course: string[];
  Bootcamp: string[];
  eBook: string[];
  Codebase: string[];
}

const ProductForm: React.FC<ProductFormProps> = ({
  product = null,
  onSubmit,
  onSuccess,
  onCancel,
  className = "",
}) => {
  const isEditMode = Boolean(product);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    subtitle: "",
    description: "",
    longDescription: "",
    type: "Course",
    price: "",
    originalPrice: "",
    currency: "USD",
    category: "",
    difficulty: "Beginner",
    level: "",
    duration: "",
    language: "English",
    instructor: {
      name: "",
      bio: "",
      avatar: "",
      credentials: [],
    },
    thumbnail: "",
    videoPreviewUrl: "",
    featured: false,
    status: "draft",
    tags: "",
    technologies: "",
    includes: [],
    rating: "0",
    totalReviews: "0",
    studentsEnrolled: "0",
    features: [],
    modules: [],
    testimonials: [],
    faqs: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [newInclude, setNewInclude] = useState("");
  const [newFeatureIcon, setNewFeatureIcon] = useState("");
  const [newFeatureTitle, setNewFeatureTitle] = useState("");
  const [newFeatureDescription, setNewFeatureDescription] = useState("");
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newModuleDuration, setNewModuleDuration] = useState("");
  const [newModuleLessons, setNewModuleLessons] = useState("");
  const [newTestimonialName, setNewTestimonialName] = useState("");
  const [newTestimonialRole, setNewTestimonialRole] = useState("");
  const [newTestimonialComment, setNewTestimonialComment] = useState("");
  const [newTestimonialRating, setNewTestimonialRating] = useState("5");
  const [newTestimonialAvatar, setNewTestimonialAvatar] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Categories based on product types
  const categoryOptions: CategoryOptions = {
    Course: [
      "Web Development",
      "Blockchain",
      "Data Science",
      "Programming",
      "Design",
    ],
    Bootcamp: [
      "Full-Stack Development",
      "Smart Contract Development",
      "Web3 Development",
      "Cybersecurity",
    ],
    eBook: [
      "Technical Guides",
      "Programming Tutorials",
      "Blockchain Basics",
      "Career Advice",
    ],
    Codebase: ["Smart Contracts", "dApps", "Web Applications", "Open Source"],
  };

  // Duration suggestions based on product type
  const durationSuggestions: DurationSuggestions = {
    Course: ["4-8 weeks", "8-12 weeks", "Self-paced", "Ongoing"],
    Bootcamp: ["12-16 weeks", "8-12 weeks", "Intensive 4 weeks"],
    eBook: ["Self-paced", "One-time"],
    Codebase: ["One-time", "Ongoing updates"],
  };

  // Initialize form data based on product prop
  useEffect(() => {
    if (product) {
      const productType = (
        ["Course", "Bootcamp", "EBook", "Codebase"] as ProductType[]
      ).includes(product.type as ProductType)
        ? (product.type as ProductType)
        : "Course"; // Fallback to "Course" if product.type is invalid
      setFormData({
        title: product.title,
        subtitle: product.subtitle || "",
        description: product.description,
        longDescription: product.longDescription || "",
        type: productType,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        currency: product.currency || "USD",
        category: product.category,
        difficulty: product.difficulty || "Beginner",
        level: product.level || product.difficulty || "",
        duration: product.duration,
        language: product.language || "English",
        instructor: {
          name: product.instructor.name,
          bio: product.instructor.bio || "",
          avatar: product.instructor.avatar || "",
          credentials: product.instructor.credentials || [],
        },
        thumbnail: product.imageUrl || "",
        videoPreviewUrl: product.videoPreviewUrl || "",
        featured: product.featured || false,
        status: product.status || "draft",
        tags: (product.tags || []).join(", "),
        technologies: (product.technologies || []).join(", "),
        includes: product.includes || [],
        rating: (product.rating || 0).toString(),
        totalReviews: (product.totalReviews || 0).toString(),
        studentsEnrolled: (product.studentsEnrolled || 0).toString(),
        features: product.features || [],
        modules: product.modules || [],
        testimonials: product.testimonials || [],
        faqs: product.faqs || [],
      });
    } else {
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        longDescription: "",
        type: "Course",
        price: "",
        originalPrice: "",
        currency: "USD",
        category: "",
        difficulty: "Beginner",
        level: "",
        duration: "",
        language: "English",
        instructor: {
          name: "",
          bio: "",
          avatar: "",
          credentials: [],
        },
        thumbnail: "",
        videoPreviewUrl: "",
        featured: false,
        status: "draft",
        tags: "",
        technologies: "",
        includes: [],
        rating: "0",
        totalReviews: "0",
        studentsEnrolled: "0",
        features: [],
        modules: [],
        testimonials: [],
        faqs: [],
      });
    }
    setErrors({});
  }, [product]);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      // Step 1: Basic Information and Description (NO instructor checks here)
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
      } else if (formData.description.length > 500) {
        newErrors.description = "Description must be less than 500 characters";
      }

      if (formData.longDescription && formData.longDescription.length > 2000) {
        newErrors.longDescription =
          "Long description must be less than 2000 characters";
      }
    } else if (step === 2) {
      // Step 2: Pricing, Category, and Technical Details (including instructor)
      if (!formData.price.trim()) {
        newErrors.price = "Price is required";
      } else {
        const priceNum = parseFloat(formData.price);
        if (isNaN(priceNum) || priceNum < 0) {
          newErrors.price = "Price must be a positive number";
        } else if (priceNum > 10000) {
          newErrors.price = "Price cannot exceed $10,000";
        }
      }

      if (formData.originalPrice.trim()) {
        const origPriceNum = parseFloat(formData.originalPrice);
        if (isNaN(origPriceNum) || origPriceNum < 0) {
          newErrors.originalPrice = "Original price must be a positive number";
        } else if (origPriceNum > 10000) {
          newErrors.originalPrice = "Original price cannot exceed $10,000";
        }
      }

      if (!formData.category.trim()) {
        newErrors.category = "Category is required";
      }

      if (!formData.difficulty.trim()) {
        newErrors.difficulty = "Difficulty is required";
      }

      if (!formData.duration.trim()) {
        newErrors.duration = "Duration is required";
      }

      if (!formData.language.trim()) {
        newErrors.language = "Language is required";
      }

      // Instructor validations (moved here)
      if (!formData.instructor.name.trim()) {
        newErrors.instructor = newErrors.instructor || {};
        newErrors.instructor.name = "Instructor name is required";
      } else if (formData.instructor.name.length < 2) {
        newErrors.instructor = newErrors.instructor || {};
        newErrors.instructor.name =
          "Instructor name must be at least 2 characters";
      }

      if (formData.instructor.bio && formData.instructor.bio.length > 500) {
        newErrors.instructor = newErrors.instructor || {};
        newErrors.instructor.bio =
          "Instructor bio must be less than 500 characters";
      }

      if (formData.instructor?.avatar) {
        // Allow emoji, valid URL, or empty string
        if (
          !isValidEmoji(formData.instructor.avatar) &&
          !isValidUrl(formData.instructor.avatar)
        ) {
          newErrors.instructor = newErrors.instructor || {};
          newErrors.instructor.avatar =
            "Instructor avatar must be a valid emoji or URL";
        }
      }

      // Optional: Validate credentials array items
      if (
        formData.instructor.credentials &&
        formData.instructor.credentials.length > 0
      ) {
        const invalidCreds = formData.instructor.credentials.filter(
          (cred) => cred.length > 100 || !cred.trim(),
        );
        if (invalidCreds.length > 0) {
          newErrors.instructor = newErrors.instructor || {};
          newErrors.instructor.credentials =
            "Each credential must be non-empty and less than 100 characters";
        }
      }

      const techArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (techArray.length > 15) {
        newErrors.technologies = "Maximum 15 technologies allowed";
      }

      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      if (tagsArray.length > 20) {
        newErrors.tags = "Maximum 20 tags allowed";
      }
    } else if (step === 3) {
      // Step 3: Features, Modules, Testimonials, and Media
      if (formData.thumbnail && !isValidUrl(formData.thumbnail)) {
        newErrors.thumbnail = "Please enter a valid URL";
      }

      if (formData.videoPreviewUrl && !isValidUrl(formData.videoPreviewUrl)) {
        newErrors.videoPreviewUrl = "Please enter a valid URL";
      }

      if (formData.includes.length > 20) {
        newErrors.includes = "Maximum 20 includes allowed";
      }

      if (formData.features.length > 10) {
        newErrors.features = "Maximum 10 features allowed";
      }

      if (formData.modules.length > 20) {
        newErrors.modules = "Maximum 20 modules allowed";
      }

      if (formData.testimonials.length > 10) {
        newErrors.testimonials = "Maximum 10 testimonials allowed";
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

  const isValidEmoji = (string: string): boolean => {
    // Regex to match common Unicode emojis
    const emojiRegex =
      /^[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Component}\u{200D}\u{FE0F}]+$/u;
    return emojiRegex.test(string);
  };

  const handleInputChange = (
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
      | FAQs[],
  ) => {
    if (field.startsWith("instructor.")) {
      const instructorField = field.split(
        ".",
      )[1] as keyof FormData["instructor"];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [instructorField]: value,
        },
      }));
      setErrors((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [instructorField]: undefined,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({
        ...prev,
        [field as keyof FormErrors]: undefined,
      }));
    }
  };

  const addInclude = () => {
    if (newInclude.trim() && formData.includes.length < 20) {
      setFormData((prev) => ({
        ...prev,
        includes: [...prev.includes, newInclude.trim()],
      }));
      setNewInclude("");
    }
  };

  const removeInclude = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      includes: prev.includes.filter((_, i) => i !== index),
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
            icon: newFeatureIcon.trim() || "📚",
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

  const addModule = () => {
    if (
      newModuleTitle.trim() &&
      newModuleDescription.trim() &&
      newModuleDuration.trim() &&
      newModuleLessons.trim() &&
      !isNaN(parseInt(newModuleLessons)) &&
      formData.modules.length < 20
    ) {
      setFormData((prev) => ({
        ...prev,
        modules: [
          ...prev.modules,
          {
            title: newModuleTitle.trim(),
            description: newModuleDescription.trim(),
            duration: newModuleDuration.trim(),
            lessons: parseInt(newModuleLessons),
          },
        ],
      }));
      setNewModuleTitle("");
      setNewModuleDescription("");
      setNewModuleDuration("");
      setNewModuleLessons("");
    }
  };

  const removeModule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
  };

  const addTestimonial = () => {
    if (
      newTestimonialName.trim() &&
      newTestimonialComment.trim() &&
      !isNaN(parseInt(newTestimonialRating)) &&
      parseInt(newTestimonialRating) >= 1 &&
      parseInt(newTestimonialRating) <= 5 &&
      formData.testimonials.length < 10
    ) {
      setFormData((prev) => ({
        ...prev,
        testimonials: [
          ...prev.testimonials,
          {
            name: newTestimonialName.trim(),
            role: newTestimonialRole.trim() || "",
            comment: newTestimonialComment.trim(),
            rating: parseInt(newTestimonialRating),
            avatar: newTestimonialAvatar.trim() || "",
          },
        ],
      }));
      setNewTestimonialName("");
      setNewTestimonialRole("");
      setNewTestimonialComment("");
      setNewTestimonialRating("5");
      setNewTestimonialAvatar("");
    }
  };

  const removeTestimonial = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index),
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

  const addCredential = () => {
    if (newInclude.trim() && formData.instructor.credentials.length < 10) {
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          credentials: [...prev.instructor.credentials, newInclude.trim()],
        },
      }));
      setNewInclude("");
    }
  };

  const removeCredential = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        credentials: prev.instructor.credentials.filter((_, i) => i !== index),
      },
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
      const productData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        longDescription: formData.longDescription.trim(),
        type: formData.type,
        price: isNaN(parseFloat(formData.price))
          ? formData.price.trim()
          : parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : undefined,
        currency: formData.currency,
        category: formData.category.trim(),
        difficulty: formData.difficulty,
        level: formData.level || formData.difficulty,
        duration: formData.duration.trim(),
        language: formData.language,
        instructor: {
          name: formData.instructor.name.trim(),
          bio: formData.instructor.bio.trim(),
          avatar: formData.instructor.avatar.trim(),
          credentials: formData.instructor.credentials,
        },
        imageUrl: formData.thumbnail.trim(),
        videoPreviewUrl: formData.videoPreviewUrl.trim(),
        featured: formData.featured,
        status: formData.status,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        includes: formData.includes,
        rating: parseFloat(formData.rating) || 0,
        totalReviews: parseInt(formData.totalReviews) || 0,
        studentsEnrolled: parseInt(formData.studentsEnrolled) || 0,
        features: formData.features,
        modules: formData.modules,
        testimonials: formData.testimonials,
        faqs: formData.faqs,
      };

      let response;

      if (isEditMode && product) {
        const updateData: UpdateProductData = productData;
        response = await productApiService.updateProduct(
          product.id,
          updateData,
        );
      } else {
        const createData: CreateProductData = productData;
        response = await productApiService.createProduct(createData);
      }

      if (response.data) {
        if (onSubmit) {
          onSubmit(response.data.product);
        }

        if (onSuccess) {
          onSuccess(response.data.product);
        }

        if (!isEditMode) {
          setFormData({
            title: "",
            subtitle: "",
            description: "",
            longDescription: "",
            type: "Course",
            price: "",
            originalPrice: "",
            currency: "USD",
            category: "",
            difficulty: "Beginner",
            level: "",
            duration: "",
            language: "English",
            instructor: {
              name: "",
              bio: "",
              avatar: "👨‍💻",
              credentials: [],
            },
            thumbnail: "",
            videoPreviewUrl: "",
            featured: false,
            status: "draft",
            tags: "",
            technologies: "",
            includes: [],
            rating: "0",
            totalReviews: "0",
            studentsEnrolled: "0",
            features: [],
            modules: [],
            testimonials: [],
            faqs: [],
          });
          setCurrentStep(1); // Reset to first step
        }
      } else {
        setErrors({
          submit:
            response.error || "An error occurred while saving the product",
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

  const getTypeIcon = (type: ProductType): React.ReactElement => {
    switch (type) {
      case "Course":
        return <FiBook className="w-5 h-5" />;
      case "Bootcamp":
        return <FiUsers className="w-5 h-5" />;
      case "EBook":
        return <FiFileText className="w-5 h-5" />;
      case "Codebase":
        return <FiPackage className="w-5 h-5" />;
      default:
        return <FiHelpCircle className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: ProductType): string => {
    switch (type) {
      case "Course":
        return "from-blue-500 to-blue-600";
      case "Bootcamp":
        return "from-purple-500 to-purple-600";
      case "EBook":
        return "from-green-500 to-green-600";
      case "Codebase":
        return "from-orange-500 to-orange-600";
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
              {isEditMode ? "Edit Product" : "Create New Product"} - Step{" "}
              {currentStep}/3
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditMode
                ? "Update the product information below"
                : "Fill in the details to create a new product"}
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
              Pricing & Details
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
              <InstructorSection
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
                newInclude={newInclude}
                setNewInclude={setNewInclude}
                addCredential={addCredential}
                removeCredential={removeCredential}
              />
              <CategoryDifficultySection
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
              <ModulesSection
                formData={formData}
                newModuleTitle={newModuleTitle}
                setNewModuleTitle={setNewModuleTitle}
                newModuleDescription={newModuleDescription}
                setNewModuleDescription={setNewModuleDescription}
                newModuleDuration={newModuleDuration}
                setNewModuleDuration={setNewModuleDuration}
                newModuleLessons={newModuleLessons}
                setNewModuleLessons={setNewModuleLessons}
                addModule={addModule}
                removeModule={removeModule}
                errors={errors}
              />
              <TestimonialsSection
                formData={formData}
                newTestimonialName={newTestimonialName}
                setNewTestimonialName={setNewTestimonialName}
                newTestimonialRole={newTestimonialRole}
                setNewTestimonialRole={setNewTestimonialRole}
                newTestimonialComment={newTestimonialComment}
                setNewTestimonialComment={setNewTestimonialComment}
                newTestimonialRating={newTestimonialRating}
                setNewTestimonialRating={setNewTestimonialRating}
                newTestimonialAvatar={newTestimonialAvatar}
                setNewTestimonialAvatar={setNewTestimonialAvatar}
                addTestimonial={addTestimonial}
                removeTestimonial={removeTestimonial}
                errors={errors}
              />
              <IncludesSection
                formData={formData}
                errors={errors}
                newInclude={newInclude}
                setNewInclude={setNewInclude}
                addInclude={addInclude}
                removeInclude={removeInclude}
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
                    {isEditMode ? "Update Product" : "Create Product"}
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
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  getTypeIcon: (type: ProductType) => React.ReactElement;
  getTypeColor: (type: ProductType) => string;
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
            placeholder="Enter a subtitle for your product"
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
            Product Type *
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {(["Course", "Bootcamp", "eBook", "Codebase"] as ProductType[]).map(
              (type, index) => (
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
              ),
            )}
          </div>
        </div>

        {/* Status */}
        <select
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value || "")}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </div>
    </div>
  );
};

interface DescriptionSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
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
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Short Description *
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
            placeholder="Describe what learners will gain from this product"
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
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Long Description
          </label>
          <textarea
            rows={6}
            value={formData.longDescription}
            onChange={(e) =>
              handleInputChange("longDescription", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
              errors.longDescription
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Provide a detailed description of the product"
          />
          <div className="flex justify-between items-center mt-2">
            {errors.longDescription ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.longDescription}
              </p>
            ) : (
              <div />
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formData.longDescription.length}/2000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PricingDetailsSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
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
            placeholder="e.g. 99.99"
          />
          {errors.price && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.price}
            </p>
          )}
        </div>

        {/* Original Price */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <FiDollarSign className="inline w-4 h-4 mr-1" />
            Original Price
          </label>
          <input
            type="text"
            value={formData.originalPrice}
            onChange={(e) => handleInputChange("originalPrice", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.originalPrice
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. 149.99"
          />
          {errors.originalPrice && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.originalPrice}
            </p>
          )}
        </div>

        {/* Currency */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Currency *
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange("currency", e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
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
              {durationSuggestions[
                formData.type as keyof DurationSuggestions
              ].map((suggestion: string) => (
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

        {/* Language */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <FiGlobe className="inline w-4 h-4 mr-1" />
            Language *
          </label>
          <input
            type="text"
            value={formData.language}
            onChange={(e) => handleInputChange("language", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.language
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. English"
          />
          {errors.language && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.language}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

interface InstructorSectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  newInclude: string;
  setNewInclude: (value: string) => void;
  addCredential: () => void;
  removeCredential: (index: number) => void;
}

const InstructorSection: React.FC<InstructorSectionProps> = ({
  formData,
  handleInputChange,
  errors,
  newInclude,
  setNewInclude,
  addCredential,
  removeCredential,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiUser className="w-5 h-5 text-[#D2145A]" />
        Instructor
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Instructor Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            value={formData.instructor.name}
            onChange={(e) =>
              handleInputChange("instructor.name", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.instructor?.name
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Enter instructor name"
          />
          {errors.instructor?.name && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.instructor.name}
            </p>
          )}
        </div>

        {/* Instructor Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Bio
          </label>
          <textarea
            rows={3}
            value={formData.instructor.bio}
            onChange={(e) =>
              handleInputChange("instructor.bio", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 resize-none ${
              errors.instructor?.bio
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="Enter instructor bio"
          />
          <div className="flex justify-between items-center mt-2">
            {errors.instructor?.bio ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errors.instructor.bio}
              </p>
            ) : (
              <div />
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formData.instructor.bio.length}/500
            </p>
          </div>
        </div>

        {/* Instructor Avatar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Avatar Icon
          </label>
          <input
            type="text"
            value={formData.instructor.avatar}
            onChange={(e) =>
              handleInputChange("instructor.avatar", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.instructor?.avatar
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="https://example.com/avatar.jpg"
          />
          {errors.instructor?.avatar && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.instructor.avatar}
            </p>
          )}
        </div>

        {/* Instructor Credentials */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Credentials
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newInclude}
              onChange={(e) => setNewInclude(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
              placeholder="e.g. Certified Blockchain Developer"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCredential();
                }
              }}
            />
            <button
              type="button"
              onClick={addCredential}
              disabled={
                !newInclude.trim() ||
                formData.instructor.credentials.length >= 10
              }
              className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiPlus className="w-5 h-5" />
            </button>
          </div>
          {formData.instructor.credentials.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formData.instructor.credentials.length}/10 credentials
              </p>
              <AnimatePresence>
                {formData.instructor.credentials.map((credential, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    layout
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <span className="flex-1 text-gray-700 dark:text-gray-300">
                      {credential}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCredential(index)}
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
    </div>
  );
};

interface CategoryDifficultySectionProps {
  formData: FormData;
  handleInputChange: (
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
      | FAQs[],
  ) => void;
  errors: FormErrors;
  categoryOptions: CategoryOptions;
}

const CategoryDifficultySection: React.FC<CategoryDifficultySectionProps> = ({
  formData,
  handleInputChange,
  errors,
  categoryOptions,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiTag className="w-5 h-5 text-[#D2145A]" />
        Category & Difficulty
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
              {categoryOptions[formData.type as keyof CategoryOptions].map(
                (category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ),
              )}
            </select>
          </div>
          {errors.category && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.category}
            </p>
          )}
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            <FiAward className="inline w-4 h-4 mr-1" />
            Difficulty *
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => handleInputChange("difficulty", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.difficulty
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="All Levels">All Levels</option>
          </select>
          {errors.difficulty && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.difficulty}
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
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
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
            Maximum 15 technologies allowed
          </p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => handleInputChange("tags", e.target.value)}
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.tags
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="e.g. Web3, Blockchain, Programming"
          />
          {errors.tags && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.tags}
            </p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Maximum 20 tags allowed
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
            placeholder="Icon (e.g. 📚)"
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

interface ModulesSectionProps {
  formData: FormData;
  newModuleTitle: string;
  setNewModuleTitle: (value: string) => void;
  newModuleDescription: string;
  setNewModuleDescription: (value: string) => void;
  newModuleDuration: string;
  setNewModuleDuration: (value: string) => void;
  newModuleLessons: string;
  setNewModuleLessons: (value: string) => void;
  addModule: () => void;
  removeModule: (index: number) => void;
  errors: FormErrors;
}

const ModulesSection: React.FC<ModulesSectionProps> = ({
  formData,
  newModuleTitle,
  setNewModuleTitle,
  newModuleDescription,
  setNewModuleDescription,
  newModuleDuration,
  setNewModuleDuration,
  newModuleLessons,
  setNewModuleLessons,
  addModule,
  removeModule,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiBook className="w-5 h-5 text-[#D2145A]" />
        Modules
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <input
            type="text"
            value={newModuleTitle}
            onChange={(e) => setNewModuleTitle(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Module title"
          />
          <input
            type="text"
            value={newModuleDescription}
            onChange={(e) => setNewModuleDescription(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Module description"
          />
          <input
            type="text"
            value={newModuleDuration}
            onChange={(e) => setNewModuleDuration(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Duration (e.g. 2 hours)"
          />
          <input
            type="number"
            value={newModuleLessons}
            onChange={(e) => setNewModuleLessons(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Number of lessons"
            min="0"
          />
        </div>
        <button
          type="button"
          onClick={addModule}
          disabled={
            !newModuleTitle.trim() ||
            !newModuleDescription.trim() ||
            !newModuleDuration.trim() ||
            !newModuleLessons.trim() ||
            isNaN(parseInt(newModuleLessons)) ||
            formData.modules.length >= 20
          }
          className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-5 h-5 inline mr-2" /> Add Module
        </button>
        {errors.modules && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.modules}
          </p>
        )}

        {formData.modules.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.modules.length}/20 modules
            </p>
            <AnimatePresence>
              {formData.modules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-700 dark:text-gray-300">
                      {module.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {module.description}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {module.duration} • Lessons: {module.lessons}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
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

interface TestimonialsSectionProps {
  formData: FormData;
  newTestimonialName: string;
  setNewTestimonialName: (value: string) => void;
  newTestimonialRole: string;
  setNewTestimonialRole: (value: string) => void;
  newTestimonialComment: string;
  setNewTestimonialComment: (value: string) => void;
  newTestimonialRating: string;
  setNewTestimonialRating: (value: string) => void;
  newTestimonialAvatar: string;
  setNewTestimonialAvatar: (value: string) => void;
  addTestimonial: () => void;
  removeTestimonial: (index: number) => void;
  errors: FormErrors;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  formData,
  newTestimonialName,
  setNewTestimonialName,
  newTestimonialRole,
  setNewTestimonialRole,
  newTestimonialComment,
  setNewTestimonialComment,
  newTestimonialRating,
  setNewTestimonialRating,
  newTestimonialAvatar,
  setNewTestimonialAvatar,
  addTestimonial,
  removeTestimonial,
  errors,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiUsers className="w-5 h-5 text-[#D2145A]" />
        Testimonials
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            value={newTestimonialName}
            onChange={(e) => setNewTestimonialName(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Testimonial name"
          />
          <input
            type="text"
            value={newTestimonialRole}
            onChange={(e) => setNewTestimonialRole(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Role (e.g. Student, Developer)"
          />
          <textarea
            rows={2}
            value={newTestimonialComment}
            onChange={(e) => setNewTestimonialComment(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Testimonial comment"
          />
          <select
            value={newTestimonialRating}
            onChange={(e) => setNewTestimonialRating(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>
                {rating} Star{rating !== 1 ? "s" : ""}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={newTestimonialAvatar}
            onChange={(e) => setNewTestimonialAvatar(e.target.value)}
            className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Emoji or Avatar URL (optional)"
          />
        </div>
        <button
          type="button"
          onClick={addTestimonial}
          disabled={
            !newTestimonialName.trim() ||
            !newTestimonialComment.trim() ||
            formData.testimonials.length >= 10
          }
          className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus className="w-5 h-5 inline mr-2" /> Add Testimonial
        </button>
        {errors.testimonials && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.testimonials}
          </p>
        )}

        {formData.testimonials.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.testimonials.length}/10 testimonials
            </p>
            <AnimatePresence>
              {formData.testimonials.map((testimonial, index) => (
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
                        {testimonial.name}
                      </h4>
                      {testimonial.role && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          ({testimonial.role})
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Rating: {testimonial.rating} Stars
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.comment}
                    </div>
                    {testimonial.avatar && (
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Avatar: {testimonial.avatar}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTestimonial(index)}
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

interface IncludesSectionProps {
  formData: FormData;
  errors: FormErrors;
  newInclude: string;
  setNewInclude: (value: string) => void;
  addInclude: () => void;
  removeInclude: (index: number) => void;
}

const IncludesSection: React.FC<IncludesSectionProps> = ({
  formData,
  errors,
  newInclude,
  setNewInclude,
  addInclude,
  removeInclude,
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <FiPackage className="w-5 h-5 text-[#D2145A]" />
        Includes
      </h3>

      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={newInclude}
            onChange={(e) => setNewInclude(e.target.value)}
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300"
            placeholder="Add an included item (e.g. Course materials)"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInclude();
              }
            }}
          />
          <button
            type="button"
            onClick={addInclude}
            disabled={!newInclude.trim() || formData.includes.length >= 20}
            className="px-4 py-3 bg-[#D2145A] text-white rounded-xl hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiPlus className="w-5 h-5" />
          </button>
        </div>

        {errors.includes && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.includes}
          </p>
        )}

        {formData.includes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formData.includes.length}/20 includes
            </p>
            <AnimatePresence>
              {formData.includes.map((include, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200/50 dark:border-gray-700/50"
                >
                  <span className="flex-1 text-gray-700 dark:text-gray-300">
                    {include}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeInclude(index)}
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
    field: keyof FormData | `instructor.${keyof FormData["instructor"]}`,
    value:
      | string
      | boolean
      | string[]
      | ProductFeature[]
      | ProductModule[]
      | ProductTestimonial[]
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

        {/* Video Preview URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Video Preview URL
          </label>
          <input
            type="url"
            value={formData.videoPreviewUrl}
            onChange={(e) =>
              handleInputChange("videoPreviewUrl", e.target.value)
            }
            className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 ${
              errors.videoPreviewUrl
                ? "border-red-300 dark:border-red-600"
                : "border-gray-200/50 dark:border-gray-700/50"
            }`}
            placeholder="https://example.com/video.mp4"
          />
          {errors.videoPreviewUrl && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">
              {errors.videoPreviewUrl}
            </p>
          )}
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
                Featured Product
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Featured products appear prominently
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

export default ProductForm;
