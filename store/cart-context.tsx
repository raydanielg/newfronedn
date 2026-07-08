"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { CartItem } from "@/types"

interface CartState {
  items: CartItem[]
  totalItems: number
  subtotal: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR" }
  | { type: "SET_ITEMS"; payload: CartItem[] }

function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.variantId === action.payload.variantId,
      )
      const items = existing
        ? state.items.map((i) =>
            i.productId === action.payload.productId && i.variantId === action.payload.variantId
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i,
          )
        : [...state.items, action.payload]
      return { items, totalItems: items.length, subtotal: calcTotal(items) }
    }
    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.productId !== action.payload.productId)
      return { items, totalItems: items.length, subtotal: calcTotal(items) }
    }
    case "UPDATE_QTY": {
      const items = state.items.map((i) =>
        i.productId === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i,
      )
      return { items, totalItems: items.length, subtotal: calcTotal(items) }
    }
    case "CLEAR":
      return { items: [], totalItems: 0, subtotal: 0 }
    case "SET_ITEMS": {
      const items = action.payload
      return { items, totalItems: items.length, subtotal: calcTotal(items) }
    }
    default:
      return state
  }
}

interface CartContextType extends CartState {
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [], totalItems: 0, subtotal: 0 } as CartState,
  )

  const addItem = useCallback((item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item }), [])
  const removeItem = useCallback(
    (productId: string) => dispatch({ type: "REMOVE_ITEM", payload: { productId } }), []
  )
  const updateQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { productId, quantity } }), []
  )
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), [])

  return (
    <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}