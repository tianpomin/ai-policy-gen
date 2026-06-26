import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata: Metadata = {
  title: 'AI Policy Gen — Legal Documents for AI Products',
  description:
    'Generate a Privacy Policy and Terms of Service specifically built for AI-powered products. Covers AI training data disclosure, LLM provider sharing, EU AI Act, GDPR, and CCPA. Free.',
  keywords: 'privacy policy generator AI, terms of service AI app, GDPR AI product, EU AI Act compliance, LLM privacy policy',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
