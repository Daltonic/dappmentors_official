import { FaEnvelope, FaEye, FaUserCog } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "@/utils/interfaces";
import { useState, useEffect, useRef } from "react";

const UserCard: React.FC<{
  user: User;
  selected: boolean;
  onToggle: () => void;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({ user, selected, onToggle, getStatusColor, getRoleColor }) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Define available role change actions based on current role
  const getRoleActions = () => {
    const actions = [];
    if (user.role !== "admin") {
      actions.push({ label: "Promote to Admin", role: "admin" });
    }
    if (user.role !== "instructor") {
      actions.push({ label: "Promote/Set to Instructor", role: "instructor" });
    }
    if (user.role !== "student") {
      actions.push({ label: "Demote/Set to Student", role: "student" });
    }
    return actions;
  };

  const roleActions = getRoleActions();

  // Placeholder function for handling role change
  const handleRoleChange = (newRole: string) => {
    // Implement role change logic here (e.g., API call)
    console.log(`Changing ${user.name}'s role to ${newRole}`);
    setIsRoleMenuOpen(false);
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsRoleMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#D2145A]/5 to-[#FF4081]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Avatar */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={user.avatar as string}
          alt={user.name}
          width={400}
          height={192}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          style={{ objectFit: "cover" }}
          unoptimized
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
              {user.joinDate}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">
              Last Login:
            </span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.lastLogin}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400">Comments:</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.comments}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 relative">
          <div className="flex-1 relative">
            <button
              ref={buttonRef}
              className="w-full bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-2 px-4 rounded-xl text-sm font-semibold hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2"
              onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            >
              <FaUserCog className="w-5 h-5" />
              Change Role
            </button>
            {isRoleMenuOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
              >
                {roleActions.length > 0 ? (
                  roleActions.map((action) => (
                    <button
                      key={action.role}
                      onClick={() => handleRoleChange(action.role)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                    >
                      {action.label}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                    No role changes available
                  </div>
                )}
              </motion.div>
            )}
          </div>
          <button
            className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors"
            title="View details"
          >
            <FaEye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
