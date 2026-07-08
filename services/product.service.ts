import { api } from "@/lib/api-client"
import { endpoints } from "@/config/api"
import type { Product, Category, ApiResponse, PaginatedResponse } from "@/types"

export const productService = {
  async list(params?: { page?: number; limit?: number; category?: string; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", String(params.page))
    if (params?.limit) searchParams.set("limit", String(params.limit))
    if (params?.category) searchParams.set("category", params.category)
    if (params?.search) searchParams.set("search", params.search)
    const qs = searchParams.toString()
    return api.get<PaginatedResponse<Product>>(
      `${endpoints.products.list}${qs ? `?${qs}` : ""}`,
    )
  },

  async featured() {
    return api.get<ApiResponse<Product[]>>(endpoints.products.featured)
  },

  async search(query: string) {
    return api.get<PaginatedResponse<Product>>(
      `${endpoints.products.search}?q=${encodeURIComponent(query)}`,
    )
  },

  async detail(slug: string) {
    return api.get<ApiResponse<Product>>(endpoints.products.detail(slug))
  },

  async related(id: string) {
    return api.get<ApiResponse<Product[]>>(endpoints.products.related(id))
  },

  async categories() {
    return api.get<ApiResponse<Category[]>>(endpoints.categories.list)
  },

  async category(slug: string) {
    return api.get<ApiResponse<Category>>(endpoints.categories.detail(slug))
  },
}