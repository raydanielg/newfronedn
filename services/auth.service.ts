import { api } from "@/lib/api-client"
import { endpoints } from "@/config/api"
import type { User, AuthTokens, LoginPayload, RegisterPayload, ApiResponse } from "@/types"

export const authService = {
  async login(payload: LoginPayload) {
    return api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      endpoints.auth.login,
      payload,
    )
  },

  async register(payload: RegisterPayload) {
    return api.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
      endpoints.auth.register,
      payload,
    )
  },

  async logout(token: string) {
    return api.post<ApiResponse>(endpoints.auth.logout, undefined, { token })
  },

  async refresh(refreshToken: string) {
    return api.post<ApiResponse<{ tokens: AuthTokens }>>(
      endpoints.auth.refresh,
      { refreshToken },
    )
  },

  async getProfile(token: string) {
    return api.get<ApiResponse<User>>(endpoints.auth.me, { token })
  },

  async forgotPassword(email: string) {
    return api.post<ApiResponse>(endpoints.auth.forgotPassword, { email })
  },

  async resetPassword(token: string, password: string, passwordConfirmation: string) {
    return api.post<ApiResponse>(endpoints.auth.resetPassword, {
      token,
      password,
      passwordConfirmation,
    })
  },
}