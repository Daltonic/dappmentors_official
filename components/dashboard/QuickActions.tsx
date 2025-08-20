// @/components/dashboard/QuickActions.tsx
import { QuickAction } from "@/utils/interfaces";
import { motion } from "framer-motion";
import Link from "next/link";

const QuickActions: React.FC<{ actions: QuickAction[] }> = ({ actions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {actions.map((action, index) => (
        <motion.div
          key={action.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 hover:shadow-2xl transition-all duration-700 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <Link href={action.href} className="relative block">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-2xl flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {action.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {action.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {action.description}
            </p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickActions;
