import Image from "next/image";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

const Avatar: React.FC<{
  src?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ src, alt, size = "md", className = "" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a consistent color based on the name
  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600",
      "bg-gradient-to-br from-green-500 to-green-600",
      "bg-gradient-to-br from-purple-500 to-purple-600",
      "bg-gradient-to-br from-pink-500 to-pink-600",
      "bg-gradient-to-br from-indigo-500 to-indigo-600",
      "bg-gradient-to-br from-red-500 to-red-600",
      "bg-gradient-to-br from-yellow-500 to-yellow-600",
      "bg-gradient-to-br from-teal-500 to-teal-600",
      "bg-gradient-to-br from-orange-500 to-orange-600",
      "bg-gradient-to-br from-cyan-500 to-cyan-600",
    ];

    // Use the name to generate a consistent index
    const index = name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg",
  };

  // Check if we should show placeholder
  const shouldShowPlaceholder =
    !src || src === "" || imageError || !imageLoaded;

  // Reset error state when src changes
  useEffect(() => {
    if (src && src !== "") {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  if (shouldShowPlaceholder) {
    return (
      <div
        className={`
                    ${sizeClasses[size]} 
                    ${getAvatarColor(alt)} 
                    rounded-full 
                    flex 
                    items-center 
                    justify-center 
                    text-white 
                    font-semibold 
                    shadow-md
                    ${className}
                `}
        title={alt}
      >
        {alt ? getInitials(alt) : <FaUser className="w-1/2 h-1/2" />}
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} relative ${className}`}>
      {/* Show placeholder while loading */}
      {!imageLoaded && (
        <div
          className={`
                        absolute inset-0
                        ${getAvatarColor(alt)} 
                        rounded-full 
                        flex 
                        items-center 
                        justify-center 
                        text-white 
                        font-semibold 
                        shadow-md
                    `}
        >
          {alt ? getInitials(alt) : <FaUser className="w-1/2 h-1/2" />}
        </div>
      )}

      {/* Actual image */}
      <Image
        src={src}
        alt={alt}
        className={`
                w-full h-full 
                rounded-full 
                object-cover 
                shadow-md
                transition-opacity duration-200
                ${imageLoaded ? "opacity-100" : "opacity-0"}
                `}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default Avatar;
