"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lesson, ModuleWithLessons, Note, Resource } from "@/utils/interfaces";
import CustomYouTubePlayer from "@/components/dashboard/purchases/CustomYouTubePlayer";
import { useRouter } from "next/navigation";

// NotesComponent
interface NotesComponentProps {
  notes: Note[];
  onAddNote: (content: string, timestamp: number) => void;
  onDeleteNote: (id: string) => void;
  currentTime: number;
}

const NotesComponent: React.FC<NotesComponentProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  currentTime,
}) => {
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim(), currentTime);
      setNewNote("");
      setIsAddingNote(false);
    }
  };

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          My Notes
        </h3>
        <button
          onClick={() => setIsAddingNote(true)}
          className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium hover:scale-105 transition-transform text-sm sm:text-base"
        >
          + Add Note
        </button>
      </div>

      <AnimatePresence>
        {isAddingNote && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500">
                Timestamp: {formatTimestamp(currentTime)}
              </span>
            </div>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write your note here..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-[#D2145A] focus:border-transparent dark:bg-gray-700 dark:text-white"
              rows={3}
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddNote}
                className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium hover:scale-105 transition-transform text-sm sm:text-base"
              >
                Save Note
              </button>
              <button
                onClick={() => {
                  setIsAddingNote(false);
                  setNewNote("");
                }}
                className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <div className="text-4xl mb-2">📝</div>
            <p>No notes yet. Add your first note while watching!</p>
          </div>
        ) : (
          notes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[#D2145A] cursor-pointer hover:underline">
                  {formatTimestamp(note.timestamp)}
                </span>
                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                  🗑️
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {note.content}
              </p>
              <div className="text-xs text-gray-500 mt-2">
                {note.createdAt.toLocaleDateString()}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// ResourcesComponent
interface ResourcesComponentProps {
  resources: Resource[];
}

const ResourcesComponent: React.FC<ResourcesComponentProps> = ({
  resources,
}) => {
  const getResourceIcon = (type: string) => {
    const icons = {
      pdf: "📄",
      code: "💻",
      link: "🔗",
      image: "🖼️",
    };
    return icons[type as keyof typeof icons] || "📎";
  };

  const handleResourceClick = (resource: Resource) => {
    if (resource.downloadable) {
      console.log(`Downloading: ${resource.title}`);
    } else {
      window.open(resource.url, "_blank");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Resources
      </h3>

      {resources.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📚</div>
          <p>No additional resources for this lesson.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {resources.map((resource) => (
            <button
              key={resource.id}
              onClick={() => handleResourceClick(resource)}
              className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getResourceIcon(resource.type)}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-[#D2145A] dark:group-hover:text-[#FF4081] text-sm sm:text-base">
                    {resource.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 capitalize">
                    {resource.type} •{" "}
                    {resource.downloadable ? "Downloadable" : "External Link"}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-[#D2145A] dark:group-hover:text-[#FF4081] text-lg sm:text-xl">
                  {resource.downloadable ? "⬇️" : "↗️"}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// OverviewComponent
interface OverviewComponentProps {
  lesson: Lesson;
}

const OverviewComponent: React.FC<OverviewComponentProps> = ({ lesson }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Lesson Overview
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
        {lesson.description}
      </p>

      <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Type:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
            {lesson.type}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Duration:
          </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {lesson.duration}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Status:
          </span>
          <span
            className={`text-sm font-medium ${
              lesson.completed
                ? "text-green-600 dark:text-green-400"
                : "text-yellow-600 dark:text-yellow-400"
            }`}
          >
            {lesson.completed ? "Completed" : "In Progress"}
          </span>
        </div>
      </div>
    </div>
  );
};

// TranscriptComponent
interface TranscriptComponentProps {
  transcript: string;
}

const TranscriptComponent: React.FC<TranscriptComponentProps> = ({
  transcript,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Transcript
      </h3>
      <div className="max-h-96 overflow-y-auto pr-2">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line">
          {transcript}
        </p>
      </div>
    </div>
  );
};

// LessonHeader Component
interface LessonHeaderProps {
  lesson: Lesson;
  productId: string;
  lessonProgress: number;
  onMarkComplete: () => void;
  isCompleted: boolean;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  productId,
  lessonProgress,
  onMarkComplete,
  isCompleted,
}) => {
  const router = useRouter();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-t-3xl sm:rounded-3xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => router.push(`/dashboard/purchases/${productId}`)}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors sm:hidden"
            >
              ← Back to Course
            </button>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
                {lesson.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Duration: {lesson.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-normal">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Progress:
              </span>
              <div className="w-20 sm:w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${lessonProgress}%` }}
                />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                {lessonProgress}%
              </span>
            </div>

            <button
              onClick={onMarkComplete}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                isCompleted
                  ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                  : "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white hover:scale-105"
              }`}
            >
              {isCompleted ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// LessonNavigation Component
interface LessonNavigationProps {
  currentLesson: Lesson;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({
  currentLesson,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 sm:gap-0">
      <button
        onClick={onPrevious}
        disabled={!hasPrevious}
        className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all w-full sm:w-auto text-sm sm:text-base ${
          hasPrevious
            ? "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-[#D2145A] dark:hover:border-[#FF4081] text-gray-700 dark:text-gray-300"
            : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed justify-center sm:justify-start"
        }`}
      >
        ← Previous Lesson
      </button>

      <div className="flex flex-col items-center justify-center">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">
          {currentLesson.title}
        </p>
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === 0 ? "bg-[#D2145A]" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-medium transition-all w-full sm:w-auto text-sm sm:text-base ${
          hasNext
            ? "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white hover:scale-105"
            : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed justify-center sm:justify-start"
        }`}
      >
        Next Lesson →
      </button>
    </div>
  );
};

// TabNavigation Component
interface TabNavigationProps {
  activeTab: "overview" | "notes" | "resources" | "transcript";
  onTabChange: (tab: "overview" | "notes" | "resources" | "transcript") => void;
  lessonType: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  lessonType,
}) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "resources", label: "Resources", icon: "📚" },
    ...(lessonType === "video"
      ? [{ id: "transcript", label: "Transcript", icon: "📄" }]
      : []),
  ];

  return (
    <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() =>
            onTabChange(
              tab.id as "overview" | "notes" | "resources" | "transcript",
            )
          }
          className={`flex items-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-3 font-medium transition-all flex-shrink-0 text-sm sm:text-base ${
            activeTab === tab.id
              ? "text-[#D2145A] border-b-2 border-[#D2145A]"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <span className="text-sm">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

// LessonSidebar Component
interface LessonSidebarProps {
  activeTab: "overview" | "notes" | "resources" | "transcript";
  onTabChange: (tab: "overview" | "notes" | "resources" | "transcript") => void;
  currentLesson: Lesson;
  notes: Note[];
  onAddNote: (content: string, timestamp: number) => void;
  onDeleteNote: (id: string) => void;
  currentTime: number;
}

const LessonSidebar: React.FC<LessonSidebarProps> = ({
  activeTab,
  onTabChange,
  currentLesson,
  notes,
  onAddNote,
  onDeleteNote,
  currentTime,
}) => {
  return (
    <div className="lg:sticky lg:top-24">
      <TabNavigation
        activeTab={activeTab}
        onTabChange={onTabChange}
        lessonType={currentLesson.type}
      />

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <OverviewComponent lesson={currentLesson} />
            </motion.div>
          )}

          {activeTab === "notes" && (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <NotesComponent
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                currentTime={currentTime}
              />
            </motion.div>
          )}

          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ResourcesComponent resources={currentLesson.resources || []} />
            </motion.div>
          )}

          {activeTab === "transcript" && (
            <motion.div
              key="transcript"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <TranscriptComponent
                transcript={currentLesson.transcript || ""}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Main Page Component
type PageProps = {
  params: Promise<{ id: string; lid: string }>;
};

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{
    id: string;
    lid: string;
  } | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonProgress, setLessonProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "resources" | "transcript"
  >("overview");
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // For navigation - we'll need to fetch the full product to get all lessons
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);

  // Resolve params asynchronously
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolved = await params;
        setResolvedParams(resolved);
      } catch (err) {
        console.error("Error resolving params:", err);
        setError("Invalid parameters");
        setLoading(false);
      }
    };
    resolveParams();
  }, [params]);

  // Fetch lesson data and product data for navigation
  useEffect(() => {
    if (!resolvedParams) return;

    const { id: productId, lid: lessonId } = resolvedParams;

    const fetchData = async () => {
      try {
        setLoading(true);

        // First, fetch the specific lesson
        const lessonRes = await fetch(
          `/api/products/${productId}/lessons/${lessonId}`,
        );
        if (!lessonRes.ok) {
          throw new Error(`Failed to fetch lesson: ${lessonRes.statusText}`);
        }
        const { lesson, notes: fetchedNotes } = await lessonRes.json();
        setCurrentLesson(lesson);

        // Set notes from API response or localStorage fallback
        if (fetchedNotes && fetchedNotes.length > 0) {
          setNotes(fetchedNotes);
        } else {
          // Fallback to localStorage for notes
          const notesKey = `product-${productId}-lesson-${lessonId}-notes`;
          const savedNotes = localStorage.getItem(notesKey);
          setNotes(savedNotes ? JSON.parse(savedNotes) : []);
        }

        // Now fetch the full product to get all lessons for navigation
        try {
          const productRes = await fetch(`/api/products/${productId}`);
          if (productRes.ok) {
            const productData = await productRes.json();
            const allLessonsFromModules: Lesson[] = [];

            if (productData.product && productData.product.modules) {
              productData.product.modules.forEach(
                (module: ModuleWithLessons) => {
                  if (module.lessons) {
                    allLessonsFromModules.push(...module.lessons);
                  }
                },
              );
            }
            setAllLessons(allLessonsFromModules);
          }
        } catch (productError) {
          console.warn(
            "Could not fetch product data for navigation:",
            productError,
          );
          // Navigation will be disabled but lesson viewing still works
        }

        // Load completed status from localStorage as fallback
        const completedKey = `product-${productId}-lesson-${lessonId}-completed`;
        const savedCompleted = localStorage.getItem(completedKey) === "true";
        setIsCompleted(savedCompleted || lesson.completed);
        setLessonProgress(savedCompleted || lesson.completed ? 100 : 0);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching lesson data:", error);
        setError("Failed to load lesson data");
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams]);

  // Sync notes to localStorage
  useEffect(() => {
    if (!resolvedParams || !notes.length) return;

    const { id: productId, lid: lessonId } = resolvedParams;
    const notesKey = `product-${productId}-lesson-${lessonId}-notes`;
    localStorage.setItem(notesKey, JSON.stringify(notes));
  }, [notes, resolvedParams]);

  const currentIndex = useMemo(
    () => allLessons.findIndex((l) => l.id === resolvedParams?.lid),
    [allLessons, resolvedParams],
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allLessons.length - 1;

  const handleAddNote = async (content: string, timestamp: number) => {
    if (!resolvedParams) return;

    const { id: productId, lid: lessonId } = resolvedParams;
    const newNote: Note = {
      id: `note-${Date.now()}`,
      timestamp,
      content,
      createdAt: new Date(),
    };
    setNotes((prev) =>
      [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp),
    );

    // Try to save note to backend
    try {
      const res = await fetch(
        `/api/products/${productId}/lessons/${lessonId}/notes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote),
        },
      );
      if (!res.ok) {
        console.warn("Failed to save note to backend, using localStorage");
      }
    } catch (error) {
      console.warn("Error saving note to backend:", error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!resolvedParams) return;

    const { id: productId, lid: lessonId } = resolvedParams;
    setNotes((prev) => prev.filter((note) => note.id !== id));

    // Try to delete note from backend
    try {
      const res = await fetch(
        `/api/products/${productId}/lessons/${lessonId}/notes/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) {
        console.warn("Failed to delete note from backend");
      }
    } catch (error) {
      console.warn("Error deleting note from backend:", error);
    }
  };

  const markLessonComplete = async () => {
    if (!resolvedParams || isCompleted) return;

    const { id: productId, lid: lessonId } = resolvedParams;
    const completedKey = `product-${productId}-lesson-${lessonId}-completed`;
    localStorage.setItem(completedKey, "true");
    setIsCompleted(true);
    setLessonProgress(100);

    // Try to update backend
    try {
      const res = await fetch(
        `/api/products/${productId}/lessons/${lessonId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: true }),
        },
      );
      if (!res.ok) {
        console.warn("Failed to mark lesson complete in backend");
      }
    } catch (error) {
      console.warn("Error marking lesson complete:", error);
    }
  };

  const onPrevious = () => {
    if (hasPrevious && resolvedParams) {
      router.push(
        `/dashboard/purchases/${resolvedParams.id}/lessons/${allLessons[currentIndex - 1].id}`,
      );
    }
  };

  const onNext = () => {
    if (hasNext && resolvedParams) {
      router.push(
        `/dashboard/purchases/${resolvedParams.id}/lessons/${allLessons[currentIndex + 1].id}`,
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2145A] mx-auto mb-4"></div>
          <p>Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg font-medium mb-2">Error Loading Lesson</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {error}
          </p>
          <button
            onClick={() => router.back()}
            className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!currentLesson || !resolvedParams) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D2145A] mx-auto mb-4"></div>
          <p>Loading lesson data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <LessonHeader
        lesson={currentLesson}
        productId={resolvedParams.id}
        lessonProgress={lessonProgress}
        onMarkComplete={markLessonComplete}
        isCompleted={isCompleted}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {currentLesson.type === "video" ? (
              <CustomYouTubePlayer
                videoUrl={currentLesson.videoUrl || ""}
                width="100%"
                height="400px"
              />
            ) : (
              <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold mb-4">Lesson Content</h2>
                <div className="prose dark:prose-invert">
                  {currentLesson.content || "No content available."}
                </div>
              </div>
            )}

            {/* Only show navigation if we have lesson data */}
            {allLessons.length > 0 && (
              <LessonNavigation
                currentLesson={currentLesson}
                onPrevious={onPrevious}
                onNext={onNext}
                hasPrevious={hasPrevious}
                hasNext={hasNext}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <LessonSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              currentLesson={currentLesson}
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
              currentTime={currentTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
