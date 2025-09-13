"use client";

import React, { useState, useEffect, use } from "react";
import BottomSheet from "@/components/dashboard/purchases/BottomSheet";
import { ProductType, ModuleWithLessons } from "@/utils/interfaces";

interface ProductInfo {
  id: string;
  type: ProductType;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  level: string;
  instructor: {
    name: string;
    bio: string;
    avatar: string;
    credentials: string[];
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  technologies: string[];
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

// Sample data for different product types
const sampleProducts: Record<ProductType, ProductInfo> = {
  Course: {
    id: "solidity-course",
    type: "Course",
    title: "Complete Solidity Development",
    subtitle: "Master Smart Contract Development",
    description: "Comprehensive video-based learning experience",
    duration: "40+ hours",
    level: "All Levels",
    instructor: {
      name: "Darlington Gospel",
      bio: "Senior Blockchain Developer",
      avatar: "👨‍💻",
      credentials: ["Blockchain Expert", "Smart Contract Auditor"],
    },
    features: [
      {
        icon: "🎥",
        title: "HD Video Lessons",
        description: "High-quality video content",
      },
      {
        icon: "💻",
        title: "Hands-on Projects",
        description: "Build real applications",
      },
    ],
    technologies: ["Solidity", "Hardhat", "React"],
    progress: 35,
    completedLessons: 14,
    totalLessons: 40,
  },
  Bootcamp: {
    id: "defi-bootcamp",
    type: "Bootcamp",
    title: "DeFi Development Bootcamp",
    subtitle: "Intensive 12-week Program",
    description: "Live interactive sessions with career support",
    duration: "12 weeks",
    level: "Intermediate",
    instructor: {
      name: "Sarah Chen",
      bio: "DeFi Protocol Architect",
      avatar: "👩‍💻",
      credentials: ["Protocol Designer", "Yield Farming Expert"],
    },
    features: [
      {
        icon: "🎯",
        title: "Live Sessions",
        description: "Interactive learning",
      },
      { icon: "🤝", title: "Mentorship", description: "1-on-1 guidance" },
    ],
    technologies: ["Solidity", "Rust", "Web3"],
    progress: 60,
    completedLessons: 18,
    totalLessons: 30,
  },
  EBook: {
    id: "blockchain-guide",
    type: "EBook",
    title: "Blockchain Development Guide",
    subtitle: "Complete Reference Manual",
    description: "Comprehensive written content with examples",
    duration: "300+ pages",
    level: "Beginner",
    instructor: {
      name: "Marcus Johnson",
      bio: "Technical Author & Consultant",
      avatar: "📚",
      credentials: ["Technical Writer", "Blockchain Consultant"],
    },
    features: [
      {
        icon: "📖",
        title: "Detailed Chapters",
        description: "In-depth explanations",
      },
      {
        icon: "💡",
        title: "Code Examples",
        description: "Practical implementations",
      },
    ],
    technologies: ["Solidity", "JavaScript", "Python"],
    progress: 45,
    completedLessons: 9,
    totalLessons: 20,
  },
  Codebase: {
    id: "defi-templates",
    type: "Codebase",
    title: "DeFi Smart Contract Templates",
    subtitle: "Production-Ready Code Library",
    description: "Battle-tested smart contract templates",
    duration: "50+ templates",
    level: "Advanced",
    instructor: {
      name: "Elena Rodriguez",
      bio: "Smart Contract Architect",
      avatar: "⚡",
      credentials: ["Security Auditor", "Protocol Developer"],
    },
    features: [
      {
        icon: "⚡",
        title: "Production Ready",
        description: "Audited contracts",
      },
      {
        icon: "🛡️",
        title: "Security Focused",
        description: "Best practices included",
      },
    ],
    technologies: ["Solidity", "OpenZeppelin", "Hardhat"],
    progress: 25,
    completedLessons: 5,
    totalLessons: 20,
  },
};

// Sample modules with lessons for different product types
const getSampleModules = (productType: ProductType): ModuleWithLessons[] => {
  const baseStructures = {
    Course: [
      {
        id: "mod-1",
        title: "Fundamentals",
        duration: "8 hours",
        lessons: [
          {
            id: "1-1",
            title: "Introduction to Blockchain",
            type: "video" as const,
            duration: "15 min",
            completed: true,
            locked: false,
            description: "Overview of blockchain technology",
          },
          {
            id: "1-2",
            title: "Setting Up Development Environment",
            type: "video" as const,
            duration: "20 min",
            completed: true,
            locked: false,
          },
          {
            id: "1-3",
            title: "Your First Smart Contract",
            type: "code" as const,
            duration: "30 min",
            completed: false,
            locked: false,
          },
          {
            id: "1-4",
            title: "Knowledge Check",
            type: "quiz" as const,
            duration: "10 min",
            completed: false,
            locked: true,
          },
        ],
        description: "Master the basics of blockchain and Solidity",
        completed: false,
        progress: 50,
      },
      {
        id: "mod-2",
        title: "Advanced Concepts",
        duration: "12 hours",
        lessons: [
          {
            id: "2-1",
            title: "Inheritance & Libraries",
            type: "video" as const,
            duration: "25 min",
            completed: false,
            locked: false,
          },
          {
            id: "2-2",
            title: "Security Patterns",
            type: "reading" as const,
            duration: "15 min",
            completed: false,
            locked: false,
          },
          {
            id: "2-3",
            title: "Build a DEX",
            type: "project" as const,
            duration: "2 hours",
            completed: false,
            locked: true,
          },
        ],
        description: "Deep dive into advanced Solidity patterns",
        completed: false,
        progress: 0,
      },
      {
        id: "mod-3",
        title: "Testing & Deployment",
        duration: "10 hours",
        lessons: [
          {
            id: "3-1",
            title: "Writing Tests",
            type: "video" as const,
            duration: "30 min",
            completed: false,
            locked: true,
          },
          {
            id: "3-2",
            title: "Gas Optimization",
            type: "reading" as const,
            duration: "20 min",
            completed: false,
            locked: true,
          },
          {
            id: "3-3",
            title: "Deploy to Mainnet",
            type: "code" as const,
            duration: "45 min",
            completed: false,
            locked: true,
          },
        ],
        description: "Testing strategies and deployment best practices",
        completed: false,
        progress: 0,
      },
    ],
    Bootcamp: [
      {
        id: "week-1",
        title: "Week 1: Foundations",
        duration: "Live Sessions",
        lessons: [
          {
            id: "w1-1",
            title: "Kickoff Session",
            type: "video" as const,
            duration: "2 hours",
            completed: true,
            locked: false,
          },
          {
            id: "w1-2",
            title: "Team Formation",
            type: "project" as const,
            duration: "1 hour",
            completed: true,
            locked: false,
          },
          {
            id: "w1-3",
            title: "Weekly Assignment",
            type: "code" as const,
            duration: "5 hours",
            completed: false,
            locked: false,
          },
        ],
        description: "Introduction and team setup",
        completed: false,
        progress: 66,
      },
      {
        id: "week-2",
        title: "Week 2: Smart Contracts",
        duration: "Live Sessions",
        lessons: [
          {
            id: "w2-1",
            title: "Contract Architecture",
            type: "video" as const,
            duration: "2 hours",
            completed: false,
            locked: false,
          },
          {
            id: "w2-2",
            title: "Security Patterns",
            type: "reading" as const,
            duration: "1 hour",
            completed: false,
            locked: false,
          },
          {
            id: "w2-3",
            title: "Build Your DApp",
            type: "project" as const,
            duration: "8 hours",
            completed: false,
            locked: true,
          },
        ],
        description: "Deep dive into smart contract development",
        completed: false,
        progress: 0,
      },
    ],
    EBook: [
      {
        id: "chapter-1",
        title: "Chapter 1: Getting Started",
        duration: "45 pages",
        lessons: [
          {
            id: "c1-1",
            title: "Introduction",
            type: "reading" as const,
            duration: "10 pages",
            completed: true,
            locked: false,
          },
          {
            id: "c1-2",
            title: "Core Concepts",
            type: "reading" as const,
            duration: "20 pages",
            completed: false,
            locked: false,
          },
          {
            id: "c1-3",
            title: "Practice Exercises",
            type: "code" as const,
            duration: "15 pages",
            completed: false,
            locked: false,
          },
        ],
        description: "Foundation concepts and setup",
        completed: false,
        progress: 33,
      },
      {
        id: "chapter-2",
        title: "Chapter 2: Advanced Topics",
        duration: "60 pages",
        lessons: [
          {
            id: "c2-1",
            title: "Design Patterns",
            type: "reading" as const,
            duration: "25 pages",
            completed: false,
            locked: false,
          },
          {
            id: "c2-2",
            title: "Case Studies",
            type: "reading" as const,
            duration: "35 pages",
            completed: false,
            locked: true,
          },
        ],
        description: "Advanced concepts and real-world examples",
        completed: false,
        progress: 0,
      },
    ],
    Codebase: [
      {
        id: "template-1",
        title: "DeFi Protocols",
        duration: "15 templates",
        lessons: [
          {
            id: "t1-1",
            title: "AMM Template",
            type: "code" as const,
            duration: "Setup",
            completed: true,
            locked: false,
          },
          {
            id: "t1-2",
            title: "Lending Protocol",
            type: "code" as const,
            duration: "Setup",
            completed: false,
            locked: false,
          },
          {
            id: "t1-3",
            title: "Yield Farming",
            type: "code" as const,
            duration: "Setup",
            completed: false,
            locked: true,
          },
        ],
        description: "Core DeFi building blocks",
        completed: false,
        progress: 33,
      },
      {
        id: "template-2",
        title: "NFT & Gaming",
        duration: "10 templates",
        lessons: [
          {
            id: "t2-1",
            title: "ERC-721 Template",
            type: "code" as const,
            duration: "Setup",
            completed: false,
            locked: false,
          },
          {
            id: "t2-2",
            title: "Marketplace Contract",
            type: "code" as const,
            duration: "Setup",
            completed: false,
            locked: true,
          },
        ],
        description: "NFT and gaming contract templates",
        completed: false,
        progress: 0,
      },
    ],
  };

  return baseStructures[productType];
};

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
    EBook: {
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
  selectedProduct: ProductType;
  setSelectedProduct: (type: ProductType) => void;
  product: ProductInfo;
  config: ReturnType<typeof getProductTypeConfig>;
  isMobile: boolean;
  showBottomSheet: boolean;
  setShowBottomSheet: (show: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedProduct,
  setSelectedProduct,
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

          {/* Product Type Switcher - Hidden on mobile, shown as dropdown */}
          {!isMobile && (
            <div className="flex gap-2">
              {(Object.keys(sampleProducts) as ProductType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedProduct(type)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    selectedProduct === type
                      ? `bg-gradient-to-r ${getProductTypeConfig(type).primaryColor} text-white`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {isMobile && (
            <select
              value={selectedProduct}
              onChange={(e) =>
                setSelectedProduct(e.target.value as ProductType)
              }
              className="ml-2 px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg border-none outline-none"
            >
              {(Object.keys(sampleProducts) as ProductType[]).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
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

// Modules Navigation Component
interface ModulesNavigationProps {
  selectedProduct: ProductType;
  activeModule: string;
  setActiveModule: (id: string) => void;
  modules: ModuleWithLessons[];
  config: ReturnType<typeof getProductTypeConfig>;
  isMobile?: boolean;
  onModuleClick?: () => void;
}

const ModulesNavigation: React.FC<ModulesNavigationProps> = ({
  selectedProduct,
  activeModule,
  setActiveModule,
  modules,
  config,
  isMobile = false,
  onModuleClick,
}) => {
  const getSidebarTitle = () => {
    switch (selectedProduct) {
      case "Course":
        return "Course Modules";
      case "Bootcamp":
        return "Weekly Sessions";
      case "EBook":
        return "Chapters";
      case "Codebase":
        return "Template Categories";
      default:
        return "Modules";
    }
  };

  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    if (onModuleClick) onModuleClick();
  };

  return (
    <div className={isMobile ? "pt-4" : "lg:col-span-1"}>
      <div className={isMobile ? "" : "sticky top-8"}>
        {!isMobile && (
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            {getSidebarTitle()}
          </h2>
        )}

        <div className="space-y-3">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => handleModuleClick(module.id)}
              className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                activeModule === module.id
                  ? `bg-gradient-to-r ${config.bgColor} border-2 border-current`
                  : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-gray-200 dark:border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  {module.title}
                </h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                  {module.duration}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">
                {module.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {module.lessons.length} {config.contentLabel.toLowerCase()}
                </span>
                <div className="w-12 sm:w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                  <div
                    className={`bg-gradient-to-r ${config.primaryColor} h-1 rounded-full`}
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Lessons Content Component
interface LessonsContentProps {
  activeModule: string;
  modules: ModuleWithLessons[];
  config: ReturnType<typeof getProductTypeConfig>;
  handleLessonClick: (moduleId: string, lessonId: string) => void;
}

const LessonsContent: React.FC<LessonsContentProps> = ({
  activeModule,
  modules,
  config,
  handleLessonClick,
}) => {
  const currentModule = modules.find((m) => m.id === activeModule);

  if (!currentModule) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No module selected</p>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      video: "🎥",
      reading: "📖",
      code: "💻",
      quiz: "🧩",
      project: "🎯",
    };
    return icons[type as keyof typeof icons] || "📄";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-6 border-2 border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-8 h-8 bg-gradient-to-br ${config.primaryColor} rounded-lg flex items-center justify-center text-white font-bold`}
          >
            {currentModule.id.split("-")[1] || "1"}
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {currentModule.title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {currentModule.description}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {currentModule.lessons.map((lesson) => (
            <button
              key={lesson.id}
              onClick={() => handleLessonClick(currentModule.id, lesson.id)}
              disabled={lesson.locked}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                lesson.locked
                  ? "bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed opacity-50"
                  : lesson.completed
                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30"
                    : "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getTypeIcon(lesson.type)}</span>
                  {lesson.completed && (
                    <span className="text-green-500">✅</span>
                  )}
                  {lesson.locked && <span className="text-gray-400">🔒</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold ${
                      lesson.completed
                        ? "text-green-700 dark:text-green-300"
                        : lesson.locked
                          ? "text-gray-400 dark:text-gray-500"
                          : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {lesson.title}
                  </h3>
                  {lesson.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {lesson.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="capitalize">{lesson.type}</span>
                  <span>•</span>
                  <span>{lesson.duration}</span>
                </div>
              </div>
            </button>
          ))}
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
  // Unwrap params and searchParams using React.use()
  const { id } = use(params);
  const query = searchParams ? use(searchParams) : {};
  console.log(query);

  // Validate and cast id to ProductType
  const validProductTypes: ProductType[] = [
    "Course",
    "Bootcamp",
    "EBook",
    "Codebase",
  ];
  const productType = validProductTypes.includes(id as ProductType)
    ? (id as ProductType)
    : "Course"; // Fallback to 'Course' if invalid

  const [selectedProduct, setSelectedProduct] =
    useState<ProductType>(productType);
  const [activeModule, setActiveModule] = useState<string>("");
  const [modules, setModules] = useState<ModuleWithLessons[]>([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const product = sampleProducts[selectedProduct];
  const config = getProductTypeConfig(selectedProduct);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const newModules = getSampleModules(selectedProduct);
    setModules(newModules);
    setActiveModule(newModules[0]?.id || "");
    setShowBottomSheet(false); // Close bottom sheet when switching products
  }, [selectedProduct]);

  const handleLessonClick = (moduleId: string, lessonId: string) => {
    console.log(`Navigate to lesson: ${lessonId} in module: ${moduleId}`);
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
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
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
                selectedProduct={selectedProduct}
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
              selectedProduct={selectedProduct}
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
              config={config}
              handleLessonClick={handleLessonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
