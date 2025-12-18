import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'
import {
  FormInput,
  FormSelect,
  FormRadio,
  FormFileInput,
} from '@/components/form'
import ActionFooter from '@/components/common/ActionFooter'
import { Skeleton } from '@/components/ui/skeleton'
import {
  aspirationOptions,
  majorOptions,
  genderOptions,
  feeInfoOptions,
  ethnicityOptions,
} from '@/constants/AcademicRecords'

// Mock data - sẽ được thay thế bằng API call
const mockRecordDetail = {
  id: 1,
  fileCode: 'AD0000001',
  fullName: 'Nguyễn Văn A',
  aspiration: 'Cao Đẳng',
  major: 'Công nghệ thông tin',
  feeInfo: 'Chưa nộp',
  status: 'Chờ Duyệt',
  phone: '0987654321',
  email: 'nguyenvana@example.com',
  gender: 'Nam',
  dateOfBirth: '15/1/2000',
  placeOfBirth: 'Hà Nội',
  hometown: 'Hà Nội',
  idCard: '001234567890',
  permanentAddress: '123 Đường ABC, Phường XYZ, Quận Đống Đa, Hà Nội',
  contactAddress: '456 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội',
  ethnicity: 'Kinh',
  occupation: 'Nhân viên văn phòng',
  workplace: 'Công ty ABC',
  position: 'Nhân viên',
}

export default function AcademicRecordEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      fileCode: '',
      fullName: '',
      aspiration: '',
      major: '',
      feeInfo: '',
      phone: '',
      email: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      hometown: '',
      idCard: '',
      permanentAddress: '',
      contactAddress: '',
      ethnicity: '',
      occupation: '',
      workplace: '',
      position: '',
    },
  })

  // TODO: Fetch record detail từ API dựa trên id
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Mock: Load data
      reset({
        fileCode: mockRecordDetail.fileCode,
        fullName: mockRecordDetail.fullName,
        aspiration: mockRecordDetail.aspiration,
        major: mockRecordDetail.major,
        feeInfo: mockRecordDetail.feeInfo,
        phone: mockRecordDetail.phone,
        email: mockRecordDetail.email,
        gender: mockRecordDetail.gender,
        dateOfBirth: mockRecordDetail.dateOfBirth,
        placeOfBirth: mockRecordDetail.placeOfBirth,
        hometown: mockRecordDetail.hometown,
        idCard: mockRecordDetail.idCard,
        permanentAddress: mockRecordDetail.permanentAddress,
        contactAddress: mockRecordDetail.contactAddress,
        ethnicity: mockRecordDetail.ethnicity,
        occupation: mockRecordDetail.occupation,
        workplace: mockRecordDetail.workplace,
        position: mockRecordDetail.position,
        documents: [],
      })
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [id, reset])

  const onSubmit = (data) => {
    // TODO: Call API to update record
    console.warn('Update record:', data)
    // Sau khi update thành công, navigate về detail page
    navigate(`/academic/records/${id}`)
  }

  if (loading) {
    return (
      <div className="space-y-4 pb-20">
        {/* Page Info Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Form Skeleton */}
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Page Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Chỉnh sửa hồ sơ</h1>
        <p className="text-muted-foreground mt-1">
          Cập nhật thông tin hồ sơ học sinh, sinh viên
        </p>
      </div>

      <form id="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                  control={control}
                  name="fileCode"
                  label="Mã hồ sơ"
                  placeholder="Nhập mã hồ sơ"
                  rules={{ required: 'Mã hồ sơ là bắt buộc' }}
                  error={errors.fileCode?.message}
                />

                <FormInput
                  control={control}
                  name="fullName"
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  rules={{ required: 'Họ và tên là bắt buộc' }}
                  error={errors.fullName?.message}
                />

                <FormSelect
                  control={control}
                  name="aspiration"
                  label="Nguyện vọng"
                  options={aspirationOptions}
                  placeholder="Chọn nguyện vọng"
                  rules={{ required: 'Nguyện vọng là bắt buộc' }}
                  error={errors.aspiration?.message}
                />

                <FormSelect
                  control={control}
                  name="major"
                  label="Ngành học"
                  options={majorOptions}
                  placeholder="Chọn ngành học"
                  rules={{ required: 'Ngành học là bắt buộc' }}
                  error={errors.major?.message}
                />

                <FormSelect
                  control={control}
                  name="feeInfo"
                  label="Thông tin lệ phí"
                  options={feeInfoOptions}
                  placeholder="Chọn thông tin lệ phí"
                  rules={{ required: 'Thông tin lệ phí là bắt buộc' }}
                  error={errors.feeInfo?.message}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput
                  control={control}
                  name="phone"
                  label="Số điện thoại"
                  placeholder="Nhập số điện thoại"
                  rules={{ required: 'Số điện thoại là bắt buộc' }}
                  error={errors.phone?.message}
                />

                <FormInput
                  control={control}
                  name="email"
                  label="Địa chỉ email"
                  placeholder="Nhập địa chỉ email"
                  type="email"
                  rules={{
                    required: 'Email là bắt buộc',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email không hợp lệ',
                    },
                  }}
                  error={errors.email?.message}
                />
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="md:col-span-2 lg:col-span-3">
                  <FormRadio
                    control={control}
                    name="gender"
                    label="Giới tính"
                    options={genderOptions}
                    rules={{ required: 'Giới tính là bắt buộc' }}
                    error={errors.gender?.message}
                  />
                </div>

                <FormInput
                  control={control}
                  name="dateOfBirth"
                  label="Ngày sinh"
                  placeholder="Nhập ngày sinh (dd/mm/yyyy)"
                  rules={{ required: 'Ngày sinh là bắt buộc' }}
                  error={errors.dateOfBirth?.message}
                />

                <FormInput
                  control={control}
                  name="placeOfBirth"
                  label="Nơi sinh"
                  placeholder="Nhập nơi sinh"
                  rules={{ required: 'Nơi sinh là bắt buộc' }}
                  error={errors.placeOfBirth?.message}
                />

                <FormInput
                  control={control}
                  name="hometown"
                  label="Nguyên quán"
                  placeholder="Nhập nguyên quán"
                  rules={{ required: 'Nguyên quán là bắt buộc' }}
                  error={errors.hometown?.message}
                />

                <FormInput
                  control={control}
                  name="idCard"
                  label="CMND/CCCD"
                  placeholder="Nhập số CMND/CCCD"
                  rules={{ required: 'CMND/CCCD là bắt buộc' }}
                  error={errors.idCard?.message}
                />

                <FormSelect
                  control={control}
                  name="ethnicity"
                  label="Dân tộc"
                  options={ethnicityOptions}
                  placeholder="Chọn dân tộc"
                  rules={{ required: 'Dân tộc là bắt buộc' }}
                  error={errors.ethnicity?.message}
                />

                <FormInput
                  control={control}
                  name="permanentAddress"
                  label="Hộ khẩu thường trú"
                  placeholder="Nhập địa chỉ hộ khẩu thường trú"
                  rules={{ required: 'Hộ khẩu thường trú là bắt buộc' }}
                  error={errors.permanentAddress?.message}
                />

                <FormInput
                  control={control}
                  name="contactAddress"
                  label="Địa chỉ liên hệ"
                  placeholder="Nhập địa chỉ liên hệ"
                  rules={{ required: 'Địa chỉ liên hệ là bắt buộc' }}
                  error={errors.contactAddress?.message}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin công việc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <FormInput
                  control={control}
                  name="occupation"
                  label="Nghề nghiệp"
                  placeholder="Nhập nghề nghiệp"
                  rules={{ required: 'Nghề nghiệp là bắt buộc' }}
                  error={errors.occupation?.message}
                />

                <FormInput
                  control={control}
                  name="workplace"
                  label="Đơn vị công tác"
                  placeholder="Nhập đơn vị công tác"
                  rules={{ required: 'Đơn vị công tác là bắt buộc' }}
                  error={errors.workplace?.message}
                />

                <FormInput
                  control={control}
                  name="position"
                  label="Chức vụ"
                  placeholder="Nhập chức vụ"
                  rules={{ required: 'Chức vụ là bắt buộc' }}
                  error={errors.position?.message}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Bổ sung hồ sơ</CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <FormFileInput
                control={control}
                name="documents"
                label="Tải lên tài liệu"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                rules={{ required: false }}
                error={errors.documents?.message}
                className="text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </form>

      {/* Action Footer */}
      <ActionFooter
        formId="edit-form"
        actions={[
          {
            label: 'Hủy',
            variant: 'outline',
            onClick: () => navigate(`/academic/records/${id}`),
          },
          {
            label: 'Lưu thay đổi',
            icon: Save,
            type: 'submit',
          },
        ]}
      />
    </div>
  )
}

