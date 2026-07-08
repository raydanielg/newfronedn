"use client"

import { useState, useEffect } from "react"
import type { Product, Category } from "@/types"
import { productService } from "@/services/product.service"

export function useProducts(params?: { page?: number; limit?: number; category?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 })

  useEffect(() => {
    setLoading(true)
    productService
      .list(params)
      .then((res) => {
        if (res.success && res.data) {
          setProducts(res.data)
          if (res.pagination) setPagination(res.pagination)
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [params?.page, params?.category])

  return { products, loading, error, pagination }
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .featured()
      .then((res) => { if (res.success && res.data) setProducts(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    productService
      .detail(slug)
      .then((res) => { if (res.success && res.data) setProduct(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [slug])

  return { product, loading }
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    productService
      .categories()
      .then((res) => { if (res.success && res.data) setCategories(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { categories, loading }
}