import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

/**
 * ConfirmModal Component
 * Modal xác nhận hành động
 * 
 * @param {boolean} open - Modal open state
 * @param {Function} onOpenChange - Callback khi modal open/close
 * @param {string} title - Tiêu đề modal
 * @param {string} description - Mô tả/xác nhận
 * @param {string} confirmText - Text nút xác nhận (mặc định: "Xác nhận")
 * @param {string} cancelText - Text nút hủy (mặc định: "Hủy")
 * @param {string} variant - Variant của nút xác nhận ("default" | "destructive")
 * @param {Function} onConfirm - Callback khi xác nhận
 * @param {Function} onCancel - Callback khi hủy
 */
export default function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  variant = 'default',
  onConfirm,
  onCancel,
}) {
  const handleConfirm = () => {
    onConfirm?.()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            {title}
          </DialogTitle>
          <DialogDescription className="pt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'default'}
            onClick={handleConfirm}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

