import Link from 'next/link'

const FEATURES = [
  { icon: '🤖', title: 'AI provider disclosure', desc: 'Names OpenAI, Anthropic, Google, Azure, and others in your data sharing clauses.' },
  { icon: '🎓', title: 'Training data clauses', desc: 'Covers whether you use user data to fine-tune models, with opt-out rights.' },
  { icon: '⚖️', title: 'EU AI Act compliance', desc: 'Generates transparency disclosures required by the EU AI Act.' },
  { icon: '🌍', title: 'GDPR + CCPA ready', desc: 'Includes the right clauses for EU, UK, California, Canada, and more.' },
  { icon: '©️', title: 'AI output ownership', desc: 'Clarifies who owns AI-generated content — company, user, or shared.' },
  { icon: '🚫', title: 'Automated decision rights', desc: "Addresses users' right to contest automated AI decisions (GDPR Art. 22)." },
]

const COMPARISON = [
  ['Training data disclosure', false, true],
  ['AI provider naming', false, true],
  ['EU AI Act clauses', false, true],
  ['AI content ownership', false, true],
  ['Automated decision rights', false, true],
  ['GDPR / CCPA', true, true],
] as [string, boolean, boolean][]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">AI Policy Gen</span>
          <div className="flex items-center gap-4">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</Link>
            <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</Link>
            <Link href="/generate" className="btn-primary text-sm">Generate for free →</Link>
          </div>
        </div>
      </nav>

      <section className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-6 border border-blue-100">
          ✨ Built specifically for AI products — not a generic generator
        </div>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-5">
          Legal documents for<br />
          <span className="text-blue-600">AI-powered products</span>
        </h1>
        <p className="text-lg text-gray-500 mb-8 max-w-xl mx-auto">
          Generate a Privacy Policy and Terms of Service that cover AI training data,
          LLM provider disclosure, EU AI Act, and automated decision-making rights.
          Free. No account required.
        </p>
        <Link href="/generate" className="inline-block btn-primary text-base px-8 py-3">
          Generate my documents →
        </Link>
        <p className="text-xs text-gray-400 mt-3">Takes about 3 minutes · Privacy Policy + Terms of Service</p>
      </section>

      <section className="max-w-2xl mx-auto px-4 pb-20">
        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">What generic generators miss</h2>
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left px-5 py-3 font-medium text-gray-600">Clause</th>
                <th className="text-center px-4 py-3 font-medium text-gray-400">Generic tool</th>
                <th className="text-center px-4 py-3 font-medium text-blue-600">AI Policy Gen</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, generic, us], i) => (
                <tr key={label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-5 py-3 text-gray-700">{label}</td>
                  <td className="text-center px-4 py-3 text-lg">{generic ? '✅' : '❌'}</td>
                  <td className="text-center px-4 py-3 text-lg">{us ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-center text-xl font-semibold text-gray-900 mb-10">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to get compliant?</h2>
        <p className="text-gray-500 mb-6 text-sm">Free forever. No sign-up. Download as HTML.</p>
        <Link href="/generate" className="inline-block btn-primary text-base px-8 py-3">
          Generate for free →
        </Link>
      </section>

      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        AI Policy Gen · Free legal document generator for AI products ·{' '}
        Not legal advice — consult a qualified attorney for your specific situation
      </footer>
    </div>
  )
}
