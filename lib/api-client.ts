import { apiConfig } from "@/config/api"

interface FetchOptions extends RequestInit {
  timeout?: number
  token?: string
  guestId?: string
}

export class ApiError extends Error {
  status: number
  errors?: Record<string, string[]>

  constructor(message: string, status: number, errors?: Record<string, string[]>) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.errors = errors
  }
}

function buildHeaders(token?: string, guestId?: string): HeadersInit {
  const headers: Record<string, string> = { ...apiConfig.headers }
  if (token) headers["Authorization"] = `Bearer ${token}`
  if (guestId) headers["X-Guest-ID"] = guestId
  return headers
}

async function request<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<T> {
  const { method = "GET", body, token, guestId, timeout = apiConfig.timeout } = options
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
      method,
      headers: buildHeaders(token, guestId),
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    })

    const json = await res.json()

    if (!res.ok) {
      throw new ApiError(json.message || "Something went wrong", res.status, json.errors)
    }

    return json as T
  } finally {
    clearTimeout(timer)
  }
}

interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  token?: string
  guestId?: string
  timeout?: number
}

export const api = {
  get: <T>(endpoint: string, opts?: ApiOptions) =>
    request<T>(endpoint, { ...opts, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, opts?: ApiOptions) =>
    request<T>(endpoint, { ...opts, method: "POST", body }),

  put: <T>(endpoint: string, body?: unknown, opts?: ApiOptions) =>
    request<T>(endpoint, { ...opts, method: "PUT", body }),

  patch: <T>(endpoint: string, body?: unknown, opts?: ApiOptions) =>
    request<T>(endpoint, { ...opts, method: "PATCH", body }),

  delete: <T>(endpoint: string, opts?: ApiOptions) =>
    request<T>(endpoint, { ...opts, method: "DELETE" }),
}