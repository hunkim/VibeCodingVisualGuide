import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vibe Coding Visual Guide - Component Reference for AI Development',
  description: 'Struggling to describe UI components? Browse our visual component gallery and get perfect vibe prompts for AI coding. No more "floating thingy" - get precise component descriptions instantly.',
  keywords: ['vibe coding', 'UI components', 'AI development', 'component library', 'React components', 'shadcn/ui', 'visual guide'],
  authors: [{ name: 'Vibe Coding Team' }],
  creator: 'Vibe Coding Visual Guide',
  publisher: 'Vibe Coding',
  robots: 'index, follow',
  openGraph: {
    title: 'Vibe Coding Visual Guide',
    description: 'Visual component reference for perfect AI coding prompts',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Visual Guide',
    description: 'Visual component reference for perfect AI coding prompts',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
