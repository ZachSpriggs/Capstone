import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!token ? <RegisterPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}
