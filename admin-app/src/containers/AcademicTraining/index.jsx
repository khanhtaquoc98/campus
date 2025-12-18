import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import TrainingProgramList from './components/TrainingProgramList'

// Mock data
const trainingPrograms = [
  {
    id: 1,
    name: 'Chương trình đào tạo Công nghệ thông tin',
    code: 'DT001',
    duration: '4 năm',
    students: 150,
    status: 'Đang tuyển sinh',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    name: 'Chương trình đào tạo Kế toán',
    code: 'DT002',
    duration: '4 năm',
    students: 120,
    status: 'Đang tuyển sinh',
    createdAt: '2024-01-20',
  },
  {
    id: 3,
    name: 'Chương trình đào tạo Quản trị kinh doanh',
    code: 'DT003',
    duration: '4 năm',
    students: 200,
    status: 'Đã đóng',
    createdAt: '2024-02-01',
  },
]

export default function AcademicTrainingContainer() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý đào tạo</h1>
          <p className="text-muted-foreground mt-2">
            Quản lý các chương trình đào tạo
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Thêm chương trình
        </Button>
      </div>

      <TrainingProgramList
        programs={trainingPrograms}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  )
}

