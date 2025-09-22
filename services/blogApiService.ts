// services/blogApiService.ts
// Blog-specific API service following the application's structure

import { BlogPost } from "@/utils/interfaces";
import { apiRequest, type ApiResponse } from "./api.services";

// Blog-specific types
export interface BlogsResponse {
  blogs: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalBlogs: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters: {
    search: string;
    status: string;
    category: string;
    featured: string;
  };
}

export interface CreateBlogData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  publishDate: Date;
  topics?: string[];
  image?: string;
  featured?: boolean;
  status?: BlogPost["status"];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  relatedProduct?: string;
  readTime?: string;
}

export interface UpdateBlogData extends Partial<CreateBlogData> {
  id?: string; // Made optional since it's not sent in the request body
}

export interface BulkBlogUpdateResponse {
  message: string;
  modifiedCount: number;
  matchedCount: number;
  blogs: BlogPost[];
}

export interface BulkBlogDeleteResponse {
  message: string;
  deletedCount: number;
  deletedIds: string[];
}

// Blog-specific base URL
const API_BASE_URL = "/api/blogs";

// Blog API Services
export const blogApiService = {
  // Get all blogs with filtering and pagination
  async getBlogs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    category?: string;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }): Promise<ApiResponse<BlogsResponse>> {
    const searchParams = new URLSearchParams();

    // Add all parameters that have values
    Object.entries(params || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return apiRequest<BlogsResponse>(url);
  },

  // Get single blog by ID or slug
  async getBlog(idOrSlug: string): Promise<ApiResponse<{ blog: BlogPost }>> {
    return apiRequest<{ blog: BlogPost }>(`${API_BASE_URL}/${idOrSlug}`);
  },

  // Create new blog
  async createBlog(blogData: CreateBlogData): Promise<
    ApiResponse<{
      message: string;
      blog: BlogPost;
    }>
  > {
    return apiRequest(`${API_BASE_URL}`, {
      method: "POST",
      body: JSON.stringify(blogData),
    });
  },

  // Update existing blog
  async updateBlog(
    idOrSlug: string,
    blogData: UpdateBlogData,
  ): Promise<
    ApiResponse<{
      message: string;
      blog: BlogPost;
    }>
  > {
    // Remove id from blogData if present (it's in the URL)
    const updateData = { ...blogData };
    delete updateData.id;

    return apiRequest(`${API_BASE_URL}/${idOrSlug}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  },

  // Delete blog
  async deleteBlog(idOrSlug: string): Promise<
    ApiResponse<{
      message: string;
      deletedId: string;
    }>
  > {
    return apiRequest(`${API_BASE_URL}/${idOrSlug}`, {
      method: "DELETE",
    });
  },

  // Get multiple blogs by IDs
  async getBlogsByIds(
    blogIds: string[],
  ): Promise<ApiResponse<{ blogs: BlogPost[]; count: number }>> {
    const idsParam = blogIds.join(",");
    return apiRequest<{ blogs: BlogPost[]; count: number }>(
      `${API_BASE_URL}/bulk?blogIds=${idsParam}`,
    );
  },

  // Bulk status update
  async bulkUpdateStatus(
    blogIds: string[],
    status: BlogPost["status"],
  ): Promise<ApiResponse<BulkBlogUpdateResponse>> {
    return apiRequest<BulkBlogUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-status-change",
        blogIds,
        updateData: { status },
      }),
    });
  },

  // Bulk featured toggle
  async bulkUpdateFeatured(
    blogIds: string[],
    featured: boolean,
  ): Promise<ApiResponse<BulkBlogUpdateResponse>> {
    return apiRequest<BulkBlogUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-featured-toggle",
        blogIds,
        updateData: { featured },
      }),
    });
  },

  // Bulk category update
  async bulkUpdateCategory(
    blogIds: string[],
    category: string,
  ): Promise<ApiResponse<BulkBlogUpdateResponse>> {
    return apiRequest<BulkBlogUpdateResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-category-change",
        blogIds,
        updateData: { category },
      }),
    });
  },

  // Bulk delete blogs
  async bulkDeleteBlogs(
    blogIds: string[],
  ): Promise<ApiResponse<BulkBlogDeleteResponse>> {
    return apiRequest<BulkBlogDeleteResponse>(`${API_BASE_URL}/bulk`, {
      method: "PATCH",
      body: JSON.stringify({
        action: "bulk-delete",
        blogIds,
      }),
    });
  },

  // Search blogs (alternative to getBlogs with search focus)
  async searchBlogs(
    searchTerm: string,
    filters?: {
      status?: string;
      category?: string;
    },
  ): Promise<ApiResponse<BlogsResponse>> {
    return this.getBlogs({
      search: searchTerm,
      ...filters,
      page: 1,
      limit: 20,
    });
  },

  // Get featured blogs
  async getFeaturedBlogs(): Promise<ApiResponse<BlogsResponse>> {
    return this.getBlogs({
      featured: true,
      status: "published",
      limit: 10,
    });
  },

  // Get blogs by category
  async getBlogsByCategory(
    category: string,
    params?: {
      page?: number;
      limit?: number;
      status?: string;
    },
  ): Promise<ApiResponse<BlogsResponse>> {
    return this.getBlogs({
      category,
      ...params,
    });
  },

  // Get published blogs
  async getPublishedBlogs(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<ApiResponse<BlogsResponse>> {
    return this.getBlogs({
      status: "published",
      ...params,
    });
  },

  // Get draft blogs (for admins or creators)
  async getDraftBlogs(params?: {
    page?: number;
    limit?: number;
    category?: string;
  }): Promise<ApiResponse<BlogsResponse>> {
    return this.getBlogs({
      status: "draft",
      ...params,
    });
  },
};
