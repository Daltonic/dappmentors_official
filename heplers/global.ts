export function generateSlug(title: string, id?: string | number): string {
  if (!title || title.trim() === "") {
    throw new Error("Title cannot be empty");
  }

  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "") // Stricter: only allow a-z, 0-9, and -
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

  // Ensure baseSlug isn't empty after processing (fallback to a default if needed)
  const finalBaseSlug = baseSlug || "untitled";

  return id ? `${finalBaseSlug}-${id}` : finalBaseSlug;
}

export const generateGradientFromString = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  // Generate colors based on hash
  // const hue1 = Math.abs(hash) % 360;
  // const hue2 = (hue1 + 60) % 360; // Complementary hue

  // Create gradient classes based on hue ranges
  const gradients = [
    "from-red-500 to-pink-500",
    "from-blue-500 to-indigo-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-violet-500",
    "from-orange-500 to-red-500",
    "from-teal-500 to-cyan-500",
    "from-yellow-500 to-orange-500",
    "from-indigo-500 to-purple-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
  ];

  return gradients[Math.abs(hash) % gradients.length];
};

export const getHighlightWord = (title: string) => {
  const words = title.split(" ").filter((word) => word.length > 0); // Split and filter out empty strings
  if (words.length > 3) {
    const middleIndex = Math.floor((words.length - 1) / 2); // Find the starting index for middle two words
    return `${words[middleIndex]} ${words[middleIndex + 1]}`; // Return two consecutive middle words
  }
  return words[words.length - 1] || ""; // Return last word or empty string if no words
};
