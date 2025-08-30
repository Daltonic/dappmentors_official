import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const CardImage: React.FC<{
  src?: string | null;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  rounded?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  showInitials?: boolean;
}> = ({
  src,
  alt,
  width = 400,
  height = 192,
  className = "",
  rounded = false,
  objectFit = "cover",
  showInitials = true,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a consistent color based on the text
  const getPlaceholderColor = (text: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-400 via-green-500 to-green-600",
      "bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-red-400 via-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600",
      "bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600",
      "bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600",
      "bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600",
      "bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600",
      "bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600",
      "bg-gradient-to-br from-lime-400 via-lime-500 to-lime-600",
      "bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600",
    ];

    // Use the text to generate a consistent index
    const index = text
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get initials from text
  const getInitials = (text: string) => {
    if (!showInitials) return "";
    return text
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate responsive font size based on dimensions
  const getFontSize = () => {
    const minDimension = Math.min(width, height);
    if (minDimension < 80) return "text-lg";
    if (minDimension < 120) return "text-xl";
    if (minDimension < 160) return "text-2xl";
    if (minDimension < 220) return "text-3xl";
    if (minDimension < 300) return "text-4xl";
    return "text-5xl";
  };

  // Check if we should show placeholder
  const shouldShowPlaceholder = !src || src === "" || imageError;

  // Reset error state when src changes
  useEffect(() => {
    if (src && src !== "") {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  const containerClasses = `
    relative overflow-hidden
    ${rounded ? "rounded-3xl" : ""}
    ${className}
  `;

  const imageClasses = `
    w-full h-full 
    transition-all duration-700
    ${objectFit === "cover" ? "object-cover" : ""}
    ${objectFit === "contain" ? "object-contain" : ""}
    ${objectFit === "fill" ? "object-fill" : ""}
    group-hover:scale-110
  `;

  if (shouldShowPlaceholder) {
    return (
      <div
        className={containerClasses}
        // style={{ width, height }}
        style={{ height }}
      >
        <div
          className={`
                            w-full h-full
                            ${getPlaceholderColor(alt)} 
                            text-white 
                            font-bold
                            relative
                            overflow-hidden
                        `}
        >
          {/* Centering container */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              {showInitials && alt && (
                <div
                  className={`${getFontSize()} font-black mb-1 tracking-wider leading-none`}
                >
                  {getInitials(alt)}
                </div>
              )}
              {!showInitials && (
                <FaUser className="w-12 h-12 mb-1 opacity-80" />
              )}
              <div className="text-sm font-medium opacity-80 px-4">
                {alt.length > 20 ? `${alt.substring(0, 20)}...` : alt}
              </div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-16 h-16 bg-white/5 rounded-full z-0"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 bg-white/5 rounded-full z-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses} style={{ width, height }}>
      {/* Show placeholder while loading */}
      {!imageLoaded && (
        <div
          className={`
            absolute inset-0 z-10
            ${getPlaceholderColor(alt)} 
            text-white 
            font-bold
            relative
            overflow-hidden
          `}
        >
          {/* Centering container */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center">
              {showInitials && alt && (
                <div
                  className={`${getFontSize()} font-black mb-1 tracking-wider leading-none`}
                >
                  {getInitials(alt)}
                </div>
              )}
              {!showInitials && (
                <FaUser className="w-12 h-12 mb-1 opacity-80" />
              )}
              <div className="text-sm font-medium opacity-80 px-4">
                Loading...
              </div>
            </div>
          </div>

          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>
        </div>
      )}

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`
          ${imageClasses}
          ${imageLoaded ? "opacity-100" : "opacity-0"}
        `}
        style={{ objectFit }}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default CardImage;
