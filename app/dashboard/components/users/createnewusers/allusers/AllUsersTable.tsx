import React from "react";
import { IoSearch } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { MdArrowDropDown } from "react-icons/md";
import Image from "next/image";
import { UsersTableProps } from "@/utils/interfaces";

const AllUsersTable: React.FC<UsersTableProps> = ({
  users,
  filter,
  setFilter,
  isFilterOpen,
  toggleFilter,
  deleteOptionVisible,
  toggleDeleteOption,
}) => {
  return (
    <div className="bg-white relative dark:bg-black rounded-lg shadow-md border p-6">
      {/* Table Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-col md:flex-row space-x-4 items-center flex-1">
          <h1 className="text-lg font-semibold mb-2 md:mb-0">All Users</h1>
          <div className="relative w-full md:w-1/2 ">
            <IoSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-10 bg-[#F4F4F5] dark:bg-[#1A1A1A] border border-gray-300 rounded-lg"
              value={filter || ""}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button
            onClick={toggleFilter}
            className=" md:mt-0 bg-[#F4F4F5] dark:bg-[#1A1A1A] px-4 py-2 rounded-lg flex items-center gap-2"
          >
            Filter by <MdArrowDropDown size={20} />
          </button>
          <button className="bg-[#D2145A] text-white px-4 py-2 flex items-center justify-center gap-2 w-full md:w-auto dark:hover:bg-white dark:hover:text-[#D2145A] hover:border-[#D2145A] transition-colors duration-500 rounded-lg">
            Apply Filter
          </button>
        </div>
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div className="mb-4 absolute right-6 z-50 bg-white dark:bg-black px-8 py-12 shadow-md">
          <div className="flex flex-col md:flex-row gap-4 ">
            <select className="p-2 border border-gray-300 rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]">
              <option>User Type</option>
              <option>Donor</option>
              <option>Volunteer</option>
            </select>
            <select className="p-2 border border-gray-300 rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]">
              <option>Date Joined</option>
              <option>Recent</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-[#F4F4F5] dark:bg-[#1A1A1A] p-4 rounded-lg">
        <table className="min-w-full text-sm border-collapse">
          <thead className="hidden md:table-header-group">
            <tr className="border-b-2 border-gray-300 dark:border-black text-gray-600">
              <th className="py-2 px-3">S/N</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Date Joined</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Phone Number</th>
              <th className="py-2 px-3">User Type</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b-2 border-gray-200 dark:border-black block md:table-row"
              >
                <td className="py-2 px-3 md:table-cell flex items-center gap-2">
                  <Image
                    src={user.avatar}
                    width={30}
                    height={30}
                    alt="Avatar"
                    className="rounded-full"
                  />
                  <div className="flex gap-4 md:hidden ">
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-gray-500 text-sm">
                      {user.dateJoined}
                    </span>
                  </div>
                </td>
                <td className="hidden md:table-cell py-2 px-3">{user.name}</td>
                <td className="hidden md:table-cell py-2 px-3">
                  {user.dateJoined}
                </td>
                <td className="hidden md:table-cell py-2 px-3">{user.time}</td>
                <td className="hidden md:table-cell py-2 px-3">{user.email}</td>
                <td className="hidden md:table-cell py-2 px-3">{user.phone}</td>
                <td className="hidden md:table-cell py-2 px-3 text-blue-500">
                  {user.userType}
                </td>
                <td className="hidden md:table-cell py-2 px-3 relative">
                  <button
                    onClick={() => toggleDeleteOption(index)}
                    className="text-red-500"
                  >
                    <HiDotsVertical />
                  </button>
                  {deleteOptionVisible === index && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-black ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            console.log("Delete user:", user.name);
                            toggleDeleteOption(-1);
                          }}
                          className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsersTable;
