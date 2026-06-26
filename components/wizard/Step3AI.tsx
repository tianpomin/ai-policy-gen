import { PolicyFormData } from '@/lib/types'

interface Props {
  data: PolicyFormData
  onChange: (key: keyof PolicyFormData, value: unknown) => void
  onNext: () => void
  onBack: () => void
}

const AI_PROVIDERS = [
  { id: 'openai', label: 'OpenAI', sub: 'ChatGPT / GPT-4 / DALL·E' },
  { id: 'anthropic', label: 'Anthropic', sub: 'Claude' },
  { id: 'google', label: 'Google', sub: 'Gemini / Vertex AI' },
  { id: 'azure', label: 'Microsoft Azure', sub: 'Azure OpenAI Service' },
  { id: 'self-hosted', label: 'Self-hosted models', sub: 'Llama, Mistral, etc.' },
  { id: 'other', label: 'Other', sub: 'Another provider' },
]

export default function Step3AI({ data, onChange, onNext, onBack }: Props) {
  function toggleProvider(id: string) {
    const current = data.aiProviders
    const next = current.includes(id) ? current.filter(p => p !== id) : [...current, id]
    onChange('aiProviders', next)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">AI features</h2>
      <p className="text-gray-500 text-sm mb-6">
        This is what makes your docs unique — we generate AI-specific legal clauses no generic tool covers.
      </p>

      {/* Does it use AI? */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-3">Does your product use AI or machine learning?</p>
        <div className="flex gap-3">
          {[true, false].map(v => (
            <button
              key={String(v)}
              onClick={() => onChange('usesAI', v)}
              className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-colors
                ${data.usesAI === v ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
            >
              {v ? 'Yes, it uses AI' : 'No AI features'}
            </button>
          ))}
        </div>
      </div>

      {data.usesAI && (
        <div className="space-y-6">
          {/* AI Providers */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Which AI providers do you use?</p>
            <div className="grid grid-cols-2 gap-2">
              {AI_PROVIDERS.map(({ id, label, sub }) => {
                const checked = data.aiProviders.includes(id)
                return (
                  <label key={id}
                    className={`flex items-start gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors
                      ${checked ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <input type="checkbox" checked={checked} onChange={() => toggleProvider(id)}
                      className="mt-0.5 accent-blue-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-800">{label}</div>
                      <div className="text-xs text-gray-500">{sub}</div>
                    </div>
                  </label>
                )
              })}
            </div>
            {data.aiProviders.includes('other') && (
              <input
                type="text"
                placeholder="Provider name…"
                value={data.aiProviderOther}
                onChange={e => onChange('aiProviderOther', e.target.value)}
                className="input mt-2"
              />
            )}
          </div>

          {/* User data sent to AI? */}
          <YesNo
            label="Do user inputs get sent to AI providers for processing?"
            value={data.userDataSentToAI}
            onChange={v => onChange('userDataSentToAI', v)}
          />

          {/* Training data */}
          <YesNo
            label="Is user data used to train or fine-tune AI models?"
            value={data.usesDataForTraining}
            onChange={v => onChange('usesDataForTraining', v)}
          />

          {data.usesDataForTraining && (
            <YesNo
              label="Can users opt out of having their data used for training?"
              value={data.canOptOutTraining}
              onChange={v => onChange('canOptOutTraining', v)}
            />
          )}

          {/* Automated decisions */}
          <YesNo
            label="Does AI make automated decisions that affect users (recommendations, risk scoring, access control)?"
            value={data.aiAutomatedDecisions}
            onChange={v => onChange('aiAutomatedDecisions', v)}
          />

          {/* Content ownership */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Who owns AI-generated outputs?</p>
            <div className="space-y-2">
              {[
                { v: 'user', label: 'The user', desc: 'Outputs belong to the user who prompted them' },
                { v: 'company', label: 'Your company', desc: 'You own the outputs, license them to users' },
                { v: 'shared', label: 'Shared / unclear', desc: 'Shared ownership or not yet determined' },
              ].map(({ v, label, desc }) => (
                <label key={v}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
                    ${data.aiContentOwnership === v ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <input type="radio" name="ownership" value={v} checked={data.aiContentOwnership === v}
                    onChange={() => onChange('aiContentOwnership', v)} className="mt-0.5 accent-blue-600" />
                  <div>
                    <div className="text-sm font-medium text-gray-800">{label}</div>
                    <div className="text-xs text-gray-500">{desc}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* EU AI Act */}
          <YesNo
            label="Does your product serve EU users and need EU AI Act compliance disclosures?"
            value={data.needsEuAiAct}
            onChange={v => onChange('needsEuAiAct', v)}
          />
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onNext} className="btn-primary">Next: Compliance →</button>
      </div>
    </div>
  )
}

function YesNo({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex gap-3">
        {[true, false].map(v => (
          <button key={String(v)} onClick={() => onChange(v)}
            className={`flex-1 py-2 rounded-lg border text-sm font-medium transition-colors
              ${value === v ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            {v ? 'Yes' : 'No'}
          </button>
        ))}
      </div>
    </div>
  )
}
