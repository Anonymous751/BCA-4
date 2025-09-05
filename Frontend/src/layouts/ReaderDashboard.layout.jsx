import { motion } from "framer-motion";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaKey } from "react-icons/fa";
import { menuConfig } from "../utils/menu.config";
import axios from "axios";

export default function ReaderDashboardLayout() {
  const navigate = useNavigate();
  const navItems = menuConfig.Reader;

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1551/api/users/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("role");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
<<<<<<< HEAD
<<<<<<< HEAD
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-green-600 to-green-800 text-white fixed h-full shadow-lg flex flex-col"
=======
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white fixed h-full shadow-2xl flex flex-col rounded-r-3xl"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      >
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold p-6 border-b border-green-700 tracking-wider"
        >
=======
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-60 bg-gradient-to-b from-green-800 to-green-900 text-white fixed h-full shadow-lg flex flex-col"
      >
        {/* Header */}
        <h2 className="text-lg font-semibold p-4 border-b border-green-700 tracking-wide">
>>>>>>> 68ee815 (AlMost-85)
          Reader Panel
<<<<<<< HEAD
        </h2>

<<<<<<< HEAD
        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <NavLink
=======
        </motion.h2>

        {/* Nav Items */}
        <nav className="mt-6 flex-1 space-y-2 px-3">
          {navItems.map((item, index) => (
            <motion.div
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
              key={item.name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
<<<<<<< HEAD
              {item.name}
            </NavLink>
          ))}

          {/* Change Password link */}
          <NavLink
            to="/reader/change-password"
            className="flex items-center gap-3 p-3 hover:bg-green-500 transition rounded-md"
          >
            <FaKey /> Change Password
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-3 m-4 mt-auto bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          <FaSignOutAlt /> Logout
=======
        {/* Nav Items */}
        <nav className="mt-4 flex-1 space-y-2 px-3 text-sm">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                    isActive
                      ? "bg-green-700 font-medium"
                      : "hover:bg-green-700/70"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}

          {/* Change Password */}
          <NavLink
            to="/reader/change-password"
            className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-700/70 transition-all"
          >
            <FaKey className="text-xs" />
            Change Password
          </NavLink>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 m-3 bg-red-600 hover:bg-red-700 
                     rounded-md text-sm font-medium transition-all"
        >
          <FaSignOutAlt className="text-xs" /> Logout
>>>>>>> 68ee815 (AlMost-85)
        </button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 p-4 overflow-y-auto text-sm">
        <Outlet />
<<<<<<< HEAD
=======
              <NavLink
                to={item.path}
                className="flex items-center gap-3 px-5 py-3 rounded-xl text-lg font-medium 
                           transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:shadow-md"
              >
                {item.name}
              </NavLink>
            </motion.div>
          ))}

          {/* Change Password */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <NavLink
              to="/reader/change-password"
              className="flex items-center gap-3 px-5 py-3 rounded-xl text-lg font-medium 
                         transition-all duration-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 hover:shadow-md"
            >
              <FaKey className="text-lg" /> Change Password
            </NavLink>
          </motion.div>
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-3 m-4 mt-auto bg-red-600 hover:bg-red-700 
                     rounded-xl shadow-lg text-lg font-semibold transition-all duration-300"
        >
          <FaSignOutAlt /> Logout
        </motion.button>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full"
        >
          <Outlet />
        </motion.div>
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
      </main>
    </div>
  );
}
