// app/blog/[slug]/page.tsx

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/mdx'
import BlogPostClient from '@/components/BlogPostClient'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

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
          url: post.image,
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
      images: [post.image],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.tags)
  const newestPosts = getAllPosts().slice(0, 3)

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-96 object-cover rounded-xl"
          priority
        />
      </header>

      {/* Use client wrapper for interactive parts */}
      <BlogPostClient 
        post={post} 
        relatedPosts={relatedPosts} 
        newestPosts={newestPosts} 
      />
    </article>
  )
}