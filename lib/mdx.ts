import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { serialize } from 'next-mdx-remote/serialize'
import type { MDXRemoteSerializeResult } from 'next-mdx-remote'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  subtitle: string
  date: string
  image: string
  tags: string[]
  author: string
  readingTime: string
  excerpt: string
}

export interface SerializedPost extends Post {
  content: MDXRemoteSerializeResult
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      const readTime = readingTime(content)

      return {
        slug,
        title: data.title,
        subtitle: data.subtitle,
        date: data.date,
        image: data.image,
        tags: data.tags || [],
        author: data.author,
        readingTime: readTime.text,
        excerpt: data.excerpt || content.slice(0, 200) + '...',
      }
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<SerializedPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const readTime = readingTime(content)

    const mdxSource = await serialize(content)

    return {
      slug,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      image: data.image,
      tags: data.tags || [],
      author: data.author,
      readingTime: readTime.text,
      excerpt: data.excerpt || content.slice(0, 200) + '...',
      content: mdxSource,
    }
  } catch (error) {
    return null
  }
}

export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) =>
    post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = allPosts.flatMap((post) => post.tags)
  return [...new Set(tags)]
}

export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): Post[] {
  const allPosts = getAllPosts()

  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit)

  if (relatedPosts.length < limit) {
    const remainingPosts = allPosts
      .filter((post) => post.slug !== currentSlug)
      .filter((post) => !relatedPosts.includes(post))
      .slice(0, limit - relatedPosts.length)

    return [...relatedPosts, ...remainingPosts]
  }

  return relatedPosts
}
