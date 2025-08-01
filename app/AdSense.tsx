// components/AdSense.tsx
'use client'

import Script from 'next/script'
import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

interface AdSenseProps {
  publisherId: string
}

export function AdSense({ publisherId }: AdSenseProps) {
  return (
    <Script
      id="google-adsense"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}

interface AdUnitProps {
  publisherId: string
  slotId: string
  style?: React.CSSProperties
  className?: string
}

export function AdUnit({ publisherId, slotId, style, className }: AdUnitProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        ;(window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle ${className || ''}`}
      style={{ display: 'block', ...style }}
      data-ad-client={publisherId}
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  )
}

// Usage in your layout.tsx:
// import { AdSense } from '@/components/AdSense'
// 
// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body>
//         <AdSense publisherId="ca-pub-7503389769071622" />
//         {/* rest of your layout */}
//       </body>
//     </html>
//   )
// }