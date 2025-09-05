import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { menuConfig } from "../utils/menu.config";
<<<<<<< HEAD
import { FaUser, FaPlus, FaUsers, FaBlog, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
=======
import { FaUser, FaPlus, FaUsers, FaBlog, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth.context";
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
import { menuConfig } from "../utils/menu.config"; 
import { FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../context/auth.context";
>>>>>>> 68ee815 (AlMost-85)

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

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogout = () => {
    logout();           // clear auth state & localStorage
    navigate("/");      // redirect to home
  };

  return (
<<<<<<< HEAD
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
=======
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 shadow-md fixed w-full z-50 p-2">
      <div className="container mx-auto px-4 md:px-10 py-3 flex items-center justify-between text-sm">
        {/* Logo */}
        <div className="text-lg font-bold text-yellow-300">BlogContent</div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center font-medium text-white">
          {fixedLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `px-2 py-1 transition ${
                    isActive
                      ? "text-yellow-300 border-b-2 border-yellow-300 font-semibold"
                      : "hover:text-pink-300"
>>>>>>> 68ee815 (AlMost-85)
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
=======
        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {isGuest ? (
>>>>>>> 68ee815 (AlMost-85)
            <div
              className="relative"
              onMouseEnter={() => setAccountOpen(true)}
              onMouseLeave={() => setAccountOpen(false)}
            >
<<<<<<< HEAD
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
=======
              <button className="flex items-center gap-1 bg-white text-indigo-700 px-3 py-2 rounded-md font-medium hover:bg-yellow-200 transition">
                Account
                <FaChevronDown className="text-xs font-bold" />
              </button>
>>>>>>> 68ee815 (AlMost-85)

              {accountOpen && (
                <ul className="absolute right-0 mt-1 bg-white rounded-md shadow-md w-32 py-1 text-xs font-medium text-gray-700">
                  <li>
                    <NavLink
                      to="/login"
                      className="block px-3 py-1 hover:bg-indigo-100"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/register"
                      className="block px-3 py-1 hover:bg-indigo-100"
                    >
                      Register
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
          ) : (
<<<<<<< HEAD
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
=======
            <>
              {roleLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1 rounded-md transition ${
                      isActive
                        ? "bg-yellow-300 text-indigo-900 font-semibold"
                        : "hover:bg-teal-400 hover:text-indigo-900 text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 rounded-md bg-amber-400 hover:bg-amber-500 text-indigo-600 text-xs font-medium transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </>
>>>>>>> 68ee815 (AlMost-85)
          )}
        </div>

        {/* Mobile Hamburger */}
<<<<<<< HEAD
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
<<<<<<< HEAD
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
=======
          ☰
        </button>
      </div>
>>>>>>> 68ee815 (AlMost-85)
    </nav>
  );
}
