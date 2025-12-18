import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { FormInput, FormSelect } from '@/components/form'

export default function FilterSection({ 
  aspirations = [], 
  majors = [], 
  feeInfos = [], 
  statuses = [],
  onSubmit: onSubmitFilter,
  onReset: onResetFilter,
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      fileCode: searchParams.get('fileCode') || '',
      fullName: searchParams.get('fullName') || '',
      aspiration: searchParams.get('aspiration') || 'all',
      major: searchParams.get('major') || 'all',
      feeInfo: searchParams.get('feeInfo') || 'all',
      status: searchParams.get('status') || 'all',
    },
  })

  const onSubmit = (data) => {
    const params = new URLSearchParams()

    if (data.fileCode) params.set('fileCode', data.fileCode)
    if (data.fullName) params.set('fullName', data.fullName)
    if (data.aspiration && data.aspiration !== 'all') params.set('aspiration', data.aspiration)
    if (data.major && data.major !== 'all') params.set('major', data.major)
    if (data.feeInfo && data.feeInfo !== 'all') params.set('feeInfo', data.feeInfo)
    if (data.status && data.status !== 'all') params.set('status', data.status)

    setSearchParams(params)
    if (onSubmitFilter) {
      onSubmitFilter(data)
    }
  }

  const handleReset = () => {
    reset({
      fileCode: '',
      fullName: '',
      aspiration: 'all',
      major: 'all',
      feeInfo: 'all',
      status: 'all',
    })
    setSearchParams({})
    if (onResetFilter) {
      onResetFilter()
    }
  }

  // Sync form with URL params when they change
  useEffect(() => {
    reset({
      fileCode: searchParams.get('fileCode') || '',
      fullName: searchParams.get('fullName') || '',
      aspiration: searchParams.get('aspiration') || 'all',
      major: searchParams.get('major') || 'all',
      feeInfo: searchParams.get('feeInfo') || 'all',
      status: searchParams.get('status') || 'all',
    })
  }, [searchParams, reset])

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              control={control}
              name="fileCode"
              label="Mã hồ sơ"
              placeholder="Nhập mã hồ sơ..."
            />
            <FormInput
              control={control}
              name="fullName"
              label="Họ và tên"
              placeholder="Nhập họ và tên..."
            />
            <FormSelect
              control={control}
              name="aspiration"
              label="Nguyện vọng"
              placeholder="Chọn nguyện vọng"
              options={[
                { value: 'all', label: 'Tất cả' },
                ...aspirations.map(asp => ({ value: asp, label: asp })),
              ]}
            />
            <FormSelect
              control={control}
              name="major"
              label="Ngành học"
              placeholder="Chọn ngành học"
              options={[
                { value: 'all', label: 'Tất cả' },
                ...majors.map(major => ({ value: major, label: major })),
              ]}
            />
            <FormSelect
              control={control}
              name="feeInfo"
              label="Thông tin lệ phí"
              placeholder="Chọn thông tin lệ phí"
              options={[
                { value: 'all', label: 'Tất cả' },
                ...feeInfos.map(fee => ({ value: fee, label: fee })),
              ]}
            />
            <FormSelect
              control={control}
              name="status"
              label="Trạng thái"
              placeholder="Chọn trạng thái"
              options={[
                { value: 'all', label: 'Tất cả' },
                ...statuses.map(status => ({ value: status, label: status })),
              ]}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={handleReset}>
              Đặt lại
            </Button>
            <Button type="submit">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

