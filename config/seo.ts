export const siteConfig = {
  name: "Zerixa",
  tagline: "Premium Ecommerce Experience",
  description: "Discover premium products curated for quality and style. Shop the latest trends with fast delivery and exceptional customer service.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-default.jpg",
  locale: "en_US",
  twitterHandle: "@zerixa",
  defaultKeywords: [
    "ecommerce",
    "online shopping",
    "premium products",
    "zerixa",
    "online store",
  ],
} as const