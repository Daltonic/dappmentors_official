// services/serviceApiService.ts
// Service-specific API service following the application's structure

import { Service } from "@/utils/interfaces";
import { apiRequest, type ApiResponse } from "./api.services";

// Service-specific types
export interface ServicesResponse {
  services: Service[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalServices: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    type: string;
    status: string;
    category: string;
    featured: string;
  };
}

export interface CreateServiceData {
  title: string;
  description: string;
  type: Service["type"];
  price: number | string;
  status?: Service["status"];
  category: string;
  duration: string;
  lead: string;
  featured?: boolean;
  thumbnail?: string;
  tags?: string[];
  deliverables?: string[];
}

export interface UpdateServiceData extends Partial<CreateServiceData> {
  id?: string; // Made optional since it's not sent in the request body
}

export interface BulkServiceUpdateResponse {
  message: string;
  modifiedCount: number;
  matchedCount: number;
  services: Service[];
}

export interface BulkServiceDeleteResponse {
  message: string;
  deletedCount: number;
  deletedIds: string[];
}

// Service-specific base URL
const API_BASE_URL = "/api/services";

// Service API Services
export const serviceApiService = {
  // Get all services with filtering and pagination
  async getServices(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    status?: string;
    category?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<ServicesResponse>> {
    const searchParams = new URLSearchParams();

    // Add all parameters that have values
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return apiRequest<ServicesResponse>(url);
  },

  // Get single service by ID
  async getService(id: string): Promise<ApiResponse<{ service: Service }>> {
    return apiRequest<{ service: Service }>(`${API_BASE_URL}/${id}`);
  },

  // Create new service
  async createService(serviceData: CreateServiceData): Promise<
    ApiResponse<{
      message: string;
      service: Service;
    }>
  > {
    return apiRequest(`${API_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(serviceData),
    });
  },

  // Update existing service
  async updateService(
    id: string,
    serviceData: UpdateServiceData,
  ): Promise<
    ApiResponse<{
      message: string;
      service: Service;
    }>
  > {
    // Remove id from serviceData if present (it's in the URL)
    const updateData = { ...serviceData };
    delete updateData.id;

    return apiRequest(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  // Delete service
  async deleteService(id: string): Promise<
    ApiResponse<{
      message: string;
      deletedId: string;
    }>
  > {
    return apiRequest(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
  },

  // Get multiple services by IDs
  async getServicesByIds(
    serviceIds: string[],
  ): Promise<ApiResponse<{ services: Service[]; count: number }>> {
    const idsParam = serviceIds.join(",");
    return apiRequest<{ services: Service[]; count: number }>(
      `${API_BASE_URL}/bulk?serviceIds=${idsParam}`,
    );
  },

  // Bulk status update
  async bulkUpdateStatus(
    serviceIds: string[],
    status: Service["status"],
  ): Promise<ApiResponse<BulkServiceUpdateResponse>> {
    return apiRequest<BulkServiceUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-status-change",
        serviceIds,
        updateData: { status },
      }),
    });
  },

  // Bulk featured toggle
  async bulkUpdateFeatured(
    serviceIds: string[],
    featured: boolean,
  ): Promise<ApiResponse<BulkServiceUpdateResponse>> {
    return apiRequest<BulkServiceUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-featured-toggle",
        serviceIds,
        updateData: { featured },
      }),
    });
  },

  // Bulk category update
  async bulkUpdateCategory(
    serviceIds: string[],
    category: string,
  ): Promise<ApiResponse<BulkServiceUpdateResponse>> {
    return apiRequest<BulkServiceUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-category-change",
        serviceIds,
        updateData: { category },
      }),
    });
  },

  // Bulk type update
  async bulkUpdateType(
    serviceIds: string[],
    type: Service["type"],
  ): Promise<ApiResponse<BulkServiceUpdateResponse>> {
    return apiRequest<BulkServiceUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-type-change",
        serviceIds,
        updateData: { type },
      }),
    });
  },

  // Bulk delete services
  async bulkDeleteServices(
    serviceIds: string[],
  ): Promise<ApiResponse<BulkServiceDeleteResponse>> {
    return apiRequest<BulkServiceDeleteResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-delete",
        serviceIds,
      }),
    });
  },

  // Search services (alternative to getServices with search focus)
  async searchServices(
    searchTerm: string,
    filters?: {
      type?: string;
      status?: string;
      category?: string;
    },
  ): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      search: searchTerm,
      ...filters,
      page: 1,
      limit: 20,
    });
  },

  // Get featured services
  async getFeaturedServices(): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      featured: true,
      status: "active",
      limit: 10,
    });
  },

  // Get services by type
  async getServicesByType(
    type: Service["type"],
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      type,
      ...params,
    });
  },

  // Get services by lead
  async getServicesByLead(
    lead: string,
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      search: lead, // Assuming search includes lead
      ...params,
    });
  },

  // Get services by category
  async getServicesByCategory(
    category: string,
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      category,
      ...params,
    });
  },

  // Get services with active status
  async getActiveServices(params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
  }): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      status: "active",
      ...params,
    });
  },

  // Get coming soon services
  async getComingSoonServices(): Promise<ApiResponse<ServicesResponse>> {
    return this.getServices({
      status: "coming-soon",
      limit: 20,
    });
  },
};
