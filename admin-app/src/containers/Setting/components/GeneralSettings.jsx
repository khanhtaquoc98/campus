import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export default function GeneralSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Basic system configuration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="site-name">Site Name</Label>
          <Input id="site-name" defaultValue="Admin Dashboard" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="site-url">Site URL</Label>
          <Input id="site-url" defaultValue="https://example.com" />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="maintenance" />
          <Label htmlFor="maintenance" className="cursor-pointer">
            Enable Maintenance Mode
          </Label>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  )
}

