import { User } from "@/utils/interfaces";
import { useState } from "react";

// Types for API responses
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface BulkUpdateResponse {
  message: string;
  modifiedCount: number;
  matchedCount: number;
  users: User[];
}

export interface UsersResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Base API configuration
const API_BASE_URL = "/api/auth/users";

// Generic API request handler
async function apiRequest<T>(
  url: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
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

// User API Services
export const userApiService = {
  // Get all users with pagination and filtering
  async getUsers(params?: {
    page?: number;
    limit?: number;
    status?: string;
    role?: string;
  }): Promise<ApiResponse<UsersResponse>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.status && params.status !== "all")
      searchParams.append("status", params.status);
    if (params?.role && params.role !== "all")
      searchParams.append("role", params.role);

    const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return apiRequest<UsersResponse>(url);
  },

  // Get specific users by IDs
  async getUsersByIds(
    userIds: string[],
  ): Promise<ApiResponse<{ users: User[] }>> {
    const idsParam = userIds.join(",");
    return apiRequest<{ users: User[] }>(
      `${API_BASE_URL}/bulk?userIds=${idsParam}`,
    );
  },

  // Bulk role update
  async bulkUpdateRole(
    userIds: string[],
    newRole: string,
  ): Promise<ApiResponse<BulkUpdateResponse>> {
    return apiRequest<BulkUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-role-change",
        userIds,
        newRole,
      }),
    });
  },

  // Bulk status update
  async bulkUpdateStatus(
    userIds: string[],
    newStatus: User["status"],
  ): Promise<ApiResponse<BulkUpdateResponse>> {
    return apiRequest<BulkUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-status-change",
        userIds,
        newStatus,
      }),
    });
  },

  // Create new user
  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<ApiResponse<{ message: string; user: Partial<User> }>> {
    return apiRequest(`${API_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // Verify email
  async verifyEmail(
    token: string,
  ): Promise<ApiResponse<{ message: string; user: Partial<User> }>> {
    return apiRequest(`${API_BASE_URL}`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "verify-email",
        token,
      }),
    });
  },
};

// Utility functions for error handling and notifications
export const apiUtils = {
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
    };

    return errorMap[error] || error;
  },
};

// Hook for managing API loading states (optional utility)
export function useApiState<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (
    apiCall: () => Promise<ApiResponse<T>>,
    onSuccess?: (data: T) => void,
    onError?: (error: string) => void,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiCall();

      if (apiUtils.isSuccess(response)) {
        setData(response.data as T);
        onSuccess?.(response.data);
      } else {
        const errorMessage = apiUtils.handleApiError(
          apiUtils.getErrorMessage(response),
        );
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (error) {
      const errorMessage = "An unexpected error occurred";
      console.error("useApiState execute error:", error);
      setError(errorMessage);
      onError?.(errorMessage);
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
