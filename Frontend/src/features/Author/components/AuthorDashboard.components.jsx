import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AuthorDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    totalBlogs: 0,
    authors: 0,
    readers: 0,
  });

  const COLORS = ["#6366F1", "#EC4899", "#10B981", "#F59E0B"];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return toast.error("Unauthorized. Please login.");
      try {
        const res = await axios.get("http://localhost:1551/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setStats(res.data.stats);
        else toast.error("Failed to fetch stats");
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        toast.error("Error fetching stats");
      }
    };
    fetchStats();
  }, [token]);

  const userData = [
    { name: "Total Users", value: stats.totalUsers },
    { name: "Verified", value: stats.verifiedUsers },
  ];

  const roleData = [
    { name: "Admins", value: stats.admins || stats.authors - stats.authors + 1 }, // fallback
    { name: "Authors", value: stats.authors },
    { name: "Readers", value: stats.readers },
  ];

  const blogData = [
    { name: "Blogs", blogs: stats.totalBlogs },
    { name: "Users", blogs: stats.totalUsers },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.h1
        className="text-4xl font-bold text-center mb-10 text-gray-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Author Dashboard
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: "Total Users", value: stats.totalUsers, color: "bg-indigo-500" },
          { title: "Verified Users", value: stats.verifiedUsers, color: "bg-green-500" },
          { title: "Total Blogs", value: stats.totalBlogs, color: "bg-pink-500" },
          { title: "Authors", value: stats.authors, color: "bg-yellow-500" },
        ].map((card, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-xl shadow-md text-white ${card.color}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h2 className="text-lg">{card.title}</h2>
            <p className="text-3xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Pie Chart - Users */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">User Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {userData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart - Blogs */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Blogs Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={blogData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="blogs" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart - Roles */}
        <motion.div
          className="bg-white p-6 rounded-xl shadow-md lg:col-span-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-700">User Roles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
