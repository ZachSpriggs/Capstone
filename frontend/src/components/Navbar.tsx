import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Decluttered</h1>
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}
