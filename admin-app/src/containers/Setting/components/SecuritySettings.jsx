import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage security settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
          <Input id="session-timeout" type="number" defaultValue="30" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="2fa" />
          <Label htmlFor="2fa" className="cursor-pointer">
            Require Two-Factor Authentication
          </Label>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  )
}

