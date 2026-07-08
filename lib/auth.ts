"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const AUTH_COOKIE = "zerixa_token"
const GUEST_COOKIE = "zerixa_guest"
const ROLE_COOKIE = "zerixa_role"

export async function setAuthCookies(token: string, role: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
  cookieStore.set(ROLE_COOKIE, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  })
}

export async function setGuestCookie(guestId: string) {
  const cookieStore = await cookies()
  cookieStore.set(GUEST_COOKIE, guestId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(AUTH_COOKIE)?.value
}

export async function getUserRole(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(ROLE_COOKIE)?.value
}

export async function getGuestId(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get(GUEST_COOKIE)?.value
}

export async function clearAuthCookies() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
  cookieStore.delete(ROLE_COOKIE)
}

export async function requireAuth() {
  const token = await getAuthToken()
  const role = await getUserRole()
  if (!token) redirect("/auth/login")
  return { token, role }
}

export async function requireAdmin() {
  const { token, role } = await requireAuth()
  if (role !== "admin") redirect("/")
  return { token }
}