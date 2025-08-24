'use client'
import { useEffect, useRef } from 'react'
type AdType = 'banner' | 'video-horizontal-1' | 'video-horizontal-2' | 'image-square'
interface AdConfig {
  key?: string
  format?: string
  height: number
  width: number
  params?: Record<string, any>
  type: 'atOptions' | 'video' | 'image'
  src?: string
  videoSrc?: string
  imageSrc?: string
  link?: string
  secondImageSrc?: string
  secondLink?: string
}
interface AdBannerProps {
  className?: string
  adType?: AdType
}
export default function AdBanner({ className = '', adType = 'banner' }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  // Ad configurations for different types
  const adConfigs: Record<AdType, AdConfig> = {
    // Original Adsterra banner configuration
    banner: {
      key: '27504ca59bdb46ccd7f71e8d4391cc7b',
      format: 'iframe',
      height: 250,
      width: 300,
      params: {},
      type: 'atOptions',
      src: '//www.highperformanceformat.com/27504ca59bdb46ccd7f71e8d4391cc7b/invoke.js'
    },
    // First horizontal video ad
    'video-horizontal-1': {
      type: 'video',
      height: 200,
      width: 400,
      videoSrc: '/videos/sellthings.mp4',
      link: 'https://www.amazon.com/dp/B0FKC3ZFP9' // Replace with your actual link
    },
    // Second horizontal video ad
    'video-horizontal-2': {
      type: 'video',
      height: 200,
      width: 400,
      videoSrc: '/videos/germanguide.mp4',
      link: 'https://example2.com' // Replace with your actual link
    },
    // Square image ad(s) - auto height
    'image-square': {
      type: 'image',
      height: 0, // Auto height
      width: 200,
      imageSrc: '/images/n26refer.jpg',
      link: 'https://example3.com', // Replace with your actual link
      secondImageSrc: '/images/n26refer.jpg',
      secondLink: 'https://example4.com' // Replace with your actual link for second image
    }
  }
  useEffect(() => {
    if (!containerRef.current) return
    const config = adConfigs[adType]
    const showDouble = adType === 'banner'
   
    // Clear container first
    containerRef.current.innerHTML = ''
   
    if (config.type === 'atOptions') {
      // Original Adsterra banner logic
      ;(window as any).atOptions = {
        key: config.key,
        format: config.format,
        height: config.height,
        width: config.width,
        params: config.params
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = config.src!
      containerRef.current.appendChild(script)
      if (showDouble) {
        const secondContainer = document.getElementById('second-banner-container')
        if (secondContainer) {
          secondContainer.innerHTML = ''
          const secondScript = document.createElement('script')
          secondScript.type = 'text/javascript'
          secondScript.src = config.src!
          secondContainer.appendChild(secondScript)
        }
      }
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      if (showDouble) {
        const secondContainer = document.getElementById('second-banner-container')
        if (secondContainer) {
          secondContainer.innerHTML = ''
        }
      }
    }
  }, [adType])
  const config = adConfigs[adType]
  const showDouble = adType === 'banner'
  const showDoubleImages = adType === 'image-square'
  // Render video ad
  if (config.type === 'video') {
    return (
      <div className={`my-8 ${className}`}>
        <a
          href={config.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block hover:opacity-80 transition-opacity duration-200"
        >
          <video
            className="w-full h-auto rounded-lg shadow-lg block"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={config.videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </a>
      </div>
    )
  }
  // Render image ad(s)
  if (config.type === 'image') {
    return (
      <div className={`my-8 flex justify-center items-center ${className}`}>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start justify-center max-w-4xl mx-auto">
          {/* First image - always visible */}
          <div className="group relative w-full sm:w-1/2 max-w-sm mx-auto flex">
            <a
              href={config.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 flex w-full">
                <img
                  src={config.imageSrc}
                  alt="Advertisement"
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                  style={{ display: 'block' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-400/50 rounded-xl transition-all duration-300"></div>
              </div>
            </a>
          </div>
         
          {/* Second image - only on larger screens */}
          {showDoubleImages && config.secondImageSrc && (
            <div className="group relative hidden sm:flex w-full sm:w-1/2 max-w-sm mx-auto">
              <a
                href={config.secondLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105 flex w-full">
                  <img
                    src={config.secondImageSrc}
                    alt="Advertisement"
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-110"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 ring-2 ring-transparent group-hover:ring-blue-400/50 rounded-xl transition-all duration-300"></div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    )
  }
  // Render original Adsterra banner
  return (
    <div className={`my-8 flex justify-center items-center ${className}`}>
      {showDouble ? (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <div
            ref={containerRef}
            className="flex justify-center"
            style={{ width: config.width, height: config.height }}
          />
          <div
            className="flex justify-center md:block hidden"
            style={{ width: config.width, height: config.height }}
            id="second-banner-container"
          />
        </div>
      ) : (
        <div
          ref={containerRef}
          className="flex justify-center"
          style={{ width: config.width, height: config.height }}
        />
      )}
    </div>
  )
}
// Usage examples:
// <AdBanner adType="banner" />              // Original Adsterra 300x250 banner with double layout
// <AdBanner adType="video-horizontal-1" />  // First horizontal video ad (responsive)
// <AdBanner adType="video-horizontal-2" />  // Second horizontal video ad (responsive)
// <AdBanner adType="image-square" />        // Square image ad(s) - single on mobile, double on larger screens