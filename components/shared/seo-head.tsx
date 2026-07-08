import Head from "next/head"
import { siteConfig } from "@/config/seo"

interface SEOHeadProps {
  title?: string
  description?: string
  ogImage?: string
  canonical?: string
}

export function SEOHead({ title, description, ogImage, canonical }: SEOHeadProps) {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.tagline}`
  const pageDesc = description || siteConfig.description
  const image = ogImage || siteConfig.ogImage
  const url = canonical ? `${siteConfig.url}${canonical}` : siteConfig.url

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <link rel="canonical" href={url} />
    </>
  )
}