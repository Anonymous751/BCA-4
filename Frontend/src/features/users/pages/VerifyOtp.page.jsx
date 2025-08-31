import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1);
      setOtp(newOtp);
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4 pt-32">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-4 animate-pulse">
          Verify OTP
        </h2>

        {/* Note */}
        <p className="text-center  text-red-600 mb-6 text-sm">
          <span className=" text-red-600">Note:</span> Make sure you are registered before getting OTP.
        </p>

        {/* Email Input */}
        <div className="relative mb-8">
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

        {/* OTP Inputs */}
        <div className="flex justify-between mb-8 gap-2">
          {otp.map((digit, idx) => (
            <motion.input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, idx)}
              onKeyDown={(e) => handleOtpBackspace(e, idx)}
              className="w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition-all duration-300 outline-none"
              whileFocus={{ scale: 1.1, boxShadow: "0 0 8px rgba(79, 70, 229,0.5)" }}
            />
          ))}
        </div>

        {/* Verify Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
        >
          <FaCheckCircle />
          <span>Verify OTP</span>
        </motion.button>

        <p className="text-sm text-gray-500 text-center mt-6">
          Didn't receive OTP?{" "}
          <span className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all">
            Resend
          </span>
        </p>
      </motion.div>
    </div>
  );
}
