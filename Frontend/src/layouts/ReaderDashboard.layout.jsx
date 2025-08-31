import { motion } from "framer-motion";
import { NavLink, Outlet } from "react-router-dom";
import { FaBookOpen, FaHeart, FaBell } from "react-icons/fa";
import ReaderOverview from "../features/admin/pages/ReaderOverview";

export default function ReaderDashboardLayout() {
  const navItems = [
    { name: "Explore Blogs", path: "/reader/explore", icon: <FaBookOpen /> },
    { name: "Favorites", path: "/reader/favorites", icon: <FaHeart /> },
    { name: "Notifications", path: "/reader/notifications", icon: <FaBell /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.aside
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 bg-gradient-to-b from-green-600 to-green-800 text-white fixed h-full shadow-lg"
      >
        <h2 className="text-2xl font-bold p-4 border-b border-green-500">
          Reader Panel
        </h2>
        <nav className="mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-3 hover:bg-green-500 transition rounded-md"
            >
              {item.icon} {item.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      <main className="flex-1 ml-64 p-6">
        <Outlet />
<ReaderOverview />
      </main>
    </div>
  );
}
