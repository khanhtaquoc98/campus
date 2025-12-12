import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const quickLinks = [
    { path: "/", label: "Trang chủ" },
    { path: "/about", label: "Giới thiệu" },
    { path: "/admission", label: "Tuyển sinh" },
    { path: "/contact", label: "Liên hệ" },
  ]

  const policies = [
    { path: "/privacy", label: "Chính sách bảo mật" },
    { path: "/terms", label: "Điều khoản sử dụng" },
    { path: "/sitemap", label: "Sơ đồ trang web" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ]

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Thông tin liên hệ</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>0123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>info@university.edu.vn</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Chính sách</h3>
            <ul className="space-y-2 text-sm">
              {policies.map((policy) => (
                <li key={policy.path}>
                  <Link
                    to={policy.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {policy.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Mạng xã hội</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-full bg-background border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Trường Đại Học. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

