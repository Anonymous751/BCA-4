import { motion } from "framer-motion";
import { FaEnvelope, FaUser, FaPaperPlane } from "react-icons/fa";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
          Contact Us
        </h2>
        <form className="space-y-6">
          {/* Name */}
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
            <FaUser className="text-gray-400 mr-3" />
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-gray-700"
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
            <FaEnvelope className="text-gray-400 mr-3" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-gray-700"
            />
          </div>

          {/* Message */}
          <div className="bg-gray-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all">
            <textarea
              name="message"
              rows="4"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className="bg-transparent w-full outline-none text-gray-700 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
          >
            <FaPaperPlane />
            <span>Send Message</span>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
