import { useEffect, useState } from "react";

interface TocItem {
  level: number;
  text: string;
  id: string;
}

// Table of Contents Component
interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  // Extract headings from markdown content
  const headings = content.match(/^#{1,3} .+$/gm) || [];
  const tocItems: TocItem[] = headings.map((heading) => {
    const levelMatch = heading.match(/^#+/);
    const level = levelMatch ? levelMatch[0].length : 1;
    const text = heading.replace(/^#+\s/, "");
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return { level, text, id };
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (let i = tocItems.length - 1; i >= 0; i--) {
        const element = document.getElementById(tocItems[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(tocItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tocItems]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        📋 Table of Contents
      </h3>
      <nav className="space-y-2">
        {tocItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={`block text-sm transition-colors duration-200 hover:text-[#D2145A] ${
              item.level === 1
                ? "font-semibold"
                : item.level === 2
                  ? "pl-4"
                  : "pl-8"
            } ${
              activeSection === item.id
                ? "text-[#D2145A] font-semibold"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default TableOfContents;
