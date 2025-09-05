import { NavLink } from "react-router-dom";
import { menuConfig } from "../utils/menu.config";
import { useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";

export default function Sidebar({ role }) {
  const links = menuConfig[role] || [];
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 shadow-xl h-full p-6 flex flex-col justify-between rounded-r-2xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100 tracking-wide">
          {role === "Admin" ? "⚡ Admin Panel" : "📂 Menu"}
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg scale-[1.02]"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-indigo-500"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* 🔹 Change Password Button */}
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded hover:bg-blue-700"
=======
=======
>>>>>>> 68ee815 (AlMost-85)
      {/* Footer - Change Password */}
      <div className="mt-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2 px-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
        >
          Change Password
        </button>
      </div>

<<<<<<< HEAD
<<<<<<< HEAD
      {/* 🔹 Modal */}
=======
      {/* Change Password Modal */}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
      {/* Change Password Modal */}
>>>>>>> 68ee815 (AlMost-85)
      <ChangePasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
