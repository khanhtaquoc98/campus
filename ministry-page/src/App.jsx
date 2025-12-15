import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import ApplicationList from './pages/ql-ho-so/ApplicationList';
import ApplicationDetail from './pages/ql-ho-so/ApplicationDetail';
import ApplicationForm from './pages/ql-ho-so/ApplicationForm';
import ProgramManagement from './pages/ql-dao-tao/ProgramManagement';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/new"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id"
            element={
              <ProtectedRoute>
                <ApplicationDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applications/:id/edit"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/programs"
            element={
              <ProtectedRoute>
                <ProgramManagement />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="*" element={<Navigate to="/applications" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
