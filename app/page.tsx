import Link from "next/link"
import { productService } from "@/services/product.service"
import { ProductCard } from "@/components/products"

export default async function HomePage() {
  let products: any[] = []

  try {
    const res = await productService.featured()
    if (res.success && res.data) products = res.data
  } catch {
    // silently fail — data will be empty
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Discover Premium Products
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Curated for quality and style. Shop the latest trends with fast delivery and exceptional service.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="rounded-xl border border-white/30 px-8 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.length > 0
            ? products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            : Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-xl border border-gray-200 p-4"
                >
                  <div className="mb-4 aspect-square rounded-lg bg-gray-200" />
                  <div className="h-3 w-1/3 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-2/3 rounded bg-gray-200" />
                  <div className="mt-2 h-5 w-1/2 rounded bg-gray-200" />
                </div>
              ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {["Electronics", "Fashion", "Home & Living", "Beauty"].map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase()}`}
                className="rounded-xl bg-white p-6 text-center shadow-sm transition hover:shadow-md"
              >
                <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-blue-100" />
                <h3 className="font-semibold text-gray-900">{cat}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}