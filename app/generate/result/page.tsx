'use client'

import { useEffect, useState } from 'react'
import { PolicyFormData } from '@/lib/types'
import { generatePrivacyPolicy, GeneratedDoc } from '@/lib/generate-privacy'
import { generateTermsOfService } from '@/lib/generate-tos'

type Tab = 'privacy' | 'tos'

export default function ResultPage() {
  const [tab, setTab] = useState<Tab>('privacy')
  const [privacyDoc, setPrivacyDoc] = useState<GeneratedDoc | null>(null)
  const [tosDoc, setTosDoc] = useState<GeneratedDoc | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('policyFormData')
    if (!raw) return
    const data = JSON.parse(raw) as PolicyFormData
    setPrivacyDoc(generatePrivacyPolicy(data))
    setTosDoc(generateTermsOfService(data))
  }, [])

  function docText(doc: GeneratedDoc): string {
    return [
      doc.title,
      `Last updated: ${doc.lastUpdated}`,
      '',
      doc.intro,
      '',
      ...doc.sections.flatMap(s => [
        `## ${s.title}`,
        '',
        s.content.replace(/\*\*(.+?)\*\*/g, '$1'),
        '',
      ]),
    ].join('\n')
  }

  function docHtml(doc: GeneratedDoc): string {
    const body = [
      `<h1>${doc.title}</h1>`,
      `<p><em>Last updated: ${doc.lastUpdated}</em></p>`,
      `<p>${doc.intro}</p>`,
      ...doc.sections.map(s =>
        `<h2>${s.title}</h2>\n<p>${s.content
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n\n/g, '</p><p>')
          .replace(/\n/g, '<br />')
        }</p>`
      ),
    ].join('\n')
    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${doc.title}</title>
<style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#333}
h1{font-size:1.8rem;margin-bottom:4px}h2{font-size:1.1rem;margin-top:2rem;border-bottom:1px solid #eee;padding-bottom:4px}
p{margin:.5rem 0}em{color:#666;font-size:.9rem}</style></head><body>${body}</body></html>`
  }

  async function copyText() {
    const doc = tab === 'privacy' ? privacyDoc : tosDoc
    if (!doc) return
    await navigator.clipboard.writeText(docText(doc))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function downloadHtml() {
    const doc = tab === 'privacy' ? privacyDoc : tosDoc
    if (!doc) return
    const blob = new Blob([docHtml(doc)], { type: 'text/html' })
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: tab === 'privacy' ? 'privacy-policy.html' : 'terms-of-service.html',
    })
    a.click()
  }

  const activeDoc = tab === 'privacy' ? privacyDoc : tosDoc

  if (!privacyDoc || !tosDoc) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl mb-2">⚙️</div>
          <p className="text-gray-500">
            No document data found.{' '}
            <a href="/generate" className="text-blue-600 underline">Generate your documents</a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="text-blue-600 font-semibold text-lg">AI Policy Gen</a>
          <a href="/generate" className="text-sm text-gray-500 hover:text-gray-700">← Edit answers</a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your documents are ready</h1>
          <div className="flex gap-2">
            <button onClick={copyText} className="btn-secondary flex items-center gap-2 text-sm">
              {copied ? '✓ Copied' : '⎘ Copy text'}
            </button>
            <button onClick={downloadHtml} className="btn-primary flex items-center gap-2 text-sm">
              ↓ Download .html
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit mb-6">
          {([['privacy', 'Privacy Policy'], ['tos', 'Terms of Service']] as const).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${tab === id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Document preview */}
        {activeDoc && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-8 py-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{activeDoc.title}</h2>
              <p className="text-sm text-gray-400 mt-1">Last updated: {activeDoc.lastUpdated}</p>
            </div>
            <div className="px-8 py-6 space-y-6 text-sm text-gray-700 leading-relaxed">
              <p className="text-gray-600 italic">{activeDoc.intro}</p>
              {activeDoc.sections.map(section => (
                <div key={section.id}>
                  <h3 className="font-semibold text-gray-900 text-base mb-2">{section.title}</h3>
                  <div className="whitespace-pre-line text-gray-600">
                    {section.content.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={i} className="text-gray-800">{part.slice(2, -2)}</strong>
                        : part
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <strong>Disclaimer:</strong> These documents are generated based on your inputs and are provided for informational purposes only.
          They do not constitute legal advice. We recommend having a qualified attorney review your final documents before publishing.
        </div>
      </main>
    </div>
  )
}
