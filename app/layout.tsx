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
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2ead9' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1912' },
  ],
  // Explicitly allowed (was previously disabled): people who need to
  // zoom text to read it must be able to, on any device.
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${caveat.variable} bg-background`}>
      <body className="cursor-none-desktop font-sans antialiased">
        {/* Sets .dark/.light on <html> before first paint, from the saved
            choice or the OS preference, so there's no flash of the wrong
            theme while React hydrates. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;var c=document.documentElement.classList;c.toggle('dark',d);c.toggle('light',!d);}catch(e){}})()",
          }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
