import type { Metadata } from 'next'

export const SITE_URL = "https://names.mdo3d.com"
export const SITE_NAME = "Baby Name Oracle"
const OG_IMAGE = {
  url: `${SITE_URL}/og-image.png`,
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: "Baby Name Oracle — Find a name with meaning. Part of MDO3D Guidance.",
}

// Shared SEO defaults; pages override title/description/canonical via their own metadata.
export function pageMetadata(opts: { title: string; description: string; path: string; noindex?: boolean }): Metadata {
  const url = `${SITE_URL}${opts.path}`
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'website',
      siteName: "Baby Name Oracle · MDO3D Guidance",
      title: opts.title,
      description: opts.description,
      url,
      images: [OG_IMAGE],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
  }
}

export const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://names.mdo3d.com/#website",
      "url": "https://names.mdo3d.com/",
      "name": "Baby Name Oracle",
      "description": "Search baby names by first letter or origin and see each name's meaning and origin. Unlock a detailed name report with numerology and sibling combinations.",
      "inLanguage": "en",
      "publisher": {
        "@type": "Organization",
        "name": "MDO3D"
      }
    },
    {
      "@type": "WebApplication",
      "@id": "https://names.mdo3d.com/#app",
      "name": "Baby Name Oracle",
      "url": "https://names.mdo3d.com/",
      "description": "Search baby names by first letter or origin and see each name's meaning and origin. Unlock a detailed name report with numerology and sibling combinations.",
      "applicationCategory": "LifestyleApplication",
      "operatingSystem": "Any (web browser)",
      "image": "https://names.mdo3d.com/og-image.png",
      "isPartOf": {
        "@id": "https://names.mdo3d.com/#website"
      }
    }
  ]
}
