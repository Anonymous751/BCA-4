import { FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ForgetPasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4 pt-32">
      {/* pt-32 adds spacing from fixed navbar */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 animate-pulse">
          Forget Password
        </h2>

        <form className="space-y-6">
          {/* Old Password */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100 transition-all duration-300 hover:bg-gray-200">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                
                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1"
              />
              <span
                className="ml-2 text-gray-400 cursor-pointer"
                onClick={() => setShowOld(!showOld)}
              >
                {showOld ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                oldPassword ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              Old Password
            </label>
          </div>

          {/* New Password */}
          <div className="relative">
            <div className="flex items-center rounded-lg px-3 py-2 bg-gray-100 transition-all duration-300 hover:bg-gray-200">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}

                className="w-full outline-none bg-transparent text-gray-700 pt-2 pb-1"
              />
              <span
                className="ml-2 text-gray-400 cursor-pointer"
                onClick={() => setShowNew(!showNew)}
              >
                {showNew ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <label
              className={`absolute left-10 text-gray-400 text-sm pointer-events-none transition-all duration-300 ${
                newPassword ? "-translate-y-3 text-indigo-600 text-xs" : "top-2"
              }`}
            >
              New Password
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            <FaSignInAlt />
            <span>Submit</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
