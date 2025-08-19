'use client'

import { useEffect, useRef } from 'react'

interface AdBannerProps {
  className?: string
}

export default function AdBanner({ className = '' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Define global atOptions variable
    ;(window as any).atOptions = {
      key: '27504ca59bdb46ccd7f71e8d4391cc7b',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {}
    }

    // Create script element for the ad network
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      '//www.highperformanceformat.com/27504ca59bdb46ccd7f71e8d4391cc7b/invoke.js'

    // Append into container
    containerRef.current.innerHTML = '' // clear old
    containerRef.current.appendChild(script)

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`my-8 flex justify-center ${className}`}
      style={{ width: 300, height: 250 }}
    />
  )
}
