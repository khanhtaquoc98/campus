import { useState } from "react"
import { Link } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Loader2, ArrowRight, User, Calendar, AlertCircle } from "lucide-react"

export function CheckStatusPage() {
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query.trim()) return

        // Validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
        const phoneRegex = /^[0-9]{10,11}$/

        if (!emailRegex.test(query) && !phoneRegex.test(query)) {
            setError("Vui lòng nhập số điện thoại hoặc email hợp lệ")
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)
        setHasSearched(true)

        // Simulate network delay
        setTimeout(() => {
            try {
                let found = null
                // Scan localStorage for applicants
                // Note: In a real app, this would be an API call
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i)
                    if (key.startsWith("applicant_")) {
                        try {
                            const data = JSON.parse(localStorage.getItem(key))
                            const id = key.replace("applicant_", "")

                            if (
                                data.email?.toLowerCase() === query.toLowerCase() ||
                                data.phone === query
                            ) {
                                found = { id, ...data }
                                break
                            }
                        } catch (err) {
                            console.error("Error parsing applicant data", err)
                        }
                    }
                }

                if (found) {
                    setResult(found)
                } else {
                    setError("Không tìm thấy hồ sơ với thông tin đã cung cấp.")
                }
            } catch (err) {
                setError("Đã có lỗi xảy ra. Vui lòng thử lại sau.")
            } finally {
                setLoading(false)
            }
        }, 800)
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 min-h-[60vh]">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold">Tra cứu hồ sơ</h1>
                        <p className="text-muted-foreground">
                            Nhập số điện thoại hoặc email đã đăng ký để kiểm tra trạng thái hồ sơ của bạn
                        </p>
                    </div>

                    <div className="bg-background p-6 rounded-lg shadow-lg border">
                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Số điện thoại hoặc Email
                                </label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="VD: 0912345678 hoặc email@example.com"
                                        className="pl-9"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loading || !query.trim()}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Đang tìm kiếm...
                                    </>
                                ) : (
                                    "Tra cứu ngay"
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-4">
                        {error && (
                            <div className="bg-destructive/10 text-destructive p-4 rounded-lg flex items-center">
                                <AlertCircle className="h-5 w-5 mr-2" />
                                {error}
                            </div>
                        )}

                        {result && (
                            <div className="bg-card text-card-foreground rounded-lg border shadow-sm animate-in fade-in-50 slide-in-from-bottom-5">
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <h3 className="font-semibold text-lg flex items-center">
                                            <User className="h-5 w-5 mr-2 text-primary" />
                                            Kết quả tra cứu
                                        </h3>
                                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 font-medium">
                                            Đang chờ duyệt
                                        </span>
                                    </div>

                                    <div className="grid gap-2 text-sm">
                                        <div className="flex justify-between py-1">
                                            <span className="text-muted-foreground">Họ và tên:</span>
                                            <span className="font-medium text-right">{result.fullName}</span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-muted-foreground">Ngành đăng ký:</span>
                                            <span className="font-medium text-right text-primary">
                                                {/* We might want to map this code to label if reuse is easy, 
                            but raw value is okay for MVP since we know the mapping in other components */}
                                                {result.major}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-1">
                                            <span className="text-muted-foreground">Ngày nộp:</span>
                                            <span className="font-medium text-right flex items-center justify-end">
                                                <Calendar className="h-3 w-3 mr-1" />
                                                {new Date(result.submittedAt).toLocaleDateString('vi-VN')}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Link to={`/profile/${result.id}`}>
                                            <Button variant="outline" className="w-full group">
                                                Xem chi tiết hồ sơ
                                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
