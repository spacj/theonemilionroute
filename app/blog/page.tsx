import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/mdx'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All Articles</h1>
        <p className="text-gray-600 text-lg">
          Explore our collection of articles on web development, technology, and more.
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
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag.toLowerCase()}`}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
                  >
                    {tag}
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