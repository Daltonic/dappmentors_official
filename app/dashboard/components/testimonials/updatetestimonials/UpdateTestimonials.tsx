"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../../shared/Modal";
import { FaCircleCheck } from "react-icons/fa6";
import { useSearchParams, useRouter } from "next/navigation";

interface TestimonialFormData {
  name: string;
  content: string;
  position: string;
  image?: string;
}

export default function UpdateTestimonial() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<TestimonialFormData>({ mode: "onChange" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchTestimonial = async () => {
        try {
          const response = await fetch(`/api/testimonials?slug=${slug}`);
          const data = await response.json();
          if (data.status === 200) {
            setValue("name", data.data.name);
            setValue("content", data.data.content);
            setValue("position", data.data.position);
            setValue("image", data.data.image || "");
          } else {
            setError(data.details || "Failed to fetch testimonial");
          }
        } catch (err) {
          setError(
            `Error fetching testimonial: ${err instanceof Error ? err.message : String(err)}`,
          );
        }
      };
      fetchTestimonial();
    }
  }, [slug, setValue]);

  const onSubmit = async (data: TestimonialFormData) => {
    setError(null);
    const testimonialData = {
      ...data,
      userId: "YOUR_USER_ID", // Replace with actual user ID
    };

    try {
      const response = await fetch(`/api/testimonials?slug=${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testimonialData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.details || "Failed to update testimonial");
      }
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleModalDone = () => {
    setIsModalOpen(false);
    router.push("/dashboard/testimonials");
  };

  return (
    <div className="p-6">
      <div className="p-6 bg-white dark:bg-black rounded-lg mx-auto">
        <button className="mb-4 text-gray-600 dark:text-gray-400">
          ← Update Testimonial
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

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <button
            type="submit"
            disabled={!isValid}
            className="mt-4 w-60 p-3 rounded-lg text-white bg-[#D2145A] hover:bg-pink-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Update Testimonial
          </button>
        </form>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center p-4">
            <div className="flex justify-center mb-4">
              <FaCircleCheck size={48} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold mb-4">Successful!</h2>
            <p>You have successfully updated the testimonial.</p>
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
