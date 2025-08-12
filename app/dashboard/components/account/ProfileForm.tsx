"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { HiOutlinePhotograph } from "react-icons/hi";
import { AccountFormData, ProfileFormProps } from "@/utils/interfaces";

export default function ProfileForm({ onSubmit }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<AccountFormData>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  // Handle form submission
  const handleFormSubmit = (data: Omit<AccountFormData, "image">) => {
    const userData = { ...data, image: imagePreview };
    onSubmit(userData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 mt-4">
      {/* Image Upload */}
      <div>
        <label className="block text-gray-700 dark:text-gray-400 mb-2 font-medium">
          Image *
        </label>
        <div className="border-2 border-dashed border-gray-600 rounded-full h-24 w-24 flex items-center justify-center relative bg-[#F4F4F5] dark:bg-[#1A1A1A]">
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
              <HiOutlinePhotograph size={30} className="text-gray-500" />
            )}
          </label>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-400 font-medium">
            Full Name *
          </label>
          <input
            {...register("fullName", { required: true })}
            className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-400 font-medium">
            Email *
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
          <label className="block text-gray-700 dark:text-gray-400 font-medium">
            Phone Number *
          </label>
          <input
            {...register("phoneNumber", { required: true })}
            className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-400 font-medium">
            Country *
          </label>
          <select
            {...register("country", { required: true })}
            className="w-full p-2 border rounded-lg bg-[#F4F4F5] dark:bg-[#1A1A1A]"
          >
            <option value="">Select country</option>
            <option value="Nigeria">Nigeria</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-start">
        <button
          type="submit"
          disabled={!isValid}
          className="bg-[#E91764] text-white py-2 px-6 rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
