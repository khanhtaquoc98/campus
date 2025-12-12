import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Layout.css';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <h1>Hệ Thống Quản Lý Giáo Vụ</h1>
          </div>
          <nav className="nav">
            <Link to="/applications" className="nav-link">Danh sách hồ sơ</Link>
            <div className="user-info">
              <span>Xin chào, {user?.name || user?.username}</span>
              <button onClick={handleLogout} className="btn-logout">
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 Hệ Thống Quản Lý Giáo Vụ - Trường Trung Cấp/Cao Đẳng</p>
      </footer>
    </div>
  );
};

export default Layout;

