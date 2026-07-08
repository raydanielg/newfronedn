"use client"

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react"
import type { User, AuthState, LoginPayload, RegisterPayload } from "@/types"
import { authService } from "@/services/auth.service"
import { generateGuestId } from "@/lib/utils"

interface AuthContextType extends AuthState {
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    tokens: null,
    isAuthenticated: false,
    isLoading: true,
    role: "guest",
  })

  useEffect(() => {
    const guestId = localStorage.getItem("guest_id")
    if (!guestId) {
      localStorage.setItem("guest_id", generateGuestId())
    }
    setState((prev) => ({ ...prev, isLoading: false }))
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await authService.login(payload)
    if (res.success && res.data) {
      const { user, tokens } = res.data
      localStorage.setItem("access_token", tokens.accessToken)
      setState({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        role: user.role,
      })
    }
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await authService.register(payload)
    if (res.success && res.data) {
      const { user, tokens } = res.data
      localStorage.setItem("access_token", tokens.access_token)
      setState({
        user,
        tokens,
        isAuthenticated: true,
        isLoading: false,
        role: user.role,
      })
    }
  }, [])

  const logout = useCallback(async () => {
    const token = localStorage.getItem("access_token")
    if (token) {
      await authService.logout(token).catch(() => {})
    }
    localStorage.removeItem("access_token")
    setState({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      role: "guest",
    })
  }, [])

  const setUser = useCallback((user: User) => {
    setState((prev) => ({ ...prev, user, role: user.role }))
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContext {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}