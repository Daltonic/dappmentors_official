import {
  FAQs,
  Service,
  ServiceFeature,
  ServicePackage,
} from "@/utils/interfaces";

// Helper functions for validation and normalization
export function validateAndNormalizeFeatures(
  features: ServiceFeature[],
): ServiceFeature[] {
  if (!Array.isArray(features)) return [];

  return features
    .filter(
      (feature): feature is ServiceFeature =>
        feature && typeof feature === "object",
    )
    .map((feature) => ({
      icon: String(feature.icon || ""),
      title: String(feature.title || ""),
      description: String(feature.description || ""),
    }))
    .filter((feature) => feature.title.trim() && feature.description.trim());
}

export function validateAndNormalizePackages(
  packages: ServicePackage[],
): ServicePackage[] {
  if (!Array.isArray(packages)) return [];

  return packages
    .filter((pkg): pkg is ServicePackage => pkg && typeof pkg === "object")
    .map((pkg) => ({
      name: String(pkg.name || ""),
      price: String(pkg.price || ""),
      duration: String(pkg.duration || ""),
      features: Array.isArray(pkg.features)
        ? pkg.features.filter((f: string) => typeof f === "string" && f.trim())
        : [],
      popular: Boolean(pkg.popular),
    }))
    .filter(
      (pkg) => pkg.name.trim() && pkg.price.trim() && pkg.duration.trim(),
    );
}

export function validateAndNormalizeFAQs(faqs: FAQs[]): FAQs[] {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .filter((faq): faq is FAQs => faq && typeof faq === "object")
    .map((faq) => ({
      question: String(faq.question || ""),
      answer: String(faq.answer || ""),
    }))
    .filter((faq) => faq.question.trim() && faq.answer.trim());
}

// Validation helper function
export function validateServiceData(data: Partial<Service>): string[] {
  const errors: string[] = [];

  // Title validation
  if (typeof data.title !== "string" || data.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }
  if (data.title && data.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  // Subtitle validation (optional)
  if (data.subtitle && data.subtitle.length > 150) {
    errors.push("Subtitle must be less than 150 characters");
  }

  // Description validation
  if (
    typeof data.description !== "string" ||
    data.description.trim().length < 10
  ) {
    errors.push("Description must be at least 10 characters long");
  }
  if (data.description && data.description.length > 1000) {
    errors.push("Description must be less than 1000 characters");
  }

  // Type validation
  const validTypes = [
    "Education",
    "Mentorship",
    "Development",
    "Writing",
    "Hiring",
    "Community",
  ];
  if (!validTypes.includes(data.type as string)) {
    errors.push("Invalid service type");
  }

  // Price validation (can be string or number)
  if (data.price !== undefined) {
    if (typeof data.price === "string") {
      if (data.price.trim().length === 0) {
        errors.push("Price is required");
      }
    } else if (typeof data.price === "number") {
      if (isNaN(data.price) || data.price < 0) {
        errors.push("Price must be a valid positive number");
      }
      if (data.price > 100000) {
        errors.push("Price cannot exceed $100,000");
      }
    } else {
      errors.push("Price must be a number or string");
    }
  }

  // Status validation
  const validStatuses = ["active", "inactive", "coming-soon"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push("Invalid status");
  }

  // Lead validation
  if (typeof data.lead !== "string" || data.lead.trim().length < 2) {
    errors.push("Lead must be at least 2 characters long");
  }
  if (data.lead && data.lead.length > 100) {
    errors.push("Lead must be less than 100 characters");
  }

  // Duration validation
  if (typeof data.duration !== "string" || data.duration.trim().length < 2) {
    errors.push("Duration must be at least 2 characters long");
  }
  if (data.duration && data.duration.length > 100) {
    errors.push("Duration must be less than 100 characters");
  }

  // Category validation
  if (typeof data.category !== "string" || data.category.trim().length < 2) {
    errors.push("Category must be at least 2 characters long");
  }
  if (data.category && data.category.length > 50) {
    errors.push("Category must be less than 50 characters");
  }

  // Thumbnail validation
  if (data.thumbnail && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  // Tags validation
  if (data.tags && Array.isArray(data.tags)) {
    if (data.tags.length > 10) {
      errors.push("Maximum 10 tags allowed");
    }
    data.tags.forEach((tag, index) => {
      if (typeof tag !== "string" || tag.trim().length === 0) {
        errors.push(`Tag ${index + 1} must be a non-empty string`);
      }
      if (tag.length > 30) {
        errors.push(`Tag ${index + 1} must be less than 30 characters`);
      }
    });
  }

  // Technologies validation
  if (data.technologies && Array.isArray(data.technologies)) {
    if (data.technologies.length > 20) {
      errors.push("Maximum 20 technologies allowed");
    }
    data.technologies.forEach((tech, index) => {
      if (typeof tech !== "string" || tech.trim().length === 0) {
        errors.push(`Technology ${index + 1} must be a non-empty string`);
      }
      if (tech.length > 50) {
        errors.push(`Technology ${index + 1} must be less than 50 characters`);
      }
    });
  }

  // Blockchains validation
  if (data.blockchains && Array.isArray(data.blockchains)) {
    if (data.blockchains.length > 15) {
      errors.push("Maximum 15 blockchains allowed");
    }
    data.blockchains.forEach((blockchain, index) => {
      if (typeof blockchain !== "string" || blockchain.trim().length === 0) {
        errors.push(`Blockchain ${index + 1} must be a non-empty string`);
      }
      if (blockchain.length > 50) {
        errors.push(`Blockchain ${index + 1} must be less than 50 characters`);
      }
    });
  }

  // Deliverables validation
  if (data.deliverables && Array.isArray(data.deliverables)) {
    if (data.deliverables.length > 20) {
      errors.push("Maximum 20 deliverables allowed");
    }
    data.deliverables.forEach((deliverable, index) => {
      if (typeof deliverable !== "string" || deliverable.trim().length === 0) {
        errors.push(`Deliverable ${index + 1} must be a non-empty string`);
      }
      if (deliverable.length > 200) {
        errors.push(
          `Deliverable ${index + 1} must be less than 200 characters`,
        );
      }
    });
  }

  // Features validation
  if (data.features && Array.isArray(data.features)) {
    if (data.features.length > 10) {
      errors.push("Maximum 10 features allowed");
    }
    data.features.forEach((feature, index) => {
      if (!feature || typeof feature !== "object") {
        errors.push(`Feature ${index + 1} must be an object`);
        return;
      }
      if (
        !feature.title ||
        typeof feature.title !== "string" ||
        feature.title.trim().length === 0
      ) {
        errors.push(`Feature ${index + 1} title is required`);
      }
      if (
        !feature.description ||
        typeof feature.description !== "string" ||
        feature.description.trim().length === 0
      ) {
        errors.push(`Feature ${index + 1} description is required`);
      }
    });
  }

  // Packages validation
  if (data.packages && Array.isArray(data.packages)) {
    if (data.packages.length > 5) {
      errors.push("Maximum 5 packages allowed");
    }
    data.packages.forEach((pkg, index) => {
      if (!pkg || typeof pkg !== "object") {
        errors.push(`Package ${index + 1} must be an object`);
        return;
      }
      if (
        !pkg.name ||
        typeof pkg.name !== "string" ||
        pkg.name.trim().length === 0
      ) {
        errors.push(`Package ${index + 1} name is required`);
      }
      if (
        !pkg.price ||
        typeof pkg.price !== "string" ||
        pkg.price.trim().length === 0
      ) {
        errors.push(`Package ${index + 1} price is required`);
      }
      if (
        !pkg.duration ||
        typeof pkg.duration !== "string" ||
        pkg.duration.trim().length === 0
      ) {
        errors.push(`Package ${index + 1} duration is required`);
      }
      if (pkg.features && !Array.isArray(pkg.features)) {
        errors.push(`Package ${index + 1} features must be an array`);
      }
    });
  }

  // FAQs validation
  if (data.faqs && Array.isArray(data.faqs)) {
    if (data.faqs.length > 10) {
      errors.push("Maximum 10 FAQs allowed");
    }
    data.faqs.forEach((faq, index) => {
      if (!faq || typeof faq !== "object") {
        errors.push(`FAQ ${index + 1} must be an object`);
        return;
      }
      if (
        !faq.question ||
        typeof faq.question !== "string" ||
        faq.question.trim().length === 0
      ) {
        errors.push(`FAQ ${index + 1} question is required`);
      }
      if (
        !faq.answer ||
        typeof faq.answer !== "string" ||
        faq.answer.trim().length === 0
      ) {
        errors.push(`FAQ ${index + 1} answer is required`);
      }
    });
  }

  return errors;
}
