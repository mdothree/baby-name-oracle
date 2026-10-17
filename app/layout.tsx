import type { Metadata, Viewport } from 'next'
import { DM_Serif_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
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
    description: "Search baby names by first letter or origin and see each name's meaning and origin. Get a name report with US popularity data, numerology and sibling-name ideas.",
    path: '/',
  }),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: "#db2777",
}

// MDO3 family type, self-hosted (normal style only: no italics, Principal 10-16).
const fDisplay = DM_Serif_Display({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', variable: '--f-display' })
const fBody = DM_Sans({ weight: ['400', '500', '600'], style: 'normal', subsets: ['latin'], display: 'swap', variable: '--f-body' })
const fMono = JetBrains_Mono({ weight: ['400', '500'], style: 'normal', subsets: ['latin'], display: 'swap', variable: '--f-mono' })

const SKIP_LINK_CSS =
  '.skip-link{position:absolute;left:-9999px;top:8px;z-index:10000;padding:8px 16px;background:#111111;color:#ffffff;font-weight:600;text-decoration:none;border-radius:4px}.skip-link:focus{left:8px;top:8px}button,input,select,textarea{font-family:inherit}'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${fDisplay.variable} ${fBody.variable} ${fMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <style dangerouslySetInnerHTML={{ __html: SKIP_LINK_CSS }} />
        <script src="/js/consent.js" defer />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        {children}
      </body>
    </html>
  )
}
