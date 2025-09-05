<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
import { useState, useEffect } from "react";
>>>>>>> 68ee815 (AlMost-85)
import { motion } from "framer-motion";
import { FaUser, FaLock, FaCog, FaSave, FaPalette } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

<<<<<<< HEAD
<<<<<<< HEAD
  // Profile states
  const [username, setUsername] = useState("AdminUser");
  const [email] = useState("admin@example.com"); // read-only
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState("");

  // Change password states
=======
=======
>>>>>>> 68ee815 (AlMost-85)
  // ✅ Load saved settings from localStorage
  const savedData = JSON.parse(localStorage.getItem("adminSettings")) || {};

  // Profile states
  const [username, setUsername] = useState(savedData.username || "AdminUser");
  const [email] = useState("admin@example.com"); // read-only
  const [avatar, setAvatar] = useState(savedData.avatar || null);
  const [bio, setBio] = useState(savedData.bio || "");

  // Password states
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

<<<<<<< HEAD
<<<<<<< HEAD
  // Site settings states
  const [siteName, setSiteName] = useState("My Blog Site");
  const [siteLogo, setSiteLogo] = useState(null);
  const [themeColor, setThemeColor] = useState("#7F00FF");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
=======
=======
>>>>>>> 68ee815 (AlMost-85)
  // Site settings
  const [siteName, setSiteName] = useState(savedData.siteName || "My Blog Site");
  const [siteLogo, setSiteLogo] = useState(savedData.siteLogo || null);
  const [themeColor, setThemeColor] = useState(savedData.themeColor || "#7F00FF");
  const [commentsEnabled, setCommentsEnabled] = useState(
    savedData.commentsEnabled ?? true
  );

  // ✅ Convert image to Base64 before storing in localStorage
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  // ✅ Save settings
  const saveToLocalStorage = async () => {
    const data = {
      username,
      bio,
      siteName,
      themeColor,
      commentsEnabled,
      avatar,
      siteLogo,
    };
    localStorage.setItem("adminSettings", JSON.stringify(data));
  };

  // Auto-save whenever values change
  useEffect(() => {
    saveToLocalStorage();
  }, [username, bio, siteName, themeColor, commentsEnabled, avatar, siteLogo]);
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)

  // Handlers
  const handleSaveProfile = () => toast.success("Profile saved successfully!");
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    toast.success("Password changed successfully!");
<<<<<<< HEAD
<<<<<<< HEAD
  };
  const handleSaveSettings = () => toast.success("Site settings saved!");

=======
=======
>>>>>>> 68ee815 (AlMost-85)
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  const handleSaveSettings = () => toast.success("Site settings saved!");

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setAvatar(base64);
    }
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setSiteLogo(base64);
    }
  };

<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
  const tabs = [
    { name: "Profile", key: "profile", icon: <FaUser /> },
    { name: "Change Password", key: "password", icon: <FaLock /> },
    { name: "Site Settings", key: "settings", icon: <FaCog /> },
  ];

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-10 flex">
=======
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800 p-10 flex">
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800 p-10 flex">
>>>>>>> 68ee815 (AlMost-85)
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Sidebar */}
      <motion.div
<<<<<<< HEAD
<<<<<<< HEAD
        className="w-64 bg-gray-800 rounded-2xl p-6 space-y-6"
=======
        className="w-64 bg-white rounded-2xl p-6 space-y-6 shadow-lg border border-gray-200"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
        className="w-64 bg-white rounded-2xl p-6 space-y-6 shadow-lg border border-gray-200"
>>>>>>> 68ee815 (AlMost-85)
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
<<<<<<< HEAD
<<<<<<< HEAD
        <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-700 transition ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold"
                : ""
=======
=======
>>>>>>> 68ee815 (AlMost-85)
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          ⚙ Settings
        </h2>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
              activeTab === tab.key
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md"
                : "hover:bg-blue-100 text-gray-700"
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </motion.div>

      {/* Main Content */}
      <motion.div
<<<<<<< HEAD
<<<<<<< HEAD
        className="flex-1 ml-10 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 overflow-y-auto max-h-screen"
=======
        className="flex-1 ml-10 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 overflow-y-auto max-h-screen"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
        className="flex-1 ml-10 bg-white rounded-2xl p-8 shadow-2xl border border-gray-200 overflow-y-auto max-h-screen"
>>>>>>> 68ee815 (AlMost-85)
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
<<<<<<< HEAD
<<<<<<< HEAD
            <h3 className="text-2xl font-bold mb-4">Profile Info</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : "/default-avatar.png"}
                  alt="avatar"
                  className="w-20 h-20 rounded-full border-2 border-white/30 object-cover"
=======
=======
>>>>>>> 68ee815 (AlMost-85)
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Profile Info
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="w-20 h-20 rounded-full border-2 border-gray-300 object-cover"
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
                />
                <input
                  type="file"
                  accept="image/*"
<<<<<<< HEAD
<<<<<<< HEAD
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="text-sm text-gray-300"
=======
                  onChange={handleAvatarChange}
                  className="text-sm text-gray-600"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                  onChange={handleAvatarChange}
                  className="text-sm text-gray-600"
>>>>>>> 68ee815 (AlMost-85)
                />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300 outline-none"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300 outline-none"
>>>>>>> 68ee815 (AlMost-85)
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                disabled
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/50 text-gray-600 outline-none border border-gray-300"
=======
                className="p-4 rounded-xl bg-gray-100 text-gray-600 border border-gray-300"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-100 text-gray-600 border border-gray-300"
>>>>>>> 68ee815 (AlMost-85)
              />
              <textarea
                placeholder="Bio / About you"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300 resize-none"
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300 resize-none"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300 resize-none"
>>>>>>> 68ee815 (AlMost-85)
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSaveProfile}
<<<<<<< HEAD
<<<<<<< HEAD
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center gap-2"
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> 68ee815 (AlMost-85)
              >
                <FaSave /> Save Profile
              </motion.button>
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "password" && (
          <div className="space-y-6">
<<<<<<< HEAD
<<<<<<< HEAD
            <h3 className="text-2xl font-bold mb-4">Change Password</h3>
=======
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Change Password
            </h3>
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Change Password
            </h3>
>>>>>>> 68ee815 (AlMost-85)
            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> 68ee815 (AlMost-85)
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> 68ee815 (AlMost-85)
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
>>>>>>> 68ee815 (AlMost-85)
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleChangePassword}
<<<<<<< HEAD
<<<<<<< HEAD
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white font-semibold shadow-lg flex items-center gap-2"
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> 68ee815 (AlMost-85)
              >
                <FaSave /> Change Password
              </motion.button>
            </div>
          </div>
        )}

        {/* Site Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
<<<<<<< HEAD
<<<<<<< HEAD
            <h3 className="text-2xl font-bold mb-4">Site Settings</h3>
=======
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Site Settings
            </h3>
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
            <h3 className="text-2xl font-bold mb-4 text-blue-700">
              Site Settings
            </h3>
>>>>>>> 68ee815 (AlMost-85)
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
<<<<<<< HEAD
<<<<<<< HEAD
                className="p-4 rounded-xl bg-white/80 text-gray-800 outline-none border border-gray-300"
              />
              <div className="flex items-center gap-4">
                <img
                  src={siteLogo ? URL.createObjectURL(siteLogo) : "/default-logo.png"}
=======
=======
>>>>>>> 68ee815 (AlMost-85)
                className="p-4 rounded-xl bg-gray-50 border border-gray-300"
              />
              <div className="flex items-center gap-4">
                <img
                  src={siteLogo || "/default-logo.png"}
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
                  alt="logo"
                  className="w-20 h-20 object-contain border rounded-xl"
                />
                <input
                  type="file"
                  accept="image/*"
<<<<<<< HEAD
<<<<<<< HEAD
                  onChange={(e) => setSiteLogo(e.target.files[0])}
                  className="text-sm text-gray-300"
                />
              </div>
              <div className="flex items-center gap-4">
                <FaPalette />
=======
=======
>>>>>>> 68ee815 (AlMost-85)
                  onChange={handleLogoChange}
                  className="text-sm text-gray-600"
                />
              </div>
              <div className="flex items-center gap-4">
                <FaPalette className="text-blue-600" />
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
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
<<<<<<< HEAD
<<<<<<< HEAD
                  className="w-5 h-5 accent-purple-500"
=======
                  className="w-5 h-5 accent-blue-500"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                  className="w-5 h-5 accent-blue-500"
>>>>>>> 68ee815 (AlMost-85)
                />
                <span>Enable Comments for Readers</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSaveSettings}
<<<<<<< HEAD
<<<<<<< HEAD
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center gap-2"
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md flex items-center gap-2"
>>>>>>> 68ee815 (AlMost-85)
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
