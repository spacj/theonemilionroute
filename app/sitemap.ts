// app/sitemap.tsx - Fixed MDX Content Sitemap
import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface MDXPost {
  slug: string
  title: string
  date: string
  lastModified?: string
  category?: string
  featured?: boolean
  priority?: number
  changeFreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
}

// Configuration - adjust these paths to match your setup
const CONTENT_DIR = path.join(process.cwd(), 'content')
const BLOG_DIR = path.join(CONTENT_DIR, 'blog')
const GUIDES_DIR = path.join(CONTENT_DIR, 'guides')

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }
  
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name)
      
      if (item.isDirectory()) {
        files.push(...getAllMDXFiles(fullPath))
      } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
        files.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }
  
  return files
}

function parseMDXFile(filePath: string, contentType: 'blog' | 'guide' | 'article' = 'blog'): MDXPost | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontMatter } = matter(fileContent)
    
    // Extract slug from file path
    const relativePath = path.relative(CONTENT_DIR, filePath)
    const slug = relativePath
      .replace(/\.(mdx?|md)$/, '')
      .replace(/\\/g, '/')
    
    // Get file stats for last modified date
    const stats = fs.statSync(filePath)
    
    // Ensure date is in proper format
    let postDate = frontMatter.date || frontMatter.publishedAt || stats.birthtime.toISOString()
    if (typeof postDate === 'string' && !postDate.includes('T')) {
      // If date is just YYYY-MM-DD, add time
      postDate = `${postDate}T00:00:00Z`
    }
    
    let lastModified = frontMatter.lastModified || frontMatter.updated || stats.mtime.toISOString()
    if (typeof lastModified === 'string' && !lastModified.includes('T')) {
      lastModified = `${lastModified}T00:00:00Z`
    }
    
    return {
      slug,
      title: frontMatter.title || 'Untitled',
      date: postDate,
      lastModified,
      category: frontMatter.category || frontMatter.tags?.[0] || contentType,
      featured: frontMatter.featured || false,
      priority: frontMatter.priority,
      changeFreq: frontMatter.changeFreq || 'monthly'
    }
  } catch (error) {
    console.error(`Error parsing MDX file ${filePath}:`, error)
    return null
  }
}

function calculatePriority(post: MDXPost): number {
  if (post.priority) {
    return Math.min(Math.max(post.priority, 0.1), 0.9)
  }
  
  let priority = 0.6
  
  if (post.featured) {
    priority += 0.1
  }
  
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const postDate = new Date(post.lastModified || post.date)
  
  if (postDate > sixMonthsAgo) {
    priority += 0.05
  }
  
  const highPriorityCategories = [
    'investing', 'budgeting', 'savings', 'retirement', 
    'guide', 'tutorial', 'money-management'
  ]
  
  if (post.category && highPriorityCategories.some(cat => 
    post.category!.toLowerCase().includes(cat)
  )) {
    priority += 0.05
  }
  
  return Math.min(priority, 0.8)
}

function getChangeFrequency(post: MDXPost): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  if (post.changeFreq) {
    return post.changeFreq
  }
  
  if (post.category) {
    const category = post.category.toLowerCase()
    
    if (category.includes('news') || category.includes('update')) {
      return 'weekly'
    }
    
    if (category.includes('guide') || category.includes('tutorial')) {
      return 'monthly'
    }
    
    if (category.includes('review') || category.includes('comparison')) {
      return 'monthly'
    }
  }
  
  return 'monthly'
}

async function getAllPosts(): Promise<MDXPost[]> {
  const posts: MDXPost[] = []
  
  if (fs.existsSync(BLOG_DIR)) {
    const blogFiles = getAllMDXFiles(BLOG_DIR)
    for (const file of blogFiles) {
      const post = parseMDXFile(file, 'blog')
      if (post) posts.push(post)
    }
  }
  
  if (fs.existsSync(GUIDES_DIR)) {
    const guideFiles = getAllMDXFiles(GUIDES_DIR)
    for (const file of guideFiles) {
      const post = parseMDXFile(file, 'guide')
      if (post) posts.push(post)
    }
  }
  
  if (!fs.existsSync(BLOG_DIR) && !fs.existsSync(GUIDES_DIR)) {
    const allFiles = getAllMDXFiles(CONTENT_DIR)
    for (const file of allFiles) {
      const post = parseMDXFile(file, 'article')
      if (post) posts.push(post)
    }
  }
  
  return posts.filter(post => {
    // Filter out drafts and invalid posts
    return post.title !== 'Untitled' && !post.title.toLowerCase().includes('draft')
  })
}

function getUniqueCategories(posts: MDXPost[]): string[] {
  const categories = new Set<string>()
  
  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category)
    }
  })
  
  return Array.from(categories)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure base URL is set
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  
  if (!baseUrl) {
    console.error('NEXT_PUBLIC_BASE_URL environment variable is not set!')
    throw new Error('NEXT_PUBLIC_BASE_URL is required for sitemap generation')
  }
  
  const posts = await getAllPosts()
  const categories = getUniqueCategories(posts)
  
  console.log(`Sitemap: Found ${posts.length} MDX posts and ${categories.length} categories`)
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2024-01-15T00:00:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2024-01-10T00:00:00Z'),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
  
  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Blog post pages - URL structure: /blog/post-slug
  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`, // Matches: /blog/freecash-review
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: getChangeFrequency(post),
    priority: calculatePriority(post),
  }))
  
  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...postPages,
  ]
  
  return allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))
}