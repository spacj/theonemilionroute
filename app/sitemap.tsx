// app/sitemap.tsx - MDX Content Sitemap
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
const CONTENT_DIR = path.join(process.cwd(), 'content') // or 'posts', 'articles', etc.
const BLOG_DIR = path.join(CONTENT_DIR, 'blog') // if you have subdirectories
const GUIDES_DIR = path.join(CONTENT_DIR, 'guides')

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = []
  
  if (!fs.existsSync(dir)) {
    return files
  }
  
  const items = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    
    if (item.isDirectory()) {
      // Recursively get files from subdirectories
      files.push(...getAllMDXFiles(fullPath))
    } else if (item.name.endsWith('.mdx') || item.name.endsWith('.md')) {
      files.push(fullPath)
    }
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
      .replace(/\\/g, '/') // Handle Windows paths
    
    // Get file stats for last modified date
    const stats = fs.statSync(filePath)
    
    return {
      slug,
      title: frontMatter.title || 'Untitled',
      date: frontMatter.date || frontMatter.publishedAt || stats.birthtime.toISOString(),
      lastModified: frontMatter.lastModified || frontMatter.updated || stats.mtime.toISOString(),
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
  // Use manual priority if set in frontmatter
  if (post.priority) {
    return Math.min(Math.max(post.priority, 0.1), 0.9)
  }
  
  let priority = 0.6 // Base priority
  
  // Featured content
  if (post.featured) {
    priority += 0.1
  }
  
  // Recent content (last 6 months)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  const postDate = new Date(post.lastModified || post.date)
  
  if (postDate > sixMonthsAgo) {
    priority += 0.05
  }
  
  // Category-based priority
  const highPriorityCategories = [
    'investing', 'budgeting', 'savings', 'retirement', 
    'guide', 'tutorial', 'money-management'
  ]
  
  if (post.category && highPriorityCategories.some(cat => 
    post.category!.toLowerCase().includes(cat)
  )) {
    priority += 0.05
  }
  
  return Math.min(priority, 0.8) // Cap at 0.8 for content pages
}

function getChangeFrequency(post: MDXPost): 'daily' | 'weekly' | 'monthly' | 'yearly' {
  // Use manual setting if provided
  if (post.changeFreq) {
    return post.changeFreq
  }
  
  // Base on category or content type
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
  
  return 'monthly' // Default
}

async function getAllPosts(): Promise<MDXPost[]> {
  const posts: MDXPost[] = []
  
  // Get blog posts
  if (fs.existsSync(BLOG_DIR)) {
    const blogFiles = getAllMDXFiles(BLOG_DIR)
    for (const file of blogFiles) {
      const post = parseMDXFile(file, 'blog')
      if (post) posts.push(post)
    }
  }
  
  // Get guides
  if (fs.existsSync(GUIDES_DIR)) {
    const guideFiles = getAllMDXFiles(GUIDES_DIR)
    for (const file of guideFiles) {
      const post = parseMDXFile(file, 'guide')
      if (post) posts.push(post)
    }
  }
  
  // If you have a flat content structure, just scan the main content dir
  if (!fs.existsSync(BLOG_DIR) && !fs.existsSync(GUIDES_DIR)) {
    const allFiles = getAllMDXFiles(CONTENT_DIR)
    for (const file of allFiles) {
      const post = parseMDXFile(file, 'article')
      if (post) posts.push(post)
    }
  }
  
  // Filter out drafts and unpublished content
  return posts.filter(post => {
    // Add your filtering logic here
    // e.g., exclude posts with draft: true in frontmatter
    return post.title !== 'Untitled'
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
  
  // Get all MDX posts
  const posts = await getAllPosts()
  const categories = getUniqueCategories(posts)
  
  console.log(`Found ${posts.length} MDX posts and ${categories.length} categories`)
  
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
      lastModified: new Date('2024-01-15T00:00:00Z'), // Update with actual date
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2024-01-10T00:00:00Z'), // Update with actual date
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ]
  
  // Category pages (if you have them)
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Blog post pages
  const postPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${baseUrl}/${post.slug}`, // Adjust URL structure as needed
    lastModified: new Date(post.lastModified || post.date),
    changeFrequency: getChangeFrequency(post),
    priority: calculatePriority(post),
  }))
  
  // Combine all pages
  const allPages = [
    ...staticPages,
    ...categoryPages,
    ...postPages,
  ]
  
  // Sort by priority (highest first)
  return allPages.sort((a, b) => (b.priority || 0) - (a.priority || 0))
}