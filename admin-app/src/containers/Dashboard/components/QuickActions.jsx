import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button className="w-full" variant="default">
            Create New User
          </Button>
          <Button className="w-full" variant="outline">
            View All Applications
          </Button>
          <Button className="w-full" variant="outline">
            System Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

