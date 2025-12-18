import { useAppSelector } from '@/store/hooks'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * ActionFooter Component
 * Fixed footer với action buttons
 *
 * @param {Array} actions - Array of action buttons { label, onClick, variant, icon, disabled, type }
 * @param {string} formId - Form ID để submit từ bên ngoài (optional)
 * @param {string} className - Custom CSS classes (optional)
 */
export default function ActionFooter({ actions = [], formId, className }) {
  const sidebarCollapsed = useAppSelector((state) => state.global.sidebarCollapsed)

  return (
    <div
      className={cn(
        'fixed bottom-0 bg-background border-t shadow-lg z-50 transition-all duration-300',
        sidebarCollapsed ? 'left-16' : 'left-64',
        className,
      )}
      style={{ right: 0 }}
    >
      <div className="max-w-[90rem] mx-auto px-4 py-3">
        <div className="flex items-center justify-end gap-2">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={index}
                type={action.type || 'button'}
                variant={action.variant || 'default'}
                size="sm"
                onClick={action.onClick}
                disabled={action.disabled}
                form={formId}
                className={action.className}
              >
                {Icon && <Icon className="h-4 w-4 mr-2" />}
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

