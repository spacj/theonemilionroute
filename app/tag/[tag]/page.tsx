import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPostsByTag, getAllTags } from '@/lib/mdx'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: { tag: string }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: tag.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `Articles tagged with "${tag}"`,
    description: `Browse all articles tagged with ${tag}. Find related content and insights.`,
  }
}

export default function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const posts = getPostsByTag(tag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <Tag className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-4xl font-bold text-gray-900">
            Articles tagged with "{tag}"
          </h1>
        </div>
        <p className="text-gray-600">
          {posts.length} article{posts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
                <span className="mx-2">•</span>
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((postTag) => (
                  <Link
                    key={postTag}
                    href={`/tag/${postTag.toLowerCase()}`}
                    className={`px-2 py-1 rounded text-sm transition-colors ${
                      postTag.toLowerCase() === tag.toLowerCase()
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {postTag}
                  </Link>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}