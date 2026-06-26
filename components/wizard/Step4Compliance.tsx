import { PolicyFormData } from '@/lib/types'

interface Props {
  data: PolicyFormData
  onChange: (key: keyof PolicyFormData, value: boolean) => void
  onNext: () => void
  onBack: () => void
}

const REGIONS: { key: keyof PolicyFormData; label: string; flag: string; desc: string }[] = [
  { key: 'servesUS', label: 'United States', flag: '🇺🇸', desc: 'CCPA / COPPA may apply' },
  { key: 'servesEU', label: 'European Union / EEA', flag: '🇪🇺', desc: 'GDPR & EU AI Act apply' },
  { key: 'servesUK', label: 'United Kingdom', flag: '🇬🇧', desc: 'UK GDPR applies' },
  { key: 'servesCA', label: 'Canada', flag: '🇨🇦', desc: 'PIPEDA / Bill C-27 applies' },
  { key: 'servesGlobal', label: 'Global / All regions', flag: '🌍', desc: 'Include all applicable regulations' },
]

export default function Step4Compliance({ data, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Compliance regions</h2>
      <p className="text-gray-500 text-sm mb-6">
        Select all regions where your users are located. We'll include the right legal clauses for each.
      </p>

      <div className="space-y-2">
        {REGIONS.map(({ key, label, flag, desc }) => (
          <label
            key={key}
            className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors
              ${data[key] ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
          >
            <input
              type="checkbox"
              checked={data[key] as boolean}
              onChange={e => onChange(key, e.target.checked)}
              className="w-4 h-4 accent-blue-600"
            />
            <span className="text-xl" aria-hidden>{flag}</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
            </div>
          </label>
        ))}
      </div>

      {(data.servesEU || data.servesGlobal) && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <strong>GDPR note:</strong> Serving EU users means GDPR applies. Your generated documents will include
          lawful basis disclosures, data subject rights, and DPA contact information.
        </div>
      )}

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onNext} className="btn-primary">Next: Business model →</button>
      </div>
    </div>
  )
}
