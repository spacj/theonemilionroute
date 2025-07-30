'use client'

import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface SocialShareProps {
  title: string
  url: string
}

export default function SocialShare({ title, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
      <div className="flex justify-center space-x-4">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-12 h-12 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      {copied && (
        <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>
      )}
    </div>
  )
}