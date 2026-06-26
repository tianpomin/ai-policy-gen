import { PolicyFormData } from '@/lib/types'

interface Props {
  data: PolicyFormData
  onChange: (key: keyof PolicyFormData, value: string) => void
  onNext: () => void
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Netherlands', 'Sweden', 'Singapore', 'Japan', 'India', 'Brazil', 'Other',
]

export default function Step1Basic({ data, onChange, onNext }: Props) {
  const valid = data.companyName && data.appName && data.websiteUrl && data.contactEmail && data.country

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Basic information</h2>
      <p className="text-gray-500 text-sm mb-6">Tell us about your company and product.</p>

      <div className="space-y-4">
        <Field label="Company name" required>
          <input
            type="text"
            placeholder="Acme Corp"
            value={data.companyName}
            onChange={e => onChange('companyName', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Product / app name" required>
          <input
            type="text"
            placeholder="My App"
            value={data.appName}
            onChange={e => onChange('appName', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Website URL" required>
          <input
            type="url"
            placeholder="https://example.com"
            value={data.websiteUrl}
            onChange={e => onChange('websiteUrl', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Contact / privacy email" required>
          <input
            type="email"
            placeholder="privacy@example.com"
            value={data.contactEmail}
            onChange={e => onChange('contactEmail', e.target.value)}
            className="input"
          />
        </Field>

        <Field label="Country of incorporation" required>
          <select
            value={data.country}
            onChange={e => onChange('country', e.target.value)}
            className="input"
          >
            <option value="">Select country…</option>
            {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={onNext} disabled={!valid} className="btn-primary">
          Next: Data collection →
        </button>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
