import { FaUserSlash } from "react-icons/fa";
import { ReactNode } from "react";
import Link from "next/link";

interface EmptyStateProps {
  searchTerm: string;
  title: string;
  subtitle: string | ((searchTerm: string) => string); // Allow dynamic subtitle based on searchTerm
  buttonText?: string;
  location?: string;
  icon?: ReactNode; // Optional icon for the empty state
}

const EmptyState: React.FC<EmptyStateProps> = ({
  searchTerm,
  title,
  subtitle,
  buttonText,
  location,
  icon,
}) => (
  <div className="text-center py-16">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon || <FaUserSlash className="w-8 h-8 text-gray-400" />}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 mb-6">
      {typeof subtitle === "function" ? subtitle(searchTerm) : subtitle}
    </p>
    {location && buttonText && (
      <Link
        href={location}
        className="bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
      >
        {buttonText}
      </Link>
    )}
  </div>
);

export default EmptyState;
