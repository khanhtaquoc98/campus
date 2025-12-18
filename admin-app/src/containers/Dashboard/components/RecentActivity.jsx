import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
        <CardDescription>
          Latest application submissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Application #{1000 + i}</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
              <Button variant="outline" size="sm">View</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

