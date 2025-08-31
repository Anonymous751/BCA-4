import { motion } from "framer-motion";
import { FaPenFancy, FaUsers, FaLock, FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold mt-11"
        >
          Welcome to <span className="text-yellow-400">BlogContent</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl max-w-2xl mb-8 mt-8 text-gray-200"
        >
          A modern platform where <span className="text-yellow-300">Authors</span> share,
          <span className="text-yellow-300"> Readers</span> explore, and
          <span className="text-yellow-300"> Admins</span> manage content beautifully.
        </motion.p>
        <motion.div whileHover={{ scale: 1.05 }}>
          <NavLink
            to="/register"
            className="px-8 py-3 bg-yellow-400 text-indigo-800 rounded-xl font-bold shadow-lg hover:bg-yellow-300 transition-all duration-300 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <FaArrowRight />
          </NavLink>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white text-gray-800 rounded-t-3xl shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-700">
          Why Choose BlogContent?
        </h2>

        <div className="grid gap-10 md:grid-cols-3">
          {/* Feature 1 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-md text-center transition-all"
          >
            <FaPenFancy className="text-5xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Create Blogs</h3>
            <p className="text-gray-600">
              Authors can easily create and share engaging blog posts with the world.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-md text-center transition-all"
          >
            <FaUsers className="text-5xl text-purple-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Connect with Readers</h3>
            <p className="text-gray-600">
              Readers can follow Authors, explore categories, and engage with content.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl shadow-md text-center transition-all"
          >
            <FaLock className="text-5xl text-yellow-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Secure Management</h3>
            <p className="text-gray-600">
              Admins can manage blogs, users, and ensure a safe blogging environment.
            </p>
          </motion.div>
        </div>
      </section>



    </div>
  );
}
