import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { FaEdit, FaTrash } from "react-icons/fa";

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Fetch blogs
=======
import { FaEdit, FaTrash, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";

// Helper to truncate HTML content
const truncateText = (html, maxLength = 100) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRoles = JSON.parse(localStorage.getItem("userRoles") || "[]");

  // Load favourites from localStorage
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(storedFavs);
  }, []);

  // Fetch blogs from backend
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) {
        toast.error("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:1551/api/blogs/get-blogs", {
<<<<<<< HEAD
          headers: { Authorization: `Bearer ${token}` },
=======
          headers: {
            Authorization: `Bearer ${token}`,
            "cache-control": "no-cache",
          },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
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

<<<<<<< HEAD
  // Delete blog
  const handleDelete = async (blogId) => {
    if (!token) {
      toast.error("Unauthorized. Please login.");
      return;
    }

=======
  // Toggle favourite status
  const toggleFavourite = (blogId) => {
    setFavourites((prev) => {
      const updated = prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });
  };

  const handleDelete = async (blogId) => {
    if (!token) return toast.error("Unauthorized. Please login.");
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:1551/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
<<<<<<< HEAD
      setBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
=======
      setBlogs((prev) => prev.filter((b) => b._id !== blogId));
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      toast.success("Blog deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    }
  };

<<<<<<< HEAD
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
=======
  const handleUpdate = (blogId) => navigate(`/admin/blogs/update/${blogId}`);
  const handleViewDetails = (blogId) => navigate(`/blogs/${blogId}`);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading blogs...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 mt-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-gray-800"
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
<<<<<<< HEAD
        ✨ Manage Blogs ✨
=======
        Blogs
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      </motion.h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found 🚀</p>
      ) : (
<<<<<<< HEAD
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
=======
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              className="relative rounded-xl bg-white shadow-md hover:shadow-xl transition p-6 flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
            >
              {/* Favourite Icon */}
              <button
                onClick={() => toggleFavourite(blog._id)}
                className="absolute top-3 right-3 text-red-500 text-xl z-10"
              >
                {favourites.includes(blog._id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                <p className="text-sm text-gray-500 mb-3">
                  By {blog.author?.username || "Unknown"} · {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">{truncateText(blog.description, 100)}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {blog.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-200 text-gray-700">
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
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
=======
              <div className="flex justify-center mt-4 gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewDetails(blog._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-sm shadow"
                >
                  <FaEye /> View
                </motion.button>

                {(userRoles.includes("Admin") || userRoles.includes("Author")) && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdate(blog._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-md text-white text-sm shadow"
                    >
                      <FaEdit /> Update
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(blog._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white text-sm shadow"
                    >
                      <FaTrash /> Delete
                    </motion.button>
                  </>
                )}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
