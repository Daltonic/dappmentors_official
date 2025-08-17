// Social Share Component
interface SocialShareProps {
  title: string;
  url: string;
}

interface ShareLink {
  name: string;
  icon: string;
  url?: string;
  color: string;
  onClick?: () => void;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url }) => {
  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert("Link copied to clipboard!");
        })
        .catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          alert("Link copied to clipboard!");
        });
    }
  };

  const shareLinks: ShareLink[] = [
    {
      name: "Twitter",
      icon: "🐦",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-500",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-blue-600",
    },
    {
      name: "Copy Link",
      icon: "🔗",
      color: "hover:bg-gray-500",
      onClick: handleCopyLink,
    },
  ];

  const handleLinkClick = (link: ShareLink) => {
    if (link.onClick) {
      link.onClick();
    } else if (link.url) {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex gap-3">
      {shareLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => handleLinkClick(link)}
          className={`w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg transition-all duration-300 hover:scale-110 ${link.color} hover:text-white`}
          aria-label={`Share on ${link.name}`}
        >
          {link.icon}
        </button>
      ))}
    </div>
  );
};

export default SocialShare;
