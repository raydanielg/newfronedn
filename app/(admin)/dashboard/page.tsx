import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Admin Dashboard",
  description: "Manage your store, products, orders, and customers.",
  noIndex: true,
})

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
    </div>
  )
}