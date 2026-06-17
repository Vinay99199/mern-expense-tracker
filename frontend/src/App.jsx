import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { useToast } from './hooks/useToast';
import { ToastContainer } from './components/Toast';
import './styles/App.css';
import './styles/globals.css';

/**
 * Main App Component
 */
function App() {
  const { toasts, removeToast } = useToast();

  return (
    <AuthProvider>
      <Router>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login onSuccess={() => window.location.href = '/dashboard'} />} />
          <Route path="/signup" element={<Signup onSuccess={() => window.location.href = '/login'} />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
