import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { GoogleAdSense } from 'nextjs-google-adsense'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | My Blog',
    default: 'One Million Route - Not Only A Blog'
  },
  description: 'Discover the latest articles, tutorials, and insights on how to increase your wealth and happiness by starting the right business or side hustle.',
  keywords: ['blog', 'business', 'economy', 'finance', 'tutorials'],
  authors: [{ name: 'Zara Ledger' }],
  creator: 'Zara Ledger',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.onemilionroute.com/',
    siteName: 'My Blog',
    images: [
      {
        url: 'https://www.onemilionroute.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'One Million Route Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OneMilionRoute.com',
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
        <GoogleAnalytics />
        <GoogleAdSense publisherId="ca-pub-7503389769071622" />
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