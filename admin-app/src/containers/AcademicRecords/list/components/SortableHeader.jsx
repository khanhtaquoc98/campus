import { ChevronDown, ChevronUp } from 'lucide-react'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'

export default function SortableHeader({ title, sortField, currentSortField, sortDirection, onSort, className }) {
  const isActive = sortField === currentSortField

  return (
    <TableHead className={cn('text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground', className)}>
      <div
        className="flex items-center gap-1"
        onClick={() => onSort(sortField)}
      >
        <span>{title}</span>
        {isActive ? (
          sortDirection === 'asc' ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronUp className="h-3 w-3" />
          )
        ) : (
          <ChevronDown className="h-3 w-3 opacity-50" />
        )}
      </div>
    </TableHead>
  )
}

