"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { IoTrashSharp } from "react-icons/io5";
import Modal from "../../shared/Modal";
import { FaCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { BlogFormData } from "@/utils/interfaces";

export default function UpdateBlog() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<BlogFormData>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const route = useRouter();

  // Handle main image upload
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "gallery",
  ) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      if (type === "image") {
        setImagePreview(imageUrl);
      } else {
        setGalleryPreviews((prev) => [...prev, imageUrl]);
      }
    }
  };

  // Delete gallery image
  const handleDeleteImage = (index: number) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Delete main image
  const handleDeleteMainImage = () => {
    setImagePreview(null);
  };

  // Handle form submission
  const onSubmit = (data: Omit<BlogFormData, "image" | "gallery">) => {
    if (!imagePreview) return;

    const eventsData = {
      ...data,
      image: imagePreview,
      gallery: galleryPreviews,
    };

    console.log("events Created:", eventsData);

    // Show success modal
    setIsModalOpen(true);

    // Reset the form
    reset();
    setImagePreview(null);
    setGalleryPreviews([]);
  };

  // Handle Done button in the modal
  const handleModalDone = () => {
    setIsModalOpen(false);
    route.push("/dashboard/blogs");
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button className="text-gray-600 dark:text-gray-400 flex items-center">
          Update Blog Post
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-black p-6 rounded-lg shadow-md"
      >
        {/* Image Upload */}
        <div>
          <label className="block mb-2 dark:text-gray-600">
            Upload Image <span className="text-[#D2145A]">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 h-[200px] sm:h-[250px] relative">
              <div className="border border-dashed border-gray-300 dark:border-[#D2145A] rounded-lg h-full w-full flex items-center justify-center">
                <label className="flex flex-col items-center justify-center cursor-pointer p-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, "image")}
                  />
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Click to upload</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Image Preview */}
            <div className="w-full sm:w-1/2 h-[200px] sm:h-[250px] relative">
              {imagePreview && (
                <div className="relative h-full w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="rounded-lg object-cover"
                    priority
                  />
                  <button
                    onClick={handleDeleteMainImage}
                    className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                  >
                    <IoTrashSharp />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title and Target Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Enter Title <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="Enter Blog Post title"
            />
          </div>

          <div>
            <label className="block mb-2 dark:text-gray-600">
              Target Amount
            </label>
            <input
              type="number"
              {...register("targetAmount", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="$ Enter target amount"
            />
          </div>
        </div>

        {/* About Project and Stories of Impact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Details <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("storiesImpact", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
              placeholder="Blog details"
            />
          </div>

          <div>
            <label className="block mb-2 dark:text-gray-600">
              Stories of Impact <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("storiesImpact", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
              placeholder="Stories of impact"
            />
          </div>
        </div>

        {/* Conclusion */}
        <div>
          <label className="block mb-2 dark:text-gray-600">
            Conclusion <span className="text-[#D2145A]">*</span>
          </label>
          <textarea
            {...register("conclusion", { required: true })}
            className="w-full sm:w-1/2 px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
            placeholder="Conclusion"
          />
        </div>

        {/* Project Gallery */}
        <div>
          <label className="block mb-2 dark:text-gray-600">
            Blog Post Gallery <span className="text-[#D2145A]">*</span>
          </label>
          <div className="border w-full sm:w-1/2 border-dashed border-gray-300 dark:border-[#D2145A] rounded-lg p-12 sm:p-14">
            <label className="flex flex-col items-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e, "gallery")}
              />
              <p className="text-sm text-gray-500">Click to upload</p>
            </label>
          </div>
          {galleryPreviews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {galleryPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Gallery ${index + 1}`}
                    width={255}
                    height={155}
                    className="rounded-lg object-cover w-full h-24"
                  />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 mr-2 mt-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    <IoTrashSharp />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || !imagePreview}
          className="w-full bg-[#D2145A] text-white py-3 rounded-lg hover:bg-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Update Blog Post
        </button>
      </form>

      {/* Success Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center p-4">
          <div className="flex justify-center mb-4">
            <FaCircleCheck size={48} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold mb-4">Successful!</h2>
          <p>You have successfully created a blog post.</p>
          <button
            onClick={handleModalDone}
            className="mt-4 bg-[#D2145A] text-white w-1/2 py-2 rounded-lg hover:bg-pink-500"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
}
