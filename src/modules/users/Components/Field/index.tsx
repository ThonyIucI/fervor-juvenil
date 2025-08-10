interface FieldProps {
    label: string;
    value?: string;
}

export const Field = ({ label, value }: FieldProps) => (
  <div>
    <label className="block text-sm text-gray-500 mb-1">{label}</label>
    <p className="text-sm font-medium text-gray-800 min-h-[1rem]">{value || '-'}</p>
  </div>
)
