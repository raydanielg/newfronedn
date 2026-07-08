"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth, useCart } from "@/store"

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user, role, logout } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
          Zerixa
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/products" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Categories
          </Link>
          {role === "admin" && (
            <Link href="/admin/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative text-gray-600 hover:text-gray-900"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                {user?.firstName}
              </Link>
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </Button>
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}