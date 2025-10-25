interface FieldProps {
  label: string
  value?: string
}

export const Field = ({ label, value }: FieldProps) => (
  <div>
    <label className="block text-xs font-medium text-gray-500 mb-1.5">{label}</label>
    <p className="text-sm text-gray-900 min-h-[1.25rem]">{value || '-'}</p>
  </div>
)
