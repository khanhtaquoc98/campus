import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { applicationAPI } from '../../services/api';
import Layout from '../../components/Layout';
import { Phone, Mail, FileText } from 'lucide-react';

// Demo data constant
const DEMO_APPLICATION_DATA = {
  // Thông tin cá nhân (Bắt buộc)
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

  // Thông tin cá nhân (Không bắt buộc)
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
  course: '',

  // Files
  birthCertificate: 'giay-khai-sinh.pdf',
  idCardFile: 'cmnd.pdf',
  transcript: 'hoc-ba.pdf',
  diploma: 'bang-tot-nghiep.pdf',
  otherCertificates: 'chung-chi-tieng-anh.pdf',
  additionalDocuments: '',
  admissionFeeReceipt: 'bien-lai.pdf',

  notes: 'Học sinh có thành tích tốt',
};

const ApplicationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    // Thông tin cá nhân (Bắt buộc)
    fullName: '',
    gender: 'male',
    dateOfBirth: '',
    placeOfBirth: '',
    hometown: '',
    idCard: '',
    permanentAddress: '',
    contactAddress: '',
    phone: '',
    email: '',
    ethnicity: '',

    // Thông tin cá nhân (Không bắt buộc)
    occupation: '',
    workplace: '',
    position: '',

    // Thông tin học tập (Bắt buộc)
    educationLevel: '',
    highSchool: '',
    graduationType: '',
    gpa: '',

    // Đăng ký nguyện vọng (Bắt buộc)
    program: '', // 'trung-cap', 'cao-dang', hoặc 'khoa-hoc-ngan-han'
    major: '', // Ngành học cụ thể (cho cao-dang và trung-cap)
    course: '', // Khóa học (cho khoa-hoc-ngan-han)

    // Files đính kèm (sẽ lưu tên file hoặc URL)
    birthCertificate: '',
    idCardFile: '',
    transcript: '',
    diploma: '',
    otherCertificates: '',
    additionalDocuments: '',
    admissionFeeReceipt: '',

    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);

  const fetchApplication = useCallback(async () => {
    try {
      setFetchLoading(true);
      const response = await applicationAPI.getById(id);
      const data = response.data;
      
      // Check if data exists
      if (!data) {
        alert('Không tìm thấy thông tin hồ sơ. Đang sử dụng dữ liệu demo.');
        // Use demo data
        const demoData = { ...DEMO_APPLICATION_DATA };
        if (id) {
          demoData.dateOfBirth = demoData.dateOfBirth?.split('T')[0] || demoData.dateOfBirth;
        }
        setFormData({
          fullName: demoData.fullName || '',
          gender: demoData.gender || 'male',
          dateOfBirth: demoData.dateOfBirth || '',
          placeOfBirth: demoData.placeOfBirth || '',
          hometown: demoData.hometown || '',
          idCard: demoData.idCard || '',
          permanentAddress: demoData.permanentAddress || '',
          contactAddress: demoData.contactAddress || '',
          phone: demoData.phone || '',
          email: demoData.email || '',
          ethnicity: demoData.ethnicity || '',
          occupation: demoData.occupation || '',
          workplace: demoData.workplace || '',
          position: demoData.position || '',
          educationLevel: demoData.educationLevel || '',
          highSchool: demoData.highSchool || '',
          graduationType: demoData.graduationType || '',
          gpa: demoData.gpa || '',
          program: demoData.program || '',
          major: demoData.major || '',
          course: demoData.course || '',
          birthCertificate: demoData.birthCertificate || '',
          idCardFile: demoData.idCardFile || '',
          transcript: demoData.transcript || '',
          diploma: demoData.diploma || '',
          otherCertificates: demoData.otherCertificates || '',
          additionalDocuments: demoData.additionalDocuments || '',
          admissionFeeReceipt: demoData.admissionFeeReceipt || '',
          notes: demoData.notes || '',
        });
        return;
      }
      
      // Helper function to get field value or default
      const getFieldValue = (fieldName, defaultValue = '') => {
        return data[fieldName] || defaultValue;
      };

      setFormData({
        // Thông tin cá nhân (Bắt buộc)
        fullName: getFieldValue('fullName'),
        gender: getFieldValue('gender', 'male'),
        dateOfBirth: data.dateOfBirth?.split('T')[0] || '',
        placeOfBirth: getFieldValue('placeOfBirth'),
        hometown: getFieldValue('hometown'),
        idCard: getFieldValue('idCard'),
        permanentAddress: getFieldValue('permanentAddress'),
        contactAddress: getFieldValue('contactAddress'),
        phone: getFieldValue('phone'),
        email: getFieldValue('email'),
        ethnicity: getFieldValue('ethnicity'),

        // Thông tin cá nhân (Không bắt buộc)
        occupation: getFieldValue('occupation'),
        workplace: getFieldValue('workplace'),
        position: getFieldValue('position'),

        // Thông tin học tập
        educationLevel: getFieldValue('educationLevel'),
        highSchool: getFieldValue('highSchool'),
        graduationType: getFieldValue('graduationType'),
        gpa: getFieldValue('gpa'),

        // Nguyện vọng
        program: getFieldValue('program'),
        major: getFieldValue('major'),
        course: getFieldValue('course'),

        // Files
        birthCertificate: getFieldValue('birthCertificate'),
        idCardFile: getFieldValue('idCardFile'),
        transcript: getFieldValue('transcript'),
        diploma: getFieldValue('diploma'),
        otherCertificates: getFieldValue('otherCertificates'),
        additionalDocuments: getFieldValue('additionalDocuments'),
        admissionFeeReceipt: getFieldValue('admissionFeeReceipt'),

        notes: getFieldValue('notes'),
      });
    } catch (err) {
      console.error('Error fetching application:', err);
      alert('Không thể tải thông tin hồ sơ. Đang sử dụng dữ liệu demo.');
      // Use demo data when API fails
      const demoData = { ...DEMO_APPLICATION_DATA };
      if (id) {
        demoData.dateOfBirth = demoData.dateOfBirth?.split('T')[0] || demoData.dateOfBirth;
      }
      setFormData({
        // Thông tin cá nhân (Bắt buộc)
        fullName: demoData.fullName || '',
        gender: demoData.gender || 'male',
        dateOfBirth: demoData.dateOfBirth || '',
        placeOfBirth: demoData.placeOfBirth || '',
        hometown: demoData.hometown || '',
        idCard: demoData.idCard || '',
        permanentAddress: demoData.permanentAddress || '',
        contactAddress: demoData.contactAddress || '',
        phone: demoData.phone || '',
        email: demoData.email || '',
        ethnicity: demoData.ethnicity || '',

        // Thông tin cá nhân (Không bắt buộc)
        occupation: demoData.occupation || '',
        workplace: demoData.workplace || '',
        position: demoData.position || '',

        // Thông tin học tập
        educationLevel: demoData.educationLevel || '',
        highSchool: demoData.highSchool || '',
        graduationType: demoData.graduationType || '',
        gpa: demoData.gpa || '',

        // Nguyện vọng
        program: demoData.program || '',
        major: demoData.major || '',
        course: demoData.course || '',

        // Files
        birthCertificate: demoData.birthCertificate || '',
        idCardFile: demoData.idCardFile || '',
        transcript: demoData.transcript || '',
        diploma: demoData.diploma || '',
        otherCertificates: demoData.otherCertificates || '',
        additionalDocuments: demoData.additionalDocuments || '',
        admissionFeeReceipt: demoData.admissionFeeReceipt || '',

        notes: demoData.notes || '',
      });
    } finally {
      setFetchLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (isEditMode) {
      fetchApplication();
    }
  }, [isEditMode, fetchApplication]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Xóa lỗi khi người dùng nhập
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Thông tin cá nhân (Bắt buộc)
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Vui lòng chọn ngày sinh';
    }

    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Vui lòng nhập nơi sinh';
    }

    if (!formData.hometown.trim()) {
      newErrors.hometown = 'Vui lòng nhập nguyên quán';
    }

    if (!formData.idCard.trim()) {
      newErrors.idCard = 'Vui lòng nhập CMND/CCCD';
    } else if (!/^\d{9,12}$/.test(formData.idCard)) {
      newErrors.idCard = 'CMND/CCCD phải là 9-12 chữ số';
    }

    if (!formData.permanentAddress.trim()) {
      newErrors.permanentAddress = 'Vui lòng nhập hộ khẩu thường trú';
    }

    if (!formData.contactAddress.trim()) {
      newErrors.contactAddress = 'Vui lòng nhập địa chỉ liên hệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^0\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải là 10 chữ số và bắt đầu bằng 0';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.ethnicity.trim()) {
      newErrors.ethnicity = 'Vui lòng nhập dân tộc';
    }

    // Thông tin học tập (Bắt buộc)
    if (!formData.educationLevel) {
      newErrors.educationLevel = 'Vui lòng chọn trình độ học vấn';
    }

    if (!formData.highSchool.trim()) {
      newErrors.highSchool = 'Vui lòng nhập trường tốt nghiệp THPT';
    }

    if (!formData.graduationType) {
      newErrors.graduationType = 'Vui lòng chọn loại hình tốt nghiệp';
    }

    if (!formData.gpa.trim()) {
      newErrors.gpa = 'Vui lòng nhập điểm trung bình THPT';
    } else if (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 10) {
      newErrors.gpa = 'Điểm trung bình phải từ 0 đến 10';
    }

    // Nguyện vọng (Bắt buộc)
    if (!formData.program) {
      newErrors.program = 'Vui lòng chọn chương trình đào tạo';
    }

    if (formData.program === 'khoa-hoc-ngan-han') {
      if (!formData.course.trim()) {
        newErrors.course = 'Vui lòng nhập khóa học';
      }
    } else {
      if (!formData.major.trim()) {
        newErrors.major = 'Vui lòng nhập ngành học';
      }
    }

    // Files đính kèm (Bắt buộc) - chỉ check khi tạo mới
    if (!isEditMode) {
      if (!formData.birthCertificate) {
        newErrors.birthCertificate = 'Vui lòng đính kèm giấy khai sinh';
      }
      if (!formData.idCardFile) {
        newErrors.idCardFile = 'Vui lòng đính kèm CMND/CCCD';
      }
      if (!formData.transcript) {
        newErrors.transcript = 'Vui lòng đính kèm học bạ';
      }
      if (!formData.diploma) {
        newErrors.diploma = 'Vui lòng đính kèm giấy chứng nhận tốt nghiệp';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const dataToSubmit = {
        ...formData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };

      if (isEditMode) {
        await applicationAPI.update(id, dataToSubmit);
        alert('Cập nhật hồ sơ thành công');
        navigate(`/applications/${id}`);
      } else {
        const response = await applicationAPI.create(dataToSubmit);
        const newId = response.data?.id || response.data?.data?.id;
        alert('Tạo hồ sơ mới thành công');
        if (newId) {
          navigate(`/applications/${newId}`);
        } else {
          navigate('/applications');
        }
      }
    } catch (err) {
      console.error('Error saving application:', err);
      alert(isEditMode ? 'Không thể cập nhật hồ sơ' : 'Không thể tạo hồ sơ mới');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
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

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-600">
          <span className="hover:text-indigo-600 cursor-pointer">Bảng Điều Khiển</span>
          <span className="mx-2">/</span>
          <span className="hover:text-indigo-600 cursor-pointer">Sinh Viên</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{isEditMode ? 'Chỉnh Sửa Hồ Sơ' : 'Thêm Hồ Sơ Mới'}</span>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">{isEditMode ? 'Chỉnh Sửa Hồ Sơ' : 'Thêm Hồ Sơ Mới'}</h1>
          <Link
            to={isEditMode ? `/applications/${id}` : '/applications'}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            ← Quay lại
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Main Content - Single Column */}
          <div className="space-y-6">
              {/* Application Information */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông Tin Hồ Sơ</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Họ và tên:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.fullName ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Nguyễn Văn A"
                      />
                      {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Giới tính:</label>
                    <div className="flex-1">
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                      {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Ngày sinh:</label>
                    <div className="flex-1">
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      />
                      {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Nơi sinh:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="placeOfBirth"
                        value={formData.placeOfBirth}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.placeOfBirth ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Hà Nội"
                      />
                      {errors.placeOfBirth && <p className="text-sm text-red-500 mt-1">{errors.placeOfBirth}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Nguyên Quán:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="hometown"
                        value={formData.hometown}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.hometown ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Hà Nội"
                      />
                      {errors.hometown && <p className="text-sm text-red-500 mt-1">{errors.hometown}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">CMND/CCCD:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="idCard"
                        value={formData.idCard}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.idCard ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Nhập 9-12 chữ số"
                      />
                      {errors.idCard && <p className="text-sm text-red-500 mt-1">{errors.idCard}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Hộ khẩu thường trú:</label>
                    <div className="flex-1">
                      <textarea
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.permanentAddress ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      />
                      {errors.permanentAddress && <p className="text-sm text-red-500 mt-1">{errors.permanentAddress}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Địa chỉ liên hệ:</label>
                    <div className="flex-1">
                      <textarea
                        name="contactAddress"
                        value={formData.contactAddress}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.contactAddress ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      />
                      {errors.contactAddress && <p className="text-sm text-red-500 mt-1">{errors.contactAddress}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Dân tộc:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="ethnicity"
                        value={formData.ethnicity}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.ethnicity ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Kinh"
                      />
                      {errors.ethnicity && <p className="text-sm text-red-500 mt-1">{errors.ethnicity}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Số Điện Thoại:</label>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          placeholder="0987654321"
                        />
                      </div>
                      {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Địa Chỉ Email:</label>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                          placeholder="example@email.com"
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Nghề nghiệp:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhân viên văn phòng"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Đơn vị công tác:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="workplace"
                        value={formData.workplace}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Công ty ABC"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-gray-600 whitespace-nowrap w-32">Chức vụ:</label>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Nhân viên"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Nguyện Vọng */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Đăng Ký Nguyện Vọng</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="program" className="block text-sm text-gray-600 mb-1">
                      Chương trình học <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="program"
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${
                        errors.program ? 'border-red-500' : 'border-gray-300'
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      <option value="">-- Chọn chương trình --</option>
                      <option value="trung-cap">Trung cấp</option>
                      <option value="cao-dang">Cao đẳng</option>
                      <option value="khoa-hoc-ngan-han">Khóa học ngắn hạn</option>
                    </select>
                    {errors.program && <p className="text-sm text-red-500 mt-1">{errors.program}</p>}
                  </div>
                  {formData.program === 'khoa-hoc-ngan-han' ? (
                    <div>
                      <label htmlFor="course" className="block text-sm text-gray-600 mb-1">
                        Khóa học <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="course"
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.course ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Khóa học ngắn hạn"
                      />
                      {errors.course && <p className="text-sm text-red-500 mt-1">{errors.course}</p>}
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="major" className="block text-sm text-gray-600 mb-1">
                        Ngành học <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="major"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${
                          errors.major ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="Công nghệ thông tin"
                      />
                      {errors.major && <p className="text-sm text-red-500 mt-1">{errors.major}</p>}
                    </div>
                  )}
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Bổ sung hồ sơ</h3>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="birthCertificate" className="block text-sm text-gray-600 mb-1">
                      Giấy Khai Sinh {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <input
                        type="text"
                        id="birthCertificate"
                        name="birthCertificate"
                        value={formData.birthCertificate}
                        onChange={handleChange}
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                          errors.birthCertificate ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="giay-khai-sinh.pdf"
                      />
                    </div>
                    {errors.birthCertificate && <p className="text-sm text-red-500 mt-1">{errors.birthCertificate}</p>}
                  </div>
                  <div>
                    <label htmlFor="transcript" className="block text-sm text-gray-600 mb-1">
                      Giấy Chuyển Trường {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <input
                        type="text"
                        id="transcript"
                        name="transcript"
                        value={formData.transcript}
                        onChange={handleChange}
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                          errors.transcript ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="hoc-ba.pdf"
                      />
                    </div>
                    {errors.transcript && <p className="text-sm text-red-500 mt-1">{errors.transcript}</p>}
                  </div>
                  <div>
                    <label htmlFor="idCardFile" className="block text-sm text-gray-600 mb-1">
                      CMND/CCCD {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <input
                        type="text"
                        id="idCardFile"
                        name="idCardFile"
                        value={formData.idCardFile}
                        onChange={handleChange}
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                          errors.idCardFile ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="cmnd.pdf"
                      />
                    </div>
                    {errors.idCardFile && <p className="text-sm text-red-500 mt-1">{errors.idCardFile}</p>}
                  </div>
                  <div>
                    <label htmlFor="diploma" className="block text-sm text-gray-600 mb-1">
                      Bằng Tốt Nghiệp {!isEditMode && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-red-500" />
                      <input
                        type="text"
                        id="diploma"
                        name="diploma"
                        value={formData.diploma}
                        onChange={handleChange}
                        className={`flex-1 px-3 py-2 border rounded-lg text-sm ${
                          errors.diploma ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        placeholder="bang-tot-nghiep.pdf"
                      />
                    </div>
                    {errors.diploma && <p className="text-sm text-red-500 mt-1">{errors.diploma}</p>}
                  </div>
                </div>
              </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <Link
                to={isEditMode ? `/applications/${id}` : '/applications'}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
              >
                Hủy
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật' : 'Tạo mới')}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ApplicationForm;

