import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "My Dashboard",
  description: "Manage your account, orders, and preferences.",
  noIndex: true,
})

export default function UserDashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
    </div>
  )
}