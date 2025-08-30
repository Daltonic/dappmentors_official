import Link from "next/link";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  location?: string;
  buttonIcon?: ReactNode; // Optional icon for the button
}

const DashboardHeader: React.FC<HeaderProps> = ({
  title,
  subtitle,
  buttonText,
  location,
  buttonIcon,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-cambo font-normal text-gray-900 dark:text-white mb-2">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
      </div>
      {location && buttonText && (
        <Link
          href={location}
          className="relative bg-gradient-to-r from-[#D2145A] to-[#FF4081] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-500 hover:shadow-2xl overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-2">
            {buttonText}
            {buttonIcon && (
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                {buttonIcon}
              </span>
            )}
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </Link>
      )}
    </div>
  );
};

export default DashboardHeader;
