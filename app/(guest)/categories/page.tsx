import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Categories",
  description: "Browse products by category. Find exactly what you're looking for.",
  canonicalUrl: "/categories",
})

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
      <p className="mt-2 text-gray-500">Browse products by category.</p>
    </div>
  )
}