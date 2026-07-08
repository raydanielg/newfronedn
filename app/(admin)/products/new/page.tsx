import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Add New Product",
  noIndex: true,
})

export default function AdminNewProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">New Product</h1>
    </div>
  )
}