import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

export default function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Configure notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notifications" defaultChecked />
          <Label htmlFor="email-notifications" className="cursor-pointer">
            Email Notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="push-notifications" />
          <Label htmlFor="push-notifications" className="cursor-pointer">
            Push Notifications
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notifications" />
          <Label htmlFor="sms-notifications" className="cursor-pointer">
            SMS Notifications
          </Label>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  )
}

