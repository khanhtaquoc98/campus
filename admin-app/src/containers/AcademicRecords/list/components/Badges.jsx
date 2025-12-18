import { cn } from '@/lib/utils'

export const AspirationBadge = ({ value }) => {
  const colors = {
    'Cao Đẳng': 'bg-purple-100 text-purple-700',
    'Trung Cấp': 'bg-blue-100 text-blue-700',
    'Khóa Học Ngắn Hạn': 'bg-green-100 text-green-700',
  }
  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', colors[value] || 'bg-gray-100 text-gray-700')}>
      {value}
    </span>
  )
}

export const FeeInfoBadge = ({ value }) => {
  const colors = {
    'Đã nộp': 'bg-green-100 text-green-700',
    'Miễn lệ phí': 'bg-blue-100 text-blue-700',
  }
  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium', colors[value] || 'bg-gray-100 text-gray-700')}>
      {value}
    </span>
  )
}

export const StatusBadge = ({ value }) => {
  const colors = {
    'Chờ Duyệt': 'bg-yellow-100 text-yellow-700',
    'Đã Duyệt': 'bg-green-100 text-green-700',
    'Từ chối': 'bg-red-100 text-red-700',
  }
  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1', colors[value] || 'bg-gray-100 text-gray-700')}>
      <span className={cn('h-2 w-2 rounded-full',
        value === 'Chờ Duyệt' ? 'bg-yellow-500' :
          value === 'Đã Duyệt' ? 'bg-green-500' :
            'bg-red-500',
      )} />
      {value}
    </span>
  )
}

