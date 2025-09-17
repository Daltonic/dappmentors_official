import { ModuleWithLessons, ProductType } from "@/utils/interfaces";

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

// Modules Navigation Component
interface ModulesNavigationProps {
  productType: ProductType;
  activeModule: string;
  setActiveModule: (id: string) => void;
  modules: ModuleWithLessons[];
  config: ReturnType<typeof getProductTypeConfig>;
  isMobile?: boolean;
  onModuleClick?: () => void;
}

const ModulesNavigation: React.FC<ModulesNavigationProps> = ({
  productType,
  activeModule,
  setActiveModule,
  modules,
  config,
  isMobile = false,
  onModuleClick,
}) => {
  const getSidebarTitle = () => {
    switch (productType) {
      case "Course":
        return "Course Modules";
      case "Bootcamp":
        return "Weekly Sessions";
      case "Ebook":
        return "Chapters";
      case "Codebase":
        return "Template Categories";
      default:
        return "Modules";
    }
  };

  const handleModuleClick = (moduleId: string) => {
    console.log(getProductTypeConfig);
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

export default ModulesNavigation;
