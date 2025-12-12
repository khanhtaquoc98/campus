import { Layout } from "@/components/layout/Layout"
import { GraduationCap, Award, Users, BookOpen } from "lucide-react"

export function AboutPage() {
  const features = [
    {
      icon: GraduationCap,
      title: "Đào tạo chất lượng",
      description: "Chương trình đào tạo được thiết kế theo chuẩn quốc tế",
    },
    {
      icon: Award,
      title: "Giảng viên giàu kinh nghiệm",
      description: "Đội ngũ giảng viên có trình độ cao và nhiều năm kinh nghiệm",
    },
    {
      icon: Users,
      title: "Cộng đồng sinh viên",
      description: "Môi trường học tập năng động, sáng tạo và thân thiện",
    },
    {
      icon: BookOpen,
      title: "Cơ sở vật chất hiện đại",
      description: "Phòng học, thư viện và phòng thí nghiệm được trang bị đầy đủ",
    },
  ]

  return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Giới thiệu về Trường</h1>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold mb-6">Lịch sử hình thành</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Trường Đại Học được thành lập vào năm 1970 với sứ mệnh đào tạo nguồn nhân lực
              chất lượng cao, phục vụ cho sự phát triển kinh tế - xã hội của đất nước.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Trải qua hơn 50 năm xây dựng và phát triển, Trường đã trở thành một trong những
              cơ sở giáo dục uy tín, được xã hội và doanh nghiệp đánh giá cao về chất lượng
              đào tạo.
            </p>
          </section>

          {/* Mission & Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sứ mệnh</h3>
              <p className="text-muted-foreground">
                Đào tạo nguồn nhân lực có trình độ chuyên môn cao, có đạo đức nghề nghiệp,
                có khả năng thích ứng với môi trường làm việc và đóng góp tích cực cho sự
                phát triển của xã hội.
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Tầm nhìn</h3>
              <p className="text-muted-foreground">
                Trở thành trường đại học hàng đầu trong đào tạo nguồn nhân lực chất lượng cao,
                được công nhận trong khu vực và quốc tế về chất lượng giáo dục và nghiên cứu khoa học.
              </p>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-semibold mb-8">Điểm mạnh của Trường</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="bg-background border rounded-lg p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Statistics */}
          <section className="bg-primary/10 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center">Thành tựu</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Sinh viên</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Giảng viên</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Chương trình</div>
              </div>
            </div>
          </section>
        </div>
      </div>
  )
}

