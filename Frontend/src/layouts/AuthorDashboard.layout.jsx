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
    <div className="flex h-screen bg-gradient-to-r from-indigo-50 via-white to-purple-50">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
<<<<<<< HEAD
<<<<<<< HEAD
        className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white fixed h-full shadow-lg flex flex-col"
=======
        className="w-64 bg-gradient-to-b from-purple-500 via-indigo-600 to-purple-800 text-white fixed h-full shadow-2xl flex flex-col rounded-r-2xl"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
        className="w-64 bg-gradient-to-b from-purple-500 via-indigo-600 to-purple-800 text-white fixed h-full shadow-2xl flex flex-col rounded-r-2xl"
>>>>>>> 68ee815 (AlMost-85)
      >
        <h2 className="text-2xl font-extrabold p-5 border-b border-white/30 tracking-wide">
          ✍️ Author Panel
        </h2>

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> 68ee815 (AlMost-85)
   <nav className="mt-6 flex-1 px-3 space-y-2">
  {navItems.map((item) => (
    <NavLink
      key={item.name}
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
          isActive && item.name !== "Dashboard"
            ? "bg-white/20 backdrop-blur-md shadow-md scale-105"
            : "hover:bg-white/10 hover:scale-[1.02]"
        }`
      }
    >
      {item.name}
    </NavLink>
  ))}
</nav>
        {/* Footer Buttons */}
        <div className="p-4 space-y-3 border-t border-white/20">
          <button
            onClick={() => navigate("/author/change-password")}
            className="flex items-center gap-2 w-full justify-center py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-gray-900 font-semibold rounded-lg shadow-md transition transform hover:scale-105"
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
          >
            <FaKey /> Change Password
          </button>

          <button
            onClick={handleLogout}
<<<<<<< HEAD
<<<<<<< HEAD
            className="flex items-center gap-2 w-full justify-center py-3 bg-red-600 hover:bg-red-700 rounded-md transition"
=======
            className="flex items-center gap-2 w-full justify-center py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
            className="flex items-center gap-2 w-full justify-center py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
>>>>>>> 68ee815 (AlMost-85)
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 bg-white rounded-l-3xl shadow-inner overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
