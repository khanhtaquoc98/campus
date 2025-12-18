import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, CheckCircle, XCircle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const statusConfig = {
  pending: {
    icon: Clock,
    label: 'Pending',
    className: 'bg-yellow-100 text-yellow-700',
  },
  approved: {
    icon: CheckCircle,
    label: 'Approved',
    className: 'bg-green-100 text-green-700',
  },
  rejected: {
    icon: XCircle,
    label: 'Rejected',
    className: 'bg-red-100 text-red-700',
  },
}

export default function ApplicationList({ applications = [], searchQuery = '', onSearchChange }) {
  const filteredApplications = applications.filter(app =>
    app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application List</CardTitle>
        <CardDescription>
          Search and manage applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Applications Table */}
        <div className="space-y-2">
          {filteredApplications.map((app) => {
            const status = statusConfig[app.status]
            const StatusIcon = status.icon

            return (
              <div
                key={app.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div>
                    <p className="font-medium text-foreground">{app.applicantName}</p>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {app.type} • Submitted {app.submittedAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                    status.className,
                  )}>
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </span>
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

