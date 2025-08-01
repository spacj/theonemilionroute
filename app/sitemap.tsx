// app/sitemap.tsx - SEO Optimized Version
import { MetadataRoute } from 'next'

interface Post {
  slug: string
  updatedAt: string
  publishedAt: string
  title: string
  featured?: boolean
}

interface Product {
  id: string
  updatedAt: string
  createdAt: string
  name: string
  category: string
}

interface Page {
  slug: string
  updatedAt: string
  importance: 'high' | 'medium' | 'low'
}

// Helper function to calculate priority based on page importance and recency
function calculatePriority(
  importance: 'high' | 'medium' | 'low', 
  lastModified: Date,
  isFeatured: boolean = false
): number {
  let basePriority = 0.5
  
  // Set base priority by importance
  switch (importance) {
    case 'high':
      basePriority = 0.9
      break
    case 'medium':
      basePriority = 0.7
      break
    case 'low':
      basePriority = 0.5
      break
  }
  
  // Boost priority for featured content
  if (isFeatured) {
    basePriority = Math.min(basePriority + 0.1, 1.0)
  }
  
  // Slightly boost recent content (within last 30 days)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
  
  if (lastModified > thirtyDaysAgo) {
    basePriority = Math.min(basePriority + 0.05, 1.0)
  }
  
  return Math.round(basePriority * 10) / 10 // Round to 1 decimal place
}

// Helper function to determine change frequency based on content type
function getChangeFrequency(contentType: 'static' | 'blog' | 'product' | 'news'): 
  'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' {
  switch (contentType) {
    case 'news':
      return 'daily'
    case 'blog':
      return 'monthly'
    case 'product':
      return 'weekly'
    case 'static':
    default:
      return 'monthly'
  }
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      next: { revalidate: 3600 } // Revalidate every hour
    })
    
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 3600 }
    })
    
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.onemilionroute.com/'
  
  // Fetch dynamic content
  const [posts, products] = await Promise.all([
    getPosts(),
    getProducts()
  ])

  // Static pages with strategic prioritization
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency('static'),
      priority: 1.0, // Homepage always gets highest priority
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2024-01-15'), // Use actual last update date
      changeFrequency: getChangeFrequency('static'),
      priority: 0.8, // High priority for key pages
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date('2024-02-01'),
      changeFrequency: getChangeFrequency('static'),
      priority: 0.9, // Very high for money pages
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date('2024-01-20'),
      changeFrequency: getChangeFrequency('static'),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency('blog'),
      priority: 0.6, // Blog listing page
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency('product'),
      priority: 0.8, // Product listing page
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3, // Lower priority for legal pages
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date('2024-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Blog posts with strategic prioritization
  const postEntries: MetadataRoute.Sitemap = posts
    .filter(post => post.title && post.slug) // Only include complete posts
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: getChangeFrequency('blog'),
      priority: calculatePriority('medium', new Date(post.updatedAt), post.featured),
    }))

  // Product pages with category-based prioritization
  const productEntries: MetadataRoute.Sitemap = products
    .filter(product => product.name && product.id)
    .map((product) => {
      // Higher priority for featured categories
      const isHighPriorityCategory = ['featured', 'bestseller', 'new'].includes(product.category?.toLowerCase())
      const importance = isHighPriorityCategory ? 'high' : 'medium'
      
      return {
        url: `${baseUrl}/products/${product.id}`,
        lastModified: new Date(product.updatedAt),
        changeFrequency: getChangeFrequency('product'),
        priority: calculatePriority(importance, new Date(product.updatedAt)),
      }
    })

  // Category pages (if you have them)
  const categoryEntries: MetadataRoute.Sitemap = [
    // Add your product categories here
    {
      url: `${baseUrl}/products/category/electronics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/category/clothing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Combine all entries
  const allEntries = [
    ...staticPages,
    ...postEntries,
    ...productEntries,
    ...categoryEntries,
  ]

  // Sort by priority (highest first) for better organization
  return allEntries.sort((a, b) => (b.priority || 0) - (a.priority || 0))
}