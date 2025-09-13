"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lesson, Resource } from "@/utils/interfaces";

interface Note {
  id: string;
  timestamp: number;
  content: string;
  createdAt: Date;
}

interface ModuleLesson {
  id: string;
  title: string;
  lessons: Lesson[];
}

// Sample data
const sampleLesson: Lesson = {
  id: "lesson-1",
  title: "Introduction to Smart Contract Security",
  description:
    "Learn the fundamental principles of smart contract security, common vulnerabilities, and best practices for writing secure code.",
  type: "video",
  duration: "25:30",
  videoUrl: "https://sample-video.mp4", // In real app, this would be actual video
  completed: false,
  locked: false,
  resources: [
    {
      id: "res-1",
      title: "Security Checklist.pdf",
      type: "pdf",
      url: "/security-checklist.pdf",
      downloadable: true,
    },
    {
      id: "res-2",
      title: "Vulnerable Contract Example",
      type: "code",
      url: "/vulnerable-contract.sol",
      downloadable: true,
    },
    {
      id: "res-3",
      title: "OpenZeppelin Security Guide",
      type: "link",
      url: "https://docs.openzeppelin.com/contracts/4.x/security",
      downloadable: false,
    },
  ],
  transcript: `Welcome to this lesson on smart contract security. In this comprehensive guide, we'll explore the fundamental principles that every blockchain developer must understand to build secure, robust applications.

Security in smart contracts isn't just about preventing financial losses – it's about maintaining trust in the entire ecosystem. When we deploy a contract to the blockchain, it becomes immutable, which means any vulnerabilities we introduce cannot be easily fixed.

Today, we'll cover the most common vulnerability patterns, including reentrancy attacks, integer overflow, and access control issues. We'll also discuss best practices and security frameworks that can help protect your contracts.

Let's start with the basics of what makes smart contracts vulnerable...`,
};

const moduleStructure: ModuleLesson[] = [
  {
    id: "module-1",
    title: "Smart Contract Fundamentals",
    lessons: [
      {
        ...sampleLesson,
        id: "1-1",
        title: "Introduction to Smart Contracts",
        completed: true,
      },
      {
        ...sampleLesson,
        id: "1-2",
        title: "Development Environment Setup",
        completed: true,
      },
      {
        ...sampleLesson,
        id: "1-3",
        title: "Your First Contract",
        completed: false,
      },
      { ...sampleLesson, id: "1-4", title: "Testing Basics", completed: false },
    ],
  },
  {
    id: "module-2",
    title: "Advanced Security Patterns",
    lessons: [
      {
        ...sampleLesson,
        id: "2-1",
        title: "Reentrancy Prevention",
        completed: false,
      },
      { ...sampleLesson, id: "2-2", title: "Access Control", completed: false },
    ],
  },
];

// VideoPlayer Component
interface VideoPlayerProps {
  videoUrl?: string;
  onTimeUpdate?: (time: number) => void;
  onProgressUpdate?: (progress: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onTimeUpdate,
  onProgressUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);

      const progress = (time / duration) * 100;
      onProgressUpdate?.(progress);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="relative bg-black rounded-2xl overflow-hidden group">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full aspect-video"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        poster="/video-placeholder.jpg"
      >
        {/* In a real app, you'd have actual video sources */}
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Placeholder for demo - shows a play button overlay */}
      {!videoUrl && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="text-center">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-gradient-to-r from-[#D2145A] to-[#FF4081] rounded-full flex items-center justify-center text-white text-2xl mb-4 hover:scale-110 transition-transform"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <p className="text-white text-lg">Video Player</p>
            <p className="text-gray-400 text-sm">
              Demo Mode - Click to simulate playback
            </p>
          </div>
        </div>
      )}

      {/* Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div className="mb-2 sm:mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #D2145A 0%, #D2145A ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`,
            }}
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#FF4081] transition-colors text-lg sm:text-xl"
            >
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button
              onClick={() => skipTime(-10)}
              className="text-white hover:text-[#FF4081] transition-colors text-lg sm:text-xl"
            >
              ⏪
            </button>
            <button
              onClick={() => skipTime(10)}
              className="text-white hover:text-[#FF4081] transition-colors text-lg sm:text-xl"
            >
              ⏩
            </button>
            <div className="text-white text-xs sm:text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
            {/* Playback Speed */}
            <select
              value={playbackRate}
              onChange={(e) => {
                const rate = parseFloat(e.target.value);
                setPlaybackRate(rate);
                if (videoRef.current) {
                  videoRef.current.playbackRate = rate;
                }
              }}
              className="bg-black/50 text-white text-xs sm:text-sm rounded px-2 py-1 border-none outline-none"
            >
              <option value="0.5">0.5x</option>
              <option value="0.75">0.75x</option>
              <option value="1">1x</option>
              <option value="1.25">1.25x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2x</option>
            </select>

            {/* Volume Control */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => {
                  const newVolume = volume === 0 ? 1 : 0;
                  setVolume(newVolume);
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume;
                  }
                }}
                className="text-white hover:text-[#FF4081] transition-colors text-lg sm:text-xl"
              >
                {volume === 0 ? "🔇" : "🔊"}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => {
                  const vol = parseFloat(e.target.value);
                  setVolume(vol);
                  if (videoRef.current) {
                    videoRef.current.volume = vol;
                  }
                }}
                className="w-16 sm:w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.requestFullscreen();
                }
              }}
              className="text-white hover:text-[#FF4081] transition-colors text-lg sm:text-xl"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

      {/* Add Note Form */}
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

      {/* Notes List */}
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
      // In a real app, this would trigger a download
      console.log(`Downloading: ${resource.title}`);
    } else {
      // Open external link
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
  lessonProgress: number;
  onMarkComplete: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({
  lesson,
  lessonProgress,
  onMarkComplete,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-t-3xl sm:rounded-3xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors sm:hidden">
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
            {/* Progress */}
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

            {/* Mark Complete Button */}
            <button
              onClick={onMarkComplete}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                lesson.completed
                  ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                  : "bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white hover:scale-105"
              }`}
            >
              {lesson.completed ? "✓ Completed" : "Mark Complete"}
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
          Lesson {currentLesson.id}
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
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "notes", label: "Notes", icon: "📝" },
    { id: "resources", label: "Resources", icon: "📚" },
    { id: "transcript", label: "Transcript", icon: "📄" },
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
      <TabNavigation activeTab={activeTab} onTabChange={onTabChange} />

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
const Page: React.FC = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson>(sampleLesson);
  const [activeTab, setActiveTab] = useState<
    "overview" | "notes" | "resources" | "transcript"
  >("overview");
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "note-1",
      timestamp: 180,
      content:
        "Important: Always use the latest version of OpenZeppelin contracts for security updates.",
      createdAt: new Date("2025-01-10"),
    },
    {
      id: "note-2",
      timestamp: 350,
      content:
        "The reentrancy guard pattern is essential for protecting against one of the most common attack vectors.",
      createdAt: new Date("2025-01-10"),
    },
  ]);
  const [currentTime, setCurrentTime] = useState(0);
  const [lessonProgress, setLessonProgress] = useState(35);

  const handleAddNote = (content: string, timestamp: number) => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      timestamp,
      content,
      createdAt: new Date(),
    };
    setNotes((prev) =>
      [...prev, newNote].sort((a, b) => a.timestamp - b.timestamp),
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const getNextLesson = () => {
    for (const mod of moduleStructure) {
      const currentIndex = mod.lessons.findIndex(
        (l) => l.id === currentLesson.id,
      );
      if (currentIndex !== -1 && currentIndex < mod.lessons.length - 1) {
        return mod.lessons[currentIndex + 1];
      }
    }
    return null;
  };

  const getPreviousLesson = () => {
    for (const mod of moduleStructure) {
      const currentIndex = mod.lessons.findIndex(
        (l) => l.id === currentLesson.id,
      );
      if (currentIndex > 0) {
        return mod.lessons[currentIndex - 1];
      }
    }
    return null;
  };

  const markLessonComplete = () => {
    setCurrentLesson((prev) => ({ ...prev, completed: true }));
    console.log(`Marked lesson ${currentLesson.id} as complete`);
  };

  const nextLesson = getNextLesson();
  const previousLesson = getPreviousLesson();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <LessonHeader
        lesson={currentLesson}
        lessonProgress={lessonProgress}
        onMarkComplete={markLessonComplete}
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer
              videoUrl={currentLesson.videoUrl}
              onTimeUpdate={setCurrentTime}
              onProgressUpdate={setLessonProgress}
            />

            <LessonNavigation
              currentLesson={currentLesson}
              onPrevious={() =>
                previousLesson && setCurrentLesson(previousLesson)
              }
              onNext={() => nextLesson && setCurrentLesson(nextLesson)}
              hasPrevious={!!previousLesson}
              hasNext={!!nextLesson}
            />
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
