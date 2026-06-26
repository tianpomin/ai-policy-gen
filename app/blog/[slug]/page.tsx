import Link from 'next/link'
import { getAllPosts, getPost } from '@/lib/blog'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const posts = getAllPosts()
  const meta = posts.find(p => p.slug === slug)
  if (!meta) return {}
  return {
    title: `${meta.title} — AI Policy Gen`,
    description: meta.description,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const slugs = getAllPosts().map(p => p.slug)
  if (!slugs.includes(slug)) notFound()

  const post = await getPost(slug)

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-bold text-lg">AI Policy Gen</Link>
          <Link href="/generate" className="btn-primary text-sm">Generate for free →</Link>
        </div>
      </nav>

      <article className="max-w-2xl mx-auto px-4 py-16">
        <Link href="/blog" className="text-sm text-blue-600 hover:underline mb-6 inline-block">← All articles</Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <div
          className="prose prose-gray prose-sm max-w-none
            prose-headings:font-semibold prose-headings:text-gray-900
            prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2
            prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
            prose-li:text-gray-600 prose-li:leading-relaxed
            prose-strong:text-gray-800
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-code:bg-gray-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-gray-700
            prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:rounded-lg
            prose-blockquote:border-l-blue-200 prose-blockquote:text-gray-600
            prose-table:text-sm prose-th:text-left prose-th:font-medium"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-16 p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <h2 className="font-semibold text-gray-900 mb-2">Generate your AI-ready legal documents</h2>
          <p className="text-sm text-gray-600 mb-4">
            Free privacy policy and terms of service specifically built for AI products.
            Covers everything in this article — takes 3 minutes.
          </p>
          <Link href="/generate" className="btn-primary inline-block text-sm">
            Generate for free →
          </Link>
        </div>
      </article>

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        AI Policy Gen · Free legal document generator for AI products ·{' '}
        Not legal advice — consult a qualified attorney for your specific situation
      </footer>
    </div>
  )
}
