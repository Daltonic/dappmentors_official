import { Activity } from "@/utils/interfaces";
import { Collection, ObjectId } from "mongodb";

// Helper function to generate email verification token
export function generateVerificationToken(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export async function logActivity(
  db: { collection: (arg0: string) => Collection<Activity> },
  type: Activity["type"],
  title: string,
  description: string,
  metadata?: Activity["metadata"],
): Promise<void> {
  const activitiesCollection: Collection<Activity> =
    db.collection("activities");
  await activitiesCollection.insertOne({
    id: new ObjectId().toString(), // Generate a new ObjectId and convert to string
    type,
    title,
    description,
    timestamp: new Date(),
    icon: getActivityIcon(type), // Helper below
    color: getActivityColor(type), // Helper below
    metadata,
  });
}

// Helpers for icon and color (expand as needed)
export function getActivityIcon(type: Activity["type"]): string {
  const icons: Record<Activity["type"], string> = {
    user_registration: "👤",
    items_activities: "✅",
    course_completed: "📚",
    payment_received: "🤑",
    new_review: "⭐",
  };
  return icons[type] || "ℹ️";
}

export function getActivityColor(type: Activity["type"]): string {
  const colors: Record<Activity["type"], string> = {
    user_registration: "text-[#D2145A]",
    items_activities: "text-green-500",
    course_completed: "text-green-500",
    payment_received: "text-yellow-500",
    new_review: "text-purple-500",
  };
  return colors[type] || "text-gray-500";
}
