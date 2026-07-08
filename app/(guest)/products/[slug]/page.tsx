import type { Metadata } from "next"
import { generateMetadata, productSEO } from "@/seo/generate-metadata"
import { productService } from "@/services/product.service"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await productService.detail(slug)
    if (res.success && res.data) {
      return generateMetadata(productSEO(res.data))
    }
  } catch {}
  return generateMetadata({ title: "Product" })
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Product: {slug}</h1>
    </div>
  )
}