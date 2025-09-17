"use client";

import React, { useState, useEffect } from "react";
import BottomSheet from "@/components/dashboard/purchases/BottomSheet";
import {
  ProductType,
  ModuleWithLessons,
  Product,
  Lesson,
} from "@/utils/interfaces";
import { useRouter } from "next/navigation";
import LessonsContent from "@/components/dashboard/purchases/LessonContent";
import ModulesNavigation from "@/components/dashboard/purchases/ModulesNavigation";

interface ProductInfo extends Product {
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

// Product type specific icons and descriptions
const getProductTypeConfig = (type: ProductType) => {
  const configs = {
    Course: {
      icon: "🎓",
      primaryColor: "from-[#D2145A] to-[#FF4081]",
      bgColor: "from-[#D2145A]/10 to-[#FF4081]/10",
      contentLabel: "Lessons",
      progressLabel: "Course Progress",
    },
    Bootcamp: {
      icon: "🚀",
      primaryColor: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/10 to-pink-500/10",
      contentLabel: "Sessions",
      progressLabel: "Bootcamp Progress",
    },
    Ebook: {
      icon: "📚",
      primaryColor: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-500/10 to-indigo-500/10",
      contentLabel: "Chapters",
      progressLabel: "Reading Progress",
    },
    Codebase: {
      icon: "💻",
      primaryColor: "from-green-500 to-teal-500",
      bgColor: "from-green-500/10 to-teal-500/10",
      contentLabel: "Templates",
      progressLabel: "Implementation Progress",
    },
  };

  return configs[type];
};

// Header Component
interface HeaderProps {
  product: ProductInfo;
  config: ReturnType<typeof getProductTypeConfig>;
  isMobile: boolean;
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  product,
  config,
  isMobile,
  showBottomSheet,
  setShowBottomSheet,
}) => {
  return (
    <div className="relative z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-t-3xl sm:rounded-3xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            {isMobile && (
              <button
                onClick={() => setShowBottomSheet(!showBottomSheet)}
                className="flex-shrink-0 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}

            <div
              className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${config.primaryColor} rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl`}
            >
              {config.icon}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                {product.title}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 truncate">
                {product.instructor.name}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              {config.progressLabel}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {product.completedLessons}/{product.totalLessons}{" "}
              {config.contentLabel.toLowerCase()} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`bg-gradient-to-r ${config.primaryColor} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${product.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
type PageProps = {
  params: Promise<{ id: string }>;
  searchParams:
    | Promise<{ [key: string]: string | string[] | undefined }>
    | undefined;
};

const Page: React.FC<PageProps> = ({ params, searchParams }) => {
  const [product, setProduct] = useState<ProductInfo | null>(null);
  const [activeModule, setActiveModule] = useState<string>("");
  const [modules, setModules] = useState<ModuleWithLessons[]>([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await params;
      const productId = resolvedParams.id;
      const query = searchParams ? await searchParams : {};
      console.log(query);

      try {
        const productRes = await fetch(`/api/products/${productId}`);
        if (!productRes.ok) {
          console.error("Failed to fetch product");
          return;
        }
        const { product: fetchedProduct } = await productRes.json();

        const modulesRes = await fetch(`/api/products/${productId}/modules`);
        if (!modulesRes.ok) {
          console.error("Failed to fetch modules");
          return;
        }
        const { modules: fetchedModules } = await modulesRes.json();

        // Calculate progress fields
        const totalLessons = fetchedModules.reduce(
          (sum: number, m: ModuleWithLessons) => sum + m.lessons.length,
          0,
        );
        const completedLessons = fetchedModules.reduce(
          (sum: number, m: ModuleWithLessons) =>
            sum + m.lessons.filter((l: Lesson) => l.completed).length,
          0,
        );
        const progress =
          totalLessons > 0
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

        setProduct({
          ...fetchedProduct,
          progress,
          completedLessons,
          totalLessons,
        });
        setModules(fetchedModules);
        setActiveModule(fetchedModules[0]?.id || "");
        setShowBottomSheet(false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, [params, searchParams]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const config = getProductTypeConfig(product.type);

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    console.log(`Navigate to lesson: ${lessonId} in module: ${moduleId}`);
    router.push(`/dashboard/purchases/${product.id}/lessons/${lessonId}`);
    if (isMobile) {
      setShowBottomSheet(false);
    }
  };

  const handleModuleClick = () => {
    if (isMobile) {
      setShowBottomSheet(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Header
        product={product}
        config={config}
        isMobile={isMobile}
        showBottomSheet={showBottomSheet}
        setShowBottomSheet={setShowBottomSheet}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-8">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="hidden lg:block pt-8">
              <ModulesNavigation
                productType={product.type}
                activeModule={activeModule}
                setActiveModule={setActiveModule}
                modules={modules}
                config={config}
              />
            </div>
          )}

          {/* Mobile Bottom Sheet */}
          <BottomSheet
            show={showBottomSheet}
            onClose={() => setShowBottomSheet(false)}
          >
            <ModulesNavigation
              productType={product.type}
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              modules={modules}
              config={config}
              isMobile={true}
              onModuleClick={handleModuleClick}
            />
          </BottomSheet>

          {/* Main Content */}
          <div className="lg:pt-8">
            <LessonsContent
              activeModule={activeModule}
              modules={modules}
              handleLessonClick={handleLessonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
