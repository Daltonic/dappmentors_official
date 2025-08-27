import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { User } from "@/utils/interfaces";
import CardImage from "@/components/shared/CardImage";

const UserCard: React.FC<{
  user: User;
  selected: boolean;
  onToggle: () => void;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({ user, selected, onToggle, getStatusColor, getRoleColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar */}
      <div className="relative h-48 overflow-hidden">
        <CardImage
          src={user.avatar}
          alt={user.name}
          width={400}
          height={192}
          className="group-hover:scale-110 transition-transform duration-700"
          rounded={false}
          objectFit="cover"
          showInitials={true}
        />
        <div className="absolute top-4 left-4">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="w-4 h-4 text-[#D2145A] bg-white/90 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
          />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(
              user.status,
            )}`}
          >
            {user.status}
          </span>
        </div>
      </div>

      <div className="p-6 relative z-10">
        {/* Role and Posts */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${getRoleColor(
              user.role,
            )}`}
          >
            {user.role}
          </span>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {user.posts}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              posts
            </div>
          </div>
        </div>

        {/* Name and Email */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {user.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex items-center gap-2">
          <FaEnvelope /> {user.email}
        </p>

        {/* Meta Information */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Joined:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.joinDate.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Last Login:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.lastLogin?.toLocaleDateString() || "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Comments:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.comments}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
