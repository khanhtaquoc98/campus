import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import {
    User,
    MapPin,
    Phone,
    Mail,
    FileText,
    GraduationCap,
    Calendar,
    CheckCircle2,
    Clock,
    Download
} from "lucide-react"

// Reuse constants from AdmissionPage or move to a shared constants file
// For now, I'll copy relevant mappings for display
const PROGRAM_TYPES = {
    "trung-cap": "Trung Cấp",
    "cao-dang": "Cao Đẳng",
    "khoa-hoc-ngan-han": "Khóa Học Ngắn Hạn"
}

const MAJORS_MAPPING = {
    "tc-1": "Công nghệ thông tin",
    "tc-2": "Kế toán",
    "tc-3": "Điều dưỡng",
    "tc-4": "Du lịch",
    "cd-1": "Công nghệ thông tin",
    "cd-2": "Kế toán - Kiểm toán",
    "cd-3": "Điều dưỡng",
    "cd-4": "Quản trị kinh doanh",
    "cd-5": "Du lịch - Khách sạn",
    "kh-1": "Tin học văn phòng",
    "kh-2": "Tiếng Anh giao tiếp",
    "kh-3": "Kỹ năng mềm",
    "kh-4": "Digital Marketing",
}

export function ApplicantProfilePage() {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API fetch delay
        setTimeout(() => {
            const storedData = localStorage.getItem(`applicant_${id}`)
            if (storedData) {
                setProfile(JSON.parse(storedData))
            }
            setLoading(false)
        }, 500)
    }, [id])

    if (loading) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
                        <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 w-48 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </Layout>
        )
    }

    if (!profile) {
        return (
            <Layout>
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-2xl font-bold mb-4">Không tìm thấy hồ sơ</h2>
                        <p className="text-muted-foreground mb-6">
                            Hồ sơ bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                        </p>
                        <Link to="/">
                            <Button>Về trang chủ</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-6">
                    {/* Header Status */}
                    <div className="bg-background rounded-lg shadow-sm border p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Trạng thái hồ sơ</p>
                            <div className="flex items-center text-yellow-600 font-semibold">
                                <Clock className="w-5 h-5 mr-2" />
                                Đang chờ duyệt
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-muted-foreground mb-1">Ngày nộp</p>
                            <p className="font-medium">
                                {new Date(profile.submittedAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Profile Info */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b">
                                    <h2 className="text-xl font-bold flex items-center">
                                        <User className="w-5 h-5 mr-2 text-primary" />
                                        Thông tin cá nhân
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-muted-foreground">Họ và tên</label>
                                            <p className="font-medium text-lg">{profile.fullName}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-muted-foreground">CCCD/CMND</label>
                                            <p className="font-medium">{profile.cccd}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-muted-foreground">Số điện thoại</label>
                                            <div className="flex items-center">
                                                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <p className="font-medium">{profile.phone}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-sm text-muted-foreground">Email</label>
                                            <div className="flex items-center">
                                                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <p className="font-medium">{profile.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground">Địa chỉ</label>
                                        <div className="flex items-center">
                                            <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                                            <p className="font-medium">{profile.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b">
                                    <h2 className="text-xl font-bold flex items-center">
                                        <GraduationCap className="w-5 h-5 mr-2 text-primary" />
                                        Thông tin đăng ký
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm text-muted-foreground">Hệ đào tạo</label>
                                            <p className="font-medium text-lg">
                                                {PROGRAM_TYPES[profile.programType] || profile.programType}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-muted-foreground">Ngành học</label>
                                            <p className="font-medium text-lg">
                                                {MAJORS_MAPPING[profile.major] || profile.major}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Documents Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-background rounded-lg shadow-sm border overflow-hidden">
                                <div className="bg-primary/5 p-6 border-b">
                                    <h2 className="text-lg font-bold flex items-center">
                                        <FileText className="w-5 h-5 mr-2 text-primary" />
                                        Hồ sơ đính kèm
                                    </h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="text-sm text-muted-foreground block mb-2">Học bạ THPT</label>
                                        <div className="flex items-center p-3 bg-muted rounded-md">
                                            <FileText className="w-8 h-8 text-blue-500 mr-3" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {profile.highSchoolTranscript && profile.highSchoolTranscript.length > 0
                                                        ? profile.highSchoolTranscript[0].name
                                                        : "document.pdf"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">PDF Document</p>
                                            </div>
                                            <Button size="icon" variant="ghost">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-muted-foreground block mb-2">Bằng tốt nghiệp</label>
                                        <div className="flex items-center p-3 bg-muted rounded-md">
                                            <FileText className="w-8 h-8 text-blue-500 mr-3" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">
                                                    {profile.graduationCertificate && profile.graduationCertificate.length > 0
                                                        ? profile.graduationCertificate[0].name
                                                        : "certificate.pdf"}
                                                </p>
                                                <p className="text-xs text-muted-foreground">PDF Document</p>
                                            </div>
                                            <Button size="icon" variant="ghost">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
