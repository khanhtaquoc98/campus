import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import FilterSection from './FilterSection'
import TableSection from './TableSection'

// Mock data - sẽ được thay thế bằng API call
const records = [
  {
    id: 1,
    fileCode: 'AD9892434',
    fullName: 'Nguyễn Văn A',
    aspiration: 'Cao Đẳng',
    major: 'Công nghệ thông tin',
    feeInfo: 'Đã nộp',
    submissionDate: '1/1/2024',
    approvalDate: '-',
    status: 'Chờ Duyệt',
  },
  {
    id: 2,
    fileCode: 'AD9892435',
    fullName: 'Nguyễn Văn B',
    aspiration: 'Trung Cấp',
    major: 'Kế toán',
    feeInfo: 'Miễn lệ phí',
    submissionDate: '2/1/2024',
    approvalDate: '3/1/2024',
    status: 'Đã Duyệt',
  },
  {
    id: 3,
    fileCode: 'AD9892436',
    fullName: 'Nguyễn Văn C',
    aspiration: 'Khóa Học Ngắn Hạn',
    major: 'Khóa học ngắn hạn 3',
    feeInfo: 'Miễn lệ phí',
    submissionDate: '3/1/2024',
    approvalDate: '4/1/2024',
    status: 'Đã Duyệt',
  },
]

export default function AcademicRecordsListContainer() {
  const navigate = useNavigate()
  const [selectedRows, setSelectedRows] = useState([])
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState('asc')
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Get unique values for filter options
  const aspirations = [...new Set(records.map(r => r.aspiration))]
  const majors = [...new Set(records.map(r => r.major))]
  const feeInfos = [...new Set(records.map(r => r.feeInfo))]
  const statuses = [...new Set(records.map(r => r.status))]

  // Filter records based on URL params
  const getFiltersFromParams = () => {
    return {
      fileCode: searchParams.get('fileCode') || '',
      fullName: searchParams.get('fullName') || '',
      aspiration: searchParams.get('aspiration') || 'all',
      major: searchParams.get('major') || 'all',
      feeInfo: searchParams.get('feeInfo') || 'all',
      status: searchParams.get('status') || 'all',
    }
  }

  const filters = getFiltersFromParams()

  // Filter records
  let filteredRecords = records.filter(record => {
    return (
      (!filters.fileCode || record.fileCode.toLowerCase().includes(filters.fileCode.toLowerCase())) &&
      (!filters.fullName || record.fullName.toLowerCase().includes(filters.fullName.toLowerCase())) &&
      (!filters.aspiration || filters.aspiration === 'all' || record.aspiration === filters.aspiration) &&
      (!filters.major || filters.major === 'all' || record.major === filters.major) &&
      (!filters.feeInfo || filters.feeInfo === 'all' || record.feeInfo === filters.feeInfo) &&
      (!filters.status || filters.status === 'all' || record.status === filters.status)
    )
  })

  // Sort records
  if (sortField) {
    filteredRecords = [...filteredRecords].sort((a, b) => {
      let aValue = a[sortField]
      let bValue = b[sortField]

      // Handle date strings
      if (sortField === 'submissionDate' || sortField === 'approvalDate') {
        aValue = aValue === '-' ? '' : aValue
        bValue = bValue === '-' ? '' : bValue
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(filteredRecords.map(r => r.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id, checked) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id))
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Filter Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Table Skeleton */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  {[...Array(8)].map((_, i) => (
                    <TableHead key={i}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {[...Array(8)].map((_, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý hồ sơ</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý hồ sơ học sinh, sinh viên
          </p>
        </div>
        <Button onClick={() => navigate('/academic/records/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Thêm hồ sơ
        </Button>
      </div>

      {/* Filter Section */}
      <FilterSection
        aspirations={aspirations}
        majors={majors}
        feeInfos={feeInfos}
        statuses={statuses}
      />

      {/* Table Section */}
      <TableSection
        records={filteredRecords}
        selectedRows={selectedRows}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
      />
    </div>
  )
}

