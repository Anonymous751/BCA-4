import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";

// Helper to truncate HTML content
const truncateText = (html, maxLength = 100) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function FavouritePage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Load favourites from localStorage on mount
  useEffect(() => {
    const storedFavs = JSON.parse(localStorage.getItem("favourites") || "[]");
    setFavourites(storedFavs);
  }, []);

  // Fetch all blogs and filter favourites
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!token) {
        toast.error("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:1551/api/blogs/get-blogs", {
          headers: {
            Authorization: `Bearer ${token}`,
            "cache-control": "no-cache",
          },
        });

        const favBlogs = res.data.blogs.filter((blog) => favourites.includes(blog._id));
        setBlogs(favBlogs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token, favourites]);

  // Toggle favourite status and update localStorage
  const toggleFavourite = (blogId) => {
    setFavourites((prev) => {
      const updated = prev.includes(blogId)
        ? prev.filter((id) => id !== blogId)
        : [...prev, blogId];
      localStorage.setItem("favourites", JSON.stringify(updated));
      return updated;
    });

    // Remove blog from list if unfavourited
    setBlogs((prev) => prev.filter((b) => b._id !== blogId));
  };

  const handleViewDetails = (blogId) => navigate(`/blogs/${blogId}`);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Loading favourite blogs...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 mt-8 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.h1
        className="text-4xl font-bold text-center mb-12 text-gray-800"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Favourites
      </motion.h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No favourite blogs yet 🚀</p>
      ) : (
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
              </div>

              <div className="flex justify-center mt-4 gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleViewDetails(blog._id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white text-sm shadow"
                >
                  <FaEye /> View
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
