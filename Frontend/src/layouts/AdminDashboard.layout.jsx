import { motion } from "framer-motion";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaKey } from "react-icons/fa";
import axios from "axios";
import { menuConfig } from "../utils/menu.config";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const navItems = menuConfig.Admin;

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:1551/api/users/logout",
        {},
        { withCredentials: true }
      );

      localStorage.removeItem("role");
      alert("✅ Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
      alert("❌ Logout failed!");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white fixed h-full shadow-lg flex flex-col justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold p-4 border-b border-blue-500">
            Admin Panel
          </h2>
          <nav className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="flex items-center gap-3 p-3 hover:bg-blue-500 transition rounded-md"
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Change Password + Logout */}
        <div className="p-4 space-y-3">
          {/* Change Password Button */}
          <button
            onClick={() => navigate("/admin/change-password")}
            className="flex items-center gap-2 w-full justify-center py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md transition"
          >
            <FaKey /> Change Password
          </button>

          {/* Logout Button */}
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
