import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Download, FileText, Image as ImageIcon, Loader2 } from 'lucide-react'

/**
 * FileViewerModal Component
 * Hiển thị modal để xem file (ảnh, PDF, docs)
 *
 * @param {boolean} open - Modal open state
 * @param {Function} onOpenChange - Callback khi modal open/close
 * @param {Object} file - File object { name, url, type }
 */
export default function FileViewerModal({ open, onOpenChange, file }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (open && file) {
      setLoading(true)
      setError(false)

      // Với image, check nếu đã được cache
      const isImageFile = file.type?.startsWith('image/') ||
        /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name || file.url || '')

      if (isImageFile && file.url) {
        const img = new Image()
        img.onload = () => {
          setLoading(false)
        }
        img.onerror = () => {
          setError(true)
          setLoading(false)
        }
        img.src = file.url

        // Nếu image đã được cache, onload sẽ trigger ngay
        if (img.complete) {
          setLoading(false)
        }
      } else {
        // Với PDF, đợi iframe load hoặc timeout sau 3 giây
        const timeoutTimer = setTimeout(() => {
          setLoading(false)
        }, 3000)

        return () => clearTimeout(timeoutTimer)
      }
    } else {
      setLoading(true)
      setError(false)
    }
  }, [open, file])

  if (!file) return null

  const isImage = file.type?.startsWith('image/') ||
    /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.name || file.url || '')
  const isPdf = file.type === 'application/pdf' ||
    /\.pdf$/i.test(file.name || file.url || '')

  // Thêm parameter để ẩn sidebar và toolbar trong PDF viewer
  const getPdfUrl = (url) => {
    if (!url) return url
    const separator = url.includes('#') ? '&' : '#'
    return `${url}${separator}navpanes=0&toolbar=0`
  }

  const handleDownload = () => {
    if (file.url) {
      // Mở link trong tab mới
      window.open(file.url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleImageLoad = () => {
    setLoading(false)
  }

  const handleImageError = () => {
    setError(true)
    setLoading(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 [&>button]:hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {isImage ? (
                <ImageIcon className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
              <span className="truncate max-w-md">{file.name || 'File'}</span>
            </DialogTitle>
            <div className="flex items-center gap-2">
              {file.url && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Đang tải file...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Không thể tải file. Vui lòng thử lại hoặc tải xuống để xem.
              </p>
              {file.url && (
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              )}
            </div>
          ) : isImage ? (
            <div className="flex items-center justify-center">
              <img
                src={file.url || file}
                alt={file.name || 'Image'}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
                onLoad={(e) => {
                  // Check nếu image đã complete
                  if (e.target.complete) {
                    handleImageLoad()
                  }
                }}
                onError={handleImageError}
                onLoadStart={() => setLoading(true)}
              />
            </div>
          ) : isPdf ? (
            <div className="w-full h-[70vh] relative">
              <iframe
                src={getPdfUrl(file.url || file)}
                className="w-full h-full border rounded-lg"
                title={file.name || 'PDF'}
                onLoad={() => {
                  setLoading(false)
                  setError(false)
                }}
                onError={() => {
                  setError(true)
                  setLoading(false)
                }}
                style={{ display: loading ? 'none' : 'block' }}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background">
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">
                Không thể xem trước file này. Vui lòng tải xuống để xem.
              </p>
              {file.url && (
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Tải xuống
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

