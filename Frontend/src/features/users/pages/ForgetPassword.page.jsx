import { FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ForgetPasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password changed successfully!");
  };

  const inputClasses =
    "peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700";
  const labelClasses =
    "absolute left-10 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-xs peer-focus:text-indigo-600";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 animate-pulse">
          Forget Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showOld ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={inputClasses}
            />
            <label className={labelClasses}>Old Password</label>
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showNew ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClasses}
            />
            <label className={labelClasses}>New Password</label>
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <FaEyeSlash /> : <FaEye />}
            </span>
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

        <p className="text-sm text-gray-500 text-center mt-6">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
