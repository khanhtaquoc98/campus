import { useRef, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  MoreVertical,
  Eye,
  CheckCircle2,
  Edit,
  XCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConfirmModal from '@/components/common/ConfirmModal'
import SortableHeader from './components/SortableHeader'
import { AspirationBadge, FeeInfoBadge, StatusBadge } from './components/Badges'

export default function TableSection({
  records = [],
  selectedRows = [],
  sortField = null,
  sortDirection = 'asc',
  onSort,
  onSelectAll,
  onSelectRow,
}) {
  const navigate = useNavigate()
  const selectAllRef = useRef(null)
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [rejectModalOpen, setRejectModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)

  const isAllSelected = selectedRows.length === records.length && records.length > 0
  const isIndeterminate = selectedRows.length > 0 && selectedRows.length < records.length

  // Set indeterminate state for select all checkbox
  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = isIndeterminate
    }
  }, [isIndeterminate])

  const handleApproveClick = (record) => {
    setSelectedRecord(record)
    setApproveModalOpen(true)
  }

  const handleRejectClick = (record) => {
    setSelectedRecord(record)
    setRejectModalOpen(true)
  }

  const handleApproveConfirm = () => {
    // TODO: Call API to approve record
    console.warn('Duyệt hồ sơ:', selectedRecord?.id)
    // After success, you might want to:
    // - Update the record status
    // - Show success message
    // - Refresh data
    setApproveModalOpen(false)
    setSelectedRecord(null)
  }

  const handleRejectConfirm = () => {
    // TODO: Call API to reject record
    console.warn('Từ chối hồ sơ:', selectedRecord?.id)
    // After success, you might want to:
    // - Update the record status
    // - Show success message
    // - Refresh data
    setRejectModalOpen(false)
    setSelectedRecord(null)
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 text-xs">
              <Checkbox
                ref={selectAllRef}
                checked={isAllSelected}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <SortableHeader
              title="MÃ HỒ SƠ"
              sortField="fileCode"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="HỌ VÀ TÊN"
              sortField="fullName"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="NGUYỆN VỌNG"
              sortField="aspiration"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="NGÀNH HỌC"
              sortField="major"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="THÔNG TIN LỆ PHÍ"
              sortField="feeInfo"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="NGÀY NỘP"
              sortField="submissionDate"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="NGÀY XÉT DUYỆT"
              sortField="approvalDate"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <SortableHeader
              title="TRẠNG THÁI"
              sortField="status"
              currentSortField={sortField}
              sortDirection={sortDirection}
              onSort={onSort}
            />
            <TableHead className="text-xs font-medium text-muted-foreground text-right">THAO TÁC</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
              Không có dữ liệu
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(record.id)}
                    onCheckedChange={(checked) => onSelectRow(record.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/academic/records/${record.id}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {record.fileCode}
                  </Link>
                </TableCell>
                <TableCell className="font-medium">{record.fullName}</TableCell>
                <TableCell>
                  <AspirationBadge value={record.aspiration} />
                </TableCell>
                <TableCell>{record.major}</TableCell>
                <TableCell>
                  <FeeInfoBadge value={record.feeInfo} />
                </TableCell>
                <TableCell>{record.submissionDate}</TableCell>
                <TableCell>{record.approvalDate}</TableCell>
                <TableCell>
                  <StatusBadge value={record.status} />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => navigate(`/academic/records/${record.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                      Chi tiết
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleApproveClick(record)}
                        disabled={record.status === 'Đã Duyệt'}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                      Xét duyệt
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate(`/academic/records/edit/${record.id}`)}>
                        <Edit className="mr-2 h-4 w-4" />
                      Chỉnh sửa
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRejectClick(record)}
                        disabled={record.status === 'Từ chối'}
                      >
                        <XCircle className="mr-2 h-4 w-4 text-red-600" />
                      Từ chối
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Approve Confirm Modal */}
      <ConfirmModal
        open={approveModalOpen}
        onOpenChange={setApproveModalOpen}
        title="Xác nhận xét duyệt hồ sơ"
        description={selectedRecord ? `Bạn có chắc chắn muốn xét duyệt hồ sơ "${selectedRecord.fileCode}" của "${selectedRecord.fullName}"?` : ''}
        confirmText="Xác nhận xét duyệt"
        cancelText="Hủy"
        variant="default"
        onConfirm={handleApproveConfirm}
      />

      {/* Reject Confirm Modal */}
      <ConfirmModal
        open={rejectModalOpen}
        onOpenChange={setRejectModalOpen}
        title="Xác nhận từ chối hồ sơ"
        description={selectedRecord ? `Bạn có chắc chắn muốn từ chối hồ sơ "${selectedRecord.fileCode}" của "${selectedRecord.fullName}"?` : ''}
        confirmText="Xác nhận từ chối"
        cancelText="Hủy"
        variant="destructive"
        onConfirm={handleRejectConfirm}
      />
    </>
  )
}

