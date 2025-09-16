"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBook,
  FiPlus,
  FiSave,
  FiEdit3,
  FiTrash2,
  FiVideo,
  FiFileText,
  FiCode,
  FiHelpCircle,
  FiFolder,
  FiClock,
  FiPlay,
  FiLock,
  FiDownload,
  FiLink,
  FiImage,
} from "react-icons/fi";
import { LuGripVertical } from "react-icons/lu";
import {
  HiArrowLongDown,
  HiArrowLongUp,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import { Lesson, ModuleWithLessons, Resource } from "@/utils/interfaces";
import { modulesApiService } from "@/services/modulesApiService";

interface LessonModuleFormProps {
  productId: string;
  modules?: ModuleWithLessons[];
  onSubmit?: (modules: ModuleWithLessons[]) => void;
  onSuccess?: (modules: ModuleWithLessons[]) => void;
  onCancel?: () => void;
  className?: string;
}

interface FormErrors {
  modules?: string;
  lessons?: string;
  submit?: string;
}

const Header: React.FC = () => (
  <div className="p-8 border-b border-gray-200/50 dark:border-gray-700/50">
    <div className="flex items-center gap-3">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
        <FiBook className="w-5 h-5" />
      </div>
      <div>
        <h2 className="text-2xl font-cambo font-normal text-gray-900 dark:text-white">
          Product Content Management
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Create and organize modules and lessons for your course
        </p>
      </div>
    </div>
  </div>
);

interface AddModuleFormProps {
  newModuleTitle: string;
  setNewModuleTitle: (value: string) => void;
  newModuleDescription: string;
  setNewModuleDescription: (value: string) => void;
  newModuleDuration: string;
  setNewModuleDuration: (value: string) => void;
  addModule: () => void;
}

const AddModuleForm: React.FC<AddModuleFormProps> = ({
  newModuleTitle,
  setNewModuleTitle,
  newModuleDescription,
  setNewModuleDescription,
  newModuleDuration,
  setNewModuleDuration,
  addModule,
}) => (
  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
      <FiPlus className="w-5 h-5 text-[#D2145A]" />
      Add New Module
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <input
        type="text"
        value={newModuleTitle}
        onChange={(e) => setNewModuleTitle(e.target.value)}
        placeholder="Module title"
        className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
      />
      <input
        type="text"
        value={newModuleDuration}
        onChange={(e) => setNewModuleDuration(e.target.value)}
        placeholder="Duration (e.g., 2 hours)"
        className="px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
      />
      <button
        type="button"
        onClick={addModule}
        disabled={
          !newModuleTitle.trim() ||
          !newModuleDescription.trim() ||
          !newModuleDuration.trim()
        }
        className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-4 py-3 rounded-xl font-medium hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiPlus className="w-4 h-4 inline mr-2" />
        Add Module
      </button>
    </div>

    <textarea
      value={newModuleDescription}
      onChange={(e) => setNewModuleDescription(e.target.value)}
      placeholder="Module description"
      rows={2}
      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none"
    />
  </div>
);

interface ModulesListHeaderProps {
  modulesLength: number;
  errors: FormErrors;
}

const ModulesListHeader: React.FC<ModulesListHeaderProps> = ({
  modulesLength,
  errors,
}) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <FiFolder className="w-5 h-5 text-[#D2145A]" />
        Modules ({modulesLength})
      </h3>
    </div>

    {errors.modules && (
      <p className="text-red-600 dark:text-red-400 text-sm">{errors.modules}</p>
    )}

    {errors.lessons && (
      <p className="text-red-600 dark:text-red-400 text-sm">{errors.lessons}</p>
    )}
  </div>
);

const NoModulesMessage: React.FC = () => (
  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
    <FiFolder className="w-12 h-12 mx-auto mb-4 opacity-50" />
    <p>No modules created yet. Add your first module above.</p>
  </div>
);

interface ModuleHeaderProps {
  module: ModuleWithLessons;
  moduleIndex: number;
  editingModule: string | null;
  setEditingModule: (id: string | null) => void;
  updateModule: (moduleId: string, updates: Partial<ModuleWithLessons>) => void;
  moveModule: (moduleId: string, direction: "up" | "down") => void;
  modulesLength: number;
  toggleModuleExpansion: (moduleId: string) => void;
  expandedModules: Set<string>;
  deleteModule: (moduleId: string) => void;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({
  module,
  moduleIndex,
  editingModule,
  setEditingModule,
  updateModule,
  moveModule,
  modulesLength,
  toggleModuleExpansion,
  expandedModules,
  deleteModule,
}) => (
  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <LuGripVertical className="text-gray-400 cursor-move" />
          <span className="text-sm font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Module {moduleIndex + 1}
          </span>
        </div>

        {editingModule === module.id ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={module.title}
              onChange={(e) =>
                updateModule(module.id, { title: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
            />
            <textarea
              value={module.description}
              onChange={(e) =>
                updateModule(module.id, { description: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none"
            />
            <input
              type="text"
              value={module.duration}
              onChange={(e) =>
                updateModule(module.id, { duration: e.target.value })
              }
              className="w-32 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50"
            />
          </div>
        ) : (
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
              {module.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {module.description}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <FiClock className="w-4 h-4" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <FiPlay className="w-4 h-4" />
                {module.lessons.length} lessons
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {editingModule === module.id ? (
          <button
            type="button"
            onClick={() => setEditingModule(null)}
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <FiSave className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditingModule(module.id)}
            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiEdit3 className="w-4 h-4" />
          </button>
        )}

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveModule(module.id, "up")}
            disabled={moduleIndex === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          >
            <HiArrowLongUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => moveModule(module.id, "down")}
            disabled={moduleIndex === modulesLength - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          >
            <HiArrowLongDown className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => toggleModuleExpansion(module.id)}
          className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          {expandedModules.has(module.id) ? (
            <HiChevronUp className="w-4 h-4" />
          ) : (
            <HiChevronDown className="w-4 h-4" />
          )}
        </button>

        <button
          type="button"
          onClick={() => deleteModule(module.id)}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

interface AddLessonFormProps {
  newLessonTitle: string;
  setNewLessonTitle: (value: string) => void;
  newLessonType: Lesson["type"];
  setNewLessonType: (value: Lesson["type"]) => void;
  newLessonDuration: string;
  setNewLessonDuration: (value: string) => void;
  newLessonDescription: string;
  setNewLessonDescription: (value: string) => void;
  newLessonVideoUrl: string;
  setNewLessonVideoUrl: (value: string) => void;
  newLessonContent: string;
  setNewLessonContent: (value: string) => void;
  newLessonLocked: boolean;
  setNewLessonLocked: (value: boolean) => void;
  addLessonToModule: (moduleId: string) => void;
  moduleId: string;
}

const AddLessonForm: React.FC<AddLessonFormProps> = ({
  newLessonTitle,
  setNewLessonTitle,
  newLessonType,
  setNewLessonType,
  newLessonDuration,
  setNewLessonDuration,
  newLessonDescription,
  setNewLessonDescription,
  newLessonVideoUrl,
  setNewLessonVideoUrl,
  newLessonContent,
  setNewLessonContent,
  newLessonLocked,
  setNewLessonLocked,
  addLessonToModule,
  moduleId,
}) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
      Add New Lesson
    </h5>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
      <input
        type="text"
        value={newLessonTitle}
        onChange={(e) => setNewLessonTitle(e.target.value)}
        placeholder="Lesson title"
        className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
      />

      <select
        value={newLessonType}
        onChange={(e) => setNewLessonType(e.target.value as Lesson["type"])}
        className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
      >
        <option value="video">Video</option>
        <option value="reading">Reading</option>
        <option value="code">Code</option>
        <option value="quiz">Quiz</option>
        <option value="project">Project</option>
      </select>

      <input
        type="text"
        value={newLessonDuration}
        onChange={(e) => setNewLessonDuration(e.target.value)}
        placeholder="Duration"
        className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
      />

      <button
        type="button"
        onClick={() => addLessonToModule(moduleId)}
        disabled={!newLessonTitle.trim() || !newLessonDuration.trim()}
        className="bg-[#D2145A] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        <FiPlus className="w-4 h-4 inline mr-1" />
        Add
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
      <textarea
        value={newLessonDescription}
        onChange={(e) => setNewLessonDescription(e.target.value)}
        placeholder="Lesson description"
        rows={2}
        className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none text-sm"
      />

      {newLessonType === "video" && (
        <input
          type="url"
          value={newLessonVideoUrl}
          onChange={(e) => setNewLessonVideoUrl(e.target.value)}
          placeholder="Video URL"
          className="px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
        />
      )}
    </div>

    {(newLessonType === "reading" || newLessonType === "code") && (
      <textarea
        value={newLessonContent}
        onChange={(e) => setNewLessonContent(e.target.value)}
        placeholder="Lesson content"
        rows={3}
        className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none text-sm"
      />
    )}

    <div className="flex items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
        <input
          type="checkbox"
          checked={newLessonLocked}
          onChange={(e) => setNewLessonLocked(e.target.checked)}
          className="rounded border-gray-300 text-[#D2145A] focus:ring-[#D2145A]"
        />
        Lock lesson
      </label>
    </div>
  </div>
);

interface LessonsListHeaderProps {
  lessonsLength: number;
}

const LessonsListHeader: React.FC<LessonsListHeaderProps> = ({
  lessonsLength,
}) => (
  <h5 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
    <FiPlay className="w-4 h-4" />
    Lessons ({lessonsLength})
  </h5>
);

const NoLessonsMessage: React.FC = () => (
  <div className="text-center py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <FiPlay className="w-8 h-8 mx-auto mb-2 opacity-50" />
    <p className="text-sm">No lessons in this module yet.</p>
  </div>
);

interface LessonDetailsProps {
  lesson: Lesson;
  lessonIndex: number;
  editingLesson: string | null;
  setEditingLesson: (id: string | null) => void;
  updateLesson: (
    moduleId: string,
    lessonId: string,
    updates: Partial<Lesson>,
  ) => void;
  moduleId: string;
  getLessonTypeColor: (type: Lesson["type"]) => string;
  getLessonTypeIcon: (
    type: Lesson["type"],
  ) => React.ComponentType<{ className?: string }>;
  moveLesson: (
    moduleId: string,
    lessonId: string,
    direction: "up" | "down",
  ) => void;
  lessonsLength: number;
  deleteLesson: (moduleId: string, lessonId: string) => void;
}

const LessonDetails: React.FC<LessonDetailsProps> = ({
  lesson,
  lessonIndex,
  editingLesson,
  setEditingLesson,
  updateLesson,
  moduleId,
  getLessonTypeColor,
  getLessonTypeIcon,
  moveLesson,
  lessonsLength,
  deleteLesson,
}) => {
  const Icon = getLessonTypeIcon(lesson.type); // Get the icon component

  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          <LuGripVertical className="text-gray-400 cursor-move text-sm" />
          <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-500 px-2 py-1 rounded">
            {lessonIndex + 1}
          </span>
        </div>

        <div
          className={`p-2 bg-gradient-to-r ${getLessonTypeColor(lesson.type)} rounded-lg text-white`}
        >
          <Icon className="w-4 h-4" />
        </div>

        {editingLesson === lesson.id ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={lesson.title}
              onChange={(e) =>
                updateLesson(moduleId, lesson.id, { title: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <select
                value={lesson.type}
                onChange={(e) =>
                  updateLesson(moduleId, lesson.id, {
                    type: e.target.value as Lesson["type"],
                  })
                }
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
              >
                <option value="video">Video</option>
                <option value="reading">Reading</option>
                <option value="code">Code</option>
                <option value="quiz">Quiz</option>
                <option value="project">Project</option>
              </select>
              <input
                type="text"
                value={lesson.duration}
                onChange={(e) =>
                  updateLesson(moduleId, lesson.id, {
                    duration: e.target.value,
                  })
                }
                className="px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
              />
            </div>
            <textarea
              value={lesson.description || ""}
              onChange={(e) =>
                updateLesson(moduleId, lesson.id, {
                  description: e.target.value,
                })
              }
              placeholder="Description"
              rows={2}
              className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none text-sm"
            />
            {lesson.type === "video" && (
              <input
                type="url"
                value={lesson.videoUrl || ""}
                onChange={(e) =>
                  updateLesson(moduleId, lesson.id, {
                    videoUrl: e.target.value,
                  })
                }
                placeholder="Video URL"
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 text-sm"
              />
            )}
            {(lesson.type === "reading" || lesson.type === "code") && (
              <textarea
                value={lesson.content || ""}
                onChange={(e) =>
                  updateLesson(moduleId, lesson.id, { content: e.target.value })
                }
                placeholder="Content"
                rows={4}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF4081]/50 resize-none text-sm"
              />
            )}
          </div>
        ) : (
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h6 className="font-medium text-gray-900 dark:text-white text-sm">
                {lesson.title}
              </h6>
              {lesson.locked && <FiLock className="w-3 h-3 text-gray-400" />}
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="capitalize">{lesson.type}</span>
              <span className="flex items-center gap-1">
                <FiClock className="w-3 h-3" />
                {lesson.duration}
              </span>
              {lesson.resources && lesson.resources.length > 0 && (
                <span className="flex items-center gap-1">
                  <FiFileText className="w-3 h-3" />
                  {lesson.resources.length} resources
                </span>
              )}
            </div>
            {lesson.description && (
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                {lesson.description}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        {editingLesson === lesson.id ? (
          <button
            type="button"
            onClick={() => setEditingLesson(null)}
            className="p-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
          >
            <FiSave className="w-3 h-3" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditingLesson(lesson.id)}
            className="p-1 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
          >
            <FiEdit3 className="w-3 h-3" />
          </button>
        )}

        <div className="flex items-center">
          <button
            type="button"
            onClick={() => moveLesson(moduleId, lesson.id, "up")}
            disabled={lessonIndex === 0}
            className="p-1 text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          >
            <HiArrowLongUp className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => moveLesson(moduleId, lesson.id, "down")}
            disabled={lessonIndex === lessonsLength - 1}
            className="p-1 text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
          >
            <HiArrowLongDown className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => deleteLesson(moduleId, lesson.id)}
          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
        >
          <FiTrash2 className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

interface AddResourceFormProps {
  newResourceTitle: string;
  setNewResourceTitle: (value: string) => void;
  newResourceType: Resource["type"];
  setNewResourceType: (value: Resource["type"]) => void;
  newResourceUrl: string;
  setNewResourceUrl: (value: string) => void;
  newResourceDownloadable: boolean;
  setNewResourceDownloadable: (value: boolean) => void;
  addResourceToLesson: (moduleId: string, lessonId: string) => void;
  moduleId: string;
  lessonId: string;
}

const AddResourceForm: React.FC<AddResourceFormProps> = ({
  newResourceTitle,
  setNewResourceTitle,
  newResourceType,
  setNewResourceType,
  newResourceUrl,
  setNewResourceUrl,
  newResourceDownloadable,
  setNewResourceDownloadable,
  addResourceToLesson,
  moduleId,
  lessonId,
}) => (
  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
    <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
      Add Resource
    </h6>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
      <input
        type="text"
        value={newResourceTitle}
        onChange={(e) => setNewResourceTitle(e.target.value)}
        placeholder="Resource title"
        className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4081]/50"
      />
      <select
        value={newResourceType}
        onChange={(e) => setNewResourceType(e.target.value as Resource["type"])}
        className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4081]/50"
      >
        <option value="pdf">PDF</option>
        <option value="code">Code</option>
        <option value="link">Link</option>
        <option value="image">Image</option>
      </select>
      <input
        type="url"
        value={newResourceUrl}
        onChange={(e) => setNewResourceUrl(e.target.value)}
        placeholder="URL"
        className="px-2 py-1 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#FF4081]/50"
      />
      <button
        type="button"
        onClick={() => addResourceToLesson(moduleId, lessonId)}
        disabled={!newResourceTitle.trim() || !newResourceUrl.trim()}
        className="bg-[#D2145A] text-white px-2 py-1 rounded text-xs font-medium hover:bg-[#D2145A]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiPlus className="w-3 h-3 inline" />
      </button>
    </div>
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
        <input
          type="checkbox"
          checked={newResourceDownloadable}
          onChange={(e) => setNewResourceDownloadable(e.target.checked)}
          className="rounded border-gray-300 text-[#D2145A] focus:ring-[#D2145A] text-xs"
        />
        Downloadable
      </label>
    </div>
  </div>
);

interface ResourcesListProps {
  resources: Resource[];
  getResourceTypeIcon: (
    type: Resource["type"],
  ) => React.ComponentType<{ className?: string }>;
  deleteResource: (
    moduleId: string,
    lessonId: string,
    resourceId: string,
  ) => void;
  moduleId: string;
  lessonId: string;
}

const ResourcesList: React.FC<ResourcesListProps> = ({
  resources,
  getResourceTypeIcon,
  deleteResource,
  moduleId,
  lessonId,
}) => (
  <div className="space-y-2">
    <h6 className="text-xs font-medium text-gray-700 dark:text-gray-300">
      Resources ({resources.length})
    </h6>
    {resources.map((resource) => {
      const Icon = getResourceTypeIcon(resource.type); // Get the icon component
      return (
        <div
          key={resource.id}
          className="flex items-center justify-between bg-white dark:bg-gray-600 rounded p-2 text-xs"
        >
          <div className="flex items-center gap-2">
            <div className="text-gray-500">
              <Icon className="w-4 h-4" />
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                {resource.title}
              </div>
              <div className="text-gray-500 flex items-center gap-2">
                <span className="capitalize">{resource.type}</span>
                {resource.downloadable && (
                  <span className="flex items-center gap-1">
                    <FiDownload className="w-3 h-3" />
                    Downloadable
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => deleteResource(moduleId, lessonId, resource.id)}
            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          >
            <FiTrash2 className="w-3 h-3" />
          </button>
        </div>
      );
    })}
  </div>
);

interface FormActionsProps {
  onCancel?: () => void;
  isSubmitting: boolean;
  modulesLength: number;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  modulesLength,
}) => (
  <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
    <button
      type="submit"
      disabled={isSubmitting || modulesLength === 0}
      className="flex-1 relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Saving Modules...
          </>
        ) : (
          <>
            <FiSave className="w-4 h-4" />
            Save Product Content
          </>
        )}
      </span>
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </button>

    <button
      type="button"
      onClick={onCancel}
      disabled={isSubmitting}
      className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 disabled:opacity-50"
    >
      Cancel
    </button>
  </div>
);

const LessonModuleForm: React.FC<LessonModuleFormProps> = ({
  productId,
  modules: initialModules = [],
  onSubmit,
  onSuccess,
  onCancel,
  className = "",
}) => {
  const [modules, setModules] = useState<ModuleWithLessons[]>(initialModules);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set(),
  );
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);

  // New module/lesson state
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDescription, setNewModuleDescription] = useState("");
  const [newModuleDuration, setNewModuleDuration] = useState("");

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState<Lesson["type"]>("video");
  const [newLessonDuration, setNewLessonDuration] = useState("");
  const [newLessonDescription, setNewLessonDescription] = useState("");
  const [newLessonVideoUrl, setNewLessonVideoUrl] = useState("");
  const [newLessonContent, setNewLessonContent] = useState("");
  const [newLessonLocked, setNewLessonLocked] = useState(false);

  // Resource management
  const [newResourceTitle, setNewResourceTitle] = useState("");
  const [newResourceType, setNewResourceType] =
    useState<Resource["type"]>("pdf");
  const [newResourceUrl, setNewResourceUrl] = useState("");
  const [newResourceDownloadable, setNewResourceDownloadable] = useState(true);

  useEffect(() => {
    if (initialModules.length > 0) {
      setModules(initialModules);
      setExpandedModules(new Set([initialModules[0].id]));
    }
  }, [initialModules]);

  useEffect(() => {
    if (!productId) {
      setModules([]);
      setExpandedModules(new Set());
      return;
    }

    const fetchModules = async () => {
      try {
        const response = await modulesApiService.getModules(productId);
        if (response.data) {
          const fetchedModules = response.data.modules || [];
          setModules(fetchedModules);
          if (fetchedModules.length > 0) {
            setExpandedModules(new Set([fetchedModules[0].id]));
          }
        } else {
          console.error("Failed to fetch modules:", response.error);
        }
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };
    fetchModules();
  }, [productId]);

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const getLessonTypeIcon = (
    type: Lesson["type"],
  ): React.ComponentType<{ className?: string }> => {
    switch (type) {
      case "video":
        return FiVideo;
      case "reading":
        return FiFileText;
      case "code":
        return FiCode;
      case "quiz":
        return FiHelpCircle;
      case "project":
        return FiFolder;
      default:
        return FiBook;
    }
  };

  const getLessonTypeColor = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return "from-red-500 to-red-600";
      case "reading":
        return "from-blue-500 to-blue-600";
      case "code":
        return "from-green-500 to-green-600";
      case "quiz":
        return "from-purple-500 to-purple-600";
      case "project":
        return "from-orange-500 to-orange-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getResourceTypeIcon = (
    type: Resource["type"],
  ): React.ComponentType<{ className?: string }> => {
    switch (type) {
      case "pdf":
        return FiFileText;
      case "code":
        return FiCode;
      case "link":
        return FiLink;
      case "image":
        return FiImage;
      default:
        return FiFileText;
    }
  };

  const addModule = () => {
    if (
      !newModuleTitle.trim() ||
      !newModuleDescription.trim() ||
      !newModuleDuration.trim()
    ) {
      return;
    }

    const newModule: ModuleWithLessons = {
      id: generateId(),
      title: newModuleTitle.trim(),
      description: newModuleDescription.trim(),
      duration: newModuleDuration.trim(),
      lessons: [],
      completed: false,
      progress: 0,
      order: modules.length,
    };

    setModules((prev) => [...prev, newModule]);
    setExpandedModules((prev) => new Set([...prev, newModule.id]));

    // Clear form
    setNewModuleTitle("");
    setNewModuleDescription("");
    setNewModuleDuration("");
  };

  const updateModule = (
    moduleId: string,
    updates: Partial<ModuleWithLessons>,
  ) => {
    setModules((prev) =>
      prev.map((module) =>
        module.id === moduleId ? { ...module, ...updates } : module,
      ),
    );
  };

  const deleteModule = (moduleId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this module and all its lessons?",
      )
    ) {
      setModules((prev) => prev.filter((module) => module.id !== moduleId));
      setExpandedModules((prev) => {
        const newSet = new Set(prev);
        newSet.delete(moduleId);
        return newSet;
      });
    }
  };

  const addLessonToModule = (moduleId: string) => {
    if (!newLessonTitle.trim() || !newLessonDuration.trim()) {
      return;
    }

    const newLesson: Lesson = {
      id: generateId(),
      title: newLessonTitle.trim(),
      type: newLessonType,
      duration: newLessonDuration.trim(),
      description: newLessonDescription.trim(),
      videoUrl: newLessonVideoUrl.trim() || undefined,
      content: newLessonContent.trim() || undefined,
      completed: false,
      locked: newLessonLocked,
      resources: [],
    };

    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: [
              ...module.lessons,
              { ...newLesson, order: module.lessons.length },
            ],
          };
        }
        return module;
      }),
    );

    // Clear lesson form
    setNewLessonTitle("");
    setNewLessonType("video");
    setNewLessonDuration("");
    setNewLessonDescription("");
    setNewLessonVideoUrl("");
    setNewLessonContent("");
    setNewLessonLocked(false);
  };

  const updateLesson = (
    moduleId: string,
    lessonId: string,
    updates: Partial<Lesson>,
  ) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) =>
              lesson.id === lessonId ? { ...lesson, ...updates } : lesson,
            ),
          };
        }
        return module;
      }),
    );
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setModules((prev) =>
        prev.map((module) => {
          if (module.id === moduleId) {
            return {
              ...module,
              lessons: module.lessons.filter(
                (lesson) => lesson.id !== lessonId,
              ),
            };
          }
          return module;
        }),
      );
    }
  };

  const addResourceToLesson = (moduleId: string, lessonId: string) => {
    if (!newResourceTitle.trim() || !newResourceUrl.trim()) {
      return;
    }

    const newResource: Resource = {
      id: generateId(),
      title: newResourceTitle.trim(),
      type: newResourceType,
      url: newResourceUrl.trim(),
      downloadable: newResourceDownloadable,
    };

    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  resources: [...(lesson.resources || []), newResource],
                };
              }
              return lesson;
            }),
          };
        }
        return module;
      }),
    );

    // Clear resource form
    setNewResourceTitle("");
    setNewResourceType("pdf");
    setNewResourceUrl("");
    setNewResourceDownloadable(true);
  };

  const deleteResource = (
    moduleId: string,
    lessonId: string,
    resourceId: string,
  ) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  resources:
                    lesson.resources?.filter(
                      (resource) => resource.id !== resourceId,
                    ) || [],
                };
              }
              return lesson;
            }),
          };
        }
        return module;
      }),
    );
  };

  const moveModule = (moduleId: string, direction: "up" | "down") => {
    const currentIndex = modules.findIndex((m) => m.id === moduleId);
    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= modules.length) return;

    const newModules = [...modules];
    const temp = newModules[currentIndex];
    newModules[currentIndex] = newModules[newIndex];
    newModules[newIndex] = temp;

    // Update order properties
    newModules.forEach((module, index) => {
      module.order = index;
    });

    setModules(newModules);
  };

  const moveLesson = (
    moduleId: string,
    lessonId: string,
    direction: "up" | "down",
  ) => {
    setModules((prev) =>
      prev.map((module) => {
        if (module.id === moduleId) {
          const lessons = [...module.lessons];
          const currentIndex = lessons.findIndex((l) => l.id === lessonId);
          if (currentIndex === -1) return module;

          const newIndex =
            direction === "up" ? currentIndex - 1 : currentIndex + 1;
          if (newIndex < 0 || newIndex >= lessons.length) return module;

          const temp = lessons[currentIndex];
          lessons[currentIndex] = lessons[newIndex];
          lessons[newIndex] = temp;

          // Update order properties
          lessons.forEach((lesson, index) => {
            lesson.order = index;
          });

          return { ...module, lessons };
        }
        return module;
      }),
    );
  };

  const toggleModuleExpansion = (moduleId: string) => {
    setExpandedModules((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (modules.length === 0) {
      setErrors({ modules: "At least one module is required" });
      return;
    }

    const hasLessons = modules.some((module) => module.lessons.length > 0);
    if (!hasLessons) {
      setErrors({ lessons: "At least one lesson is required" });
      return;
    }

    if (!productId) {
      setErrors({ submit: "Product ID is required" });
      return;
    }

    setIsSubmitting(true);
    try {
      if (onSubmit) {
        onSubmit(modules);
      }

      const response = await modulesApiService.updateModules(productId, {
        modules,
      });

      if (response.data) {
        if (onSuccess) {
          onSuccess(response.data.modules);
        }
      } else {
        setErrors({ submit: response.error || "Failed to save modules" });
      }
    } catch (error) {
      console.error("Error submitting modules:", error);
      setErrors({ submit: "An error occurred while saving the modules" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl ${className}`}
    >
      <Header />

      <form onSubmit={handleSubmit} className="p-8">
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-red-600 dark:text-red-400 text-sm">
              {errors.submit}
            </p>
          </div>
        )}

        <div className="space-y-8">
          <AddModuleForm
            newModuleTitle={newModuleTitle}
            setNewModuleTitle={setNewModuleTitle}
            newModuleDescription={newModuleDescription}
            setNewModuleDescription={setNewModuleDescription}
            newModuleDuration={newModuleDuration}
            setNewModuleDuration={setNewModuleDuration}
            addModule={addModule}
          />

          <ModulesListHeader modulesLength={modules.length} errors={errors} />

          {modules.length === 0 ? (
            <NoModulesMessage />
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {modules.map((module, moduleIndex) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <ModuleHeader
                      module={module}
                      moduleIndex={moduleIndex}
                      editingModule={editingModule}
                      setEditingModule={setEditingModule}
                      updateModule={updateModule}
                      moveModule={moveModule}
                      modulesLength={modules.length}
                      toggleModuleExpansion={toggleModuleExpansion}
                      expandedModules={expandedModules}
                      deleteModule={deleteModule}
                    />

                    <AnimatePresence>
                      {expandedModules.has(module.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="p-6 space-y-6">
                            <AddLessonForm
                              newLessonTitle={newLessonTitle}
                              setNewLessonTitle={setNewLessonTitle}
                              newLessonType={newLessonType}
                              setNewLessonType={setNewLessonType}
                              newLessonDuration={newLessonDuration}
                              setNewLessonDuration={setNewLessonDuration}
                              newLessonDescription={newLessonDescription}
                              setNewLessonDescription={setNewLessonDescription}
                              newLessonVideoUrl={newLessonVideoUrl}
                              setNewLessonVideoUrl={setNewLessonVideoUrl}
                              newLessonContent={newLessonContent}
                              setNewLessonContent={setNewLessonContent}
                              newLessonLocked={newLessonLocked}
                              setNewLessonLocked={setNewLessonLocked}
                              addLessonToModule={addLessonToModule}
                              moduleId={module.id}
                            />

                            <div className="space-y-3">
                              <LessonsListHeader
                                lessonsLength={module.lessons.length}
                              />

                              {module.lessons.length === 0 ? (
                                <NoLessonsMessage />
                              ) : (
                                <div className="space-y-2">
                                  {module.lessons.map((lesson, lessonIndex) => (
                                    <div
                                      key={lesson.id}
                                      className="bg-white dark:bg-gray-600 rounded-lg p-4 border border-gray-200 dark:border-gray-500"
                                    >
                                      <LessonDetails
                                        lesson={lesson}
                                        lessonIndex={lessonIndex}
                                        editingLesson={editingLesson}
                                        setEditingLesson={setEditingLesson}
                                        updateLesson={updateLesson}
                                        moduleId={module.id}
                                        getLessonTypeColor={getLessonTypeColor}
                                        getLessonTypeIcon={getLessonTypeIcon}
                                        moveLesson={moveLesson}
                                        lessonsLength={module.lessons.length}
                                        deleteLesson={deleteLesson}
                                      />

                                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-500">
                                        <div className="space-y-3">
                                          <AddResourceForm
                                            newResourceTitle={newResourceTitle}
                                            setNewResourceTitle={
                                              setNewResourceTitle
                                            }
                                            newResourceType={newResourceType}
                                            setNewResourceType={
                                              setNewResourceType
                                            }
                                            newResourceUrl={newResourceUrl}
                                            setNewResourceUrl={
                                              setNewResourceUrl
                                            }
                                            newResourceDownloadable={
                                              newResourceDownloadable
                                            }
                                            setNewResourceDownloadable={
                                              setNewResourceDownloadable
                                            }
                                            addResourceToLesson={
                                              addResourceToLesson
                                            }
                                            moduleId={module.id}
                                            lessonId={lesson.id}
                                          />

                                          {lesson.resources &&
                                            lesson.resources.length > 0 && (
                                              <ResourcesList
                                                resources={lesson.resources}
                                                getResourceTypeIcon={
                                                  getResourceTypeIcon
                                                }
                                                deleteResource={deleteResource}
                                                moduleId={module.id}
                                                lessonId={lesson.id}
                                              />
                                            )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <FormActions
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          modulesLength={modules.length}
        />
      </form>
    </div>
  );
};

export default LessonModuleForm;
