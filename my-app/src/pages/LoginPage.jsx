import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form"
import { Layout } from "@/components/layout/Layout"

export function LoginPage() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data) => {
    console.log("Login data:", data)
    // Handle login logic here
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-background rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-8">Đăng nhập</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormInput
                control={control}
                name="email"
                label="Email / Tên đăng nhập"
                type="email"
                placeholder="Nhập email hoặc tên đăng nhập"
                rules={{
                  required: "Vui lòng nhập email hoặc tên đăng nhập",
                }}
              />

              <FormInput
                control={control}
                name="password"
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu"
                rules={{
                  required: "Vui lòng nhập mật khẩu",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                }}
              />

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Đăng nhập
              </Button>

              {/* <div className="text-center text-sm text-muted-foreground">
                Chưa có tài khoản?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Đăng ký ngay
                </Link>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

