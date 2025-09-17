import { ModuleWithLessons } from "@/utils/interfaces";

// Lessons Content Component
interface LessonsContentProps {
  activeModule: string;
  modules: ModuleWithLessons[];
  handleLessonClick: (moduleId: string, lessonId: string) => void;
}

const LessonsContent: React.FC<LessonsContentProps> = ({
  activeModule,
  modules,
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

export default LessonsContent;
