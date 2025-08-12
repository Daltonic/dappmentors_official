"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import { HiOutlinePhotograph } from "react-icons/hi"; // Image upload icon
import Modal from "../../shared/Modal";
import AllUsers from "./allusers/AllUsers";
import { UserFormData } from "@/utils/interfaces";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<UserFormData>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllUsers, setShowAllUsers] = useState(false);

  const handleSeeMore = () => setShowAllUsers(true);

  const handleModalDone = () => {
    setIsModalOpen(false);
    handleSeeMore();
  };

  if (showAllUsers) {
    return <AllUsers />;
  }

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle form submission
  const onSubmit = (data: Omit<UserFormData, "image">) => {
    if (!imagePreview) return;

    const userData = {
      ...data,
      image: imagePreview,
    };

    console.log("User Created:", userData);
    setIsModalOpen(true);
    reset();
    setImagePreview(null);
  };

  return (
    <div className="p-6">
      <div className="dark:bg-black mx-auto p-6 bg-white rounded-lg shadow-md">
        <button className="text-gray-600 mb-4">← Add New User</button>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">
              Image <span className="text-pink-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-full h-28 w-28 flex items-center justify-center relative bg-[#F4F4F5] dark:bg-[#1A1A1A]">
              <label className="cursor-pointer w-full h-full flex items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                {imagePreview ? (
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <HiOutlinePhotograph size={40} className="text-gray-500" /> // Image icon
                )}
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name <span className="text-pink-500">*</span>
              </label>
              <input
                {...register("fullName", { required: true })}
                className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
                placeholder="Enter full name"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                Email <span className="text-pink-500">*</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Phone Number <span className="text-pink-500">*</span>
              </label>
              <input
                {...register("phoneNumber", { required: true })}
                className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">
                User Type <span className="text-pink-500">*</span>
              </label>
              <select
                {...register("userType", { required: true })}
                className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
              >
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={!isValid}
              className="bg-pink-500 text-white py-2 px-6 rounded-lg disabled:bg-gray-300"
            >
              + Create User
            </button>
          </div>
        </form>

        {/* Success Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <FaCircleCheck size={48} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-4">
              User Created Successfully!
            </h2>
            <p>The user has been added to the system.</p>
            <button
              onClick={handleModalDone}
              className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-lg"
            >
              Done
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
