import { useAppSelector } from '@/store/hooks'
import ProfileForm from './components/ProfileForm'
import AccountSummary from './components/AccountSummary'

export default function ProfileContainer() {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-2">
          Quản lý thông tin cá nhân của bạn
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ProfileForm user={user} />
        <AccountSummary user={user} />
      </div>
    </div>
  )
}

