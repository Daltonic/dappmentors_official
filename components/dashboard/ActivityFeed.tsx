import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns"; // npm i date-fns
import { Activity } from "@/utils/interfaces"; // Adjust path

// Activity Feed Component
const ActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/activities?limit=10");
      if (!response.ok) {
        throw new Error("Failed to fetch activities");
      }
      const data = await response.json();
      setActivities(data.activities);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          Loading activities...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6">
        <p className="text-red-500 dark:text-red-400">Error: {error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6">
        <p className="text-gray-500 dark:text-gray-400">
          No recent activities.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
        <h3 className="text-xl font-cambo font-normal text-gray-900 dark:text-white">
          Recent Activity
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#FF4081]/10 dark:hover:bg-[#FF4081]/20 transition-colors duration-300"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                  activity.color === "text-[#D2145A]"
                    ? "bg-[#D2145A]/20 dark:bg-[#FF4081]/20"
                    : activity.color === "text-green-500"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : activity.color === "text-yellow-500"
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : "bg-purple-100 dark:bg-purple-900/30"
                }`}
              >
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;
