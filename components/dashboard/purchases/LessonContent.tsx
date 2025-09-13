import { ModuleWithLessons, ProductType } from "@/utils/interfaces";
import { AnimatePresence, motion } from "framer-motion";

// Lesson type icons
const getLessonTypeIcon = (type: string) => {
  const icons = {
    video: "🎥",
    reading: "📖",
    code: "💻",
    quiz: "❓",
    project: "🛠️",
  };
  return icons[type as keyof typeof icons] || "📄";
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
  console.log(getProductTypeConfig);
  return (
    <div className="lg:col-span-2">
      <AnimatePresence mode="wait">
        {modules
          .filter((module) => module.id === activeModule)
          .map((module) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-900 rounded-b-3xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg">
                <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {module.title}
                  </h2>
                  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2 text-sm text-gray-600 dark:text-gray-400 flex-shrink-0">
                    <span>{module.duration}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>
                      {module.lessons.length}{" "}
                      {config.contentLabel.toLowerCase()}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                  {module.description}
                </p>

                <div className="space-y-3 sm:space-y-4">
                  {module.lessons.map((lesson, index) => (
                    <motion.button
                      key={index}
                      onClick={() =>
                        !lesson.locked &&
                        handleLessonClick(module.id, lesson.id)
                      }
                      className={`w-full text-left p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                        lesson.locked
                          ? "bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
                          : lesson.completed
                            ? `bg-gradient-to-r ${config.bgColor} border-2 border-green-200 dark:border-green-800`
                            : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700"
                      }`}
                      disabled={lesson.locked}
                      whileHover={!lesson.locked ? { scale: 1.02 } : {}}
                      whileTap={!lesson.locked ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-xl flex-shrink-0 ${
                            lesson.completed
                              ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                              : lesson.locked
                                ? "bg-gray-200 dark:bg-gray-700 text-gray-400"
                                : `bg-gradient-to-br ${config.primaryColor} text-white`
                          }`}
                        >
                          {lesson.completed
                            ? "✓"
                            : lesson.locked
                              ? "🔒"
                              : getLessonTypeIcon(lesson.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 sm:mb-2 gap-1 sm:gap-2">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-shrink-0">
                              <span className="capitalize">{lesson.type}</span>
                              <span>•</span>
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                          {lesson.description && (
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {lesson.description}
                            </p>
                          )}
                        </div>

                        {!lesson.locked && (
                          <div className="text-gray-400 flex-shrink-0">→</div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default LessonsContent;
