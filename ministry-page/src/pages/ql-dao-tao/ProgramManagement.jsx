
import { useState } from 'react';
import Layout from '../../components/Layout';
import {
    Search,
    Filter,
    Download,
    Plus,
    MoreVertical,
    Edit,
    Calendar,
    Users,
    Settings,
    X,
    Save,
    ChevronDown,
    ChevronRight
} from 'lucide-react';

const ProgramManagement = () => {
    const [programs, setPrograms] = useState([
        {
            id: 1,
            name: 'Cao Đẳng Chính Quy',
            type: 'program',
            applicantCount: 450,
            maxApplicants: 1000,
            expireDate: '2025-08-30',
            automationRule: { type: 'auto_approve', condition: 'GPA >= 8.0' },
            children: [
                {
                    id: 11,
                    name: 'Công nghệ thông tin',
                    type: 'major',
                    applicantCount: 150,
                    maxApplicants: 300,
                    expireDate: '2025-08-30',
                    automationRule: { type: 'manual', condition: '' },
                },
                {
                    id: 12,
                    name: 'Quản trị kinh doanh',
                    type: 'major',
                    applicantCount: 120,
                    maxApplicants: 300,
                    expireDate: '2025-08-30',
                    automationRule: { type: 'auto_approve', condition: 'GPA >= 7.5' },
                }
            ]
        },
        {
            id: 2,
            name: 'Trung Cấp Chuyên Nghiệp',
            type: 'program',
            applicantCount: 200,
            maxApplicants: 500,
            expireDate: '2025-09-15',
            automationRule: { type: 'auto_approve', condition: 'Tot nghiep THCS' },
            children: [
                {
                    id: 21,
                    name: 'Kế toán doanh nghiệp',
                    type: 'major',
                    applicantCount: 80,
                    maxApplicants: 150,
                    expireDate: '2025-09-15',
                    automationRule: { type: 'manual', condition: '' },
                }
            ]
        },
        {
            id: 3,
            name: 'Khóa Học Ngắn Hạn',
            type: 'program',
            applicantCount: 120,
            maxApplicants: 200,
            expireDate: '2025-12-31',
            automationRule: { type: 'auto_approve', condition: 'None' },
            children: [
                {
                    id: 31,
                    name: 'Lập trình Web Cơ bản',
                    type: 'course',
                    applicantCount: 45,
                    maxApplicants: 50,
                    expireDate: '2025-06-30',
                    automationRule: { type: 'auto_approve', condition: 'First come' },
                },
                {
                    id: 32,
                    name: 'Digital Marketing',
                    type: 'course',
                    applicantCount: 75,
                    maxApplicants: 100,
                    expireDate: '2025-12-31',
                    automationRule: { type: 'manual', condition: '' },
                }
            ]
        }
    ]);

    const [expandedRows, setExpandedRows] = useState(new Set([1, 2, 3]));
    const [editingParams, setEditingParams] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleRow = (id) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRows(newExpanded);
    };

    const handleEdit = (item) => {
        setEditingParams({ ...item });
        setModalOpen(true);
    };

    const handleSave = () => {
        // Recursive update function
        const updateItems = (items) => {
            return items.map(item => {
                if (item.id === editingParams.id) {
                    return { ...item, ...editingParams };
                }
                if (item.children) {
                    return { ...item, children: updateItems(item.children) };
                }
                return item;
            });
        };

        setPrograms(updateItems(programs));
        setModalOpen(false);
        setEditingParams(null);
    };

    const getTypeLabel = (type) => {
        switch (type) {
            case 'program': return 'Hệ Đào Tạo';
            case 'major': return 'Chuyên Ngành';
            case 'course': return 'Khóa Học';
            default: return type;
        }
    };

    return (
        <Layout>
            <div className="space-y-6 animate-fadeIn">
                {/* Breadcrumbs */}
                <nav className="text-sm text-gray-600">
                    <span className="hover:text-indigo-600 cursor-pointer">Bảng Điều Khiển</span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-medium">Quản Lý Đào Tạo</span>
                </nav>

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Quản Lý Đào Tạo</h1>
                    <div className="flex items-center space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <Download className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">Export</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Plus className="h-4 w-4" />
                            <span className="text-sm font-medium">Thêm Mới</span>
                        </button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <Users className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Tổng Hồ Sơ</p>
                                <h3 className="text-2xl font-bold text-gray-900">770</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <Calendar className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Đợt Tuyển Sinh</p>
                                <h3 className="text-2xl font-bold text-gray-900">Đợt 1 - 2025</h3>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <Settings className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">Quy Tắc Tự Động</p>
                                <h3 className="text-2xl font-bold text-gray-900">3 Active</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative flex-1 max-w-xs">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                            <Filter className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Bộ lọc</span>
                        </button>
                    </div>
                </div>

                {/* Content Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider w-1/3">
                                    Tên Chương Trình / Ngành
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Phân Loại
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Số Lượng Hồ Sơ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Hạn Nộp
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quy Tắc Tự Động
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Thao Tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {programs.map(program => (
                                <>
                                    <tr key={program.id} className="bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    onClick={() => toggleRow(program.id)}
                                                    className="p-1 hover:bg-gray-200 rounded"
                                                >
                                                    {expandedRows.has(program.id)
                                                        ? <ChevronDown className="h-4 w-4 text-gray-500" />
                                                        : <ChevronRight className="h-4 w-4 text-gray-500" />
                                                    }
                                                </button>
                                                <span className="font-semibold text-gray-900">{program.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                {getTypeLabel(program.type)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                                                    <div
                                                        className="bg-indigo-600 h-2 rounded-full"
                                                        style={{ width: `${(program.applicantCount / program.maxApplicants) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-600">
                                                    {program.applicantCount} / {program.maxApplicants}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(program.expireDate).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {program.automationRule.condition || 'Manual Review'}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleEdit(program)}
                                                className="text-indigo-600 hover:text-indigo-900 p-2"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>

                                    {expandedRows.has(program.id) && program.children && program.children.map(child => (
                                        <tr key={child.id} className="bg-white hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 pl-14">
                                                <span className="text-gray-900">{child.name}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${child.type === 'course' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {getTypeLabel(child.type)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                                                        <div
                                                            className={`h-2 rounded-full ${(child.applicantCount / child.maxApplicants) > 0.9 ? 'bg-red-500' : 'bg-green-500'
                                                                }`}
                                                            style={{ width: `${(child.applicantCount / child.maxApplicants) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600">
                                                        {child.applicantCount} / {child.maxApplicants}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(child.expireDate).toLocaleDateString('vi-VN')}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {child.automationRule.condition || '-'}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleEdit(child)}
                                                    className="text-indigo-600 hover:text-indigo-900 p-2"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            {modalOpen && editingParams && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 animate-fadeIn">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">Cập Nhật Thông Tin</h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tên Chương Trình / Khóa Học
                                </label>
                                <input
                                    type="text"
                                    value={editingParams.name}
                                    disabled
                                    className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chỉ Tiêu Tuyển Sinh (Max Applicant)
                                </label>
                                <input
                                    type="number"
                                    value={editingParams.maxApplicants}
                                    onChange={(e) => setEditingParams({ ...editingParams, maxApplicants: Number(e.target.value) })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Hạn Nộp Hồ Sơ (Expire Date)
                                </label>
                                <input
                                    type="date"
                                    value={editingParams.expireDate}
                                    onChange={(e) => setEditingParams({ ...editingParams, expireDate: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quy Tắc Tự Động (Automation Rule)
                                </label>
                                <div className="space-y-2">
                                    <select
                                        value={editingParams.automationRule.type}
                                        onChange={(e) => setEditingParams({
                                            ...editingParams,
                                            automationRule: { ...editingParams.automationRule, type: e.target.value }
                                        })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="manual">Xét duyệt thủ công</option>
                                        <option value="auto_approve">Tự động duyệt</option>
                                    </select>
                                    {editingParams.automationRule.type === 'auto_approve' && (
                                        <input
                                            type="text"
                                            placeholder="Điều kiện (VD: GPA >= 8.0)"
                                            value={editingParams.automationRule.condition}
                                            onChange={(e) => setEditingParams({
                                                ...editingParams,
                                                automationRule: { ...editingParams.automationRule, condition: e.target.value }
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                            >
                                <Save className="h-4 w-4" />
                                <span>Lưu Thay Đổi</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </Layout>
    );
};

export default ProgramManagement;
