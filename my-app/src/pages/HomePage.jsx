import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Award, Users, Calendar } from "lucide-react"

export function HomePage() {
  const programs = [
    {
      id: 1,
      title: "Trung Cấp",
      description: "Chương trình đào tạo trung cấp chuyên nghiệp",
      icon: GraduationCap,
    },
    {
      id: 2,
      title: "Cao Đẳng",
      description: "Chương trình đào tạo cao đẳng chuyên nghiệp",
      icon: Award,
    },
    {
      id: 3,
      title: "Khóa học ngắn hạn",
      description: "Các khóa học ngắn hạn phù hợp với nhu cầu",
      icon: Users,
    },
  ]

  const news = [
    {
      id: 1,
      title: "Thông báo tuyển sinh năm 2026",
      date: "15/01/2026",
      excerpt: "Trường thông báo mở đợt tuyển sinh mới cho năm học 2026-2027...",
    },
    {
      id: 2,
      title: "Lễ khai giảng năm học mới",
      date: "10/01/2026",
      excerpt: "Lễ khai giảng năm học mới sẽ được tổ chức vào tháng 9...",
    },
    {
      id: 3,
      title: "Hội thảo hướng nghiệp",
      date: "05/01/2026",
      excerpt: "Hội thảo hướng nghiệp dành cho sinh viên năm cuối...",
    },
  ]

  return (
    <div>
      {/* Banner Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-primary/90 to-primary/70 flex items-center justify-center text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chào mừng đến với Trường Đại Học
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Nơi ươm mầm tài năng, phát triển tri thức và xây dựng tương lai
          </p>
          <Link to="/admission">
            <Button size="lg" variant="secondary">
              Tìm hiểu thêm về chúng tôi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Giới thiệu về Trường</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Trường Đại Học là một trong những cơ sở giáo dục hàng đầu, với hơn 50 năm
              kinh nghiệm trong việc đào tạo và phát triển nguồn nhân lực chất lượng cao.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Với đội ngũ giảng viên giàu kinh nghiệm, cơ sở vật chất hiện đại và chương
              trình đào tạo đa dạng, chúng tôi cam kết mang đến cho sinh viên môi trường
              học tập tốt nhất.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Năm kinh nghiệm</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-muted-foreground">Sinh viên</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Chương trình đào tạo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Chương trình đào tạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program) => {
              const Icon = program.icon
              return (
                <div
                  key={program.id}
                  className="bg-background rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{program.title}</h3>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <Link to="/admission">
                    <Button variant="outline" size="sm">
                      Tìm hiểu thêm
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* News & Events Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Tin tức & Sự kiện</h2>
            <Link to="/news">
              <Button variant="outline">Xem tất cả</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <div
                key={item.id}
                className="bg-muted/50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.excerpt}</p>
                <Link to={`/news/${item.id}`} className="text-primary text-sm font-medium mt-4 inline-block">
                  Đọc thêm →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

