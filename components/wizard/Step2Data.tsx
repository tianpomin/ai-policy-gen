import { PolicyFormData } from '@/lib/types'

interface Props {
  data: PolicyFormData
  onChange: (key: keyof PolicyFormData, value: boolean) => void
  onNext: () => void
  onBack: () => void
}

const DATA_TYPES: { key: keyof PolicyFormData; label: string; desc: string }[] = [
  { key: 'collectsEmail', label: 'Email addresses', desc: 'For accounts, newsletters, or communication' },
  { key: 'collectsName', label: 'Names', desc: 'First name, last name, or display name' },
  { key: 'collectsPayment', label: 'Payment information', desc: 'Credit card, billing address, transaction data' },
  { key: 'collectsLocation', label: 'Location data', desc: 'GPS, IP-based location, or city/country' },
  { key: 'collectsDeviceInfo', label: 'Device & browser info', desc: 'Browser type, OS, device model, identifiers' },
  { key: 'collectsUsageData', label: 'Usage analytics', desc: 'Pages visited, clicks, session duration' },
  { key: 'collectsUserContent', label: 'User-generated content', desc: 'Uploads, posts, messages, or files' },
]

export default function Step2Data({ data, onChange, onNext, onBack }: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Data you collect</h2>
      <p className="text-gray-500 text-sm mb-6">Select everything your product collects from users.</p>

      <div className="space-y-2">
        {DATA_TYPES.map(({ key, label, desc }) => (
          <CheckCard
            key={key}
            checked={data[key] as boolean}
            onChange={v => onChange(key, v)}
            label={label}
            desc={desc}
          />
        ))}
      </div>

      <div className="border-t border-gray-100 mt-6 pt-5 space-y-2">
        <CheckCard
          checked={data.usesCookies}
          onChange={v => onChange('usesCookies', v)}
          label="Cookies & tracking technologies"
          desc="Analytics cookies, session cookies, or third-party trackers"
        />
        <CheckCard
          checked={data.collectsChildrenData}
          onChange={v => onChange('collectsChildrenData', v)}
          label="Data from children under 13"
          desc="Your product may be used by or targets minors (COPPA applies)"
        />
      </div>

      <div className="mt-8 flex justify-between">
        <button onClick={onBack} className="btn-secondary">← Back</button>
        <button onClick={onNext} className="btn-primary">Next: AI features →</button>
      </div>
    </div>
  )
}

function CheckCard({ checked, onChange, label, desc }: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  desc: string
}) {
  return (
    <label className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors
      ${checked ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600"
      />
      <div>
        <div className="text-sm font-medium text-gray-800">{label}</div>
        <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
      </div>
    </label>
  )
}
