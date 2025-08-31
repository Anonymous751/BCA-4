import { motion } from "framer-motion";
import { FaUsers, FaPenNib, FaBookReader } from "react-icons/fa";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-600 to-indigo-500 py-16 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-4xl text-center bg-white shadow-2xl rounded-3xl p-12"
      >
        <h1 className="text-5xl font-extrabold text-purple-700 mb-6 tracking-wide">
          About Us
        </h1>
        <p className="text-lg text-gray-600 mb-10 leading-relaxed">
          Welcome to <span className="font-semibold text-purple-600">Blog Content Application</span>,
          a place where <span className="font-bold">Authors</span> share ideas,
          <span className="font-bold">Readers</span> explore creativity,
          and <span className="font-bold">Admins</span> ensure quality.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-6 shadow-xl"
          >
            <FaUsers className="text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Our Community</h3>
            <p className="text-sm mt-2">Connecting readers & authors worldwide.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl p-6 shadow-xl"
          >
            <FaPenNib className="text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-sm mt-2">Inspiring through powerful words.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-6 shadow-xl"
          >
            <FaBookReader className="text-5xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold">Our Readers</h3>
            <p className="text-sm mt-2">Fueling imagination with every read.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
