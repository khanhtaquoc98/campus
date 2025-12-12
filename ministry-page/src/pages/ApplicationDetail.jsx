import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import Layout from '../components/Layout';
import './ApplicationDetail.css';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getById(id);
      setApplication(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching application:', err);
      setError('Không thể tải thông tin hồ sơ');
      // Demo data
      setApplication({
        id: id,
        // Thông tin cá nhân
        fullName: 'Nguyễn Văn A',
        gender: 'male',
        dateOfBirth: '2000-01-15',
        placeOfBirth: 'Hà Nội',
        hometown: 'Hà Nội',
        idCard: '001234567890',
        permanentAddress: '123 Đường ABC, Phường XYZ, Quận Đống Đa, Hà Nội',
        contactAddress: '456 Đường DEF, Phường GHI, Quận Cầu Giấy, Hà Nội',
        phone: '0987654321',
        email: 'nguyenvana@example.com',
        ethnicity: 'Kinh',
        occupation: 'Nhân viên văn phòng',
        workplace: 'Công ty ABC',
        position: 'Nhân viên',
        // Thông tin học tập
        educationLevel: 'Tốt nghiệp THPT',
        highSchool: 'THPT Nguyễn Huệ',
        graduationType: 'Chính quy',
        gpa: '8.5',
        // Nguyện vọng
        program: 'cao-dang',
        major: 'Công nghệ thông tin',
        // Files
        birthCertificate: 'giay-khai-sinh.pdf',
        idCardFile: 'cmnd.pdf',
        transcript: 'hoc-ba.pdf',
        diploma: 'bang-tot-nghiep.pdf',
        otherCertificates: 'chung-chi-tieng-anh.pdf',
        additionalDocuments: '',
        admissionFeeReceipt: 'bien-lai.pdf',
        // Khác
        status: 'pending',
        submittedAt: new Date().toISOString(),
        notes: 'Học sinh có thành tích tốt',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!window.confirm(`Bạn có chắc chắn muốn ${newStatus === 'approved' ? 'duyệt' : 'từ chối'} hồ sơ này?`)) {
      return;
    }

    try {
      await applicationAPI.updateStatus(id, newStatus);
      setApplication({ ...application, status: newStatus });
      alert('Cập nhật trạng thái thành công');
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Không thể cập nhật trạng thái');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hồ sơ này?')) {
      return;
    }

    try {
      await applicationAPI.delete(id);
      alert('Xóa hồ sơ thành công');
      navigate('/applications');
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Không thể xóa hồ sơ');
    }
  };

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

  if (error && !application) {
    return (
      <Layout>
        <div className="error-message">{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="application-detail">
        <div className="detail-header">
          <div>
            <h2>Chi Tiết Hồ Sơ #{application.id}</h2>
            <span className={getStatusClass(application.status)}>
              {getStatusText(application.status)}
            </span>
          </div>
          <div className="header-actions">
            <Link to="/applications" className="btn btn-secondary">
              ← Quay lại
            </Link>
            <Link to={`/applications/${id}/edit`} className="btn btn-warning">
              Chỉnh sửa
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Xóa
            </button>
          </div>
        </div>

        <div className="detail-content">
          {/* THÔNG TIN CÁ NHÂN */}
          <section className="detail-section">
            <h3>Thông Tin Cá Nhân</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Họ và tên:</label>
                <span>{application.fullName}</span>
              </div>
              <div className="info-item">
                <label>Giới tính:</label>
                <span>
                  {application.gender === 'male' ? 'Nam' : application.gender === 'female' ? 'Nữ' : 'Khác'}
                </span>
              </div>
              <div className="info-item">
                <label>Ngày sinh:</label>
                <span>{new Date(application.dateOfBirth).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="info-item">
                <label>Nơi sinh:</label>
                <span>{application.placeOfBirth}</span>
              </div>
              <div className="info-item">
                <label>Nguyên quán:</label>
                <span>{application.hometown}</span>
              </div>
              <div className="info-item">
                <label>CMND/CCCD:</label>
                <span>{application.idCard}</span>
              </div>
              <div className="info-item full-width">
                <label>Hộ khẩu thường trú:</label>
                <span>{application.permanentAddress}</span>
              </div>
              <div className="info-item full-width">
                <label>Địa chỉ liên hệ:</label>
                <span>{application.contactAddress}</span>
              </div>
              <div className="info-item">
                <label>Số điện thoại:</label>
                <span>{application.phone}</span>
              </div>
              <div className="info-item">
                <label>Email:</label>
                <span>{application.email}</span>
              </div>
              <div className="info-item">
                <label>Dân tộc:</label>
                <span>{application.ethnicity}</span>
              </div>
              {application.occupation && (
                <div className="info-item">
                  <label>Nghề nghiệp:</label>
                  <span>{application.occupation}</span>
                </div>
              )}
              {application.workplace && (
                <div className="info-item">
                  <label>Đơn vị công tác:</label>
                  <span>{application.workplace}</span>
                </div>
              )}
              {application.position && (
                <div className="info-item">
                  <label>Chức vụ:</label>
                  <span>{application.position}</span>
                </div>
              )}
            </div>
          </section>

          {/* THÔNG TIN HỌC TẬP */}
          <section className="detail-section">
            <h3>Thông Tin Học Tập</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Trình độ học vấn:</label>
                <span>{application.educationLevel}</span>
              </div>
              <div className="info-item">
                <label>Trường tốt nghiệp THPT:</label>
                <span>{application.highSchool}</span>
              </div>
              <div className="info-item">
                <label>Loại hình tốt nghiệp:</label>
                <span>{application.graduationType}</span>
              </div>
              <div className="info-item">
                <label>Điểm trung bình THPT:</label>
                <span>{application.gpa}</span>
              </div>
            </div>
          </section>

          {/* NGUYỆN VỌNG ĐĂNG KÝ */}
          <section className="detail-section">
            <h3>Nguyện Vọng Đăng Ký</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Chương trình học:</label>
                <span>
                  {application.program === 'trung-cap' ? 'Trung cấp' :
                   application.program === 'cao-dang' ? 'Cao đẳng' : application.program}
                </span>
              </div>
              <div className="info-item">
                <label>Ngành học:</label>
                <span>{application.major}</span>
              </div>
              <div className="info-item">
                <label>Ngày nộp hồ sơ:</label>
                <span>{new Date(application.submittedAt).toLocaleString('vi-VN')}</span>
              </div>
            </div>
          </section>

          {/* GIẤY TỜ ĐÍNH KÈM */}
          <section className="detail-section">
            <h3>Giấy Tờ Đính Kèm</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Giấy khai sinh:</label>
                <span className="file-link">{application.birthCertificate || 'Chưa có'}</span>
              </div>
              <div className="info-item">
                <label>CMND/CCCD:</label>
                <span className="file-link">{application.idCardFile || 'Chưa có'}</span>
              </div>
              <div className="info-item">
                <label>Học bạ:</label>
                <span className="file-link">{application.transcript || 'Chưa có'}</span>
              </div>
              <div className="info-item">
                <label>Giấy chứng nhận tốt nghiệp:</label>
                <span className="file-link">{application.diploma || 'Chưa có'}</span>
              </div>
              {application.otherCertificates && (
                <div className="info-item full-width">
                  <label>Các chứng chỉ khác:</label>
                  <span className="file-link">{application.otherCertificates}</span>
                </div>
              )}
              {application.additionalDocuments && (
                <div className="info-item full-width">
                  <label>Giấy tờ bổ sung:</label>
                  <span className="file-link">{application.additionalDocuments}</span>
                </div>
              )}
              {application.admissionFeeReceipt && (
                <div className="info-item">
                  <label>Biên lai lệ phí:</label>
                  <span className="file-link">{application.admissionFeeReceipt}</span>
                </div>
              )}
            </div>
          </section>

          {/* GHI CHÚ */}
          {application.notes && (
            <section className="detail-section">
              <h3>Ghi Chú</h3>
              <div className="notes-content">
                {application.notes}
              </div>
            </section>
          )}

          {application.status === 'pending' && (
            <section className="detail-section">
              <h3>Thao Tác Duyệt Hồ Sơ</h3>
              <div className="status-actions">
                <button
                  onClick={() => handleStatusChange('approved')}
                  className="btn btn-success"
                >
                  ✓ Duyệt hồ sơ
                </button>
                <button
                  onClick={() => handleStatusChange('rejected')}
                  className="btn btn-danger"
                >
                  ✗ Từ chối hồ sơ
                </button>
              </div>
            </section>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetail;

