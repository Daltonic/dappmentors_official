"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Modal from "../../shared/Modal";
import { FaCircleCheck } from "react-icons/fa6";
import AllBlog from "./AllBlog";
import { BlogFormData } from "@/utils/interfaces";

export default function CreateBlog() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<BlogFormData>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllBlog, setShowAllBlog] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: BlogFormData) => {
    const galleryUrls = data.gallery
      ? data.gallery
          .join("\n")
          .split("\n")
          .map((url) => url.trim())
          .filter((url) => url)
      : [];

    const blogData = {
      ...data,
      targetAmount: data.targetAmount ? Number(data.targetAmount) : undefined,
      gallery: galleryUrls,
      userId: "YOUR_USER_ID", // Replace with actual user ID from auth context
    };

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.details || "Failed to create blog");
      }

      setIsModalOpen(true);
      setError(null);
      reset();
      setImagePreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleSeeMore = () => setShowAllBlog(true);

  const handleModalDone = () => {
    setIsModalOpen(false);
    handleSeeMore();
  };

  if (showAllBlog) {
    return (
      <div className="p-0 md:p-8">
        <AllBlog />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6">
      <div className="flex items-center mb-6">
        <button className="text-gray-600 dark:text-gray-400 flex items-center">
          ← Create New Blog Post
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-black p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block mb-2 dark:text-gray-600">
            Image URL <span className="text-[#D2145A]">*</span>
          </label>
          <input
            type="text"
            {...register("image", { required: true })}
            onChange={(e) => setImagePreview(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
            placeholder="Enter image URL"
          />
          {imagePreview && (
            <div className="mt-4 w-full sm:w-1/2 h-[200px] relative">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="rounded-lg object-cover"
                priority
                unoptimized
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Blog Title <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="Enter blog title"
            />
          </div>
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Target Amount
            </label>
            <input
              type="number"
              {...register("targetAmount")}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="$ Enter target amount"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Author <span className="text-[#D2145A]">*</span>
          </label>
          <input
            type="text"
            {...register("author", { required: true })}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
            placeholder="Enter author name"
          />
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Content <span className="text-[#D2145A]">*</span>
          </label>
          <textarea
            {...register("content", { required: true })}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
            placeholder="Enter blog content"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Conclusion <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("conclusion", { required: true })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
              placeholder="Conclusion"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Blog Gallery URLs (one per line)
          </label>
          <textarea
            {...register("gallery")}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
            placeholder="Enter gallery image URLs, one per line"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-[#D2145A] text-white py-3 rounded-lg hover:bg-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Create Blog Post
        </button>
      </form>

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
