import { useState, useEffect, useRef } from "react";
import JoditEditor from "jodit-react";
import { motion } from "framer-motion";
import { FaSave, FaPenFancy, FaTags } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateBlogPage() {
  const { id } = useParams(); // blog ID from URL
  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token"); // get token from localStorage

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      if (!token) {
        toast.error("Unauthorized: Token missing. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:1551/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched blog:", res.data.blog);

        const blog = res.data.blog;
        setTitle(blog.title || "");
        setTags(blog.tags?.join(", ") || "");
        setContent(blog.content || blog.description || "");
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        toast.error("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, token]);

  // Handle blog update
  const handleUpdate = async () => {
    if (!token) {
      toast.error("Unauthorized: Token missing. Please login.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:1551/api/blogs/${id}`,
        {
          title,
          tags: tags.split(",").map((t) => t.trim()),
          content,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Blog updated response:", res.data);
      toast.success("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Failed to update blog:", err.response || err);
      toast.error(
        err.response?.data?.error || "Failed to update blog. Check console."
      );
    }
  };

  if (loading)
    return <p className="text-white text-center mt-20">Loading blog...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-start py-16 px-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 space-y-8 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Header */}
        <motion.h1
          className="text-4xl font-extrabold text-white flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <FaPenFancy className="text-yellow-300" /> Update Blog
        </motion.h1>

        {/* Title Input */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-white font-semibold mb-2">Blog Title</label>
          <input
            type="text"
            placeholder="Enter your blog title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/80 focus:bg-white text-gray-800 outline-none border border-gray-200 shadow-md focus:ring-2 focus:ring-purple-400"
          />
        </motion.div>

        {/* Tags Input */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="block text-white font-semibold mb-2 flex items-center gap-2">
            <FaTags /> Tags
          </label>
          <input
            type="text"
            placeholder="e.g. React, Node, Tailwind"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/80 focus:bg-white text-gray-800 outline-none border border-gray-200 shadow-md focus:ring-2 focus:ring-pink-400"
          />
        </motion.div>

        {/* Jodit Editor */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="rounded-xl overflow-hidden shadow-xl border border-white/30 bg-white"
        >
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <motion.button
            onClick={handleUpdate}
            whileHover={{ scale: 1.1 }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-indigo-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
          >
            <FaSave /> Update Blog
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
