// services/modulesApiService.ts
// Modules-specific API service following the application's structure

import { ModuleWithLessons } from "@/utils/interfaces";
import { apiRequest, type ApiResponse } from "./api.services";

// Modules-specific types
export interface ModulesResponse {
  modules: ModuleWithLessons[];
}

export interface CreateModulesData {
  modules: ModuleWithLessons[];
}

export interface UpdateModulesData {
  modules: ModuleWithLessons[];
}

// Modules API Services
export const modulesApiService = {
  // Get all modules for a product
  async getModules(productId: string): Promise<ApiResponse<ModulesResponse>> {
    return apiRequest<ModulesResponse>(`/api/products/${productId}/modules`);
  },

  // Update multiple modules for a product (updates, adds, and removes as needed)
  async updateModules(
    productId: string,
    modulesData: UpdateModulesData,
  ): Promise<
    ApiResponse<{
      message: string;
      modules: ModuleWithLessons[];
    }>
  > {
    return apiRequest(`/api/products/${productId}/modules`, {
      method: "PUT",
      body: JSON.stringify(modulesData),
    });
  },
};
