import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@test.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else if (email === "author@test.com" && password === "author123") {
      localStorage.setItem("role", "author");
      navigate("/author");
    } else if (email === "reader@test.com" && password === "reader123") {
      localStorage.setItem("role", "reader");
      navigate("/reader");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 animate-pulse">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
            />
            <label
              className={`absolute left-10 text-gray-500 text-sm transition-all
                ${email ? "-top-1 text-xs text-indigo-600" : "top-3"}
                peer-focus:-top-1 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
            />
            <label
              className={`absolute left-10 text-gray-500 text-sm transition-all
                ${password ? "-top-1 text-xs text-indigo-600" : "top-3"}
                peer-focus:-top-1 peer-focus:text-xs peer-focus:text-indigo-600`}
            >
              Password
            </label>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <NavLink
              to="/verify-otp"
              className="text-sm text-indigo-600 hover:underline hover:text-purple-600 transition-all"
            >
              Forgot Password?
            </NavLink>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            <FaSignInAlt />
            <span>Login</span>
          </motion.button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <NavLink
            to="/register"
            className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all"
          >
            Register
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
