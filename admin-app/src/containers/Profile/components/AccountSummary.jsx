import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Phone, MapPin } from 'lucide-react'

export default function AccountSummary({ user }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tài khoản</CardTitle>
        <CardDescription>
          Thông tin tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold text-xl">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{user?.name || 'Admin User'}</p>
            <p className="text-sm text-muted-foreground">{user?.email || 'admin@example.com'}</p>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center gap-3 text-sm">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Tên đăng nhập:</span>
            <span className="font-medium">{user?.username || 'admin'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{user?.email || 'admin@example.com'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Số điện thoại:</span>
            <span className="font-medium">{user?.phone || 'Chưa cập nhật'}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Vai trò:</span>
            <span className="font-medium capitalize">{user?.role || 'admin'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

