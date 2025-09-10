// components/ContentAdInjector.tsx
'use client'

import { ReactNode, useMemo } from 'react'
import AdBanner from './AdBanner'

interface ContentAdInjectorProps {
  content: string
  targetInterval?: number // characters between ads
}

type AdType = 'banner' | 'video-horizontal-1' | 'video-horizontal-2' | 'image-square' | 'image-portrait-1' | 'image-portrait-2'

export default function ContentAdInjector({ 
  content, 
  targetInterval = 700 
}: ContentAdInjectorProps) {
  
  const contentWithAds = useMemo(() => {
    // Split content into sentences (more sophisticated sentence detection)
    const sentences = content.split(/(?<=[.!?])\s+(?=[A-Z])/g).filter(s => s.trim().length > 0)
    
    if (sentences.length === 0) return [content]
    
    const result: (string | { type: 'ad', adType: AdType, key: string })[] = []
    let currentContent = ''
    let characterCount = 0
    let adCounter = 0
    
    // Cycle through different ad types for variety
    const adTypes: AdType[] = [
      'banner',
      'image-square', 
      'video-horizontal-1',
      'image-portrait-1',
      'video-horizontal-2',
      'image-portrait-2'
    ]
    
    sentences.forEach((sentence, index) => {
      const sentenceLength = sentence.length
      
      // Add sentence to current content
      currentContent += sentence
      if (index < sentences.length - 1) {
        currentContent += ' '
      }
      characterCount += sentenceLength + 1
      
      // Check if we should insert an ad
      const shouldInsertAd = characterCount >= targetInterval && 
                           index < sentences.length - 1 && // Don't add ad after last sentence
                           sentence.trim().match(/[.!?]$/) && // Make sure sentence ends properly
                           currentContent.trim().length > 200 // Ensure minimum content before ad
      
      if (shouldInsertAd) {
        // Add accumulated content
        if (currentContent.trim()) {
          result.push(currentContent.trim())
        }
        
        // Add ad with cycling ad types
        const adType = adTypes[adCounter % adTypes.length]
        result.push({
          type: 'ad',
          adType,
          key: `ad-${adCounter}`
        })
        
        // Reset for next section
        currentContent = ''
        characterCount = 0
        adCounter++
      }
    })
    
    // Add any remaining content
    if (currentContent.trim()) {
      result.push(currentContent.trim())
    }
    
    return result
    
  }, [content, targetInterval])

  const getAdTypeForMobile = (adType: AdType): AdType => {
    // Convert desktop-optimized ads to mobile-friendly ones
    switch (adType) {
      case 'video-horizontal-1':
      case 'video-horizontal-2':
        return 'banner' // Videos work on mobile but banner might perform better
      case 'image-portrait-1':
      case 'image-portrait-2':
        return 'image-square' // Portrait images work but square might fit better
      default:
        return adType
    }
  }

  return (
    <div className="prose prose-lg max-w-none">
      {contentWithAds.map((item, index) => {
        if (typeof item === 'string') {
          // Render content with proper paragraph formatting
          return (
            <div 
              key={index}
              className="whitespace-pre-wrap leading-relaxed text-gray-800 mb-6"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          )
        } else {
          // Render ad
          return (
            <div key={item.key} className="my-8 not-prose">
              {/* Desktop Ad */}
              <div className="hidden md:block">
                <AdBanner 
                  adType={item.adType} 
                  className="my-6 flex justify-center"
                />
              </div>
              
              {/* Mobile Ad */}
              <div className="block md:hidden">
                <AdBanner 
                  adType={getAdTypeForMobile(item.adType)} 
                  className="my-4 flex justify-center"
                />
              </div>
              
              {/* Subtle separator */}
              <div className="w-24 h-px bg-gray-200 mx-auto my-8"></div>
            </div>
          )
        }
      })}
    </div>
  )
}