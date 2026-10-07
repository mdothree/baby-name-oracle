import type { Metadata } from 'next'
import { pageMetadata } from '../lib/seo'

export const metadata: Metadata = pageMetadata({
  title: "Payment Confirmed — Baby Name Oracle",
  description: "Thank you for your Baby Name Oracle purchase. Your payment was completed through Stripe checkout. Return to the app to keep exploring baby names.",
  path: "/success",
  noindex: true,
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
