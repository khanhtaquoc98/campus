import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormInput, FormSelect } from '@/components/form'

export default function ProfileForm({ user }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      username: user?.username || '',
      phone: user?.phone || '',
      address: user?.address || '',
      role: user?.role || '',
    },
  })

  const onSubmit = (data) => {
    console.warn('Profile data:', data)
    // TODO: Update profile API call
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>
          Cập nhật thông tin tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            control={control}
            name="name"
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            rules={{ required: 'Họ và tên là bắt buộc' }}
          />

          <FormInput
            control={control}
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email"
            rules={{
              required: 'Email là bắt buộc',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email không hợp lệ',
              },
            }}
          />

          <FormInput
            control={control}
            name="username"
            label="Tên đăng nhập"
            placeholder="Nhập tên đăng nhập"
            disabled
          />

          <FormInput
            control={control}
            name="phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
          />

          <FormInput
            control={control}
            name="address"
            label="Địa chỉ"
            placeholder="Nhập địa chỉ"
          />

          <FormSelect
            control={control}
            name="role"
            label="Vai trò"
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'user', label: 'User' },
            ]}
            disabled
          />

          <Button type="submit" className="w-full">
            Cập nhật thông tin
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

