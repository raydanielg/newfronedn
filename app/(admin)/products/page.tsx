import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Manage Products",
  noIndex: true,
})

export default function AdminProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
    </div>
  )
}