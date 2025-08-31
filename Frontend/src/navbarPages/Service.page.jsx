// pages/Services.jsx
import { motion } from "framer-motion";
import { PenTool, TrendingUp, Users } from "react-feather";

export default function Services() {
  const services = [
    { icon: <PenTool className="w-10 h-10" />, title: "Creative Writing", desc: "Express your creativity with powerful blogging tools." },
    { icon: <TrendingUp className="w-10 h-10" />, title: "SEO Optimization", desc: "Boost your blog visibility with modern SEO techniques." },
    { icon: <Users className="w-10 h-10" />, title: "Community", desc: "Engage with authors and readers in a vibrant ecosystem." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-blue-500 to-cyan-400 text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl w-full"
      >
        <h1 className="text-5xl font-extrabold text-center mb-12">Our Services</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className="p-8 bg-white/20 rounded-2xl shadow-lg hover:shadow-2xl backdrop-blur-lg text-center"
            >
              <div className="flex justify-center mb-4 text-yellow-300">{s.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-gray-100">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
