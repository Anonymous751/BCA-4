import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { FaPenNib, FaBlog, FaChartLine } from "react-icons/fa";
import AuthorOverview from "../features/admin/pages/AuthorOverview";

export default function AuthorDashboardLayout() {
  const navItems = [
    { name: "My Blogs", path: "/author/blogs", icon: <FaBlog /> },
    { name: "Write", path: "/author/write", icon: <FaPenNib /> },
    { name: "Stats", path: "/author/stats", icon: <FaChartLine /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-purple-600 to-purple-800 text-white fixed h-full shadow-lg"
      >
        <h2 className="text-2xl font-bold p-4 border-b border-purple-500">
          Author Panel
        </h2>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-purple-500 transition rounded-md"
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      <main className="flex-1 ml-64 p-6">
        <Outlet />
<AuthorOverview />
      </main>
    </div>
  );
}
