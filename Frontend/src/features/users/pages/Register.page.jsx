import { FaUser, FaEnvelope, FaLock, FaUpload, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [role, setRole] = useState("Reader");
  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4 pt-28 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 animate-pulse">
          Create Account
        </h2>

        <form className="space-y-6">
          {/* Username */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

                onBlur={() => setUsername(username)}
                placeholder="Username"
                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1 placeholder-transparent"
              />
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                username ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              Username
            </label>
          </div>

          {/* Email */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100">
              <FaEnvelope className="text-gray-400 mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1 placeholder-transparent"
              />
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                email ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1 placeholder-transparent"
              />
              <span
                className="ml-2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                password ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1 placeholder-transparent"
              />
              <span
                className="ml-2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                confirmPassword ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              Confirm Password
            </label>
          </div>

          {/* Role */}
          <div className="flex gap-4 items-center">
            <span className="text-gray-600 font-medium">Role:</span>
            {["Reader", "Author", "Admin"].map((r) => (
              <label key={r} className="flex items-center gap-1 text-gray-700 cursor-pointer">
                <input
                  type="radio"
                  value={r}
                  checked={role === r}
                  onChange={(e) => setRole(e.target.value)}
                  className="accent-indigo-600"
                />
                {r}
              </label>
            ))}
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium mb-2">Avatar:</label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                <FaUpload />
                <span>Choose Avatar</span>
                <input type="file" className="hidden" onChange={handleAvatarChange} />
              </label>
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-12 h-12 rounded-full border-2 border-indigo-600 object-cover"
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            <FaSignInAlt />
            <span>Register</span>
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all">
           <NavLink  to="/login"> Login</NavLink>
          </span>
        </p>
      </motion.div>
    </div>
  );
}
