import GeneralSettings from './components/GeneralSettings'
import NotificationSettings from './components/NotificationSettings'
import SecuritySettings from './components/SecuritySettings'
import AppearanceSettings from './components/AppearanceSettings'

export default function SettingContainer() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your system settings and preferences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <GeneralSettings />
        <NotificationSettings />
        <SecuritySettings />
        <AppearanceSettings />
      </div>
    </div>
  )
}

