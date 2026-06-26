'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PolicyFormData, defaultFormData } from '@/lib/types'
import StepProgress from '@/components/wizard/StepProgress'
import Step1Basic from '@/components/wizard/Step1Basic'
import Step2Data from '@/components/wizard/Step2Data'
import Step3AI from '@/components/wizard/Step3AI'
import Step4Compliance from '@/components/wizard/Step4Compliance'
import Step5Business from '@/components/wizard/Step5Business'

export default function GeneratePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<PolicyFormData>(defaultFormData)

  function update(key: keyof PolicyFormData, value: unknown) {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  function handleGenerate() {
    sessionStorage.setItem('policyFormData', JSON.stringify(formData))
    router.push('/generate/result')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <a href="/" className="text-blue-600 font-semibold text-lg tracking-tight">AI Policy Gen</a>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500 text-sm">Legal documents for AI products</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <StepProgress current={step} />

        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          {step === 1 && (
            <Step1Basic
              data={formData}
              onChange={(key, value) => update(key, value)}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <Step2Data
              data={formData}
              onChange={(key, value) => update(key, value)}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3AI
              data={formData}
              onChange={update}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4Compliance
              data={formData}
              onChange={(key, value) => update(key, value)}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <Step5Business
              data={formData}
              onChange={update}
              onGenerate={handleGenerate}
              onBack={() => setStep(4)}
            />
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Free to use · No account required · Not legal advice — consult a lawyer for your specific needs
        </p>
      </main>
    </div>
  )
}
