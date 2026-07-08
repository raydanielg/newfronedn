export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  price: number
  comparePrice?: number
  currency: string
  images: ProductImage[]
  category: Category
  tags: string[]
  sku: string
  stock: number
  rating: number
  reviewCount: number
  featured: boolean
  status: "active" | "draft" | "archived"
  seo: SEOData
  variants?: ProductVariant[]
  createdAt: string
  updatedAt: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
  isPrimary: boolean
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: Record<string, string>
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  parentId?: string
  children?: Category[]
  seo: SEOData
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonicalUrl?: string
}