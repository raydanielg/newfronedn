import type { Metadata } from "next"
import { generateMetadata } from "@/seo/generate-metadata"

export const metadata: Metadata = generateMetadata({
  title: "Order Details",
  noIndex: true,
})

interface Props {
  params: Promise<{ id: string }>
}

export default async function UserOrderDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Order #{id}</h1>
    </div>
  )
}