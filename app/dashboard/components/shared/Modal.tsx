import { ModalProps } from "@/utils/interfaces";
import React from "react";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative text-black">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-800 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
        <div className="text-gray-900">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
