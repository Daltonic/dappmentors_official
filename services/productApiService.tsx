// services/productApiService.ts
// Product-specific API service following the application's structure

import { Product } from "@/utils/interfaces";
import { apiRequest, type ApiResponse } from "./api.services";

// Product-specific types
export interface ProductsResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
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

export interface CreateProductData {
  title: string;
  subtitle?: string;
  description: string;
  longDescription?: string;
  type: Product["type"];
  price: number | string;
  originalPrice?: number | string;
  currency?: string;
  status?: Product["status"];
  category: string;
  difficulty: string;
  duration: string;
  level?: string;
  language?: string;
  instructor: {
    name: string;
    bio?: string;
    avatar?: string;
    credentials?: string[];
  };
  imageUrl?: string;
  videoPreviewUrl?: string;
  featured?: boolean;
  tags?: string[];
  technologies?: string[];
  includes?: string[];
  rating?: number;
  totalReviews?: number;
  studentsEnrolled?: number;
  features?: Product["features"];
  modules?: Product["modules"];
  testimonials?: Product["testimonials"];
  faqs?: Product["faqs"];
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id?: string; // Made optional since it's not sent in the request body
}

export interface BulkProductUpdateResponse {
  message: string;
  modifiedCount: number;
  matchedCount: number;
  products: Product[];
}

export interface BulkProductDeleteResponse {
  message: string;
  deletedCount: number;
  deletedIds: string[];
}

// Product-specific base URL
const API_BASE_URL = "/api/products";

// Product API Services
export const productApiService = {
  // Get all products with filtering and pagination
  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    type?: string;
    status?: string;
    category?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<ProductsResponse>> {
    const searchParams = new URLSearchParams();

    // Add all parameters that have values
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return apiRequest<ProductsResponse>(url);
  },

  // Get single product by ID or slug
  async getProduct(
    idOrSlug: string,
  ): Promise<ApiResponse<{ product: Product }>> {
    return apiRequest<{ product: Product }>(`${API_BASE_URL}/${idOrSlug}`);
  },

  // Create new product
  async createProduct(productData: CreateProductData): Promise<
    ApiResponse<{
      message: string;
      product: Product;
    }>
  > {
    return apiRequest(`${API_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(productData),
    });
  },

  // Update existing product
  async updateProduct(
    idOrSlug: string,
    productData: UpdateProductData,
  ): Promise<
    ApiResponse<{
      message: string;
      product: Product;
    }>
  > {
    // Remove id from productData if present (it's in the URL)
    const updateData = { ...productData };
    delete updateData.id;

    return apiRequest(`${API_BASE_URL}/${idOrSlug}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  // Delete product
  async deleteProduct(idOrSlug: string): Promise<
    ApiResponse<{
      message: string;
      deletedId: string;
    }>
  > {
    return apiRequest(`${API_BASE_URL}/${idOrSlug}`, {
      method: "DELETE",
    });
  },

  // Get multiple products by IDs
  async getProductsByIds(
    productIds: string[],
  ): Promise<ApiResponse<{ products: Product[]; count: number }>> {
    const idsParam = productIds.join(",");
    return apiRequest<{ products: Product[]; count: number }>(
      `${API_BASE_URL}/bulk?productIds=${idsParam}`,
    );
  },

  // Bulk status update
  async bulkUpdateStatus(
    productIds: string[],
    status: Product["status"],
  ): Promise<ApiResponse<BulkProductUpdateResponse>> {
    return apiRequest<BulkProductUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-status-change",
        productIds,
        updateData: { status },
      }),
    });
  },

  // Bulk featured toggle
  async bulkUpdateFeatured(
    productIds: string[],
    featured: boolean,
  ): Promise<ApiResponse<BulkProductUpdateResponse>> {
    return apiRequest<BulkProductUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-featured-toggle",
        productIds,
        updateData: { featured },
      }),
    });
  },

  // Bulk category update
  async bulkUpdateCategory(
    productIds: string[],
    category: string,
  ): Promise<ApiResponse<BulkProductUpdateResponse>> {
    return apiRequest<BulkProductUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-category-change",
        productIds,
        updateData: { category },
      }),
    });
  },

  // Bulk price update
  async bulkUpdatePrice(
    productIds: string[],
    price: number,
  ): Promise<ApiResponse<BulkProductUpdateResponse>> {
    return apiRequest<BulkProductUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-price-update",
        productIds,
        updateData: { price },
      }),
    });
  },

  // Bulk delete products
  async bulkDeleteProducts(
    productIds: string[],
  ): Promise<ApiResponse<BulkProductDeleteResponse>> {
    return apiRequest<BulkProductDeleteResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-delete",
        productIds,
      }),
    });
  },

  // Search products (alternative to getProducts with search focus)
  async searchProducts(
    searchTerm: string,
    filters?: {
      type?: string;
      status?: string;
      category?: string;
    },
  ): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      search: searchTerm,
      ...filters,
      page: 1,
      limit: 20,
    });
  },

  // Get featured products
  async getFeaturedProducts(): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      featured: true,
      status: "published",
      limit: 10,
    });
  },

  // Get products by type
  async getProductsByType(
    type: Product["type"],
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      type,
      ...params,
    });
  },

  // Get products by category
  async getProductsByCategory(
    category: string,
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      category,
      ...params,
    });
  },

  // Get published products
  async getPublishedProducts(params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
  }): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      status: "published",
      ...params,
    });
  },

  // Get draft products (for admins or creators)
  async getDraftProducts(params?: {
    page?: number;
    limit?: number;
    type?: string;
    category?: string;
  }): Promise<ApiResponse<ProductsResponse>> {
    return this.getProducts({
      status: "draft",
      ...params,
    });
  },
};
