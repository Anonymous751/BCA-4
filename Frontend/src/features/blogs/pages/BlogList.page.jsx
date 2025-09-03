import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) {
        toast.error("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:1551/api/blogs/get-blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  // Delete blog
  const handleDelete = async (blogId) => {
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:1551/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

  // Navigate to Update page
  const handleUpdate = (blogId) => {
    navigate(`/admin/blogs/update/${blogId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-10 mt-14">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.h1
        className="text-4xl font-bold text-center mb-12 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✨ Manage Blogs ✨
      </motion.h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found 🚀</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="relative rounded-2xl backdrop-blur-xl bg-white/60 shadow-lg hover:shadow-2xl transition border border-white/40 p-6 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleUpdate(blog._id)}
                  className="flex items-center gap-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-full text-white text-sm shadow-md transition"
                >
                  <FaEdit /> Update
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-white text-sm shadow-md transition"
                >
                  <FaTrash /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
