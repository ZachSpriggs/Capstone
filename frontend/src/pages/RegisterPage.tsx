import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setError('You must accept the terms & conditions.');
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    try {
      await axios.post('http://localhost:4000/api/auth/register', { name, email, password });
      await login(email, password);
    } catch {
      setError('Registration failed. Email may already exist.');
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm border-2 border-blue-600 p-6">
        <h1 className="text-2xl font-bold mb-6 underline">Registration</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.785 0 5.386.896 7.879 2.433M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input
              type="text"
              placeholder="Enter your name"
              required
              className="w-full pl-10 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 11V7a7 7 0 0114 0v4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11v2m0 4h.01" />
            </svg>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Create a password"
              required
              className="w-full pl-10 pr-10 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="relative">
            <svg
              className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M5 11V7a7 7 0 0114 0v4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 11v2m0 4h.01" />
            </svg>
            <input
              type={show ? 'text' : 'password'}
              placeholder="Confirm a password"
              required
              className="w-full pl-10 pr-10 py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
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
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              className="mr-2"
              checked={agree}
              onChange={() => setAgree((a) => !a)}
            />
            I accept all terms &amp; conditions
          </label>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          >
            Register Now
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
}
