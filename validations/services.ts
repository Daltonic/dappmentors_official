// Updated validations/services.ts
import { FAQs, Package, Service } from "@/utils/interfaces";

// Helper functions for validation and normalization
export function validateAndNormalizeFeatures(features: string[]): string[] {
  if (!Array.isArray(features)) return [];

  return features
    .filter((feature): feature is string => typeof feature === "string")
    .map((feature) => feature.trim())
    .filter((feature) => feature);
}

export function validateAndNormalizePackages(packages: Package[]): Package[] {
  if (!Array.isArray(packages)) return [];

  return packages
    .filter((pkg): pkg is Package => pkg && typeof pkg === "object")
    .map((pkg) => ({
      name: String(pkg.name || ""),
      price: String(pkg.price || ""),
      features: Array.isArray(pkg.features)
        ? pkg.features.filter((f: string) => typeof f === "string" && f.trim())
        : [],
      popular: Boolean(pkg.popular),
    }))
    .filter((pkg) => pkg.name.trim() && pkg.price.trim());
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

// Validation helper function for creation
export function validateServiceData(data: Partial<Service>): string[] {
  const errors: string[] = [];

  // Title validation (required)
  if (
    !data.title ||
    typeof data.title !== "string" ||
    data.title.trim().length < 3
  ) {
    errors.push("Title is required and must be at least 3 characters long");
  }
  if (data.title && data.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  // Description validation (required)
  if (
    !data.description ||
    typeof data.description !== "string" ||
    data.description.trim().length < 10
  ) {
    errors.push(
      "Description is required and must be at least 10 characters long",
    );
  }
  if (data.description && data.description.length > 1000) {
    errors.push("Description must be less than 1000 characters");
  }

  // Type validation (required)
  if (!data.type) {
    errors.push("Type is required");
  } else {
    const validTypes = [
      "Hiring",
      "Education",
      "Mentorship",
      "Professional",
      "Writing",
    ];
    if (!validTypes.includes(data.type as string)) {
      errors.push("Invalid service type");
    }
  }

  // Price validation (required)
  if (data.price === undefined) {
    errors.push("Price is required");
  } else if (typeof data.price === "string") {
    if (data.price.trim().length === 0) {
      errors.push("Price cannot be empty");
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

  // Icon validation (required)
  if (
    !data.icon ||
    typeof data.icon !== "string" ||
    data.icon.trim().length === 0
  ) {
    errors.push("Icon is required and must be a non-empty string");
  }

  // Status validation (optional)
  if (data.status) {
    const validStatuses = ["active", "inactive", "coming-soon"];
    if (!validStatuses.includes(data.status)) {
      errors.push("Invalid status");
    }
  }

  // Thumbnail validation (optional)
  if (data.thumbnail && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  // Features validation (optional)
  if (data.features) {
    if (!Array.isArray(data.features)) {
      errors.push("Features must be an array");
    } else {
      if (data.features.length > 10) {
        errors.push("Maximum 10 features allowed");
      }
      data.features.forEach((feature, index) => {
        if (typeof feature !== "string" || feature.trim().length === 0) {
          errors.push(`Feature ${index + 1} must be a non-empty string`);
        }
        if (feature.length > 200) {
          errors.push(`Feature ${index + 1} must be less than 200 characters`);
        }
      });
    }
  }

  // Packages validation (optional)
  if (data.packages) {
    if (!Array.isArray(data.packages)) {
      errors.push("Packages must be an array");
    } else {
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
        if (pkg.features && !Array.isArray(pkg.features)) {
          errors.push(`Package ${index + 1} features must be an array`);
        }
      });
    }
  }

  // FAQs validation (optional)
  if (data.faqs) {
    if (!Array.isArray(data.faqs)) {
      errors.push("FAQs must be an array");
    } else {
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
  }

  // Clients validation (optional)
  if (data.clients !== undefined) {
    if (
      typeof data.clients !== "number" ||
      isNaN(data.clients) ||
      data.clients < 0
    ) {
      errors.push("Clients must be a positive number or zero");
    }
  }

  // Featured validation (optional)
  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    errors.push("Featured must be a boolean");
  }

  return errors;
}

// Validation helper for updates
export function validateUpdateServiceData(data: Partial<Service>): string[] {
  const errors: string[] = [];

  // Title validation (if provided)
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    }
    if (data.title.length > 100) {
      errors.push("Title must be less than 100 characters");
    }
  }

  // Description validation (if provided)
  if (data.description !== undefined) {
    if (
      typeof data.description !== "string" ||
      data.description.trim().length < 10
    ) {
      errors.push("Description must be at least 10 characters long");
    }
    if (data.description.length > 1000) {
      errors.push("Description must be less than 1000 characters");
    }
  }

  // Type validation (if provided)
  if (data.type !== undefined) {
    const validTypes = [
      "Hiring",
      "Education",
      "Mentorship",
      "Professional",
      "Writing",
    ];
    if (!validTypes.includes(data.type)) {
      errors.push("Invalid service type");
    }
  }

  // Price validation (if provided)
  if (data.price !== undefined) {
    if (typeof data.price === "number") {
      if (isNaN(data.price) || data.price < 0) {
        errors.push("Price must be a valid positive number");
      }
      if (data.price > 100000) {
        errors.push("Price cannot exceed $100,000");
      }
    } else if (typeof data.price === "string") {
      if (data.price.trim().length === 0) {
        errors.push("Price cannot be empty");
      }
    } else {
      errors.push("Price must be a number or string");
    }
  }

  // Status validation (if provided)
  if (data.status !== undefined) {
    const validStatuses = ["active", "inactive", "coming-soon"];
    if (!validStatuses.includes(data.status)) {
      errors.push("Invalid status");
    }
  }

  // Icon validation (if provided)
  if (data.icon !== undefined) {
    if (typeof data.icon !== "string" || data.icon.trim().length === 0) {
      errors.push("Icon must be a non-empty string");
    }
  }

  // Thumbnail validation (if provided)
  if (data.thumbnail !== undefined && data.thumbnail.trim()) {
    try {
      new URL(data.thumbnail);
    } catch {
      errors.push("Thumbnail must be a valid URL");
    }
  }

  // Features validation (if provided)
  if (data.features !== undefined) {
    if (!Array.isArray(data.features)) {
      errors.push("Features must be an array");
    } else {
      if (data.features.length > 10) {
        errors.push("Maximum 10 features allowed");
      }
      data.features.forEach((feature, index) => {
        if (typeof feature !== "string" || feature.trim().length === 0) {
          errors.push(`Feature ${index + 1} must be a non-empty string`);
        }
        if (feature.length > 200) {
          errors.push(`Feature ${index + 1} must be less than 200 characters`);
        }
      });
    }
  }

  // Packages validation (if provided)
  if (data.packages !== undefined) {
    if (!Array.isArray(data.packages)) {
      errors.push("Packages must be an array");
    } else {
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
        if (pkg.features && !Array.isArray(pkg.features)) {
          errors.push(`Package ${index + 1} features must be an array`);
        }
      });
    }
  }

  // FAQs validation (if provided)
  if (data.faqs !== undefined) {
    if (!Array.isArray(data.faqs)) {
      errors.push("FAQs must be an array");
    } else {
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
  }

  // Clients validation (if provided)
  if (data.clients !== undefined) {
    if (
      typeof data.clients !== "number" ||
      isNaN(data.clients) ||
      data.clients < 0
    ) {
      errors.push("Clients must be a positive number or zero");
    }
  }

  // Featured validation (if provided)
  if (data.featured !== undefined && typeof data.featured !== "boolean") {
    errors.push("Featured must be a boolean");
  }

  return errors;
}
