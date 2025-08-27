import { User } from "@/utils/interfaces";
import {
  FaChevronLeft,
  FaChevronRight,
  FaSort,
  FaSortDown,
  FaSortUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Avatar from "../../shared/Avatar";

// SortIcon Component
const SortIcon: React.FC<{
  column: keyof User;
  sortConfig: { key: keyof User; direction: "asc" | "desc" } | null;
}> = ({ column, sortConfig }) => {
  if (!sortConfig || sortConfig.key !== column) {
    return <FaSort className="w-4 h-4 opacity-30" />;
  }

  return sortConfig.direction === "asc" ? (
    <FaSortUp className="w-4 h-4 text-[#D2145A]" />
  ) : (
    <FaSortDown className="w-4 h-4 text-[#D2145A]" />
  );
};

// UserTable Component
const UserTable: React.FC<{
  users: User[];
  selectedUsers: Set<string>;
  onToggle: (id: string) => void;
  toggleAll: () => void;
  sortConfig: { key: keyof User; direction: "asc" | "desc" } | null;
  onSort: (key: keyof User) => void;
  allUsersLength: number;
  getStatusColor: (status: User["status"]) => string;
  getRoleColor: (role: string) => string;
}> = ({
  users,
  selectedUsers,
  onToggle,
  toggleAll,
  sortConfig,
  onSort,
  allUsersLength,
  getStatusColor,
  getRoleColor,
}) => {
  // State and refs for managing drop-up menu per row
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) {
        const menuRef = menuRefs.current.get(openMenuId);
        const buttonRef = buttonRefs.current.get(openMenuId);
        if (
          menuRef &&
          !menuRef.contains(event.target as Node) &&
          buttonRef &&
          !buttonRef.contains(event.target as Node)
        ) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-full">
          <thead>
            <tr className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
              <th className="text-left px-4 py-4 w-12">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.size === users.length && users.length > 0
                  }
                  onChange={toggleAll}
                  className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                />
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[300px]"
                onClick={() => onSort("name")}
              >
                <div className="flex items-center gap-2">
                  User
                  <SortIcon column="name" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => onSort("role")}
              >
                <div className="flex items-center gap-2">
                  Role
                  <SortIcon column="role" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("status")}
              >
                <div className="flex items-center gap-2">
                  Status
                  <SortIcon column="status" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => onSort("joinDate")}
              >
                <div className="flex items-center gap-2">
                  Joined
                  <SortIcon column="joinDate" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[120px]"
                onClick={() => onSort("lastLogin")}
              >
                <div className="flex items-center gap-2">
                  Last Login
                  <SortIcon column="lastLogin" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("posts")}
              >
                <div className="flex items-center gap-2">
                  Posts
                  <SortIcon column="posts" sortConfig={sortConfig} />
                </div>
              </th>
              <th
                className="text-left px-4 py-4 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#D2145A] transition-colors min-w-[100px]"
                onClick={() => onSort("comments")}
              >
                <div className="flex items-center gap-2">
                  Comments
                  <SortIcon column="comments" sortConfig={sortConfig} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id!}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-200/30 dark:border-gray-700/30 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-all duration-300 group"
              >
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers.has(user.id!)}
                    onChange={() => onToggle(user.id!)}
                    className="w-4 h-4 text-[#D2145A] bg-gray-100 border-gray-300 rounded focus:ring-[#D2145A] focus:ring-2"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} alt={user.name} size="sm" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1 line-clamp-1">
                        {user.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-xs line-clamp-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleColor(
                      user.role,
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      user.status,
                    )}`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-2 flex-shrink-0 ${
                        user.status === "active"
                          ? "bg-green-400"
                          : user.status === "inactive"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                      }`}
                    />
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {user.joinDate.toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {user.lastLogin?.toLocaleDateString() || "N/A"}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {user.posts}
                </td>
                <td className="px-4 py-4 text-gray-900 dark:text-white">
                  {user.comments}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 dark:text-gray-300 gap-4 sm:gap-0">
          <span>
            Showing {users.length} of {allUsersLength} users
            {selectedUsers.size > 0 && ` (${selectedUsers.size} selected)`}
          </span>
          <div className="flex items-center gap-4">
            <span>Rows per page: 50</span>
            <div className="flex gap-2">
              <button
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                disabled
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
              <button
                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                disabled
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
