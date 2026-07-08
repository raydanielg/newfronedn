import Link from "next/link"
import Image from "next/image"
import type { Product } from "@/types"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg"
    >
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-gray-100">
        {primaryImage && (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
        {product.comparePrice && (
          <span className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-semibold text-white">
            -{Math.round((1 - product.price / product.comparePrice) * 100)}%
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium text-gray-500">{product.category?.name}</p>
        <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}