import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — AI Policy Gen',
  description: 'AI Policy Gen is a free legal document generator built specifically for AI-powered products. Generate privacy policies and terms of service that cover LLM providers, training data, EU AI Act, and more.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-blue-600 font-bold text-lg">AI Policy Gen</Link>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/generate" className="btn-primary text-sm">Generate for free →</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">About AI Policy Gen</h1>

        <div className="space-y-6 text-gray-600 text-sm leading-relaxed">
          <p>
            AI Policy Gen is a free tool that generates privacy policies and terms of service
            specifically designed for AI-powered products. Unlike generic legal document generators,
            it covers the clauses that matter for AI products: LLM provider data sharing, training
            data disclosure, EU AI Act transparency obligations, and automated decision-making rights.
          </p>

          <p>
            The tool was built because most AI founders and indie developers ship products without
            proper legal coverage — not because they don't care, but because existing generators
            weren't built with AI products in mind. A privacy policy that says "we don't share data
            with third parties" is actively misleading if you're calling the OpenAI API.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">What it covers</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>LLM provider disclosure (OpenAI, Anthropic, Google, Azure, and others)</li>
            <li>Training data opt-out clauses</li>
            <li>EU AI Act transparency disclosures</li>
            <li>GDPR Article 22 — automated decision-making rights</li>
            <li>CCPA, GDPR, UK GDPR, and PIPEDA compliance</li>
            <li>AI-generated content ownership</li>
            <li>Refund policies, UGC terms, and newsletter disclosures</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">How it works</h2>
          <p>
            Answer a short questionnaire about your product — about 3 minutes — and the tool
            assembles a privacy policy and terms of service from verified legal templates. No AI
            is used to generate the text; the output is deterministic, template-based, and
            human-reviewed. You can copy the text directly or download it as an HTML file.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">Legal disclaimer</h2>
          <p>
            AI Policy Gen generates document templates for informational purposes only. The output
            does not constitute legal advice and does not create an attorney-client relationship.
            Laws vary by jurisdiction and change over time. We strongly recommend consulting a
            qualified attorney before publishing legal documents for your product.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 pt-4">Contact</h2>
          <p>
            Questions, feedback, or concerns? Reach us at{' '}
            <a href="mailto:wyss0513@gmail.com" className="text-blue-600 hover:underline">
              wyss0513@gmail.com
            </a>
          </p>
        </div>
      </div>

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        AI Policy Gen · Free legal document generator for AI products ·{' '}
        Not legal advice — consult a qualified attorney for your specific situation
      </footer>
    </div>
  )
}
