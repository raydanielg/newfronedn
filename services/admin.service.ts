import { api } from "@/lib/api-client"
import { endpoints } from "@/config/api"
import type { Product, Order, User, Category, ApiResponse, PaginatedResponse } from "@/types"

export const adminService = {
  async dashboard(token: string) {
    return api.get<ApiResponse<{
      totalRevenue: number
      totalOrders: number
      totalCustomers: number
      totalProducts: number
      recentOrders: Order[]
      revenueChart: { date: string; revenue: number }[]
    }>>(endpoints.admin.dashboard, { token })
  },

  async products(token: string, params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", String(params.page))
    if (params?.limit) searchParams.set("limit", String(params.limit))
    const qs = searchParams.toString()
    return api.get<PaginatedResponse<Product>>(
      `${endpoints.admin.products}${qs ? `?${qs}` : ""}`,
      { token },
    )
  },

  async createProduct(token: string, data: FormData | Partial<Product>) {
    return api.post<ApiResponse<Product>>(
      endpoints.admin.products,
      data,
      { token },
    )
  },

  async updateProduct(token: string, id: string, data: Partial<Product>) {
    return api.put<ApiResponse<Product>>(
      endpoints.admin.productDetail(id),
      data,
      { token },
    )
  },

  async deleteProduct(token: string, id: string) {
    return api.delete<ApiResponse>(endpoints.admin.productDetail(id), { token })
  },

  async orders(token: string, params?: { page?: number; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", String(params.page))
    if (params?.status) searchParams.set("status", params.status)
    const qs = searchParams.toString()
    return api.get<PaginatedResponse<Order>>(
      `${endpoints.admin.orders}${qs ? `?${qs}` : ""}`,
      { token },
    )
  },

  async orderDetail(token: string, id: string) {
    return api.get<ApiResponse<Order>>(endpoints.admin.orderDetail(id), { token })
  },

  async customers(token: string, params?: { page?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", String(params.page))
    const qs = searchParams.toString()
    return api.get<PaginatedResponse<User>>(
      `${endpoints.admin.customers}${qs ? `?${qs}` : ""}`,
      { token },
    )
  },

  async categories(token: string) {
    return api.get<ApiResponse<Category[]>>(endpoints.admin.categories, { token })
  },

  async analytics(token: string) {
    return api.get<ApiResponse<Record<string, unknown>>>(endpoints.admin.analytics, { token })
  },
}