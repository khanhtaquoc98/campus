import DataTable from './DataTable'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Ví dụ sử dụng DataTable component
 */
export default function DataTableExample() {
  // Sample data
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'active',
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'User',
      status: 'inactive',
    },
  ]

  // Define columns
  const columns = [
    {
      key: 'name',
      title: 'Tên',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'role',
      title: 'Vai trò',
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (value) => (
        <span
          className={cn(
            'px-2 py-1 rounded-full text-xs font-medium',
            value === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-gray-100 text-gray-700'
          )}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      title: 'Thao tác',
      render: (value, row) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">DataTable Example</h1>
        <p className="text-muted-foreground mt-2">
          Ví dụ sử dụng component DataTable
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        options={{
          searchable: true,
          paginated: true,
          pageSize: 10,
          searchPlaceholder: 'Tìm kiếm người dùng...',
          onRowClick: (row) => {
            console.log('Row clicked:', row)
          },
          emptyMessage: 'Không có người dùng nào',
        }}
      />
    </div>
  )
}

