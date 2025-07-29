import axios from 'axios';

console.log('🔧 API BASE URL =', import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api');

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000/api',
  withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Injected auth header →', config.headers.Authorization);
  } else {
    console.warn('No token found, auth header not set');
  }
  return config;
});

export default api;
