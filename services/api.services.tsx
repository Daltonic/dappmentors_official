// api.services.ts
// Updated file that now includes product services along with existing user services

import { useState } from "react";
import { userApiService } from "./userApiService"; // Adjust path as needed
import { productApiService } from "./productApiService"; // New import

// Types for API responses (generic, stays here)
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Generic API request handler
async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      credentials: "include", // Important for cookie-based auth
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    return { data, message: data.message };
  } catch (error) {
    console.error("API Request Error:", error);
    return {
      error: error instanceof Error ? error.message : "Network error occurred",
    };
  }
}

// Utility functions for error handling and notifications
const apiUtils = {
  // Extract error message from API response
  getErrorMessage<T>(response: ApiResponse<T>): string {
    return response.error || "An unexpected error occurred";
  },

  // Extract success message from API response
  getSuccessMessage<T>(response: ApiResponse<T>): string {
    return response.message || "Operation completed successfully";
  },

  // Check if API response indicates success
  isSuccess<T>(
    response: ApiResponse<T>,
  ): response is ApiResponse<T> & { data: T } {
    return !response.error && response.data !== undefined;
  },

  // Handle API errors with user-friendly messages
  handleApiError(error: string): string {
    const errorMap: Record<string, string> = {
      Unauthorized: "You need to log in to perform this action",
      Forbidden: "You don't have permission to perform this action",
      "Invalid token": "Your session has expired. Please log in again",
      "Network error occurred":
        "Please check your internet connection and try again",
      "Internal Server Error":
        "Something went wrong on our end. Please try again later",
      "Invalid product ID": "The product you're looking for doesn't exist",
      "Product not found": "The product you're looking for was not found",
      "Cannot delete product with active enrollments":
        "This product has active enrollments and cannot be deleted. Archive it instead.",
    };

    return errorMap[error] || error;
  },

  // Show toast notifications (you can integrate with your toast system)
  showToast(message: string, type: "success" | "error" | "info" = "info") {
    // This is a placeholder - integrate with your actual toast system
    console.log(`[${type.toUpperCase()}] ${message}`);

    // Example integration with react-hot-toast:
    // if (typeof window !== 'undefined') {
    //   const toast = (await import('react-hot-toast')).default;
    //   if (type === 'success') toast.success(message);
    //   else if (type === 'error') toast.error(message);
    //   else toast(message);
    // }
  },
};

// Hook for managing API loading states with enhanced features
function useApiState<T>(options?: {
  onSuccess?: (data: T, message?: string) => void;
  onError?: (error: string) => void;
  showToasts?: boolean;
}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { onSuccess, onError, showToasts = false } = options || {};

  const execute = async (
    apiCall: () => Promise<ApiResponse<T>>,
    customOnSuccess?: (data: T) => void,
    customOnError?: (error: string) => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      if (apiUtils.isSuccess(response)) {
        setData(response.data as T);

        const successMessage = apiUtils.getSuccessMessage(response);
        if (showToasts) {
          apiUtils.showToast(successMessage, "success");
        }

        onSuccess?.(response.data, successMessage);
        customOnSuccess?.(response.data);
      } else {
        const errorMessage = apiUtils.handleApiError(
          apiUtils.getErrorMessage(response),
        );
        setError(errorMessage);

        if (showToasts) {
          apiUtils.showToast(errorMessage, "error");
        }

        onError?.(errorMessage);
        customOnError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred";
      console.error("useApiState execute error:", error);
      setError(errorMessage);

      if (showToasts) {
        apiUtils.showToast(errorMessage, "error");
      }

      onError?.(errorMessage);
      customOnError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}

// Export generic parts
export { apiRequest, apiUtils, useApiState, type ApiResponse };

// Export service modules
export { userApiService };
export { productApiService };

// Future services can be added here:
// export { blogApiService };
// export { courseApiService };
// export { paymentApiService };
