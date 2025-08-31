// src/sharedComponents/Navbar.component.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { menuConfig } from "../utils/menu.config";
import { FaUser, FaPlus, FaUsers, FaBlog, FaChevronDown } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const role = "Guest"; // Guest / Reader / Author / Admin
  const roleLinks = menuConfig[role] || [];

  const fixedLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-Page" },
    { name: "Services", path: "/service-page" },
    { name: "Contact", path: "/contact-page" },
  ];

  const iconMap = {
    Profile: <FaUser className="inline-block mr-1" />,
    "Create Blog": <FaPlus className="inline-block mr-1" />,
    Users: <FaUsers className="inline-block mr-1" />,
    Blogs: <FaBlog className="inline-block mr-1" />,
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed w-full z-50">
      <div className="container mx-auto px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold text-white tracking-wide">BlogContent</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center text-white font-medium">
          {fixedLinks.map((link) => (
            <li key={link.path} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    isActive ? "text-yellow-300 font-extrabold" : "text-white hover:text-pink-300"
                  }`
                }
              >
                {link.name}
                <span className="block max-w-0 group-hover:max-w-full h-0.5 bg-yellow-300 rounded transition-all duration-300 mt-1"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right side: Role-based links or Account dropdown */}
        <div className="hidden md:flex items-center gap-4 relative">
          {role === "Guest" ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1 bg-white text-indigo-700 px-4 py-2 rounded-md shadow hover:bg-yellow-200 transition-all"
              >
                Account <FaChevronDown />
              </button>
              {accountOpen && (
                <ul className="absolute right-0 mt-2 bg-white rounded-md shadow-lg w-36 py-1 text-gray-700">
                  <li>
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700 rounded transition-colors"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 hover:bg-indigo-100 hover:text-indigo-700 rounded transition-colors"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            roleLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-indigo-900 scale-105"
                      : "hover:bg-teal-300 hover:text-indigo-900 text-white"
                  }`
                }
              >
                {iconMap[link.name]}
                {link.name}
              </NavLink>
            ))
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 space-y-2 text-white">
          {[...fixedLinks, ...roleLinks].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive
                      ? "bg-yellow-400 text-indigo-900 scale-105"
                      : "hover:bg-teal-300 hover:text-indigo-900 text-white"
                  }`
                }
              >
                {iconMap[link.name]}
                {link.name}
              </NavLink>
            </li>
          ))}
          {role === "Guest" && (
            <>
              <li>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-all"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className="block px-3 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-all"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}
