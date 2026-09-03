import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Mohini Sharma — ML / AI Engineer',
  description:
    'An illustrated, scroll-driven portfolio of Mohini Sharma — ML/AI engineer specializing in computer vision, LLMs and agentic AI. Move through a hand-drawn studio to discover her work.',
  generator: 'v0.app',
  openGraph: {
    title: 'Mohini Sharma — ML / AI Engineer',
    description:
      'A hand-drawn 3D scroll portfolio. Computer vision, LLMs & agentic AI.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f2ead9',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} bg-background`}>
      <body className="cursor-none-desktop font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
