import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/layout/Layout"
import {
  FormInput,
  FormInputNumber,
  FormSelect,
  FormAutoComplete,
  FormFileInput,
} from "@/components/form"
import { CheckCircle2, Copy, ArrowRight, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const PROGRAM_TYPES = [
  { value: "trung-cap", label: "Trung Cấp" },
  { value: "cao-dang", label: "Cao Đẳng" },
  { value: "khoa-hoc-ngan-han", label: "Khóa học ngắn hạn" },
]

const MAJORS = {
  "trung-cap": [
    { value: "tc-1", label: "Công nghệ thông tin" },
    { value: "tc-2", label: "Kế toán" },
    { value: "tc-3", label: "Điều dưỡng" },
    { value: "tc-4", label: "Du lịch" },
  ],
  "cao-dang": [
    { value: "cd-1", label: "Công nghệ thông tin" },
    { value: "cd-2", label: "Kế toán - Kiểm toán" },
    { value: "cd-3", label: "Điều dưỡng" },
    { value: "cd-4", label: "Quản trị kinh doanh" },
    { value: "cd-5", label: "Du lịch - Khách sạn" },
  ],
  "khoa-hoc-ngan-han": [
    { value: "kh-1", label: "Tin học văn phòng" },
    { value: "kh-2", label: "Tiếng Anh giao tiếp" },
    { value: "kh-3", label: "Kỹ năng mềm" },
    { value: "kh-4", label: "Digital Marketing" },
  ],
}

export function AdmissionPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileUrl, setProfileUrl] = useState("")
  const [otpVerified, setOtpVerified] = useState(false)

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      programType: "",
      major: "",
      cccd: "",
      fullName: "",
      email: "",
      phone: "",
      address: "",
      highSchoolTranscript: "",
      graduationCertificate: "",
      otp: "",
    },
  })

  const programType = watch("programType")
  const availableMajors = programType ? MAJORS[programType] || [] : []

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl)
    alert("Đã sao chép link!")
  }

  const onSubmit = (data) => {
    if (currentStep === 4) {
      // Simulate OTP generation
      console.log("Application submitted:", data)
      setCurrentStep(5)
    } else if (currentStep === 5) {
      // Simulate OTP verification
      if (data.otp === "123456") {
        setOtpVerified(true)
        const url = `https://university.edu.vn/profile/${Math.random().toString(36).substring(7)}`
        setProfileUrl(url)
        setCurrentStep(6)
      } else {
        alert("Mã OTP không đúng. Vui lòng thử lại!")
      }
    }
  }

  const steps = [
    { number: 1, title: "Chọn loại chương trình" },
    { number: 2, title: "Chọn ngành học" },
    { number: 3, title: "Thông tin ứng viên" },
    { number: 4, title: "Xác nhận" },
    { number: 5, title: "Xác thực OTP" },
    { number: 6, title: "Hoàn thành" },
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Đăng ký tuyển sinh</h1>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-full flex items-center justify-center font-semibold",
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-xs text-center max-w-[100px]">
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-1 flex-1 mx-2",
                      currentStep > step.number ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-background rounded-lg shadow-lg p-8">
              {/* Step 1: Program Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Chọn loại chương trình</h2>
                  <FormSelect
                    control={control}
                    name="programType"
                    label="Loại chương trình"
                    options={PROGRAM_TYPES}
                    placeholder="Chọn loại chương trình"
                    rules={{ required: "Vui lòng chọn loại chương trình" }}
                  />
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!programType}
                    >
                      Bước tiếp theo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Major */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Chọn ngành học</h2>
                  <FormAutoComplete
                    control={control}
                    name="major"
                    label="Ngành học"
                    options={availableMajors}
                    placeholder="Tìm kiếm ngành học"
                    rules={{ required: "Vui lòng chọn ngành học" }}
                  />
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại
                    </Button>
                    <Button type="button" onClick={handleNext} disabled={!watch("major")}>
                      Bước tiếp theo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Applicant Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Thông tin ứng viên</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      control={control}
                      name="cccd"
                      label="Số CCCD/CMND"
                      placeholder="Nhập số CCCD/CMND"
                      rules={{ required: "Vui lòng nhập số CCCD/CMND" }}
                    />
                    <FormInput
                      control={control}
                      name="fullName"
                      label="Họ và tên"
                      placeholder="Nhập họ và tên"
                      rules={{ required: "Vui lòng nhập họ và tên" }}
                    />
                    <FormInput
                      control={control}
                      name="email"
                      label="Email"
                      type="email"
                      placeholder="Nhập email"
                      rules={{
                        required: "Vui lòng nhập email",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Email không hợp lệ",
                        },
                      }}
                    />
                    <FormInput
                      control={control}
                      name="phone"
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                      rules={{
                        required: "Vui lòng nhập số điện thoại",
                        pattern: {
                          value: /^[0-9]{10,11}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      }}
                    />
                  </div>
                  <FormInput
                    control={control}
                    name="address"
                    label="Địa chỉ"
                    placeholder="Nhập địa chỉ"
                    rules={{ required: "Vui lòng nhập địa chỉ" }}
                  />
                  <FormFileInput
                    control={control}
                    name="highSchoolTranscript"
                    label="Học bạ THPT"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    rules={{ required: "Vui lòng tải lên học bạ THPT" }}
                  />
                  <FormFileInput
                    control={control}
                    name="graduationCertificate"
                    label="Bằng tốt nghiệp"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    rules={{ required: "Vui lòng tải lên bằng tốt nghiệp" }}
                  />
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại
                    </Button>
                    <Button type="button" onClick={handleNext}>
                      Bước tiếp theo
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Xác nhận thông tin</h2>
                  <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                    <div>
                      <span className="font-semibold">Loại chương trình: </span>
                      {PROGRAM_TYPES.find((p) => p.value === watch("programType"))?.label}
                    </div>
                    <div>
                      <span className="font-semibold">Ngành học: </span>
                      {availableMajors.find((m) => m.value === watch("major"))?.label}
                    </div>
                    <div>
                      <span className="font-semibold">Họ và tên: </span>
                      {watch("fullName")}
                    </div>
                    <div>
                      <span className="font-semibold">Email: </span>
                      {watch("email")}
                    </div>
                    <div>
                      <span className="font-semibold">Số điện thoại: </span>
                      {watch("phone")}
                    </div>
                    <div>
                      <span className="font-semibold">Địa chỉ: </span>
                      {watch("address")}
                    </div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Lưu ý:</strong> Vui lòng kiểm tra kỹ thông tin trước khi gửi.
                      Sau khi gửi, bạn sẽ nhận được mã OTP qua email hoặc SMS để xác thực.
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại
                    </Button>
                    <Button type="submit">
                      Gửi đơn đăng ký
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 5: OTP Verification */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-6">Xác thực OTP</h2>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg mb-6">
                    <p className="text-sm">
                      Mã OTP đã được gửi đến email <strong>{watch("email")}</strong> và số điện thoại{" "}
                      <strong>{watch("phone")}</strong>. Vui lòng kiểm tra và nhập mã OTP.
                    </p>
                    <p className="text-sm mt-2 text-muted-foreground">
                      (Mã OTP mẫu: 123456)
                    </p>
                  </div>
                  <FormInput
                    control={control}
                    name="otp"
                    label="Mã OTP"
                    placeholder="Nhập mã OTP 6 số"
                    rules={{
                      required: "Vui lòng nhập mã OTP",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Mã OTP phải là 6 chữ số",
                      },
                    }}
                  />
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Quay lại
                    </Button>
                    <Button type="submit">
                      Xác thực OTP
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 6: Success */}
              {currentStep === 6 && (
                <div className="space-y-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">Đăng ký thành công!</h2>
                  <p className="text-muted-foreground mb-6">
                    Đơn đăng ký của bạn đã được gửi thành công. Vui lòng lưu lại link profile
                    để theo dõi trạng thái đơn đăng ký.
                  </p>
                  <div className="bg-muted/50 rounded-lg p-6">
                    <label className="block text-sm font-semibold mb-2">Link Profile của bạn:</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={profileUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border rounded-md bg-background"
                      />
                      <Button type="button" onClick={handleCopyUrl} variant="outline">
                        <Copy className="h-4 w-4 mr-2" />
                        Sao chép
                      </Button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button onClick={() => window.location.href = "/"}>
                      Về trang chủ
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

