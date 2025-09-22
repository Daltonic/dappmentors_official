"use client";

import { User } from "@/utils/interfaces";
import { useEffect, useRef, useState } from "react";
import {
  FaSearch,
  FaTh,
  FaListUl,
  FaUserCog,
  FaUserShield,
  FaSpinner,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useApiState, userApiService } from "@/services/api.services";
import { BulkUpdateResponse } from "@/services/userApiService";

// Props interface for the Controls component
interface ControlsProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedRole: "all" | string;
  setSelectedRole: React.Dispatch<React.SetStateAction<"all" | string>>;
  statusFilter: "all" | User["status"];
  setStatusFilter: React.Dispatch<React.SetStateAction<"all" | User["status"]>>;
  viewMode: "grid" | "table";
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "table">>;
  selectedUsers: Set<string>;
  uniqueRoles: string[];
  onBulkRoleChange?: (userIds: string[], newRole: string) => void;
  onBulkStatusChange?: (userIds: string[], newStatus: User["status"]) => void;
  onUsersUpdate?: (users: User[]) => void;
  onNotification?: (message: string, type: "success" | "error") => void;
}

// Controls Component
const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRole,
  setSelectedRole,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode,
  selectedUsers,
  onBulkRoleChange,
  onBulkStatusChange,
  onUsersUpdate,
  onNotification,
}) => {
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);

  const roleApi = useApiState<BulkUpdateResponse>();
  const statusApi = useApiState<BulkUpdateResponse>();

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const roleButtonRef = useRef<HTMLButtonElement>(null);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusButtonRef = useRef<HTMLButtonElement>(null);

  // Define available role change actions for bulk operations
  const getBulkRoleActions = () => {
    const availableRoles = ["admin", "instructor", "student"];
    return availableRoles.map((role) => ({
      label: `Set to ${role.charAt(0).toUpperCase() + role.slice(1)}`,
      role: role,
    }));
  };

  // Define available status change actions for bulk operations
  const getBulkStatusActions = () => {
    const availableStatuses: User["status"][] = [
      "active",
      "inactive",
      "banned",
    ];
    return availableStatuses.map((status) => ({
      label: `Set to ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      status: status,
    }));
  };

  const roleActions = getBulkRoleActions();
  const statusActions = getBulkStatusActions();

  // Handle bulk role change with API integration
  const handleBulkRoleChange = async (newRole: string) => {
    const selectedUserIds = Array.from(selectedUsers);

    if (selectedUserIds.length === 0) {
      onNotification?.("No users selected", "error");
      return;
    }

    setIsRoleMenuOpen(false);

    await roleApi.execute(
      () => userApiService.bulkUpdateRole(selectedUserIds, newRole),
      (data) => {
        onNotification?.(
          data.message || "Roles updated successfully",
          "success",
        );

        if (data.users && onUsersUpdate) {
          onUsersUpdate(data.users);
        }

        if (onBulkRoleChange) {
          onBulkRoleChange(selectedUserIds, newRole);
        }

        console.log(
          `Successfully changed role for ${selectedUserIds.length} users to ${newRole}`,
        );
      },
      (errorMessage) => {
        onNotification?.(errorMessage, "error");
        console.error("Bulk role change failed:", errorMessage);
      },
    );
  };

  // Handle bulk status change with API integration
  const handleBulkStatusChange = async (newStatus: User["status"]) => {
    const selectedUserIds = Array.from(selectedUsers);

    if (selectedUserIds.length === 0) {
      onNotification?.("No users selected", "error");
      return;
    }

    setIsStatusMenuOpen(false);

    await statusApi.execute(
      () => userApiService.bulkUpdateStatus(selectedUserIds, newStatus),
      (data) => {
        onNotification?.(
          data.message || "Statuses updated successfully",
          "success",
        );

        if (data.users && onUsersUpdate) {
          onUsersUpdate(data.users);
        }

        if (onBulkStatusChange) {
          onBulkStatusChange(selectedUserIds, newStatus);
        }

        console.log(
          `Successfully changed status for ${selectedUserIds.length} users to ${newStatus}`,
        );
      },
      (errorMessage) => {
        onNotification?.(errorMessage, "error");
        console.error("Bulk status change failed:", errorMessage);
      },
    );
  };

  // Close dropdown menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        roleMenuRef.current &&
        !roleMenuRef.current.contains(event.target as Node) &&
        roleButtonRef.current &&
        !roleButtonRef.current.contains(event.target as Node)
      ) {
        setIsRoleMenuOpen(false);
      }

      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target as Node) &&
        statusButtonRef.current &&
        !statusButtonRef.current.contains(event.target as Node)
      ) {
        setIsStatusMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-sm rounded-3xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50 mb-8 shadow-lg">
      <div className="flex flex-col gap-4">
        {/* Search */}
        <div className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          {/* Role Filter (Dropdown) */}
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as "all" | string)}
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            {/* {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))} */}

            <option value="all">All Roles</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as "all" | User["status"])
            }
            className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-xs sm:text-sm"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "grid"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaTh className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1 sm:p-2 rounded-lg transition-all duration-300 ${
                viewMode === "table"
                  ? "bg-white dark:bg-gray-700 shadow-sm"
                  : "hover:bg-white/50 dark:hover:bg-gray-700/50"
              }`}
            >
              <FaListUl className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div className="flex flex-wrap gap-2">
            {/* Role Change Dropdown */}
            <div className="relative">
              <button
                ref={roleButtonRef}
                disabled={roleApi.loading}
                className={`bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[140px] ${
                  roleApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !roleApi.loading && setIsRoleMenuOpen(!isRoleMenuOpen)
                }
              >
                {roleApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaUserCog className="w-4 h-4" />
                )}
                Change Role ({selectedUsers.size})
              </button>

              {isRoleMenuOpen && !roleApi.loading && (
                <motion.div
                  ref={roleMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {roleActions.length > 0 ? (
                    roleActions.map((action) => (
                      <button
                        key={action.role}
                        onClick={() => handleBulkRoleChange(action.role)}
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

            {/* Status Change Dropdown */}
            <div className="relative">
              <button
                ref={statusButtonRef}
                disabled={statusApi.loading}
                className={`bg-gradient-to-r from-red-900/30 to-red-900/60 text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 min-w-[150px] ${
                  statusApi.loading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                onClick={() =>
                  !statusApi.loading && setIsStatusMenuOpen(!isStatusMenuOpen)
                }
              >
                {statusApi.loading ? (
                  <FaSpinner className="w-4 h-4 animate-spin" />
                ) : (
                  <FaUserShield className="w-4 h-4" />
                )}
                Change Status ({selectedUsers.size})
              </button>

              {isStatusMenuOpen && !statusApi.loading && (
                <motion.div
                  ref={statusMenuRef}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute z-20 left-0 right-0 bottom-full mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden min-w-[200px]"
                >
                  {statusActions.length > 0 ? (
                    statusActions.map((action) => (
                      <button
                        key={action.status}
                        onClick={() => handleBulkStatusChange(action.status)}
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        {action.label}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                      No status changes available
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
