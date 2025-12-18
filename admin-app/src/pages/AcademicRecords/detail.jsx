import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Phone,
  Mail,
  Download,
  FileText,
  Image as ImageIcon,
  File,
  CheckCircle2,
  XCircle,
  Edit,
  Check,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import FileViewerModal from '@/components/common/FileViewerModal'
import ConfirmModal from '@/components/common/ConfirmModal'
import ActionFooter from '@/components/common/ActionFooter'
import { Skeleton } from '@/components/ui/skeleton'

// Mock data - sẽ được thay thế bằng API call
const mockRecordDetail = {
  id: 1,
  fileCode: 'AD0000001',
  fullName: 'Nguyễn Văn A',
  aspiration: 'Cao Đẳng',
  major: 'Công nghệ thông tin',
  feeInfo: 'Chưa nộp',
  status: 'Chờ Duyệt',
  phone: '0987654321',
  email: 'nguyenvana@example.com',
  gender: 'Nam',
  dateOfBirth: '15/1/2000',
  placeOfBirth: 'Hà Nội',
  hometown: 'Hà Nội',
  idCard: '001234567890',
  permanentAddress: '123 Đường ABC, Phường XYZ, Quận Đống Đa, Hà Nội',
  contactAddress: '456 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội',
  ethnicity: 'Kinh',
  occupation: 'Nhân viên văn phòng',
  workplace: 'Công ty ABC',
  position: 'Nhân viên',
  documents: [
    {
      name: 'giay-khai-sinh.pdf',
      url: 'https://lorempdf.com/140/85/1',
      type: 'application/pdf',
    },
    {
      name: 'hoc-ba.pdf',
      url: 'https://lorempdf.com/140/85/1',
      type: 'application/pdf',
    },
    {
      name: 'cmnd.pdf',
      url: 'https://lorempdf.com/140/85/1',
      type: 'application/pdf',
    },
    {
      name: 'anh-ho-so.jpg',
      url: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/10/pdf-la-gi.jpg',
      type: 'image/jpeg',
    },
  ],
}

// Badge components
const StatusBadge = ({ value }) => {
  const colors = {
    'Chờ Duyệt': 'bg-yellow-100 text-yellow-700',
    'Đã Duyệt': 'bg-green-100 text-green-700',
    'Từ chối': 'bg-red-100 text-red-700',
  }
  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', colors[value] || 'bg-gray-100 text-gray-700')}>
      {value}
    </span>
  )
}

const AspirationBadge = ({ value }) => {
  const colors = {
    'Cao Đẳng': 'bg-purple-100 text-purple-700',
    'Trung Cấp': 'bg-blue-100 text-blue-700',
    'Khóa Học Ngắn Hạn': 'bg-green-100 text-green-700',
  }
  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-medium', colors[value] || 'bg-gray-100 text-gray-700')}>
      {value}
    </span>
  )
}

const FeeInfoBadge = ({ value }) => {
  if (value === 'Chưa nộp') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-red-100 text-red-700">
        <XCircle className="h-4 w-4" />
        <span className="text-sm font-medium">{value}</span>
      </div>
    )
  }
  if (value === 'Đã nộp') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-100 text-green-700">
        <CheckCircle2 className="h-4 w-4" />
        <span className="text-sm font-medium">{value}</span>
      </div>
    )
  }
  return (
    <span className="px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-sm font-medium">
      {value}
    </span>
  )
}

export default function AcademicRecordDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState(null)
  const [fileModalOpen, setFileModalOpen] = useState(false)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [id])

  // TODO: Fetch record detail từ API dựa trên id
  const record = mockRecordDetail

  const handleFileClick = (file) => {
    setSelectedFile(file)
    setFileModalOpen(true)
  }

  const handleDownload = (file) => {
    if (file.url) {
      // Mở link trong tab mới
      window.open(file.url, '_blank', 'noopener,noreferrer')
    }
  }

  // Helper function để lấy icon theo file type
  const getFileIcon = (fileName, fileType) => {
    const isImage = fileType?.startsWith('image/') ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName || '')
    const isPdf = fileType === 'application/pdf' ||
      /\.pdf$/i.test(fileName || '')
    const isDoc = /\.(doc|docx)$/i.test(fileName || '')

    if (isImage) {
      return <ImageIcon className="h-5 w-5 text-muted-foreground" />
    }
    if (isPdf) {
      return <FileText className="h-5 w-5 text-muted-foreground" />
    }
    if (isDoc) {
      return <File className="h-5 w-5 text-muted-foreground" />
    }
    return <FileText className="h-5 w-5 text-muted-foreground" />
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {/* Page Info Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Left Column Skeleton */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-center -mt-4 mb-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-7 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-28 rounded-md" />
                </div>
                <div className="pt-4 border-t space-y-3">
                  <Skeleton className="h-4 w-32" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column Skeleton */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-4 w-48" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Page Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Chi tiết hồ sơ</h1>
        <p className="text-muted-foreground mt-1">
          Xem thông tin chi tiết hồ sơ học sinh, sinh viên
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-4">
          {/* Basic Info */}
          <Card className="sticky top-[6.5rem]">
            {/* Status Badge - absolute center top */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-4 flex justify-center z-10">
              <StatusBadge value={record.status} />
            </div>

            <CardContent className="p-4 space-y-4">
              <div>
                <h2 className="text-xl font-bold mb-1">{record.fullName}</h2>
                <p className="text-sm text-muted-foreground">{record.fileCode}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Nguyện vọng:</p>
                <p className="font-medium">{record.aspiration}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Ngành học:</p>
                <p className="font-medium">{record.major}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">THÔNG TIN LỆ PHÍ</p>
                <FeeInfoBadge value={record.feeInfo} />
              </div>

              {/* Contact Info */}
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-3">Thông Tin Liên Hệ Chính</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Số Điện Thoại:</p>
                      <p className="text-sm font-medium">{record.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Địa Chỉ Email:</p>
                      <p className="text-sm font-medium">{record.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Thông Tin Hồ Sơ</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Họ và tên:</p>
                  <p className="font-medium">{record.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Giới tính:</p>
                  <p className="font-medium">{record.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ngày sinh:</p>
                  <p className="font-medium">{record.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nơi sinh:</p>
                  <p className="font-medium">{record.placeOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nguyên Quán:</p>
                  <p className="font-medium">{record.hometown}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CMND/CCCD:</p>
                  <p className="font-medium">{record.idCard}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Hộ khẩu thường trú:</p>
                  <p className="font-medium">{record.permanentAddress}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground">Địa chỉ liên hệ:</p>
                  <p className="font-medium">{record.contactAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Dân tộc:</p>
                  <p className="font-medium">{record.ethnicity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Nghề nghiệp:</p>
                  <p className="font-medium">{record.occupation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Đơn vị công tác:</p>
                  <p className="font-medium">{record.workplace}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Chức vụ:</p>
                  <p className="font-medium">{record.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Bổ sung hồ sơ</h3>
              <div className="space-y-2">
                {record.documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handleFileClick(doc)}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.name, doc.type)}
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownload(doc)
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Action Footer */}
      <ActionFooter
        actions={[
          {
            label: 'Chỉnh sửa',
            icon: Edit,
            variant: 'outline',
            onClick: () => navigate(`/academic/records/edit/${record.id}`),
          },
          {
            label: 'Duyệt',
            icon: Check,
            variant: 'default',
            className: 'bg-green-600 hover:bg-green-700',
            onClick: () => setApproveModalOpen(true),
            disabled: record.status === 'Đã Duyệt',
          },
          {
            label: 'Từ chối',
            icon: X,
            variant: 'destructive',
            onClick: () => setRejectModalOpen(true),
            disabled: record.status === 'Từ chối',
          },
        ]}
      />

      {/* File Viewer Modal */}
      <FileViewerModal
        open={fileModalOpen}
        onOpenChange={setFileModalOpen}
        file={selectedFile}
      />

      {/* Approve Confirm Modal */}
      <ConfirmModal
        open={approveModalOpen}
        onOpenChange={setApproveModalOpen}
        title="Xác nhận duyệt hồ sơ"
        description={`Bạn có chắc chắn muốn duyệt hồ sơ "${record.fileCode}" của "${record.fullName}"?`}
        confirmText="Xác nhận duyệt"
        cancelText="Hủy"
        variant="default"
        onConfirm={() => {
          // TODO: Call API to approve record
          console.log('Duyệt hồ sơ:', record.id)
          // After success, you might want to:
          // - Update the record status
          // - Show success message
          // - Navigate back to list or refresh data
        }}
      />

      {/* Reject Confirm Modal */}
      <ConfirmModal
        open={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        title="Xác nhận từ chối hồ sơ"
        description={`Bạn có chắc chắn muốn từ chối hồ sơ "${record.fileCode}" của "${record.fullName}"?`}
        confirmText="Xác nhận từ chối"
        cancelText="Hủy"
        variant="destructive"
        onConfirm={() => {
          // TODO: Call API to reject record
          console.log('Từ chối hồ sơ:', record.id)
          // After success, you might want to:
          // - Update the record status
          // - Show success message
          // - Navigate back to list or refresh data
        }}
      />
    </div>
  )
}

