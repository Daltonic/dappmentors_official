"use client";

import LessonModuleForm from "@/components/dashboard/products/Lesson/LessonModuleForm";
import { ModuleWithLessons } from "@/utils/interfaces";
import { use } from "react";
import { toast } from "react-toastify";

// Example usage component
const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  const handleSubmit = (updatedModules: ModuleWithLessons[]) => {
    console.log("Submitted modules:", updatedModules);
    toast.success("Successfully saved modules");
  };

  const handleSuccess = (savedModules: ModuleWithLessons[]) => {
    console.log("Successfully saved modules:", savedModules);
    // Handle success (redirect, show notification, etc.)
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <LessonModuleForm
          productId={id}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default Page;
