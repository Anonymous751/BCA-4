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
          Reader Panel
<<<<<<< HEAD
        </h2>

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
        </button>
      </motion.aside>

      <main className="flex-1 ml-64 p-6">
        <Outlet />
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
      </main>
    </div>
  );
}
