const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1"

export const apiConfig = {
  baseUrl: `${API_BASE_URL}/api/${API_VERSION}`,
  version: API_VERSION,
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const

export const endpoints = {
  // Auth
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  // Products
  products: {
    list: "/products",
    featured: "/products/featured",
    search: "/products/search",
    detail: (slug: string) => `/products/${slug}`,
    related: (id: string) => `/products/${id}/related`,
  },
  // Categories
  categories: {
    list: "/categories",
    detail: (slug: string) => `/categories/${slug}`,
  },
  // Cart
  cart: {
    get: "/cart",
    add: "/cart/items",
    update: (itemId: string) => `/cart/items/${itemId}`,
    remove: (itemId: string) => `/cart/items/${itemId}`,
    clear: "/cart",
  },
  // Checkout
  checkout: {
    process: "/checkout",
    shipping: "/checkout/shipping",
    payment: "/checkout/payment",
    confirm: "/checkout/confirm",
  },
  // Orders
  orders: {
    list: "/orders",
    detail: (id: string) => `/orders/${id}`,
    track: (number: string) => `/orders/track/${number}`,
  },
  // User
  user: {
    profile: "/user/profile",
    updateProfile: "/user/profile",
    wishlist: "/user/wishlist",
    addresses: "/user/addresses",
  },
  // Admin
  admin: {
    dashboard: "/admin/dashboard",
    products: "/admin/products",
    productDetail: (id: string) => `/admin/products/${id}`,
    orders: "/admin/orders",
    orderDetail: (id: string) => `/admin/orders/${id}`,
    customers: "/admin/customers",
    customerDetail: (id: string) => `/admin/customers/${id}`,
    categories: "/admin/categories",
    analytics: "/admin/analytics",
    settings: "/admin/settings",
  },
} as const