import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsentBanner from '@/components/CookieConsentBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | My Blog',
    default: 'My Blog - Latest Articles & Insights'
  },
  description: 'Discover the latest articles, tutorials, and insights on web development, technology, and more.',
  keywords: ['blog', 'technology', 'web development', 'programming', 'tutorials'],
  authors: [{ name: 'Your Name' }],
  creator: 'Your Name',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourblog.com',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://yourblog.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Blog',
    description: 'Latest articles and insights',
    creator: '@yourusername',
    images: ['https://yourblog.com/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 mt-[7vh]">
            {children}
          </main>
          <Footer />
          <CookieConsentBanner />
        </div>
      </body>
    </html>
  )
}