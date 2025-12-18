import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Save } from 'lucide-react'
import {
  FormInput,
  FormSelect,
  FormRadio,
  FormFileInput,
} from '@/components/form'
import ActionFooter from '@/components/common/ActionFooter'
import {
  aspirationOptions,
  majorOptions,
  genderOptions,
  feeInfoOptions,
  ethnicityOptions,
} from '@/constants/AcademicRecords'

export default function AcademicRecordCreate() {
  const navigate = useNavigate()
  const { control, handleSubmit, formState: { errors } } = useForm({
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
      documents: [],
    },
  })

  const onSubmit = (data) => {
    // TODO: Call API to create record
    console.log('Create record:', data)
    // Sau khi create thành công, navigate về list page
    navigate('/academic/records/list')
  }

  return (
    <div className="space-y-4 pb-20">
      {/* Page Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Tạo hồ sơ</h1>
        <p className="text-muted-foreground mt-1">
          Tạo hồ sơ mới cho học sinh, sinh viên
        </p>
      </div>

      <form id="create-form" onSubmit={handleSubmit(onSubmit)}>
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
        formId="create-form"
        actions={[
          {
            label: 'Hủy',
            variant: 'outline',
            onClick: () => navigate('/academic/records/list'),
          },
          {
            label: 'Tạo mới',
            icon: Save,
            type: 'submit',
          },
        ]}
      />
    </div>
  )
}

