"use client";

import Image from "next/image";
import React, { useState } from "react";

interface MarkdownRendererProps {
  content: string;
}

// Code Block Component with Syntax Highlighting
interface CodeBlockProps {
  code: string;
  language: string;
}

// Simple syntax highlighter for common languages
const highlightSyntax = (code: string, language: string): React.ReactNode[] => {
  const lines = code.split("\n");

  const getTokenColor = (token: string, lang: string): string => {
    // Keywords
    const keywords = {
      javascript: [
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "import",
        "export",
        "from",
        "async",
        "await",
        "try",
        "catch",
      ],
      typescript: [
        "const",
        "let",
        "var",
        "function",
        "return",
        "if",
        "else",
        "for",
        "while",
        "class",
        "import",
        "export",
        "from",
        "async",
        "await",
        "try",
        "catch",
        "interface",
        "type",
        "extends",
        "implements",
      ],
      python: [
        "def",
        "class",
        "import",
        "from",
        "return",
        "if",
        "else",
        "elif",
        "for",
        "while",
        "try",
        "except",
        "with",
        "as",
      ],
      java: [
        "public",
        "private",
        "protected",
        "class",
        "interface",
        "extends",
        "implements",
        "return",
        "if",
        "else",
        "for",
        "while",
        "try",
        "catch",
      ],
      rust: [
        "fn",
        "let",
        "mut",
        "struct",
        "enum",
        "impl",
        "trait",
        "return",
        "if",
        "else",
        "for",
        "while",
        "match",
        "pub",
        "use",
      ],
    };

    const langKeywords =
      keywords[lang.toLowerCase() as keyof typeof keywords] || [];

    if (langKeywords.includes(token)) return "#ff7ac6"; // Pink for keywords
    if (token.match(/^["'].*["']$/)) return "#68d391"; // Green for strings
    if (token.match(/^\/\/.*/)) return "#a0aec0"; // Gray for comments
    if (token.match(/^\d+$/)) return "#fbb6ce"; // Light pink for numbers
    if (token.match(/^[A-Z][a-zA-Z]*$/)) return "#63b3ed"; // Blue for types/classes

    return "#e2e8f0"; // Default light gray
  };

  return lines.map((line, lineIndex) => {
    const tokens = line.split(/(\s+|[(){}[\];,.=+\-*/<>!&|"'])/);

    return (
      <div key={lineIndex}>
        {tokens.map((token, tokenIndex) => (
          <span
            key={tokenIndex}
            style={{ color: getTokenColor(token, language) }}
          >
            {token}
          </span>
        ))}
        {lineIndex < lines.length - 1 && "\n"}
      </div>
    );
  });
};

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (): Promise<void> => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(code);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div
      className="my-4 bg-gray-900 rounded-lg relative"
      style={{ width: "100%", minWidth: 0 }}
    >
      <div className="flex justify-between items-center p-2 border-b border-gray-700">
        {language && (
          <span className="text-xs text-gray-400 uppercase">{language}</span>
        )}
        <button
          onClick={handleCopy}
          className="bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs transition-colors"
          aria-label="Copy code"
        >
          {copied ? "✓" : "Copy"}
        </button>
      </div>
      <div style={{ width: "100%", overflowX: "auto", minWidth: 0 }}>
        <pre
          className="p-3 m-0"
          style={{
            fontSize: "12px",
            lineHeight: "1.4",
            whiteSpace: "pre",
            wordWrap: "break-word",
            overflowWrap: "break-word",
            minWidth: 0,
            width: "fit-content",
            maxWidth: "100%",
            fontFamily: "monospace",
          }}
        >
          <code style={{ color: "#e2e8f0" }}>
            {language ? highlightSyntax(code, language) : code}
          </code>
        </pre>
      </div>
    </div>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Function to parse images
  const parseImages = (text: string): React.ReactNode[] => {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = imageRegex.exec(text)) !== null) {
      // Add text before the image
      if (match.index > lastIndex) {
        parts.push(
          ...parseTextFormatting(text.substring(lastIndex, match.index)),
        );
      }

      // Add the image
      const [, altText, imageUrl] = match;
      parts.push(
        <Image
          key={match.index}
          src={imageUrl}
          alt={altText}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "8px",
            margin: "16px 0",
            display: "block",
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            // Show fallback text
            const fallback = document.createElement("div");
            fallback.textContent = `[Image: ${altText || "Failed to load"}]`;
            fallback.style.cssText =
              "color: #6b7280; font-style: italic; padding: 16px; background: #f3f4f6; border-radius: 8px; margin: 16px 0;";
            target.parentNode?.insertBefore(fallback, target);
          }}
        />,
      );

      lastIndex = imageRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(...parseTextFormatting(text.substring(lastIndex)));
    }

    return parts.length > 0 ? parts : parseTextFormatting(text);
  };

  // Function to parse and render markdown links
  const parseLinks = (text: string): React.ReactNode[] => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      // Add the link
      const [, linkText, linkUrl] = match;

      // Check if it's a YouTube embed
      const youtubeMatch = linkUrl.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
      );
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        parts.push(
          <div key={match.index} style={{ margin: "16px 0" }}>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={linkText}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: "8px", maxWidth: "560px" }}
            />
          </div>,
        );
      } else {
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#60a5fa",
              textDecoration: "underline",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {linkText}
          </a>,
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : [text];
  };

  // Function to parse bold, italic, and strikethrough text
  const parseTextFormatting = (text: string): React.ReactNode[] => {
    // const parts: React.ReactNode[] = [];
    const currentText = text;
    let keyCounter = 0;

    // Parse bold first (**text**)
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const boldParts: React.ReactNode[] = [];
    let lastBoldIndex = 0;
    let boldMatch;

    while ((boldMatch = boldRegex.exec(currentText)) !== null) {
      if (boldMatch.index > lastBoldIndex) {
        boldParts.push(currentText.substring(lastBoldIndex, boldMatch.index));
      }
      boldParts.push(
        <strong key={`bold-${keyCounter++}`} style={{ fontWeight: "bold" }}>
          {boldMatch[1]}
        </strong>,
      );
      lastBoldIndex = boldRegex.lastIndex;
    }

    if (lastBoldIndex < currentText.length) {
      boldParts.push(currentText.substring(lastBoldIndex));
    }

    // Now parse italic (*text*)
    const processItalic = (part: React.ReactNode): React.ReactNode[] => {
      if (typeof part !== "string") return [part];

      const italicRegex = /\*([^*]+)\*/g;
      const italicParts: React.ReactNode[] = [];
      let lastItalicIndex = 0;
      let italicMatch;

      while ((italicMatch = italicRegex.exec(part)) !== null) {
        if (italicMatch.index > lastItalicIndex) {
          italicParts.push(part.substring(lastItalicIndex, italicMatch.index));
        }
        italicParts.push(
          <em key={`italic-${keyCounter++}`} style={{ fontStyle: "italic" }}>
            {italicMatch[1]}
          </em>,
        );
        lastItalicIndex = italicRegex.lastIndex;
      }

      if (lastItalicIndex < part.length) {
        italicParts.push(part.substring(lastItalicIndex));
      }

      return italicParts.length > 0 ? italicParts : [part];
    };

    // Process each bold part for italic formatting
    const formattedParts: React.ReactNode[] = [];
    boldParts.forEach((part) => {
      formattedParts.push(...processItalic(part));
    });

    // Parse strikethrough (~~text~~)
    const processStrikethrough = (part: React.ReactNode): React.ReactNode[] => {
      if (typeof part !== "string") return [part];

      const strikeRegex = /~~([^~]+)~~/g;
      const strikeParts: React.ReactNode[] = [];
      let lastStrikeIndex = 0;
      let strikeMatch;

      while ((strikeMatch = strikeRegex.exec(part)) !== null) {
        if (strikeMatch.index > lastStrikeIndex) {
          strikeParts.push(part.substring(lastStrikeIndex, strikeMatch.index));
        }
        strikeParts.push(
          <del
            key={`strike-${keyCounter++}`}
            style={{ textDecoration: "line-through" }}
          >
            {strikeMatch[1]}
          </del>,
        );
        lastStrikeIndex = strikeRegex.lastIndex;
      }

      if (lastStrikeIndex < part.length) {
        strikeParts.push(part.substring(lastStrikeIndex));
      }

      return strikeParts.length > 0 ? strikeParts : [part];
    };

    // Process each formatted part for strikethrough
    const finalParts: React.ReactNode[] = [];
    formattedParts.forEach((part) => {
      finalParts.push(...processStrikethrough(part));
    });

    return finalParts;
  };

  // Function to parse inline code
  const parseInlineCode = (text: string): React.ReactNode[] => {
    const codeRegex = /`([^`]+)`/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(text)) !== null) {
      // Add text before the code
      if (match.index > lastIndex) {
        const beforeText = text.substring(lastIndex, match.index);
        parts.push(...parseLinks(beforeText));
      }

      // Add the inline code
      parts.push(
        <code
          key={match.index}
          style={{
            backgroundColor: "#f3f4f6",
            color: "#1f2937",
            padding: "2px 4px",
            borderRadius: "4px",
            fontSize: "12px",
            fontFamily: "monospace",
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {match[1]}
        </code>,
      );

      lastIndex = codeRegex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...parseLinks(remainingText));
    }

    return parts.length > 0 ? parts : parseLinks(text);
  };

  // Main text parsing function that handles all inline formatting
  const parseAllInlineFormatting = (text: string): React.ReactNode[] => {
    // First parse images (they can contain other formatting in alt text)
    const imageParsed = parseImages(text);

    // Then parse inline code and links for non-image parts
    const finalParts: React.ReactNode[] = [];
    imageParsed.forEach((part) => {
      if (typeof part === "string") {
        finalParts.push(...parseInlineCode(part));
      } else {
        finalParts.push(part);
      }
    });

    return finalParts;
  };

  const renderMarkdown = (content: string): React.ReactNode[] => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";

    lines.forEach((line, index) => {
      // Handle code blocks
      if (line.startsWith("```")) {
        if (inCodeBlock) {
          elements.push(
            <CodeBlock
              key={`code-${index}`}
              code={codeContent.trim()}
              language={codeLanguage}
            />,
          );
          inCodeBlock = false;
          codeContent = "";
          codeLanguage = "";
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + "\n";
        return;
      }

      // Handle blockquotes
      if (line.startsWith("> ")) {
        const quoteContent = line.replace("> ", "");
        elements.push(
          <blockquote
            key={index}
            style={{
              borderLeft: "4px solid #60a5fa",
              paddingLeft: "16px",
              margin: "16px 0",
              fontStyle: "italic",
              color: "#6b7280",
              backgroundColor: "#f9fafb",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
          >
            {parseAllInlineFormatting(quoteContent)}
          </blockquote>,
        );
        return;
      }

      // Handle horizontal rules
      if (
        line.match(/^---+$/) ||
        line.match(/^\*\*\*+$/) ||
        line.match(/^___+$/)
      ) {
        elements.push(
          <hr
            key={index}
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "#e5e7eb",
              margin: "24px 0",
            }}
          />,
        );
        return;
      }

      // Handle list items (numbered and unordered)
      if (line.match(/^[\s]*(\d+\.|\-|\*|\+)\s+/)) {
        const listMatch = line.match(/^[\s]*(\d+\.|\-|\*|\+)\s+(.*)$/);
        if (listMatch) {
          const [, marker, listContent] = listMatch;
          const isNumbered = marker.includes(".");

          elements.push(
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "8px",
                fontSize:
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? "14px"
                    : "16px",
                lineHeight: "1.6",
                wordWrap: "break-word",
                overflowWrap: "break-word",
              }}
            >
              <span
                style={{
                  marginRight: "8px",
                  color: "#6b7280",
                  minWidth: isNumbered ? "20px" : "auto",
                }}
              >
                {isNumbered ? marker : "•"}
              </span>
              <span>{parseAllInlineFormatting(listContent)}</span>
            </div>,
          );
        }
        return;
      }

      // Headers
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h3
            key={index}
            id={id}
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? "18px"
                  : "24px",
              fontWeight: "bold",
              color: "inherit",
              marginTop: "24px",
              marginBottom: "12px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {parseAllInlineFormatting(text)}
          </h3>,
        );
      } else if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h2
            key={index}
            id={id}
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? "20px"
                  : "28px",
              fontWeight: "bold",
              color: "inherit",
              marginTop: "32px",
              marginBottom: "16px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {parseAllInlineFormatting(text)}
          </h2>,
        );
      } else if (line.startsWith("# ")) {
        const text = line.replace("# ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        elements.push(
          <h1
            key={index}
            id={id}
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? "24px"
                  : "32px",
              fontWeight: "bold",
              color: "inherit",
              marginTop: "32px",
              marginBottom: "20px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {parseAllInlineFormatting(text)}
          </h1>,
        );
      } else if (line.trim()) {
        // Regular paragraphs with all inline formatting parsing
        elements.push(
          <p
            key={index}
            style={{
              fontSize:
                typeof window !== "undefined" && window.innerWidth < 640
                  ? "14px"
                  : "16px",
              lineHeight: "1.6",
              marginBottom: "16px",
              wordWrap: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {parseAllInlineFormatting(line)}
          </p>,
        );
      } else {
        elements.push(<br key={index} />);
      }
    });

    return elements;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "80vw",
        padding: "16px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {renderMarkdown(content)}
    </div>
  );
};

export default MarkdownRenderer;
