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
    <div className="flex h-screen bg-gray-50">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-green-600 to-green-800 text-white fixed h-full shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold p-4 border-b border-green-500">
          Reader Panel
        </h2>

        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-green-500 transition rounded-md"
            >
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
      </main>
    </div>
  );
}
