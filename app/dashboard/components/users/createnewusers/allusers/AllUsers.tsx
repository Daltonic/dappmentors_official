"use client";

import React, { useState, useEffect } from "react";
import AllUserStatistics from "./AllUserStatistics";
import AllUsersTable from "./AllUsersTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../../shared/Button";
import usePagination from "@/app/dashboard/hooks/usePagination";

// Define the type of data returned by your API
interface IUserFromApi {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  slug: string;
  gender: string;
  authType: string;
  city: string;
  country: string;
}

// Define the type expected by your UI table component
interface IUserUI {
  name: string;
  dateJoined: string;
  time: string;
  email: string;
  phone: string;
  userType: string;
  avatar: string;
}

export default function AllUsers() {
  // Use the UI type for users
  const [users, setUsers] = useState<IUserUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [deleteOptionVisible, setDeleteOptionVisible] = useState<number | null>(
    null,
  );

  const paginationButtons = usePagination();

  // Toggle functions for filter and delete options
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleDeleteOption = (index: number) => {
    setDeleteOptionVisible(deleteOptionVisible === index ? null : index);
  };

  // Fetch users from the API on mount and map them to the UI type
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        // Transform API users to UI user objects
        const mappedUsers: IUserUI[] = data.data.map((user: IUserFromApi) => {
          const now = new Date();
          return {
            name: `${user.firstName} ${user.lastName}`,
            dateJoined: now.toLocaleDateString(), // replace with user.createdAt if available
            time: now.toLocaleTimeString(), // replace with actual time if available
            email: user.email,
            phone: "N/A", // Replace with actual phone data if available
            userType: user.authType, // or another field that represents the user type
            avatar: "/default-avatar.png", // Replace with actual avatar if available
          };
        });

        setUsers(mappedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <AllUserStatistics />
      <AllUsersTable
        users={users}
        filter={filter}
        setFilter={setFilter}
        isFilterOpen={isFilterOpen}
        toggleFilter={toggleFilter}
        deleteOptionVisible={deleteOptionVisible}
        toggleDeleteOption={toggleDeleteOption}
      />

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <Button
          label=""
          icon={<ChevronLeft size={18} />}
          className="bg-gray-200 dark:bg-gray-700"
          onClick={() => {}}
        />

        {Array.from({ length: paginationButtons }, (_, i) => i + 1).map(
          (page) => (
            <Button
              label={page}
              key={page}
              className={`${
                page === 1
                  ? "bg-[#D2145A] text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => {}}
            />
          ),
        )}
        <Button
          label=""
          icon={<ChevronRight size={18} />}
          className="bg-gray-200 dark:bg-gray-700"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
