import { Pencil } from 'lucide-react'

import { Button } from '../../../../@common/components/Button'
import { Card } from '../../../../@common/components/Card'

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
    onEdit?: () => void;
}
export const SectionCard = ({ title, children, onEdit }: SectionCardProps) => (
  <Card>
    <div className="flex justify-between items-center mb-4">
      <h3 className="font-semibold text-base text-gray-800">{title}</h3>
      {onEdit && (
        <Button
          leftIcon={<Pencil className="w-4 h-4 mr-1" />}
        >
                    Editar
        </Button>
      )}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
      {children}
    </div>
  </Card>
)
