/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({} as any);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    console.log('login response payload:', data);
    const newToken = data.token ?? data.accessToken ?? data.jwt;
    if (!newToken) {
      throw new Error('Login did not return a valid token field');
    }
    localStorage.setItem('token', newToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    setToken(newToken);
    navigate('/', { replace: true });
  };

  const logout = () => {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};