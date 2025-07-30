import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/mdx'
import { Calendar, Clock } from 'lucide-react'

interface RelatedPostsProps {
  posts: Post[]
  title: string
}

export default function RelatedPosts({ posts, title }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex space-x-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={120}
              height={80}
              className="w-24 h-16 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(post.date).toLocaleDateString()}
                <span className="mx-2">•</span>
                <Clock className="w-3 h-3 mr-1" />
                {post.readingTime}
              </div>
              <p className="text-gray-600 text-sm line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}