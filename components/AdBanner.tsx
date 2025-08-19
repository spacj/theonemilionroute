'use client'
import { useEffect, useRef } from 'react'

type AdType = 'banner' | 'horizontal' | 'profitable'

interface AdConfig {
  key: string
  format?: string
  height: number
  width: number
  params?: Record<string, any>
  type: 'atOptions' | 'profitable'
  src: string
}

interface AdBannerProps {
  className?: string
  adType?: AdType
}

export default function AdBanner({ className = '', adType = 'banner' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Ad configurations for different types
  const adConfigs: Record<AdType, AdConfig> = {
    banner: {
      key: '27504ca59bdb46ccd7f71e8d4391cc7b',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
      type: 'atOptions',
      src: '//www.highperformanceformat.com/27504ca59bdb46ccd7f71e8d4391cc7b/invoke.js'
    },
    horizontal: {
      key: '9f21807bdaf0ad479fea86f4ece52e9a',
      format: 'iframe',
      height: 60,
      width: 468,
      params: {},
      type: 'atOptions',
      src: '//www.highperformanceformat.com/9f21807bdaf0ad479fea86f4ece52e9a/invoke.js'
    },
    profitable: {
      key: '88c068bbf8c2b80cd814befc8405cbbd',
      height: 250,
      width: 300,
      type: 'profitable',
      src: '//pl27454512.profitableratecpm.com/88c068bbf8c2b80cd814befc8405cbbd/invoke.js'
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const config = adConfigs[adType]
    
    // Clear container first
    containerRef.current.innerHTML = ''
    
    if (config.type === 'atOptions') {
      // Define global atOptions variable with current ad config
      ;(window as any).atOptions = {
        key: config.key,
        format: config.format,
        height: config.height,
        width: config.width,
        params: config.params
      }

      // Create script element for the ad network
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = config.src
      containerRef.current.appendChild(script)
      
    } else if (config.type === 'profitable') {
      // Create script element with async attribute
      const script = document.createElement('script')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      script.src = config.src
      
      // Create container div for the profitable ad
      const adDiv = document.createElement('div')
      adDiv.id = `container-${config.key}`
      
      // Append both elements
      containerRef.current.appendChild(script)
      containerRef.current.appendChild(adDiv)
    }

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [adType]) // Re-run effect when adType changes

  const config = adConfigs[adType]

  return (
    <div
      ref={containerRef}
      className={`my-8 flex justify-center ${className}`}
      style={{ width: config.width, height: config.height }}
    />
  )
}

// Usage examples:
// <AdBanner adType="banner" />     // 300x250 banner (default)
// <AdBanner adType="horizontal" /> // 468x60 horizontal banner
// <AdBanner adType="profitable" /> // 300x250 profitable ad network