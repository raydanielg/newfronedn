import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Products",
  description: "Browse our full collection of premium products.",
  canonicalUrl: "/products",
})

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
      <p className="mt-2 text-gray-500">Browse our full collection.</p>
    </div>
  )
}