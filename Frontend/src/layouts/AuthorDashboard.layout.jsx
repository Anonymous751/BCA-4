import { motion } from "framer-motion";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaKey } from "react-icons/fa";
import { menuConfig } from "../utils/menu.config";
import axios from "axios";

export default function AuthorDashboardLayout() {
  const navigate = useNavigate();
  const navItems = menuConfig.Author;

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
        className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white fixed h-full shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold p-4 border-b border-purple-500">
          Author Panel
        </h2>

        <nav className="mt-4 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-purple-500 transition rounded-md"
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Change Password Button */}
        <div className="p-4 space-y-3">
          <button
            onClick={() => navigate("/author/change-password")}
            className="flex items-center gap-2 w-full justify-center py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md transition"
          >
            <FaKey /> Change Password
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-center py-3 bg-red-600 hover:bg-red-700 rounded-md transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.aside>

      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
