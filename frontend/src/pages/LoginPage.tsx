import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError('');
      navigate('/', { replace: true });
    } catch {
      setError('Invalid email or password.');
    }
  };
  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm border-2 border-blue-600 p-6">
        <h1 className="text-2xl font-bold mb-6 underline">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11c1.657 0 3 .895 3 2v1H9v-1c0-1.105 1.343-2 3-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 11V7a7 7 0 0114 0v4" />
            </svg>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Enter your password"
              required
              className="w-full pl-10 pr-10 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show
                ? <span role="img" aria-label="Hide">🙈</span>
                : <span role="img" aria-label="Show">👁️</span>}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <Link to="/forgot" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Login Now
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Signup now
          </Link>
        </p>
      </div>
    </div>
  );
}
