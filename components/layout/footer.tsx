import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Zerixa</h3>
            <p className="mt-2 text-sm text-gray-500">
              Premium ecommerce experience curated for quality and style.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Shop</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/products" className="text-sm text-gray-500 hover:text-gray-700">All Products</Link></li>
              <li><Link href="/categories" className="text-sm text-gray-500 hover:text-gray-700">Categories</Link></li>
              <li><Link href="/cart" className="text-sm text-gray-500 hover:text-gray-700">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Support</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/contact" className="text-sm text-gray-500 hover:text-gray-700">Contact</Link></li>
              <li><Link href="/faq" className="text-sm text-gray-500 hover:text-gray-700">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm text-gray-500 hover:text-gray-700">Shipping</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-700">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Zerixa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}