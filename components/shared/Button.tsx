import React from "react";

type ButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ label, icon, onClick, className }) => {
  return (
    <div>
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-lg focus:ring transition-colors duration-500 font-inter font-medium text-[16px] leading-[24px] ${className}`}
      >
        {icon ? icon : label}
      </button>
    </div>
  );
};

export default Button;
