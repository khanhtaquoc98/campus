import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { applicationAPI } from '../services/api';
import Layout from '../components/Layout';
import './ApplicationForm.css';

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
    program: '', // 'trung-cap' hoặc 'cao-dang'
    major: '', // Ngành học cụ thể

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

  useEffect(() => {
    if (isEditMode) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      setFetchLoading(true);
      const response = await applicationAPI.getById(id);
      const data = response.data;
      setFormData({
        // Thông tin cá nhân (Bắt buộc)
        fullName: data.fullName || '',
        gender: data.gender || 'male',
        dateOfBirth: data.dateOfBirth?.split('T')[0] || '',
        placeOfBirth: data.placeOfBirth || '',
        hometown: data.hometown || '',
        idCard: data.idCard || '',
        permanentAddress: data.permanentAddress || '',
        contactAddress: data.contactAddress || '',
        phone: data.phone || '',
        email: data.email || '',
        ethnicity: data.ethnicity || '',

        // Thông tin cá nhân (Không bắt buộc)
        occupation: data.occupation || '',
        workplace: data.workplace || '',
        position: data.position || '',

        // Thông tin học tập
        educationLevel: data.educationLevel || '',
        highSchool: data.highSchool || '',
        graduationType: data.graduationType || '',
        gpa: data.gpa || '',

        // Nguyện vọng
        program: data.program || '',
        major: data.major || '',

        // Files
        birthCertificate: data.birthCertificate || '',
        idCardFile: data.idCardFile || '',
        transcript: data.transcript || '',
        diploma: data.diploma || '',
        otherCertificates: data.otherCertificates || '',
        additionalDocuments: data.additionalDocuments || '',
        admissionFeeReceipt: data.admissionFeeReceipt || '',

        notes: data.notes || '',
      });
    } catch (err) {
      console.error('Error fetching application:', err);
      alert('Không thể tải thông tin hồ sơ');
    } finally {
      setFetchLoading(false);
    }
  };

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

    if (!formData.major.trim()) {
      newErrors.major = 'Vui lòng nhập ngành học';
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
      } else {
        await applicationAPI.create(dataToSubmit);
        alert('Tạo hồ sơ mới thành công');
      }

      navigate('/applications');
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
        <div className="loading">Đang tải...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="application-form">
        <div className="form-header">
          <h2>{isEditMode ? 'Chỉnh Sửa Hồ Sơ' : 'Thêm Hồ Sơ Mới'}</h2>
          <Link to="/applications" className="btn btn-secondary">
            ← Quay lại
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          {/* THÔNG TIN CÁ NHÂN - BẮT BUỘC */}
          <section className="form-section">
            <h3>Thông Tin Cá Nhân (Bắt buộc)</h3>

            <div className="form-group">
              <label htmlFor="fullName">
                Họ và tên <span className="required">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? 'error' : ''}
                placeholder="Nguyễn Văn A"
              />
              {errors.fullName && <span className="error-text">{errors.fullName}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gender">
                  Giới tính <span className="required">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? 'error' : ''}
                >
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">
                  Ngày sinh <span className="required">*</span>
                </label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="placeOfBirth">
                  Nơi sinh <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  className={errors.placeOfBirth ? 'error' : ''}
                  placeholder="Hà Nội"
                />
                {errors.placeOfBirth && <span className="error-text">{errors.placeOfBirth}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="hometown">
                  Nguyên quán <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="hometown"
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleChange}
                  className={errors.hometown ? 'error' : ''}
                  placeholder="Hà Nội"
                />
                {errors.hometown && <span className="error-text">{errors.hometown}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="idCard">
                CMND/CCCD <span className="required">*</span>
              </label>
              <input
                type="text"
                id="idCard"
                name="idCard"
                value={formData.idCard}
                onChange={handleChange}
                className={errors.idCard ? 'error' : ''}
                placeholder="Nhập 9-12 chữ số"
              />
              {errors.idCard && <span className="error-text">{errors.idCard}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="permanentAddress">
                Hộ khẩu thường trú <span className="required">*</span>
              </label>
              <textarea
                id="permanentAddress"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                className={errors.permanentAddress ? 'error' : ''}
                rows="2"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              />
              {errors.permanentAddress && <span className="error-text">{errors.permanentAddress}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contactAddress">
                Địa chỉ liên hệ <span className="required">*</span>
              </label>
              <textarea
                id="contactAddress"
                name="contactAddress"
                value={formData.contactAddress}
                onChange={handleChange}
                className={errors.contactAddress ? 'error' : ''}
                rows="2"
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              />
              {errors.contactAddress && <span className="error-text">{errors.contactAddress}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">
                  Số điện thoại <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  placeholder="0987654321"
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="example@email.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="ethnicity">
                Dân tộc <span className="required">*</span>
              </label>
              <input
                type="text"
                id="ethnicity"
                name="ethnicity"
                value={formData.ethnicity}
                onChange={handleChange}
                className={errors.ethnicity ? 'error' : ''}
                placeholder="Kinh"
              />
              {errors.ethnicity && <span className="error-text">{errors.ethnicity}</span>}
            </div>
          </section>

          {/* THÔNG TIN CÁ NHÂN - KHÔNG BẮT BUỘC */}
          <section className="form-section">
            <h3>Thông Tin Cá Nhân (Không bắt buộc)</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="occupation">Nghề nghiệp</label>
                <input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder="Nhân viên văn phòng"
                />
              </div>

              <div className="form-group">
                <label htmlFor="workplace">Đơn vị công tác</label>
                <input
                  type="text"
                  id="workplace"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleChange}
                  placeholder="Công ty ABC"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="position">Chức vụ</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Nhân viên"
              />
            </div>
          </section>

          {/* THÔNG TIN HỌC TẬP */}
          <section className="form-section">
            <h3>Thông Tin Học Tập</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="educationLevel">
                  Trình độ học vấn <span className="required">*</span>
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                  className={errors.educationLevel ? 'error' : ''}
                >
                  <option value="">-- Chọn trình độ --</option>
                  <option value="Tốt nghiệp THPT">Tốt nghiệp THPT</option>
                  <option value="Tốt nghiệp THCS">Tốt nghiệp THCS</option>
                  <option value="Tốt nghiệp Trung cấp">Tốt nghiệp Trung cấp</option>
                  <option value="Tốt nghiệp Cao đẳng">Tốt nghiệp Cao đẳng</option>
                  <option value="Tốt nghiệp Đại học">Tốt nghiệp Đại học</option>
                </select>
                {errors.educationLevel && <span className="error-text">{errors.educationLevel}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="highSchool">
                  Trường tốt nghiệp THPT <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="highSchool"
                  name="highSchool"
                  value={formData.highSchool}
                  onChange={handleChange}
                  className={errors.highSchool ? 'error' : ''}
                  placeholder="THPT Nguyễn Huệ"
                />
                {errors.highSchool && <span className="error-text">{errors.highSchool}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="graduationType">
                  Loại hình tốt nghiệp <span className="required">*</span>
                </label>
                <select
                  id="graduationType"
                  name="graduationType"
                  value={formData.graduationType}
                  onChange={handleChange}
                  className={errors.graduationType ? 'error' : ''}
                >
                  <option value="">-- Chọn loại hình --</option>
                  <option value="Chính quy">Chính quy</option>
                  <option value="Tự do">Tự do</option>
                  <option value="Liên thông">Liên thông</option>
                  <option value="Văn bằng 2">Văn bằng 2</option>
                </select>
                {errors.graduationType && <span className="error-text">{errors.graduationType}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="gpa">
                  Điểm trung bình THPT <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="gpa"
                  name="gpa"
                  value={formData.gpa}
                  onChange={handleChange}
                  className={errors.gpa ? 'error' : ''}
                  placeholder="8.5"
                  min="0"
                  max="10"
                  step="0.1"
                />
                {errors.gpa && <span className="error-text">{errors.gpa}</span>}
              </div>
            </div>
          </section>

          {/* ĐĂNG KÝ NGUYỆN VỌNG */}
          <section className="form-section">
            <h3>Đăng Ký Nguyện Vọng</h3>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="program">
                  Chương trình học <span className="required">*</span>
                </label>
                <select
                  id="program"
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  className={errors.program ? 'error' : ''}
                >
                  <option value="">-- Chọn chương trình --</option>
                  <option value="trung-cap">Trung cấp</option>
                  <option value="cao-dang">Cao đẳng</option>
                </select>
                {errors.program && <span className="error-text">{errors.program}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="major">
                  Ngành học <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={formData.major}
                  onChange={handleChange}
                  className={errors.major ? 'error' : ''}
                  placeholder="Công nghệ thông tin"
                />
                {errors.major && <span className="error-text">{errors.major}</span>}
              </div>
            </div>
          </section>

          {/* ĐÍNH KÈM GIẤY TỜ */}
          <section className="form-section">
            <h3>Đính Kèm Giấy Tờ Cần Thiết</h3>
            <p className="section-note">
              Lưu ý: Trong demo mode, chỉ cần nhập tên file. Khi kết nối backend, sẽ có chức năng upload file thực tế.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthCertificate">
                  Giấy khai sinh <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="birthCertificate"
                  name="birthCertificate"
                  value={formData.birthCertificate}
                  onChange={handleChange}
                  className={errors.birthCertificate ? 'error' : ''}
                  placeholder="giay-khai-sinh.pdf"
                />
                {errors.birthCertificate && <span className="error-text">{errors.birthCertificate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="idCardFile">
                  CCCD/CMND/Passport <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="idCardFile"
                  name="idCardFile"
                  value={formData.idCardFile}
                  onChange={handleChange}
                  className={errors.idCardFile ? 'error' : ''}
                  placeholder="cmnd.pdf"
                />
                {errors.idCardFile && <span className="error-text">{errors.idCardFile}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="transcript">
                  Học bạ <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="transcript"
                  name="transcript"
                  value={formData.transcript}
                  onChange={handleChange}
                  className={errors.transcript ? 'error' : ''}
                  placeholder="hoc-ba.pdf"
                />
                {errors.transcript && <span className="error-text">{errors.transcript}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="diploma">
                  Giấy chứng nhận tốt nghiệp <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="diploma"
                  name="diploma"
                  value={formData.diploma}
                  onChange={handleChange}
                  className={errors.diploma ? 'error' : ''}
                  placeholder="bang-tot-nghiep.pdf"
                />
                {errors.diploma && <span className="error-text">{errors.diploma}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="otherCertificates">Các chứng chỉ khác (Không bắt buộc)</label>
              <input
                type="text"
                id="otherCertificates"
                name="otherCertificates"
                value={formData.otherCertificates}
                onChange={handleChange}
                placeholder="chung-chi-tieng-anh.pdf, chung-chi-tin-hoc.pdf"
              />
            </div>
          </section>

          {/* BỔ SUNG HỒ SƠ */}
          <section className="form-section">
            <h3>Bổ Sung Hồ Sơ</h3>

            <div className="form-group">
              <label htmlFor="additionalDocuments">
                Đính kèm các giấy tờ khác (Không bắt buộc)
              </label>
              <input
                type="text"
                id="additionalDocuments"
                name="additionalDocuments"
                value={formData.additionalDocuments}
                onChange={handleChange}
                placeholder="giay-to-khac.pdf"
              />
              <small className="form-help">
                Áp dụng cho cả Trung cấp và Cao đẳng
              </small>
            </div>

            <div className="form-group">
              <label htmlFor="admissionFeeReceipt">
                Biên lai thu tiền lệ phí tuyển sinh (Không bắt buộc)
              </label>
              <input
                type="text"
                id="admissionFeeReceipt"
                name="admissionFeeReceipt"
                value={formData.admissionFeeReceipt}
                onChange={handleChange}
                placeholder="bien-lai.pdf"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Thông tin bổ sung (nếu có)"
              />
            </div>
          </section>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Đang xử lý...' : (isEditMode ? 'Cập nhật' : 'Tạo mới')}
            </button>
            <Link to="/applications" className="btn btn-secondary">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ApplicationForm;

