import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Filter, Download } from 'lucide-react'
import ApplicationList from './components/ApplicationList'

// Mock data
const applications = [
  {
    id: 1,
    applicantName: 'John Doe',
    email: 'john.doe@example.com',
    status: 'pending',
    submittedAt: '2024-03-15',
    type: 'Ministry Application',
  },
  {
    id: 2,
    applicantName: 'Jane Smith',
    email: 'jane.smith@example.com',
    status: 'approved',
    submittedAt: '2024-03-14',
    type: 'Ministry Application',
  },
  {
    id: 3,
    applicantName: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    status: 'rejected',
    submittedAt: '2024-03-13',
    type: 'Ministry Application',
  },
]

export default function ApplicationsContainer() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage all applications
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <ApplicationList
        applications={applications}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  )
}

