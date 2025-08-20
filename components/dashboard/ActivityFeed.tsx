import { motion } from "framer-motion";

// Activity Feed Component
const ActivityFeed: React.FC = () => {
  const activities = [
    {
      id: "1",
      icon: "👤",
      title: "New user registration",
      description: "Alice Johnson joined as instructor",
      time: "5 min ago",
      color: "text-[#D2145A]",
    },
    {
      id: "2",
      icon: "📚",
      title: "Course completed",
      description: "Bob Smith finished React Masterclass",
      time: "12 min ago",
      color: "text-green-500",
    },
    {
      id: "3",
      icon: "💰",
      title: "Payment received",
      description: "$299 from course enrollment",
      time: "1 hour ago",
      color: "text-yellow-500",
    },
    {
      id: "4",
      icon: "⭐",
      title: "New review",
      description: "5-star review on Advanced JavaScript",
      time: "2 hours ago",
      color: "text-purple-500",
    },
  ];

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
                  {activity.time}
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
