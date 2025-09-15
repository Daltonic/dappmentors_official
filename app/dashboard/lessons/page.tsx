"use client";

import LessonModuleForm from "@/components/dashboard/Lesson/LessonModuleForm";
import { fakeModules } from "@/data/global";
import { ModuleWithLessons } from "@/utils/interfaces";
import { useState } from "react";

// Example usage component
const ExampleUsage: React.FC = () => {
  const [modules, setModules] = useState<ModuleWithLessons[]>(fakeModules);

  const handleSubmit = (updatedModules: ModuleWithLessons[]) => {
    console.log("Submitted modules:", updatedModules);
    setModules(updatedModules);
  };

  const handleSuccess = (savedModules: ModuleWithLessons[]) => {
    console.log("Successfully saved modules:", savedModules);
    // Handle success (redirect, show notification, etc.)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <LessonModuleForm
          productId="sample-product-id"
          modules={modules}
          onSubmit={handleSubmit}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default ExampleUsage;
