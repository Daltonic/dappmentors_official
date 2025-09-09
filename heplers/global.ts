export function generateSlug(title: string, id?: string | number): string {
  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty");
  }

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-");

  return id ? `${baseSlug}-${id}` : baseSlug;
}
