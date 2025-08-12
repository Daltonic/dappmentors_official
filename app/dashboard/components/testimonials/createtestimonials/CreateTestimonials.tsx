"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../shared/Modal";
import { FaCircleCheck } from "react-icons/fa6";
import AllTestimonials from "./AllTestimonials";

interface TestimonialFormData {
  name: string;
  content: string;
  position: string;
  image?: string;
}

export default function CreateTestimonial() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<TestimonialFormData>({ mode: "onChange" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userId = "user_12347";

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    setError(null);

    const testimonialData = {
      ...data,
      userId,
      image: data.image || "",
    };

    console.log("Sending testimonial data to backend:", testimonialData);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });

      const result = await response.json();
      console.log("Backend response:", result);

      if (!response.ok) {
        throw new Error(result.details || "Failed to create testimonial");
      }

      reset();
      setIsModalOpen(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSeeMore = () => setShowAllTestimonials(true);

  const handleModalDone = () => {
    setIsModalOpen(false);
    handleSeeMore();
  };

  if (showAllTestimonials) {
    return <AllTestimonials />;
  }

  return (
    <div className="p-6">
      <div className="p-6 bg-white dark:bg-black rounded-lg mx-auto">
        <button className="mb-4 text-gray-600 dark:text-gray-400">
          ← Create New Testimonial
        </button>
        <form onSubmit={handleSubmit(onSubmit)} className="p-0 sm:p-6">
          <div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Testimony <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("content", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-200"
              placeholder="Testimony details"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                {"User's"} Name <span className="text-[#D2145A]">*</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-200"
                placeholder="Enter User's Name"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                {"User's"} Position/Job{" "}
                <span className="text-[#D2145A]">*</span>
              </label>
              <input
                type="text"
                {...register("position", { required: true })}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-200"
                placeholder="Enter User's Position/Job"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4 p-2 border border-red-300 rounded bg-red-50 dark:bg-red-900/20">
              <p className="font-bold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="mt-4 w-60 p-3 rounded-lg text-white bg-[#D2145A] hover:bg-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "+ Create Testimonial"}
          </button>
        </form>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <FaCircleCheck size={48} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-4">Successful!</h2>
            <p>You have successfully created a testimonial.</p>
            <button
              onClick={handleModalDone}
              className="mt-4 bg-[#D2145A] text-white w-1/2 py-2 rounded-lg hover:bg-pink-500"
            >
              Done
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
