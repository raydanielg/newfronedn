export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: "user" | "admin"
  avatar?: string
  emailVerified: boolean
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface AuthState {
  user: User | null
  tokens: AuthTokens | null
  isAuthenticated: boolean
  isLoading: boolean
  role: "guest" | "user" | "admin"
}

export type GuestSession = {
  guestId: string
  expiresAt: string
}