export type { Role, ApiResponse, PaginatedResponse, ApiConfig } from "./api"
export type { Product, ProductImage, ProductVariant, Category, SEOData } from "./product"
export type { Order, OrderItem, Address, CartItem, OrderStatus, PaymentStatus, PaymentMethod } from "./order"
export type { User, AuthTokens, LoginPayload, RegisterPayload, AuthState, GuestSession } from "./user"

export type ClassValue = string | number | boolean | null | undefined | ClassValue[]