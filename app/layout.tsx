import type { Metadata, Viewport } from 'next'
import { SITE_URL, SITE_NAME, JSON_LD, pageMetadata } from './lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  keywords: ["baby names", "baby name meanings", "name origins", "girl names", "boy names", "name numerology", "baby name search"],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  ...pageMetadata({
    title: "Baby Names with Meanings — Baby Name Oracle",
    description: "Search baby names by first letter or origin and see each name's meaning and origin. Unlock a detailed name report with numerology and sibling combinations.",
    path: '/',
  }),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: "#db2777",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
