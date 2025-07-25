import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0118 18c.09.09.16.19.27.28.11.1.22.19.34.28.11.1.22.19.34.28a.5.5 0 010 .707.5.5 0 01-.707 0 8.003 8.003 0 01-2.22-2.22zM9 10s-2 2-5 2 5-2 5-2z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-wider">Inventory</h1>
        </Link>
        <div className="flex items-center">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">Dashboard</Link>
              <button 
                onClick={logout} 
                className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-transform duration-300 ease-in-out transform hover:scale-105"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-300">Login</Link>
              <Link to="/register" className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}