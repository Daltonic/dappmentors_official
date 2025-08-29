import { Product } from "@/utils/interfaces";
import { Collection, Filter, ObjectId } from "mongodb";

interface ProductDocument extends Omit<Product, "id"> {
  _id: ObjectId;
  createdBy: string;
}

// Helper function to generate unique slug
export async function generateUniqueSlug(
  title: string,
  collection: Collection<ProductDocument>,
  excludeId?: ObjectId,
): Promise<string> {
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

  let slug = baseSlug;
  let count = 1;

  const query: Filter<ProductDocument> = { slug };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  while (await collection.findOne(query)) {
    slug = `${baseSlug}-${count}`;
    query.slug = slug;
    count++;
  }

  return slug;
}
