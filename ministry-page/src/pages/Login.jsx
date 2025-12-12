import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Gọi API đăng nhập
      const response = await authAPI.login(formData);
      const { user, token } = response.data;
      
      // Lưu thông tin đăng nhập
      login(user, token);
      
      // Chuyển hướng đến trang danh sách hồ sơ
      navigate('/applications');
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || 
        'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.'
      );
    } finally {
      setLoading(false);
    }
  };

  // Demo mode - bỏ comment để test không cần backend
  const handleDemoLogin = () => {
    const demoUser = {
      id: 1,
      username: 'admin',
      name: 'Quản trị viên',
      role: 'admin'
    };
    const demoToken = 'demo-token-12345';
    login(demoUser, demoToken);
    navigate('/applications');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Hệ Thống Quản Lý Giáo Vụ</h1>
          <p>Trường Trung Cấp / Cao Đẳng</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Nhập tên đăng nhập"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>

          <div className="demo-section">
            <hr />
            <p className="demo-text">Hoặc dùng tài khoản demo</p>
            <button 
              type="button" 
              onClick={handleDemoLogin} 
              className="btn-demo"
              disabled={loading}
            >
              Đăng nhập Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

