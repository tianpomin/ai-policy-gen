import { PolicyFormData } from '@/lib/types'

interface Props {
  data: PolicyFormData
  onChange: (key: keyof PolicyFormData, value: unknown) => void
  onGenerate: () => void
  onBack: () => void
}

export default function Step5Business({ data, onChange, onGenerate, onBack }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Business model</h2>
      <p className="text-gray-500 text-sm mb-6">Last step — a few details about how your product works.</p>

      <div className="space-y-5">
        <YesNo
          label="Does your product have paid plans or subscriptions?"
          value={data.hasPaidPlan}
          onChange={v => onChange('hasPaidPlan', v)}
        />

        {data.hasPaidPlan && (
          <div className="pl-4 border-l-2 border-blue-200 space-y-4">
            <YesNo
              label="Do you offer a refund policy?"
              value={data.hasRefundPolicy}
              onChange={v => onChange('hasRefundPolicy', v)}
            />
            {data.hasRefundPolicy && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Refund window (days)
                </label>
                <select
                  value={data.refundDays}
                  onChange={e => onChange('refundDays', Number(e.target.value))}
                  className="input w-40"
                >
                  {[7, 14, 30, 60, 90].map(d => (
                    <option key={d} value={d}>{d} days</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        <YesNo
          label="Does your product allow users to post or upload content (UGC)?"
          value={data.hasUGC}
          onChange={v => onChange('hasUGC', v)}
        />

        <YesNo
          label="Do you send a newsletter or marketing emails?"
          value={data.hasNewsletter}
          onChange={v => onChange('hasNewsletter', v)}
        />
      </div>

      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
        ✓ Ready to generate your <strong>Privacy Policy</strong> and <strong>Terms of Service</strong>
        {data.usesAI && <> with <strong>AI-specific clauses</strong></>}.
      </div>

      <div className="mt-4 flex justify-between">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onGenerate} className="btn-primary bg-green-600 hover:bg-green-700">
          Generate documents →
        </button>
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
