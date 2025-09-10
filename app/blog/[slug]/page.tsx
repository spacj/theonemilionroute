// components/BlogPostClient.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Share2, Facebook, Twitter, Linkedin, Mail, Calendar, Clock, User, Tag } from 'lucide-react'
import ContentAdInjector from '../../../components/ContentAdInjector'

interface Post {
  slug: string
  title: string
  subtitle: string
  content: string
  date: string
  author: string
  tags: string[]
  image: string
  readingTime: string
}

interface BlogPostClientProps {
  post: Post
  relatedPosts: Post[]
  newestPosts: Post[]
}

export default function BlogPostClient({ post, relatedPosts, newestPosts }: BlogPostClientProps) {
  const [showShareMenu, setShowShareMenu] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${post.title} - ${post.subtitle}`

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`
  }

  return (
    <div>
      {/* Social Share */}
      <div className="flex items-center justify-between border-t border-b border-gray-200 py-4 mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Share this article:</span>
          <div className="flex space-x-2">
            <a
              href={shareLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-400 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={shareLinks.email}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content with Injected Ads */}
      <div className="mb-12">
        <ContentAdInjector 
          content={post.content} 
          targetInterval={700} 
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8 pt-8 border-t border-gray-200">
        <span className="text-sm font-medium text-gray-700 mr-2">Tags:</span>
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/tag/${tag.toLowerCase()}`}
            className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            <Tag className="w-3 h-3 mr-1" />
            {tag}
          </Link>
        ))}
      </div>

      {/* Author Bio */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              About {post.author}
            </h3>
            <p className="text-gray-600 text-sm">
              Travel enthusiast and blogger sharing insights from adventures around the world. 
              Passionate about discovering hidden gems and authentic local experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPosts.slice(0, 3).map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {relatedPost.subtitle}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(relatedPost.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                    <Clock className="w-3 h-3 ml-3 mr-1" />
                    {relatedPost.readingTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Never Miss an Adventure
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest travel guides, tips, and exclusive content delivered directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </div>

      {/* Comments Section Placeholder */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Comments</h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">
            Comments section will be implemented here using your preferred commenting system 
            (Disqus, Giscus, etc.)
          </p>
        </div>
      </div>
    </div>
  )
}