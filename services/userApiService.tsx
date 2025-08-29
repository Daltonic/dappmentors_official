// This is the new file: e.g., services/userApiService.ts
// All user-specific code is moved here

import { User } from "@/utils/interfaces";
// import { ApiResponse } from "./api.services";
import { apiRequest, type ApiResponse } from "./api.services";

// User-specific types
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

// User-specific base URL
const API_BASE_URL = "/api/auth/users";

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
