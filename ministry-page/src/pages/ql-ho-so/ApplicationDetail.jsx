import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { applicationAPI } from '../../services/api';
import Layout from '../../components/Layout';
import { 
  Edit, 
  CheckCircle2, 
  XCircle,
  Phone, 
  Mail, 
  FileText, 
  Download,
  X
} from 'lucide-react';

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState(null);

  const fetchApplication = useCallback(async () => {
    try {
      setLoading(true);
      const response = await applicationAPI.getById(id);
      const data = response.data;
      
      // Check if data exists
      if (!data) {
        alert('Không tìm thấy thông tin hồ sơ. Đang sử dụng dữ liệu demo.');
        setApplication({
          id: id,
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
          educationLevel: 'Tốt nghiệp THPT',
          highSchool: 'THPT Nguyễn Huệ',
          graduationType: 'Chính quy',
          gpa: '8.5',
          program: 'cao-dang',
          major: 'Công nghệ thông tin',
          birthCertificate: 'giay-khai-sinh.pdf',
          idCardFile: 'cmnd.pdf',
          transcript: 'hoc-ba.pdf',
          diploma: 'bang-tot-nghiep.pdf',
          otherCertificates: 'chung-chi-tieng-anh.pdf',
          additionalDocuments: '',
          admissionFeeReceipt: 'bien-lai.pdf',
          status: 'pending',
          submittedAt: new Date().toISOString(),
          notes: 'Học sinh có thành tích tốt',
          admissionNo: `AD${String(id).padStart(7, '0')}`,
          rollNo: `R${String(id).padStart(3, '0')}`,
        });
        return;
      }
      
      setApplication(data);
    } catch (err) {
      console.error('Error fetching application:', err);
      alert('Không thể tải thông tin hồ sơ. Đang sử dụng dữ liệu demo.');
      setApplication({
        id: id,
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
        educationLevel: 'Tốt nghiệp THPT',
        highSchool: 'THPT Nguyễn Huệ',
        graduationType: 'Chính quy',
        gpa: '8.5',
        program: 'cao-dang',
        major: 'Công nghệ thông tin',
        birthCertificate: 'giay-khai-sinh.pdf',
        idCardFile: 'cmnd.pdf',
        transcript: 'hoc-ba.pdf',
        diploma: 'bang-tot-nghiep.pdf',
        otherCertificates: 'chung-chi-tieng-anh.pdf',
        additionalDocuments: '',
        admissionFeeReceipt: 'bien-lai.pdf',
        status: 'pending',
        submittedAt: new Date().toISOString(),
        notes: 'Học sinh có thành tích tốt',
        admissionNo: `AD${String(id).padStart(7, '0')}`,
        rollNo: `R${String(id).padStart(3, '0')}`,
      });
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchApplication();
  }, [fetchApplication]);

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

  const handleCancel = () => {
    if (window.confirm('Bạn có chắc chắn muốn hủy hồ sơ này?')) {
      handleStatusChange('rejected');
    }
  };

  const getFileType = (filename) => {
    if (!filename) return null;
    const ext = filename.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext)) return 'pdf';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'image';
    return 'unknown';
  };

  const handleViewFile = (file, label) => {
    if (!file) return;
    const type = getFileType(file);
    if (type === 'unknown') {
      alert('Không thể xem loại file này');
      return;
    }
    setSelectedFile({ file, label });
    setFileType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFile(null);
    setFileType(null);
  };

  const handleDownload = (e, file) => {
    e.stopPropagation();
    // Mock download - in real app, this would download from server
    const link = document.createElement('a');
    link.href = `#${file}`;
    link.download = file;
    link.click();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <div className="text-gray-600">Đang tải thông tin...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!application) {
    return (
      <Layout>
        <div className="bg-white rounded-lg border border-gray-200 p-8 max-w-md mx-auto text-center">
          <p className="text-red-600 mb-4">Không tìm thấy hồ sơ</p>
          <button
            onClick={() => navigate('/applications')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
          >
            Quay lại danh sách
          </button>
        </div>
      </Layout>
    );
  }


  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600">
          <span className="hover:text-indigo-600 cursor-pointer">Bảng Điều Khiển</span>
          <span className="mx-2">/</span>
          <span className="hover:text-indigo-600 cursor-pointer">Sinh Viên</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Chi Tiết Hồ Sơ</span>
        </nav>

        {/* Page Header with Action Buttons */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Chi Tiết Hồ Sơ</h1>
          <div className="flex items-center space-x-3">
            <Link
              to={`/applications/${id}/edit`}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Chỉnh Sửa Hồ Sơ</span>
            </Link>
            {application.status === 'pending' && (
              <>
                <button
                  onClick={() => handleStatusChange('approved')}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Duyệt</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-2"
                >
                  <XCircle className="h-4 w-4" />
                  <span>Hủy</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Main Content - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Student Profile Card */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                {/* Status Badge */}
                <div className="mb-4">
                  {application.status === 'pending' && (
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      <span className="text-sm font-semibold text-yellow-700">Chờ Duyệt</span>
                    </div>
                  )}
                  {application.status === 'approved' && (
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-50 border-2 border-green-500 rounded-lg">
                      <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                      <span className="text-sm font-semibold text-green-700">Đã Duyệt</span>
                    </div>
                  )}
                  {application.status === 'rejected' && (
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-50 border-2 border-red-500 rounded-lg">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-500"></span>
                      <span className="text-sm font-semibold text-red-700">Từ Chối</span>
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-1">{application.fullName}</h2>
                <p className="text-sm text-gray-600 mb-6">{application.admissionNo || `AD${String(id).padStart(7, '0')}`}</p>

                {/* Nguyện Vọng */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Nguyện Vọng</h3>
                  {application.program === 'cao-dang' && (
                    <div className="space-y-2">
                      <div className="px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg text-white text-sm font-semibold">
                        Cao Đẳng
                      </div>
                      {application.major && (
                        <div className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg">
                          <span className="text-xs text-indigo-600">Ngành học:</span>
                          <p className="text-sm font-semibold text-indigo-900">{application.major}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {application.program === 'trung-cap' && (
                    <div className="space-y-2">
                      <div className="px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white text-sm font-semibold">
                        Trung Cấp
                      </div>
                      {application.major && (
                        <div className="px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                          <span className="text-xs text-blue-600">Ngành học:</span>
                          <p className="text-sm font-semibold text-blue-900">{application.major}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {application.program === 'khoa-hoc-ngan-han' && (
                    <div className="space-y-2">
                      <div className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg text-white text-sm font-semibold">
                        Khóa Học Ngắn Hạn
                      </div>
                      {application.course && (
                        <div className="px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <span className="text-xs text-emerald-600">Khóa học:</span>
                          <p className="text-sm font-semibold text-emerald-900">{application.course}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {!application.program && (
                    <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                      <span className="text-xs text-gray-600">Chưa chọn nguyện vọng</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              
              {/* Primary Contact Info */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Liên Hệ Chính</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Số Điện Thoại:</span>
                      <p className="text-sm font-medium text-gray-900">{application.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <span className="text-sm text-gray-600">Địa Chỉ Email:</span>
                      <p className="text-sm font-medium text-gray-900">{application.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Application Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Thông Tin Hồ Sơ</h3>
                 
                </div>
                <div className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Họ và tên:</span>
                      <p className="text-sm font-medium text-gray-900">{application.fullName || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Giới tính:</span>
                      <p className="text-sm font-medium text-gray-900">
                        {application.gender === 'male' ? 'Nam' : application.gender === 'female' ? 'Nữ' : 'Khác'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Ngày sinh:</span>
                      <p className="text-sm font-medium text-gray-900">
                        {application.dateOfBirth ? new Date(application.dateOfBirth).toLocaleDateString('vi-VN') : 'N/A'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Nơi sinh:</span>
                      <p className="text-sm font-medium text-gray-900">{application.placeOfBirth || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Nguyên Quán:</span>
                      <p className="text-sm font-medium text-gray-900">{application.hometown || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">CMND/CCCD:</span>
                      <p className="text-sm font-medium text-gray-900">{application.idCard || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Hộ khẩu thường trú:</span>
                      <p className="text-sm font-medium text-gray-900">{application.permanentAddress || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Địa chỉ liên hệ:</span>
                      <p className="text-sm font-medium text-gray-900">{application.contactAddress || application.permanentAddress || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Dân tộc:</span>
                      <p className="text-sm font-medium text-gray-900">{application.ethnicity || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Nghề nghiệp:</span>
                      <p className="text-sm font-medium text-gray-900">{application.occupation || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Đơn vị công tác:</span>
                      <p className="text-sm font-medium text-gray-900">{application.workplace || 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 whitespace-nowrap">Chức vụ:</span>
                      <p className="text-sm font-medium text-gray-900">{application.position || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bổ sung hồ sơ</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Giấy Khai Sinh', file: application.birthCertificate },
                    { label: 'Giấy Chuyển Trường', file: application.transcript },
                    { label: 'CMND/CCCD', file: application.idCardFile },
                    { label: 'Bằng Tốt Nghiệp', file: application.diploma },
                  ].filter(doc => doc.file).map((doc, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleViewFile(doc.file, doc.label)}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-900">{doc.file}</span>
                      </div>
                      <button 
                        onClick={(e) => handleDownload(e, doc.file)}
                        className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Download className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Modal for viewing PDF and Images */}
      {modalOpen && selectedFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={handleCloseModal}>
          <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{selectedFile.label}</h3>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-auto p-4">
              {fileType === 'pdf' && (
                <iframe
                  src={`/api/files/${selectedFile.file}`}
                  className="w-full h-full min-h-[600px] border-0"
                  title={selectedFile.label}
                />
              )}
              {fileType === 'image' && (
                <div className="flex items-center justify-center">
                  <img
                    src={`/api/files/${selectedFile.file}`}
                    alt={selectedFile.label}
                    className="max-w-full max-h-[70vh] object-contain"
                  />
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 space-x-3">
              <button
                onClick={() => handleDownload(null, selectedFile.file)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Tải xuống</span>
              </button>
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ApplicationDetail;
