import type { Metadata } from "next"
import { siteConfig } from "@/config/seo"
import type { SEOData } from "@/types"

interface PageMeta {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  noIndex?: boolean
}

export function generateMetadata(page: PageMetadata): Metadata {
  const title = page.title
    ? `${page.title} | ${siteConfig.name}`
    : `${siteConfig.name} | ${siteConfig.tagline}`

  const description = page.description || siteConfig.description

  return {
    title,
    description,
    keywords: page.keywords || siteConfig.defaultKeywords,
    openGraph: {
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: page.ogImage
        ? [{ url: page.ogImage, width: 1200, height: 630 }]
        : [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
    },
    robots: page.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: {
      canonical: page.canonicalUrl || `${siteConfig.url}${page.canonicalUrl || ""}`,
    },
  }
}

export function productSEO(product: { name: string; description: string; slug: string; seo?: SEOData }): PageMetadata {
  return {
    title: product.seo?.title || product.name,
    description: product.seo?.description || product.description.slice(0, 160),
    keywords: product.seo?.keywords,
    ogImage: product.seo?.ogImage,
    canonicalUrl: `/products/${product.slug}`,
  }
}

export function categorySEO(category: { name: string; description: string; slug: string; seo?: SEOData }): PageMetadata {
  return {
    title: category.seo?.title || category.name,
    description: category.seo?.description || category.description.slice(0, 160),
    keywords: category.seo?.keywords,
    ogImage: category.seo?.ogImage,
    canonicalUrl: `/categories/${category.slug}`,
  }
}