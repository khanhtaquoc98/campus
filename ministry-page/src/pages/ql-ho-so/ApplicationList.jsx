import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { applicationAPI } from '../../services/api';
import Layout from '../../components/Layout';
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  ChevronDown,
  List,
  Grid,
  Eye,
  Edit,
  CheckCircle2,
  MoreVertical
} from 'lucide-react';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const itemsPerPage = rowsPerPage;

  const generateDemoData = useCallback(() => {
    const programs = ['cao-dang', 'trung-cap', 'khoa-hoc-ngan-han'];
    const majors = ['Công nghệ thông tin', 'Kế toán', 'Quản trị kinh doanh', 'Điện tử viễn thông'];
    const courses = ['Khóa học ngắn hạn 1', 'Khóa học ngắn hạn 2', 'Khóa học ngắn hạn 3'];
    const statuses = ['pending', 'approved', 'rejected'];

    return Array.from({ length: 25 }, (_, i) => {
      const program = programs[i % programs.length];
      const submittedDate = new Date(2024, 0, i + 1);
      const reviewedDate = statuses[i % statuses.length] !== 'pending' 
        ? new Date(2024, 0, i + 2) 
        : null;

      return {
        id: i + 1,
        admissionNo: `AD${String(9892434 + i).padStart(7, '0')}`,
        fullName: `Nguyễn Văn ${String.fromCharCode(65 + (i % 26))}`,
        program: program,
        major: program === 'khoa-hoc-ngan-han' ? null : majors[i % majors.length],
        course: program === 'khoa-hoc-ngan-han' ? courses[i % courses.length] : null,
        submittedAt: submittedDate.toISOString(),
        reviewedAt: reviewedDate ? reviewedDate.toISOString() : null,
        status: statuses[i % statuses.length],
      };
    });
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getAll();
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setApplications(generateDemoData());
    } finally {
      setLoading(false);
    }
  }, [generateDemoData]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.admissionNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.major?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.course?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleApprove = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xét duyệt hồ sơ này?')) {
      return;
    }

    try {
      await applicationAPI.updateStatus(id, 'approved');
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === id 
          ? { ...app, status: 'approved', reviewedAt: new Date().toISOString() }
          : app
      ));
      alert('Xét duyệt hồ sơ thành công');
    } catch (err) {
      console.error('Error approving application:', err);
      alert('Không thể xét duyệt hồ sơ');
    }
  };

  const getProgramLabel = (program) => {
    switch (program) {
      case 'cao-dang':
        return 'Cao Đẳng';
      case 'trung-cap':
        return 'Trung Cấp';
      case 'khoa-hoc-ngan-han':
        return 'Khóa Học Ngắn Hạn';
      default:
        return 'N/A';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ Duyệt';
      case 'approved':
        return 'Đã Duyệt';
      case 'rejected':
        return 'Từ Chối';
      default:
        return 'N/A';
    }
  };

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && !event.target.closest('.dropdown-container')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdownId]);

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <div className="text-gray-600">Đang tải dữ liệu...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn max-w-full overflow-x-hidden">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600">
          <span className="hover:text-indigo-600 cursor-pointer">Bảng Điều Khiển</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">QL Hồ Sơ</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">QL Hồ Sơ</h1>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Export</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>
            <Link
              to="/applications/new"
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Add Student</span>
            </Link>
          </div>
        </div>

        {/* Filters and Toolbar */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
              <span className="text-sm text-gray-600">12/07/2025</span>
              <span className="text-gray-400">-</span>
              <span className="text-sm text-gray-600">12/13/2025</span>
            </div>
            
            <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-700">Filter</span>
            </button>

            <div className="flex items-center space-x-1 bg-gray-50 rounded-lg p-1 border border-gray-200">
              <button className="p-2 rounded hover:bg-white transition-colors">
                <List className="h-4 w-4 text-indigo-600" />
              </button>
              <button className="p-2 rounded hover:bg-white transition-colors">
                <Grid className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <button className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-sm text-gray-700">Sort by A-Z</span>
              <ChevronDown className="h-4 w-4 text-gray-600" />
            </button>

            <div className="flex-1 flex justify-end">
              <div className="relative max-w-xs w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Row Per Page */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Row Per Page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={10}>10 Entries</option>
                <option value={25}>25 Entries</option>
                <option value={50}>50 Entries</option>
                <option value={100}>100 Entries</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-w-full">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Mã Hồ Sơ</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Họ Và Tên</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Nguyện Vọng</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Ngành Học</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Ngày Nộp</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Ngày Xét Duyệt</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <span>Trạng Thái</span>
                      <div className="flex flex-col">
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/applications/${app.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {app.admissionNo || `AD${String(app.id).padStart(7, '0')}`}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                       
                        <span className="text-sm font-medium text-gray-900">{app.fullName || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                        app.program === 'cao-dang'
                          ? 'bg-indigo-100 text-indigo-700'
                          : app.program === 'trung-cap'
                          ? 'bg-blue-100 text-blue-700'
                          : app.program === 'khoa-hoc-ngan-han'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {getProgramLabel(app.program)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {app.program === 'khoa-hoc-ngan-han' 
                        ? (app.course || 'N/A')
                        : (app.major || 'N/A')
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.submittedAt 
                        ? new Date(app.submittedAt).toLocaleDateString('vi-VN')
                        : 'N/A'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {app.reviewedAt 
                        ? new Date(app.reviewedAt).toLocaleDateString('vi-VN')
                        : '-'
                      }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        app.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : app.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${
                          app.status === 'approved'
                            ? 'bg-green-500'
                            : app.status === 'rejected'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}></span>
                        {getStatusLabel(app.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative dropdown-container">
                        <button
                          onClick={() => toggleDropdown(app.id)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Thao tác"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        {openDropdownId === app.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="py-1">
                              <Link
                                to={`/applications/${app.id}`}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Eye className="h-4 w-4 text-gray-500" />
                                <span>Chi tiết</span>
                              </Link>
                              {app.status === 'pending' && (
                                <button
                                  onClick={() => {
                                    handleApprove(app.id);
                                    closeDropdown();
                                  }}
                                  className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                                  <span>Xét duyệt</span>
                                </button>
                              )}
                              <Link
                                to={`/applications/${app.id}/edit`}
                                onClick={closeDropdown}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                              >
                                <Edit className="h-4 w-4 text-gray-500" />
                                <span>Chỉnh sửa</span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredApplications.length)} trong tổng số {filteredApplications.length} hồ sơ
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  « Trước
                </button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sau »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationList;
