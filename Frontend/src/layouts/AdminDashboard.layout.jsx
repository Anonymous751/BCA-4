import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaChartBar, FaCog } from "react-icons/fa";
import AdminOverview from "../features/admin/pages/AdminOverview";

export default function AdminDashboardLayout() {
  const navItems = [
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Reports", path: "/admin/reports", icon: <FaChartBar /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white fixed h-full shadow-lg"
      >
        <h2 className="text-2xl font-bold p-4 border-b border-blue-500">
          Admin Panel
        </h2>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-blue-500 transition rounded-md"
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6">
        <Outlet />
<AdminOverview />
      </main>
    </div>
  );
}
