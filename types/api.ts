export type Role = "guest" | "user" | "admin"

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ApiConfig {
  baseUrl: string
  version: string
  timeout: number
  headers: Record<string, string>
}