import { BlogPost, BlogStatus } from "@/utils/interfaces";

export function validateBlogData(data: Partial<BlogPost>): string[] {
  const errors: string[] = [];

  // Required fields
  if (data.title !== undefined) {
    if (typeof data.title !== "string" || data.title.trim().length === 0) {
      errors.push("Title must be a non-empty string");
    } else if (data.title.length > 200) {
      errors.push("Title must not exceed 200 characters");
    }
  }

  if (data.content !== undefined) {
    if (typeof data.content !== "string" || data.content.trim().length === 0) {
      errors.push("Content must be a non-empty string");
    }
  }

  // Optional fields with specific constraints
  if (data.excerpt !== undefined) {
    if (typeof data.excerpt !== "string") {
      errors.push("Excerpt must be a string");
    } else if (data.excerpt.length > 500) {
      errors.push("Excerpt must not exceed 500 characters");
    }
  }

  if (data.category !== undefined) {
    if (
      typeof data.category !== "string" ||
      data.category.trim().length === 0
    ) {
      errors.push("Category must be a non-empty string");
    }
  }

  if (data.readTime !== undefined) {
    if (typeof data.readTime !== "number" || data.readTime < 0) {
      errors.push("Read time must be a non-negative number");
    }
  }

  if (data.publishDate !== undefined) {
    if (isNaN(Date.parse(data.publishDate as unknown as string))) {
      errors.push("Publish date must be a valid date");
    }
  }

  if (data.topics !== undefined) {
    if (!Array.isArray(data.topics)) {
      errors.push("Topics must be an array");
    } else if (data.topics.length > 10) {
      errors.push("Topics array must not exceed 10 items");
    } else if (
      !data.topics.every(
        (topic) => typeof topic === "string" && topic.trim().length > 0,
      )
    ) {
      errors.push("All topics must be non-empty strings");
    }
  }

  if (data.image !== undefined) {
    if (typeof data.image !== "string") {
      errors.push("Image must be a string (URL)");
    }
  }

  if (data.featured !== undefined) {
    if (typeof data.featured !== "boolean") {
      errors.push("Featured must be a boolean");
    }
  }

  if (data.status !== undefined) {
    const validStatuses: BlogStatus[] = ["published", "draft", "archived"];
    if (!validStatuses.includes(data.status as BlogStatus)) {
      errors.push("Status must be one of: 'published', 'draft', 'archived'");
    }
  }

  if (data.author !== undefined) {
    if (typeof data.author !== "object" || data.author === null) {
      errors.push("Author must be an object");
    } else {
      const { name, avatar, bio } = data.author;
      if (
        name !== undefined &&
        (typeof name !== "string" || name.trim().length === 0)
      ) {
        errors.push("Author name must be a non-empty string");
      }
      if (avatar !== undefined && typeof avatar !== "string") {
        errors.push("Author avatar must be a string (URL)");
      }
      if (bio !== undefined && typeof bio !== "string") {
        errors.push("Author bio must be a string");
      }
    }
  }

  if (data.relatedProduct !== undefined) {
    if (typeof data.relatedProduct !== "string") {
      errors.push("Related product must be a string");
    }
  }

  return errors;
}
