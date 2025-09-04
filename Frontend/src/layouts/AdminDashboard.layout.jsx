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
<<<<<<< HEAD
    <div className="flex h-screen bg-gray-100">
=======
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar */}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      <motion.aside
        initial={{ x: -220 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
<<<<<<< HEAD
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white fixed h-full shadow-lg flex flex-col justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold p-4 border-b border-blue-500">
            Admin Panel
          </h2>
          <nav className="mt-4 flex flex-col gap-2">
=======
        className="w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white fixed h-full shadow-xl flex flex-col justify-between rounded-r-2xl"
      >
        {/* Header */}
        <div>
          <h2 className="text-2xl font-extrabold p-5 border-b border-blue-500 text-center tracking-wide">
            ⚡ Admin Panel
          </h2>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2 px-3">
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
<<<<<<< HEAD
                className="flex items-center gap-3 p-3 hover:bg-blue-500 transition rounded-md"
              >
=======
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-md scale-[1.02]"
                      : "text-gray-200 hover:bg-blue-600 hover:text-white"
                  }`
                }
              >
                {item.icon && <item.icon className="text-lg" />}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

<<<<<<< HEAD
        {/* Change Password + Logout */}
        <div className="p-4 space-y-3">
          {/* Change Password Button */}
          <button
            onClick={() => navigate("/admin/change-password")}
            className="flex items-center gap-2 w-full justify-center py-3 bg-yellow-500 hover:bg-yellow-600 rounded-md transition"
=======
        {/* Footer Section */}
        <div className="p-4 space-y-3">
          {/* Change Password */}
          <button
            onClick={() => navigate("/admin/change-password")}
            className="flex items-center gap-2 w-full justify-center py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 transition"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
          >
            <FaKey /> Change Password
          </button>

<<<<<<< HEAD
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-center py-3 bg-red-600 hover:bg-red-700 rounded-md transition"
=======
          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full justify-center py-3 rounded-xl font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.aside>

<<<<<<< HEAD
      <main className="flex-1 ml-64 p-6">
=======
      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
        <Outlet />
      </main>
    </div>
  );
}
