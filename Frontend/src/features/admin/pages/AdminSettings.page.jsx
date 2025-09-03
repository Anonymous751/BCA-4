import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaCog, FaSave, FaPalette } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile states
  const [username, setUsername] = useState("AdminUser");
  const [email] = useState("admin@example.com"); // read-only
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");

  // Change password states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Site settings states
  const [siteName, setSiteName] = useState("My Blog Site");
  const [siteLogo, setSiteLogo] = useState(null);
  const [themeColor, setThemeColor] = useState("#7F00FF");
  const [commentsEnabled, setCommentsEnabled] = useState(true);

  // Handlers
  const handleSaveProfile = () => toast.success("Profile saved successfully!");
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
  };
  const handleSaveSettings = () => toast.success("Site settings saved!");

  const tabs = [
    { name: "Profile", key: "profile", icon: <FaUser /> },
    { name: "Change Password", key: "password", icon: <FaLock /> },
    { name: "Site Settings", key: "settings", icon: <FaCog /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-10 flex">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <motion.div
        className="w-64 bg-gray-800 rounded-2xl p-6 space-y-6"
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold"
                : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
        className="flex-1 ml-10 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 overflow-y-auto max-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Profile Info</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : "/default-avatar.png"}
                  alt="avatar"
                  className="w-20 h-20 rounded-full border-2 border-white/30 object-cover"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="text-sm text-gray-300"
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                disabled
                className="p-4 rounded-xl bg-white/50 text-gray-600 outline-none border border-gray-300"
              />
              <textarea
                placeholder="Bio / About you"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300 resize-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSaveProfile}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center gap-2"
              >
                <FaSave /> Save Profile
              </motion.button>
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Change Password</h3>
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleChangePassword}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-semibold shadow-lg flex items-center gap-2"
              >
                <FaSave /> Change Password
              </motion.button>
            </div>
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-4">Site Settings</h3>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <div className="flex items-center gap-4">
                <img
                  src={siteLogo ? URL.createObjectURL(siteLogo) : "/default-logo.png"}
                  alt="logo"
                  className="w-20 h-20 object-contain border rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSiteLogo(e.target.files[0])}
                  className="text-sm text-gray-300"
                />
              </div>
              <div className="flex items-center gap-4">
                <FaPalette />
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-20 h-10 rounded-xl border border-gray-300"
                />
                <span>Primary Theme Color</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={commentsEnabled}
                  onChange={() => setCommentsEnabled(!commentsEnabled)}
                  className="w-5 h-5 accent-purple-500"
                />
                <span>Enable Comments for Readers</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSaveSettings}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center gap-2"
              >
                <FaSave /> Save Settings
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
