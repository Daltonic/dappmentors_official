export const slugify = (title: string, addRandom: boolean = false) => {
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (addRandom) {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${slug}-${randomString}`;
  }

  return slug;
};
