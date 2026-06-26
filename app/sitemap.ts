import { getAllPosts } from '@/lib/blog'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE = 'https://ai-policy-gen.pages.dev'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const blogUrls = posts.map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/generate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...blogUrls,
  ]
}
