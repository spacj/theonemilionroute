'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  size?: 'banner' | 'rectangle' | 'leaderboard'
  className?: string
  slotId?: string
}

export default function AdBanner({ 
  size = 'banner', 
  className = '', 
  slotId = '2692266383' 
}: AdBannerProps) {
  const dimensions = {
    banner: 'w-full h-32',
    rectangle: 'w-80 h-64',
    leaderboard: 'w-full h-24'
  }

  useEffect(() => {
    try {
      // Check if adsbygoogle is available and push the ad
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle as any[]).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`${dimensions[size]} ${className} my-8`}>
      <ins 
        className="adsbygoogle"
        style={{ 
          display: 'block', 
          textAlign: 'center' 
        }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-7503389769071622"
        data-ad-slot={slotId}
      />
    </div>
  )
}

// You also need to add this to your global types (types/global.d.ts or similar):
declare global {
  interface Window {
    adsbygoogle: any[]
  }
}