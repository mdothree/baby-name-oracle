import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Baby Name Oracle',
  description: 'Baby name oracle with meanings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
