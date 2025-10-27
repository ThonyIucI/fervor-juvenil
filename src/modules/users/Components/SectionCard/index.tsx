import { Pencil } from 'lucide-react'

import { Button } from '../../../../@common/components/Button'
import { Card } from '../../../../@common/components/Card'

interface SectionCardProps {
  title: string
  children: React.ReactNode
  onEdit?: () => void
}
export const SectionCard = ({ title, children, onEdit }: SectionCardProps) => (
  <Card>
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
      {onEdit && (
        <Button variant="outline" size="sm" leftIcon={<Pencil className="w-4 h-4" />}>
          Editar
        </Button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">{children}</div>
  </Card>
)
