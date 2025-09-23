import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import {
  FiEdit,
  FiEye,
  FiBold,
  FiItalic,
  FiCode,
  FiLink,
  FiImage,
  FiList,
  FiHash,
  FiYoutube,
  FiAlignLeft,
  FiCheck,
  FiX,
  FiMaximize2,
  FiMinimize2,
} from "react-icons/fi";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  height?: string;
}

interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  action: string;
  shortcut?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your blog content here...",
  error,
  className = "",
  height = "600px",
}) => {
  const [mode, setMode] = useState<"edit" | "preview" | "split">("edit");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showYouTubeModal, setShowYouTubeModal] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toolbarButtons: ToolbarButton[] = [
    { icon: <FiBold />, label: "Bold", action: "bold", shortcut: "Ctrl+B" },
    {
      icon: <FiItalic />,
      label: "Italic",
      action: "italic",
      shortcut: "Ctrl+I",
    },
    { icon: <FiCode />, label: "Code", action: "code", shortcut: "Ctrl+`" },
    { icon: <FiHash />, label: "Heading", action: "heading" },
    { icon: <FaQuoteLeft />, label: "Quote", action: "quote" },
    { icon: <FiList />, label: "List", action: "list" },
    { icon: <FiLink />, label: "Link", action: "link", shortcut: "Ctrl+K" },
    { icon: <FiImage />, label: "Image", action: "image" },
    { icon: <FiYoutube />, label: "YouTube Video", action: "youtube" },
  ];

  const getSelectedText = (): { start: number; end: number; text: string } => {
    const textarea = textareaRef.current;
    if (!textarea) return { start: 0, end: 0, text: "" };

    return {
      start: textarea.selectionStart,
      end: textarea.selectionEnd,
      text: textarea.value.substring(
        textarea.selectionStart,
        textarea.selectionEnd,
      ),
    };
  };

  const insertText = (
    before: string,
    after: string = "",
    placeholder: string = "",
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { start, end, text } = getSelectedText();
    const selectedText = text || placeholder;
    const newText =
      value.substring(0, start) +
      before +
      selectedText +
      after +
      value.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleToolbarAction = (action: string) => {
    switch (action) {
      case "bold":
        insertText("**", "**", "bold text");
        break;
      case "italic":
        insertText("_", "_", "italic text");
        break;
      case "code":
        const { text } = getSelectedText();
        if (text.includes("\n")) {
          insertText("```\n", "\n```", "code block");
        } else {
          insertText("`", "`", "code");
        }
        break;
      case "heading":
        insertText("## ", "", "Heading");
        break;
      case "quote":
        insertText("> ", "", "Quote");
        break;
      case "list":
        insertText("- ", "", "List item");
        break;
      case "link":
        setShowLinkModal(true);
        const { text: linkTextFromSelection } = getSelectedText();
        setLinkText(linkTextFromSelection);
        break;
      case "image":
        setShowImageModal(true);
        break;
      case "youtube":
        setShowYouTubeModal(true);
        break;
    }
  };

  const insertLink = () => {
    if (linkUrl) {
      const linkMarkdown = `[${linkText || "Link text"}](${linkUrl})`;
      const { start, end } = getSelectedText();
      const newText =
        value.substring(0, start) + linkMarkdown + value.substring(end);
      onChange(newText);
    }
    setShowLinkModal(false);
    setLinkText("");
    setLinkUrl("");
  };

  const insertImage = () => {
    if (imageUrl) {
      const imageMarkdown = `![${imageAlt || "Image"}](${imageUrl})`;
      const { start } = getSelectedText();
      const newText =
        value.substring(0, start) + imageMarkdown + value.substring(start);
      onChange(newText);
    }
    setShowImageModal(false);
    setImageAlt("");
    setImageUrl("");
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const insertYouTubeVideo = () => {
    if (youtubeUrl) {
      const videoId = extractYouTubeId(youtubeUrl);
      if (videoId) {
        const embedMarkdown = `\n<div class="youtube-embed">\n<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n</div>\n`;
        const { start } = getSelectedText();
        const newText =
          value.substring(0, start) + embedMarkdown + value.substring(start);
        onChange(newText);
      } else {
        // Invalid YouTube URL
        alert("Please enter a valid YouTube URL");
        return;
      }
    }
    setShowYouTubeModal(false);
    setYoutubeUrl("");
  };

  const renderMarkdown = (markdown: string): string => {
    return (
      markdown
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>',
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>',
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold mt-8 mb-6 text-gray-900 dark:text-white">$1</h1>',
        )

        // Code blocks
        .replace(
          /```(\w+)?\n([\s\S]*?)```/g,
          '<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code class="language-$1">$2</code></pre>',
        )

        // Inline code
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>',
        )

        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')

        // Italic
        .replace(/\_(.*?)\_/g, '<em class="italic">$1</em>')

        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-[#D2145A] hover:text-[#FF4081] underline" target="_blank" rel="noopener noreferrer">$1</a>',
        )

        // YouTube embeds
        .replace(
          /<div class="youtube-embed">\s*<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/([^"]*)"[^>]*><\/iframe>\s*<\/div>/gi,
          '<div class="youtube-embed my-6"><iframe width="100%" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="rounded-lg shadow-lg"></iframe></div>',
        )

        // Images
        .replace(
          /!\[([^\]]*)\]\(([^)]+)\)/g,
          '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />',
        )

        // Lists
        .replace(/^\- (.*$)/gim, '<li class="ml-4">$1</li>')
        .replace(
          /(<li.*<\/li>)/g,
          '<ul class="list-disc list-inside my-4 space-y-1 text-gray-700 dark:text-gray-300">$1</ul>',
        )

        // Blockquotes
        .replace(
          /^> (.*$)/gim,
          '<blockquote class="border-l-4 border-[#D2145A] pl-4 my-4 italic text-gray-600 dark:text-gray-400">$1</blockquote>',
        )

        // Line breaks
        .replace(
          /\n\n/g,
          '</p><p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">',
        )
        .replace(/\n/g, "<br />")

        // Wrap in paragraphs
        .replace(
          /^(.*)$/gim,
          '<p class="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">$1</p>',
        )
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "b":
          e.preventDefault();
          handleToolbarAction("bold");
          break;
        case "i":
          e.preventDefault();
          handleToolbarAction("italic");
          break;
        case "`":
          e.preventDefault();
          handleToolbarAction("code");
          break;
        case "k":
          e.preventDefault();
          handleToolbarAction("link");
          break;
      }
    }
  };

  const containerClass = isFullscreen
    ? "fixed inset-0 z-50 bg-white dark:bg-gray-900 p-4"
    : className;

  const editorHeight = isFullscreen ? "calc(100vh - 140px)" : height;

  return (
    <div
      className={`${containerClass} border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden`}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleToolbarAction(button.action)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              title={`${button.label} ${button.shortcut ? `(${button.shortcut})` : ""}`}
            >
              {button.icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Mode Toggle */}
          <div className="flex bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setMode("edit")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                mode === "edit"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FiEdit className="w-3 h-3 inline mr-1" />
              Edit
            </button>
            <button
              type="button"
              onClick={() => setMode("split")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                mode === "split"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FiAlignLeft className="w-3 h-3 inline mr-1" />
              Split
            </button>
            <button
              type="button"
              onClick={() => setMode("preview")}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                mode === "preview"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <FiEye className="w-3 h-3 inline mr-1" />
              Preview
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <FiMinimize2 className="w-4 h-4" />
            ) : (
              <FiMaximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex" style={{ height: editorHeight }}>
        {/* Edit Mode */}
        {(mode === "edit" || mode === "split") && (
          <div
            className={`${mode === "split" ? "w-1/2 border-r border-gray-200 dark:border-gray-700" : "w-full"}`}
          >
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full h-full p-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none focus:outline-none font-mono text-sm leading-relaxed ${
                error ? "border-red-300 dark:border-red-600" : ""
              }`}
            />
          </div>
        )}

        {/* Preview Mode */}
        {(mode === "preview" || mode === "split") && (
          <div
            className={`${mode === "split" ? "w-1/2" : "w-full"} overflow-y-auto`}
          >
            <div className="p-4 bg-white dark:bg-gray-900">
              {value ? (
                <div
                  className="prose prose-gray dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
                />
              ) : (
                <div className="text-gray-400 dark:text-gray-500 italic">
                  Preview will appear here...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border-t border-red-200 dark:border-red-800">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Link Modal */}
      <AnimatePresence>
        {showLinkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowLinkModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Insert Link
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
                    placeholder="Enter link text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiX className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={insertLink}
                    className="flex-1 px-4 py-2 bg-[#D2145A] text-white rounded-lg hover:bg-[#D2145A]/90 transition-colors"
                  >
                    <FiCheck className="w-4 h-4 inline mr-2" />
                    Insert
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Insert Image
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
                    placeholder="Enter alt text"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
                    placeholder="https://image-url.com/image.jpg"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowImageModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiX className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={insertImage}
                    className="flex-1 px-4 py-2 bg-[#D2145A] text-white rounded-lg hover:bg-[#D2145A]/90 transition-colors"
                  >
                    <FiCheck className="w-4 h-4 inline mr-2" />
                    Insert
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Modal */}
      <AnimatePresence>
        {showYouTubeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowYouTubeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 w-96 max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Embed YouTube Video
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#D2145A] focus:border-transparent"
                    placeholder="https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Supports both youtube.com/watch and youtu.be links
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowYouTubeModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <FiX className="w-4 h-4 inline mr-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={insertYouTubeVideo}
                    className="flex-1 px-4 py-2 bg-[#D2145A] text-white rounded-lg hover:bg-[#D2145A]/90 transition-colors"
                  >
                    <FiCheck className="w-4 h-4 inline mr-2" />
                    Embed Video
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarkdownEditor;
