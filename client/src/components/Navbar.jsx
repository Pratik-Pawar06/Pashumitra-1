import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { role, setRole, setUser } = useAuth();

  const handleLogout = () => {
    setRole(null);
    setUser(null);
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center">
      {/* Logo + Brand */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="PashuMitra Logo"
          className="w-10 h-10 object-cover rounded-full border-2 border-yellow-500"
        />
        <span className="text-2xl font-bold">PashuMitra</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6 items-center">
        <li>
          <Link to="/" className="hover:text-yellow-400">
            Home
          </Link>
        </li>

        {role === "farmer" && (
          <>
            <li>
              <Link to="/my-animals" className="hover:text-yellow-400">
                My Animals
              </Link>
            </li>
            <li>
              <Link to="/my-vaccinations" className="hover:text-yellow-400">
                My Vaccinations
              </Link>
            </li>
          </>
        )}

        {role === "officer" && (
          <>
            <li>
              <Link to="/farmers" className="hover:text-yellow-400">
                Farmers
              </Link>
            </li>

            <li>
              <Link to="/vaccinations" className="hover:text-yellow-400">
                Vaccinations
              </Link>
            </li>
          </>
        )}

        {role ? (
          <li>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400 transition"
            >
              Logout
            </button>
          </li>
        ) : (
          <li>
            <Link
              to="/auth"
              className="ml-4 bg-yellow-500 text-gray-900 px-4 py-2 rounded hover:bg-yellow-400 transition"
            >
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
