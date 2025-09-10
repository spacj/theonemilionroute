// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/mdx'
import BlogPostClient from '@/components/BlogPostClient'
import AdBanner from '@/components/AdBanner'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }
  
  const absoluteImage = post.image.startsWith('/images') 
    ? `https://onemilionroute.com${post.image}`
    : `https://onemilionroute.com/images${post.image}`
    
  return {
    title: post.title,
    description: post.subtitle,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.subtitle,
      images: [absoluteImage],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)
  const newestPosts = getAllPosts().slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 max-w-4xl lg:max-w-none">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                href={`/tag/${tag.toLowerCase()}`}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
          </div>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <p className="text-xl text-gray-600 mb-6">{post.subtitle}</p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readingTime}
              </div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
                priority
              />
            </div>
          </header>

          {/* Ad after hero image - Mobile: Banner, Desktop: Video */}
          <div className="block lg:hidden">
            <AdBanner adType="banner" className="my-6" />
          </div>
          <div className="hidden lg:block">
            <AdBanner adType="video-horizontal-1" className="my-8" />
          </div>

          {/* Use client wrapper for interactive parts */}
          <BlogPostClient 
            post={post} 
            relatedPosts={relatedPosts} 
            newestPosts={newestPosts} 
          />

          {/* Ad before related posts - Different video for variety */}
          <div className="hidden lg:block mt-12 mb-8">
            <AdBanner adType="video-horizontal-2" className="my-8" />
          </div>
          
          {/* Mobile ad before related posts */}
          <div className="block lg:hidden mt-8 mb-6">
            <AdBanner adType="image-square" className="my-6" />
          </div>
        </article>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 xl:w-96 shrink-0">
          <div className="sticky top-8 space-y-8">
            {/* Portrait Ad 1 */}
            <div className="flex justify-center">
              <div className="max-w-xs w-full">
                <AdBanner adType="image-portrait-1" className="m-0" />
              </div>
            </div>

            {/* Newsletter/CTA Section (Optional) */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the latest travel tips and guides delivered to your inbox.
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Portrait Ad 2 */}
            <div className="flex justify-center">
              <div className="max-w-xs w-full">
                <AdBanner adType="image-portrait-2" className="m-0" />
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Posts
              </h3>
              <div className="space-y-4">
                {newestPosts.slice(0, 4).map((recentPost) => (
                  <Link
                    key={recentPost.slug}
                    href={`/blog/${recentPost.slug}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <div className="relative w-16 h-12 shrink-0">
                        <Image
                          src={recentPost.image}
                          alt={recentPost.title}
                          fill
                          className="object-cover rounded-lg"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(recentPost.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Square Ad at bottom of sidebar */}
            <div className="flex justify-center">
              <div className="max-w-sm w-full">
                <AdBanner adType="image-square" className="m-0" />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile-only: Final ad at bottom */}
      <div className="block lg:hidden mt-12">
        <AdBanner adType="banner" className="my-6" />
      </div>
    </div>
  )
}