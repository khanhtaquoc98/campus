import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

/**
 * DataTable Component - Common table component với search và pagination
 *
 * @param {Array} columns - Mảng các cột với format: { key, title, render?, className? }
 * @param {Array} data - Mảng dữ liệu để hiển thị
 * @param {Object} options - Các tùy chọn
 * @param {boolean} options.searchable - Có cho phép search không (default: true)
 * @param {boolean} options.paginated - Có phân trang không (default: true)
 * @param {number} options.pageSize - Số items mỗi trang (default: 10)
 * @param {Array} options.pageSizeOptions - Các lựa chọn page size (default: [10, 20, 50, 100])
 * @param {boolean} options.showPageSizeSelector - Hiển thị selector để chọn page size (default: true)
 * @param {string} options.searchPlaceholder - Placeholder cho search input
 * @param {Function} options.onRowClick - Callback khi click vào row
 * @param {string} options.emptyMessage - Message khi không có data
 * @param {string} options.className - Custom className cho table
 */
export default function DataTable({
  columns = [],
  data = [],
  options = {},
}) {
  const {
    searchable = true,
    paginated = true,
    pageSize: initialPageSize = 10,
    pageSizeOptions = [10, 20, 50, 100],
    showPageSizeSelector = true,
    searchPlaceholder = 'Tìm kiếm...',
    onRowClick,
    emptyMessage = 'Không có dữ liệu',
    className,
  } = options

  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // Filter data based on search query
  const filteredData = searchable
    ? data.filter((row) => {
      return columns.some((col) => {
        const value = row[col.key]
        if (value === null || value === undefined) return false
        return String(value)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
    })
    : data

  // Pagination
  const totalPages = paginated
    ? Math.ceil(filteredData.length / pageSize)
    : 1
  const startIndex = paginated ? (currentPage - 1) * pageSize : 0
  const endIndex = paginated ? startIndex + pageSize : filteredData.length
  const paginatedData = filteredData.slice(startIndex, endIndex)

  // Reset to page 1 when search changes or pageSize changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, pageSize])

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handleFirstPage = () => {
    setCurrentPage(1)
  }

  const handleLastPage = () => {
    setCurrentPage(totalPages)
  }

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages <= maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show pages around current page
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

      // Adjust if we're near the end
      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1)
      }

      // Add first page
      if (startPage > 1) {
        pages.push(1)
        if (startPage > 2) {
          pages.push('ellipsis-start')
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('ellipsis-end')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchQuery && (
            <span className="text-sm text-muted-foreground">
              {filteredData.length} kết quả
            </span>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={column.headerClassName}
                >
                  {column.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className={cn(
                    onRowClick && 'cursor-pointer',
                    row.className,
                  )}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={column.key}
                      className={column.cellClassName}
                    >
                      {column.render
                        ? column.render(row[column.key], row, rowIndex)
                        : row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {paginated && filteredData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page info and page size selector */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Hiển thị <span className="font-medium text-foreground">{startIndex + 1}</span> -{' '}
              <span className="font-medium text-foreground">{Math.min(endIndex, filteredData.length)}</span> trong tổng số{' '}
              <span className="font-medium text-foreground">{filteredData.length}</span> kết quả
            </div>
            {showPageSizeSelector && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Hiển thị:</span>
                <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pageSizeOptions.map((size) => (
                      <SelectItem key={size} value={String(size)}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleFirstPage}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Page numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => {
                  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                      <span key={`ellipsis-${index}`} className="px-2 text-sm text-muted-foreground">
                        ...
                      </span>
                    )
                  }

                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handlePageClick(page)}
                      className="h-8 w-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

