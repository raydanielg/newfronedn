import type { Product } from "./product"

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded"
export type PaymentStatus = "pending" | "paid" | "failed" | "refunded"
export type PaymentMethod = "card" | "mobile_money" | "bank_transfer" | "cash_on_delivery"

export interface Order {
  id: string
  orderNumber: string
  userId?: string
  guestId?: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  tax: number
  discount: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  shippingAddress: Address
  billingAddress: Address
  notes?: string
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  total: number
}

export interface Address {
  firstName: string
  lastName: string
  phone: string
  email: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

export interface CartItem {
  productId: string
  variantId?: string
  name: string
  image: string
  price: number
  quantity: number
}