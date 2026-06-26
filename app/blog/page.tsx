import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog — AI Policy Gen',
  description: 'Guides on privacy policies, terms of service, GDPR, CCPA, and EU AI Act compliance for AI-powered products.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-bold text-lg">AI Policy Gen</Link>
          <Link href="/generate" className="btn-primary text-sm">Generate for free →</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500 mb-12 text-sm">Legal compliance guides for AI product builders.</p>

        <div className="space-y-10">
          {posts.map(post => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">{post.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <span>·</span>
                <span>{post.readingTime} min read</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        AI Policy Gen · Free legal document generator for AI products ·{' '}
        Not legal advice — consult a qualified attorney for your specific situation
      </footer>
    </div>
  )
}
