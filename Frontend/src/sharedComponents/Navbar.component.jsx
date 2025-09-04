// src/sharedComponents/Navbar.component.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuConfig } from "../utils/menu.config";
<<<<<<< HEAD
import { FaUser, FaPlus, FaUsers, FaBlog, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
=======
import { FaUser, FaPlus, FaUsers, FaBlog, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth.context";
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const isGuest = !user;
  const role = user?.role || "Guest";
  const roleLinks = !isGuest ? menuConfig[role] || [] : [];

  const fixedLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about-page" },
    { name: "Services", path: "/service-page" },
    { name: "Contact", path: "/contact-page" },
  ];

  const iconMap = {
    Profile: <FaUser className="inline-block mr-1" />,
    "Create Blog": <FaPlus className="inline-block mr-1" />,
    Users: <FaUsers className="inline-block mr-1" />,
    Blogs: <FaBlog className="inline-block mr-1" />,
  };

  const handleLogout = () => {
    logout();           // clear auth state & localStorage
    navigate("/");      // redirect to home
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg fixed w-full z-50">
<<<<<<< HEAD
      <div className="container mx-auto px-16 py-4 flex items-center justify-between">
        {/* Logo - solid color */}
        <div className="text-3xl font-bold tracking-wide text-yellow-300">
          BlogContent
        </div>
=======
      <div className="container mx-auto px-4 md:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold tracking-wide text-yellow-300">BlogContent</div>
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center font-medium">
          {fixedLinks.map((link) => (
<<<<<<< HEAD
            <motion.li
              key={link.path}
              className="relative group text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 ${
                    isActive ? "text-yellow-300 font-extrabold" : "hover:text-pink-300"
                  }`
=======
            <motion.li key={link.path} className="relative group text-white" whileHover={{ scale: 1.1 }}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `transition-all duration-300 ${isActive ? "text-yellow-300 font-extrabold" : "hover:text-pink-300"}`
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
                }
              >
                {link.name}
              </NavLink>
            </motion.li>
          ))}
        </ul>

<<<<<<< HEAD
        {/* Right side: Account / Role-based */}
        <div className="hidden md:flex items-center gap-4 relative">
          {role === "Guest" ? (
=======
        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 relative">
          {isGuest ? (
            // Guest Mode
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
              <motion.button
                className="flex items-center gap-1 bg-white text-indigo-700 px-4 py-2 rounded-md shadow hover:bg-yellow-200 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                Account{" "}
                <motion.span
                  className="ml-1 inline-block"
<<<<<<< HEAD
                  animate={{ rotate: accountOpen ? 180 : 0, y: accountOpen ? -2 : 0 }}
=======
                  animate={{ rotate: accountOpen ? 180 : 0 }}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <FaChevronDown />
                </motion.span>
              </motion.button>

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
<<<<<<< HEAD
            roleLinks.map((link) => (
              <motion.div
                key={link.path}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                      isActive
                        ? "bg-yellow-400 text-indigo-900"
                        : "hover:bg-teal-300 hover:text-indigo-900 text-white"
                    }`
                  }
                >
                  {iconMap[link.name]}
                  {link.name}
                </NavLink>
              </motion.div>
            ))
=======
            // Logged-in user links
            <>
              {roleLinks.map((link) => (
                <motion.div key={link.path} whileHover={{ scale: 1.05 }}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 ${
                        isActive ? "bg-yellow-400 text-indigo-900" : "hover:bg-teal-300 hover:text-indigo-900 text-white"
                      }`
                    }
                  >
                    {iconMap[link.name]}
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              {/* Logout button */}
              <motion.button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                <FaSignOutAlt />
                Logout
              </motion.button>
            </>
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
          )}
        </div>

        {/* Mobile Hamburger */}
<<<<<<< HEAD
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center text-white focus:outline-none"
        >
=======
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden flex items-center text-white focus:outline-none">
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 space-y-2 text-white">
          {[...fixedLinks, ...(isGuest ? [] : roleLinks)].map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition-all duration-300 ${
                    isActive ? "bg-yellow-400 text-indigo-900 scale-105" : "hover:bg-teal-300 hover:text-indigo-900 text-white"
                  }`
                }
              >
                {iconMap[link.name]}
                {link.name}
              </NavLink>
            </li>
          ))}

          {isGuest && (
            <>
              <li>
                <NavLink to="/login" className="block px-3 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-all">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="block px-3 py-2 rounded-md hover:bg-indigo-100 hover:text-indigo-700 transition-all">
                  Register
                </NavLink>
              </li>
            </>
          )}

          {!isGuest && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-2 rounded-md bg-red-600 text-white hover:bg-red-500 transition-all w-full justify-center"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
