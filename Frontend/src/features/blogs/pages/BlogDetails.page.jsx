import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowLeft, FaRegClock, FaUserCircle, FaHeart } from "react-icons/fa";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:1551/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("📌 Blog Response:", res.data.blog);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
        toast.error("Failed to load blog details");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Loading blog details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        <p>Blog not found ❌</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ build coverImage URL
  const coverImageUrl = blog.coverImage
    ? `http://localhost:1551/api/blogs/cover/${blog.coverImage}`
    : null;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6 md:px-20 mt-14">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition"
      >
        <FaArrowLeft /> Back
      </motion.button>

      <motion.div
        className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt="Cover"
            className="w-full h-72 object-cover rounded-xl mb-6 shadow"
          />
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</h1>

        <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
          <span className="flex items-center gap-1">
            <FaUserCircle className="text-gray-400" />
            {blog.authorInfo?.username || "Unknown Author"}
          </span>
          <span className="flex items-center gap-1">
            <FaRegClock className="text-gray-400" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <FaHeart className="text-red-500" />
            {blog.likeCount || 0} Likes
          </span>
        </div>

        {/* ✅ Show Jodit editor content properly */}
        <div
          className="text-gray-700 leading-relaxed mb-6 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.description }}
        />

        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
