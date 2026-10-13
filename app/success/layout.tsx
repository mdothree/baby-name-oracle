import type { Metadata } from 'next'
import { pageMetadata } from '../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: "Your Premium Name Report — Baby Name Oracle",
  description: "Build your Baby Name Oracle premium name report after checkout: US popularity, numerology and sibling-name ideas.",
  path: "/success",
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
