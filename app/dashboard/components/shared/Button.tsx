import { ButtonProps } from "@/utils/interfaces";
import React from "react";

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#D2145A] px-4 py-2 rounded flex items-center gap-2 capitalize ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
