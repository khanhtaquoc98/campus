import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form"
import { Layout } from "@/components/layout/Layout"
import { Mail, Phone, MapPin } from "lucide-react"

export function ContactPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Contact form:", data)
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.")
  }

  return (
    // <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-12">Liên hệ với chúng tôi</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Thông tin liên hệ</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Địa chỉ</h3>
                    <p className="text-muted-foreground">
                      123 Đường ABC, Quận XYZ, TP.HCM
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Điện thoại</h3>
                    <p className="text-muted-foreground">0123 456 789</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@university.edu.vn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Gửi tin nhắn</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                control={control}
                name="name"
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
                }}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Tin nhắn</label>
                <textarea
                  name="message"
                  rows={6}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nhập tin nhắn của bạn"
                />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Gửi tin nhắn
              </Button>
            </form>
          </div>
        </div>
      </div>
    // </Layout>
  )
}

