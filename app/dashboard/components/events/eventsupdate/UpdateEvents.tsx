"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { FaCircleCheck } from "react-icons/fa6";
import Modal from "../../shared/Modal";
import { useSearchParams, useRouter } from "next/navigation";

interface EventFormData {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  targetAmount: number;
  aboutEvent: string;
  storiesImpact: string;
  conclusion: string;
  gallery?: string;
}

export default function UpdateEvents() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm<EventFormData>({ mode: "onChange" });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`/api/events?slug=${slug}`);
          const data = await response.json();
          if (data.status === 200) {
            setValue("title", data.data.title);
            setValue("description", data.data.description);
            setValue(
              "date",
              new Date(data.data.date).toISOString().slice(0, 10),
            );
            setValue("location", data.data.location);
            setValue("image", data.data.image);
            setValue("targetAmount", data.data.targetAmount);
            setValue("aboutEvent", data.data.aboutEvent);
            setValue("storiesImpact", data.data.storiesImpact);
            setValue("conclusion", data.data.conclusion);
            setValue(
              "gallery",
              data.data.gallery ? data.data.gallery.join("\n") : "",
            );
            setImagePreview(data.data.image);
          } else {
            console.error(data.details);
          }
        } catch (error) {
          console.error("Error fetching event:", error);
        }
      };
      fetchEvent();
    }
  }, [slug, setValue]);

  const onSubmit = async (data: EventFormData) => {
    setError(null);
    const galleryUrls = data.gallery
      ? data.gallery
          .split("\n")
          .map((url: string) => url.trim())
          .filter((url: string) => url)
      : [];

    const eventData = {
      ...data,
      date: new Date(data.date).toISOString(),
      targetAmount: Number(data.targetAmount),
      gallery: galleryUrls,
    };

    try {
      const response = await fetch(`/api/events?slug=${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.details || "Failed to update event");
      }
      setIsModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleModalDone = () => {
    setIsModalOpen(false);
    router.push("/dashboard/events");
  };

  return (
    <div className="max-w-full mx-auto p-4 sm:p-6 dark:bg-[#121212]">
      <div className="flex items-center mb-6">
        <button className="text-gray-600 dark:text-gray-400 flex items-center">
          ← Update Events
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white dark:bg-black p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block mb-2 dark:text-gray-600">Image URL</label>
          <input
            type="url"
            {...register("image")}
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
              Event Title <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="Enter event title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Target Amount <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="number"
              {...register("targetAmount", {
                required: "Target amount is required",
              })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="$ Enter target amount"
            />
            {errors.targetAmount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.targetAmount.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Date <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Location <span className="text-[#D2145A]">*</span>
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg dark:text-gray-200"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Description <span className="text-[#D2145A]">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
            placeholder="Event details"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 dark:text-gray-600">
              About the Event <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("aboutEvent", {
                required: "About event is required",
              })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
              placeholder="Event details"
            />
            {errors.aboutEvent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.aboutEvent.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 dark:text-gray-600">
              Stories of Impact <span className="text-[#D2145A]">*</span>
            </label>
            <textarea
              {...register("storiesImpact", {
                required: "Stories of impact is required",
              })}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
              placeholder="Stories of impact"
            />
            {errors.storiesImpact && (
              <p className="text-red-500 text-sm mt-1">
                {errors.storiesImpact.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Conclusion <span className="text-[#D2145A]">*</span>
          </label>
          <textarea
            {...register("conclusion", { required: "Conclusion is required" })}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-[#1A1A1A] rounded-lg h-32 dark:text-gray-200"
            placeholder="Conclusion"
          />
          {errors.conclusion && (
            <p className="text-red-500 text-sm mt-1">
              {errors.conclusion.message}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 dark:text-gray-600">
            Gallery URLs (one per line)
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
          Update Event
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center p-4">
          <div className="flex justify-center mb-4">
            <FaCircleCheck size={48} className="text-green-500" />
          </div>
          <h2 className="text-xl font-bold mb-4">Successful!</h2>
          <p>You have successfully updated the event.</p>
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
