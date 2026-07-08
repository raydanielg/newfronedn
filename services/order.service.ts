import { api } from "@/lib/api-client"
import { endpoints } from "@/config/api"
import type { Order, ApiResponse, PaginatedResponse } from "@/types"

export const orderService = {
  async list(token: string) {
    return api.get<PaginatedResponse<Order>>(endpoints.orders.list, { token })
  },

  async detail(id: string, token: string) {
    return api.get<ApiResponse<Order>>(endpoints.orders.detail(id), { token })
  },

  async track(orderNumber: string) {
    return api.get<ApiResponse<Order>>(endpoints.orders.track(orderNumber))
  },
}