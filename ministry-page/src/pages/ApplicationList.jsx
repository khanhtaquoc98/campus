import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import Layout from '../components/Layout';
import './ApplicationList.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getAll();
      setApplications(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError('Không thể tải danh sách hồ sơ');
      // Demo data nếu API không hoạt động
      setApplications(generateDemoData());
    } finally {
      setLoading(false);
    }
  };

  const generateDemoData = () => {
    const programs = ['trung-cap', 'cao-dang'];
    const majors = ['Công nghệ thông tin', 'Kế toán', 'Quản trị kinh doanh', 'Điện tử viễn thông'];
    const ethnicities = ['Kinh', 'Tày', 'Thái', 'Mường', 'Khmer'];
    const cities = ['Hà Nội', 'TP.HCM', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ'];

    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      // Thông tin cá nhân
      fullName: `Nguyễn Văn ${String.fromCharCode(65 + (i % 26))}`,
      gender: i % 2 === 0 ? 'male' : 'female',
      dateOfBirth: `${1995 + (i % 10)}-${String((i % 12) + 1).padStart(2, '0')}-15`,
      placeOfBirth: cities[i % cities.length],
      hometown: cities[i % cities.length],
      idCard: `00${String(i + 1).padStart(10, '0')}`,
      permanentAddress: `${i + 1} Đường ABC, Phường XYZ, ${cities[i % cities.length]}`,
      contactAddress: `${i + 100} Đường DEF, Phường GHI, ${cities[i % cities.length]}`,
      phone: `098${String(i).padStart(7, '0')}`,
      email: `student${i + 1}@example.com`,
      ethnicity: ethnicities[i % ethnicities.length],
      occupation: i % 3 === 0 ? 'Nhân viên văn phòng' : '',
      workplace: i % 3 === 0 ? 'Công ty ABC' : '',
      position: i % 3 === 0 ? 'Nhân viên' : '',
      // Thông tin học tập
      educationLevel: 'Tốt nghiệp THPT',
      highSchool: `THPT Nguyễn ${String.fromCharCode(65 + (i % 10))}`,
      graduationType: i % 2 === 0 ? 'Chính quy' : 'Tự do',
      gpa: (7 + (i % 3)).toFixed(1),
      // Nguyện vọng
      program: programs[i % programs.length],
      major: majors[i % majors.length],
      // Files
      birthCertificate: `giay-khai-sinh-${i + 1}.pdf`,
      idCardFile: `cmnd-${i + 1}.pdf`,
      transcript: `hoc-ba-${i + 1}.pdf`,
      diploma: `bang-tot-nghiep-${i + 1}.pdf`,
      otherCertificates: i % 2 === 0 ? `chung-chi-${i + 1}.pdf` : '',
      additionalDocuments: '',
      admissionFeeReceipt: i % 3 === 0 ? `bien-lai-${i + 1}.pdf` : '',
      // Khác
      status: ['pending', 'approved', 'rejected'][i % 3],
      submittedAt: new Date(2024, 0, i + 1).toISOString(),
      notes: i % 5 === 0 ? 'Học sinh có thành tích tốt' : '',
    }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này?')) {
      return;
    }

    try {
      await applicationAPI.delete(id);
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Không thể xóa hồ sơ');
    }
  };

  // Lọc và tìm kiếm
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Phân trang
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Chờ duyệt',
      approved: 'Đã duyệt',
      rejected: 'Từ chối'
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Đang tải...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="application-list">
        <div className="page-header">
          <h2>Danh Sách Hồ Sơ Đăng Ký</h2>
          <Link to="/applications/new" className="btn btn-primary">
            + Thêm hồ sơ mới
          </Link>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, email, số điện thoại..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="status-filter"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="approved">Đã duyệt</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="table-container">
          <table className="applications-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Chương trình</th>
                <th>Trạng thái</th>
                <th>Ngày nộp</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-data">
                    Không tìm thấy hồ sơ nào
                  </td>
                </tr>
              ) : (
                paginatedApplications.map((app) => (
                  <tr key={app.id}>
                    <td>{app.id}</td>
                    <td>{app.fullName}</td>
                    <td>{app.email}</td>
                    <td>{app.phone}</td>
                    <td>{app.program}</td>
                    <td>
                      <span className={getStatusClass(app.status)}>
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td>{new Date(app.submittedAt).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/applications/${app.id}`}
                          className="btn btn-sm btn-info"
                          title="Xem chi tiết"
                        >
                          Xem
                        </Link>
                        <Link
                          to={`/applications/${app.id}/edit`}
                          className="btn btn-sm btn-warning"
                          title="Chỉnh sửa"
                        >
                          Sửa
                        </Link>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="btn btn-sm btn-danger"
                          title="Xóa"
                        >
                          Xóa
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="btn btn-sm"
            >
              « Trước
            </button>

            <span className="page-info">
              Trang {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="btn btn-sm"
            >
              Sau »
            </button>
          </div>
        )}

        <div className="summary">
          Hiển thị {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredApplications.length)}
          {' '}trong tổng số {filteredApplications.length} hồ sơ
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationList;

