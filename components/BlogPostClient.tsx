// components/BlogPostClient.tsx
'use client'

import { MDXRemote } from 'next-mdx-remote'
import Image from 'next/image'
import AdBanner from '@/components/AdBanner'
import SocialShare from '@/components/SocialShare'
import RelatedPosts from '@/components/RelatedPosts'

const components = {
  AdBanner,
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={400}
      className="rounded-lg my-8"
      alt={props.alt || ''}
    />
  ),
}

interface BlogPostClientProps {
  post: {
    title: string
    slug: string
    content: any
  }
  relatedPosts: any[]
  newestPosts: any[]
}

export default function BlogPostClient({ post, relatedPosts, newestPosts }: BlogPostClientProps) {
  return (
    <>
      <div className="prose-custom">
        <MDXRemote {...post.content} components={components} />
      </div>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <SocialShare title={post.title} url={`/blog/${post.slug}`} />
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <RelatedPosts posts={relatedPosts} title="Related Articles" />
        <RelatedPosts posts={newestPosts} title="Latest Articles" />
      </div>
    </>
  )
}