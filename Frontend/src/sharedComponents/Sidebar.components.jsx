import { NavLink } from "react-router-dom";
import { menuConfig } from "../utils/menu.config";
import { useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function Sidebar({ role }) {
  const links = menuConfig[role] || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-md h-full p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">
          {role === "Admin" ? "Admin Panel" : "Menu"}
        </h2>
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "font-bold text-blue-600" : "hover:text-blue-500"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* 🔹 Change Password Button */}
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>

      {/* 🔹 Modal */}
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
