import { useAuth } from '../context/AuthContext';
import { useTheme } from '../hooks/useTheme';
import '../styles/Header.css';

/**
 * Header Component
 */
export const Header = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="app-title">💰 Expense Tracker</h1>
        </div>

        <div className="header-right">
          {user && <span className="user-name">Welcome, {user.name}</span>}

          <button
            className="btn-theme"
            onClick={toggleTheme}
            title={isDark ? 'Light mode' : 'Dark mode'}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};
