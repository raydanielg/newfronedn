import { api } from "@/lib/api-client"
import { endpoints } from "@/config/api"
import type { CartItem, ApiResponse } from "@/types"

export const cartService = {
  async get(guestId?: string, token?: string) {
    return api.get<ApiResponse<CartItem[]>>(endpoints.cart.get, { guestId, token })
  },

  async add(item: Omit<CartItem, "id">, guestId?: string, token?: string) {
    return api.post<ApiResponse<CartItem[]>>(endpoints.cart.add, item, { guestId, token })
  },

  async update(itemId: string, quantity: number, guestId?: string, token?: string) {
    return api.put<ApiResponse<CartItem[]>>(
      endpoints.cart.update(itemId),
      { quantity },
      { guestId, token },
    )
  },

  async remove(itemId: string, guestId?: string, token?: string) {
    return api.delete<ApiResponse<CartItem[]>>(endpoints.cart.remove(itemId), { guestId, token })
  },

  async clear(guestId?: string, token?: string) {
    return api.delete<ApiResponse>(endpoints.cart.clear, { guestId, token })
  },
}