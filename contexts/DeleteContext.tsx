// contexts/DeleteContext.tsx
"use client";

import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

interface DeleteConfig {
  apiUrl: string;
  itemTitle: string;
  onSuccess: () => void;
  entity?: string;
}

interface DeleteContextType {
  showDeleteModal: (config: DeleteConfig) => void;
  hideDeleteModal: () => void;
}

const DeleteContext = createContext<DeleteContextType | undefined>(undefined);

export const useDelete = () => {
  const context = useContext(DeleteContext);
  if (!context) {
    throw new Error("useDelete must be used within a DeleteProvider");
  }
  return context;
};

const DeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  apiUrl: string;
  itemTitle: string;
  onSuccess: () => void;
  entity: string;
}> = ({ isOpen, onClose, apiUrl, itemTitle, onSuccess, entity }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const confirmDelete = async () => {
    // Show loading toast
    const loadingToast = toast.loading(`Deleting ${entity}...`, {
      position: "top-right",
    });

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        credentials: "include",
      });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.ok) {
        // Success toast
        toast.success(`"${itemTitle}" has been deleted successfully!`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className:
            "!bg-green-50 dark:!bg-green-900/30 !text-green-800 dark:!text-green-300 !rounded-xl",
        });

        // Call success callback
        onSuccess();
        onClose();
      } else {
        const errorData = await response.json();
        // Error toast
        toast.error(
          errorData.error || `Failed to delete ${entity}. Please try again.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className:
              "!bg-red-50 dark:!bg-red-900/30 !text-red-800 dark:!text-red-300 !rounded-xl",
          },
        );
        onClose();
      }
    } catch (error) {
      // Dismiss loading toast in case of error
      toast.dismiss(loadingToast);

      console.error("Delete error:", error);
      // Network error toast
      toast.error(
        "Network error. Please check your connection and try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className:
            "!bg-red-50 dark:!bg-red-900/30 !text-red-800 dark:!text-red-300 !rounded-xl",
        },
      );
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 max-w-md w-full p-6"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <FaTrash className="w-5 h-5 text-[#D2145A] dark:text-[#FF4081]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete {entity.charAt(0).toUpperCase() + entity.slice(1)}?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete{" "}
            <strong>&quot;{itemTitle}&quot;</strong>?
          </p>

          <div className="flex gap-3 justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-[#D2145A] rounded-xl hover:bg-[#FF4081] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const DeleteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<DeleteConfig | null>(null);

  const showDeleteModal = (newConfig: DeleteConfig) => {
    setConfig({ ...newConfig, entity: newConfig.entity || "item" });
    setIsOpen(true);
  };

  const hideDeleteModal = () => {
    setIsOpen(false);
    setConfig(null);
  };

  return (
    <DeleteContext.Provider value={{ showDeleteModal, hideDeleteModal }}>
      {children}
      {isOpen && config && (
        <DeleteModal
          isOpen={isOpen}
          onClose={hideDeleteModal}
          apiUrl={config.apiUrl}
          itemTitle={config.itemTitle}
          onSuccess={config.onSuccess} // Ensure onSuccess is passed
          entity={config.entity || "item"} // Provide a default value for entity if it's undefined
        />
      )}
    </DeleteContext.Provider>
  );
};
