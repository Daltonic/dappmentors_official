// /validations/products.ts
import {
  ProductFeature,
  ProductModule,
  ProductTestimonial,
  FAQs,
  Product,
} from "@/utils/interfaces";

export function validateProductData(data: Partial<Product>): string[] {
  const errors: string[] = [];

  // Title validation
  if (typeof data.title !== "string" || data.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }
  if (data.title && data.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  // Description validation
  if (
    typeof data.description !== "string" ||
    data.description.trim().length < 10
  ) {
    errors.push("Description must be at least 10 characters long");
  }
  if (data.description && data.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  // Long description validation
  if (data.longDescription && data.longDescription.length > 2000) {
    errors.push("Long description must be less than 2000 characters");
  }

  // Type validation
  const validTypes = ["Course", "Bootcamp", "eBook", "Codebase"];
  if (data.type && !validTypes.includes(data.type)) {
    errors.push("Invalid product type");
  }

  // Price validation
  if (data.price !== undefined) {
    if (typeof data.price === "string") {
      if (data.price.trim().length === 0) {
        errors.push("Price is required");
      } else if (isNaN(parseFloat(data.price)) || parseFloat(data.price) < 0) {
        errors.push("Price must be a valid positive number");
      } else if (parseFloat(data.price) > 10000) {
        errors.push("Price cannot exceed $10,000");
      }
    } else if (typeof data.price === "number") {
      if (isNaN(data.price) || data.price < 0) {
        errors.push("Price must be a valid positive number");
      }
      if (data.price > 10000) {
        errors.push("Price cannot exceed $10,000");
      }
    } else {
      errors.push("Price must be a number or string");
    }
  }

  // Status validation
  const validStatuses = ["published", "draft", "archived"];
  if (data.status && !validStatuses.includes(data.status)) {
    errors.push("Invalid status");
  }

  // Difficulty/Level validation
  const validLevels = ["Beginner", "Intermediate", "Advanced", "All Levels"];
  if (data.difficulty && !validLevels.includes(data.difficulty)) {
    errors.push("Invalid difficulty level");
  }
  if (data.level && !validLevels.includes(data.level)) {
    errors.push("Invalid level");
  }

  // Duration validation
  if (typeof data.duration !== "string" || data.duration.trim().length === 0) {
    errors.push("Duration is required");
  }

  // Instructor validation
  if (!data.instructor) {
    errors.push("Instructor is required");
  } else {
    if (
      typeof data.instructor.name !== "string" ||
      data.instructor.name.trim().length < 2
    ) {
      errors.push("Instructor name must be at least 2 characters");
    }
    if (data.instructor.bio && data.instructor.bio.length > 500) {
      errors.push("Instructor bio must be less than 500 characters");
    }
    if (data.instructor.avatar && !isValidUrl(data.instructor.avatar)) {
      errors.push("Instructor avatar must be a valid URL");
    }
    if (
      data.instructor.credentials &&
      Array.isArray(data.instructor.credentials)
    ) {
      if (data.instructor.credentials.length > 10) {
        errors.push("Maximum 10 instructor credentials allowed");
      }
      data.instructor.credentials.forEach((cred, index) => {
        if (typeof cred !== "string" || cred.trim().length === 0) {
          errors.push(
            `Instructor credential ${index + 1} must be a non-empty string`,
          );
        }
        if (cred.length > 100) {
          errors.push(
            `Instructor credential ${index + 1} must be less than 100 characters`,
          );
        }
      });
    }
  }

  // Image/Thumbnail validation
  if (data.imageUrl && !isValidUrl(data.imageUrl)) {
    errors.push("Image URL must be valid");
  }
  if (data.videoPreviewUrl && !isValidUrl(data.videoPreviewUrl)) {
    errors.push("Video preview URL must be valid");
  }

  // Tags and technologies validation
  if (data.tags && Array.isArray(data.tags)) {
    if (data.tags.length > 20) {
      errors.push("Maximum 20 tags allowed");
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

  if (data.technologies && Array.isArray(data.technologies)) {
    if (data.technologies.length > 15) {
      errors.push("Maximum 15 technologies allowed");
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

  return errors;
}

// Rest of the file (validateAndNormalizeFeatures, validateAndNormalizeModules, etc.) remains unchanged
export function validateAndNormalizeFeatures(
  features: ProductFeature[],
): ProductFeature[] {
  if (!Array.isArray(features)) return [];

  return features
    .filter(
      (feature): feature is ProductFeature =>
        feature &&
        typeof feature === "object" &&
        typeof feature.title === "string" &&
        typeof feature.description === "string" &&
        typeof feature.icon === "string",
    )
    .map((feature) => ({
      icon: String(feature.icon || ""),
      title: String(feature.title || "").trim(),
      description: String(feature.description || "").trim(),
    }))
    .filter((feature) => feature.title.trim() && feature.description.trim())
    .slice(0, 10);
}

export function validateAndNormalizeModules(
  modules: ProductModule[],
): ProductModule[] {
  if (!Array.isArray(modules)) return [];

  return modules
    .filter(
      (module): module is ProductModule =>
        module &&
        typeof module === "object" &&
        typeof module.title === "string" &&
        typeof module.description === "string" &&
        typeof module.duration === "string" &&
        typeof module.lessons === "number",
    )
    .map((module) => ({
      title: String(module.title || "").trim(),
      duration: String(module.duration || "").trim(),
      lessons: Number(module.lessons || 0),
      description: String(module.description || "").trim(),
    }))
    .filter(
      (module) =>
        module.title.trim() &&
        module.description.trim() &&
        module.duration.trim(),
    )
    .slice(0, 20);
}

export function validateAndNormalizeTestimonials(
  testimonials: ProductTestimonial[],
): ProductTestimonial[] {
  if (!Array.isArray(testimonials)) return [];

  return testimonials
    .filter(
      (testimonial): testimonial is ProductTestimonial =>
        testimonial &&
        typeof testimonial === "object" &&
        typeof testimonial.name === "string" &&
        typeof testimonial.comment === "string" &&
        typeof testimonial.rating === "number" &&
        testimonial.rating >= 1 &&
        testimonial.rating <= 5,
    )
    .map((testimonial) => ({
      name: String(testimonial.name || "").trim(),
      role: String(testimonial.role || "").trim(),
      rating: Number(testimonial.rating || 0),
      comment: String(testimonial.comment || "").trim(),
      avatar: String(testimonial.avatar || "").trim(),
    }))
    .filter(
      (testimonial) => testimonial.name.trim() && testimonial.comment.trim(),
    )
    .slice(0, 10);
}

export function validateAndNormalizeFAQs(faqs: FAQs[]): FAQs[] {
  if (!Array.isArray(faqs)) return [];

  return faqs
    .filter(
      (faq): faq is FAQs =>
        faq &&
        typeof faq === "object" &&
        typeof faq.question === "string" &&
        typeof faq.answer === "string",
    )
    .map((faq) => ({
      question: String(faq.question || "").trim(),
      answer: String(faq.answer || "").trim(),
    }))
    .filter((faq) => faq.question.trim() && faq.answer.trim())
    .slice(0, 10);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
