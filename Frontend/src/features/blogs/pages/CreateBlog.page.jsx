import { useState } from "react";
import JoditEditor from "jodit-react";
import { motion } from "framer-motion";
import { FaPenFancy, FaTags, FaSave } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateBlogPage() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token"); // assuming token is stored here

  const handleCreateBlog = async (status) => {
    if (!title || !description) {
      toast.error("Title and Description are required");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:1551/api/blogs/create-blog",
        {
          title,
          tags: tags.split(",").map((t) => t.trim()),
          description,
          status, // "draft" or "published"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Blog created successfully!");
      setTitle("");
      setTags("");
      setDescription("");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.error || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex justify-center items-start py-16 px-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="w-full max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 space-y-8 border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-extrabold text-white flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <FaPenFancy className="text-yellow-300" /> Create New Blog
        </motion.h1>

        {/* Title */}
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

        {/* Tags */}
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

        {/* Description */}
        <motion.div className="rounded-xl overflow-hidden shadow-xl border border-white/30 bg-white">
          <JoditEditor value={description} onChange={(newDesc) => setDescription(newDesc)} />
        </motion.div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <motion.button
            onClick={() => handleCreateBlog("draft")}
            whileHover={{ scale: 1.1 }}
            disabled={loading}
            className="px-6 py-3 rounded-full bg-white text-indigo-600 font-semibold shadow-lg hover:bg-gray-100 transition flex items-center gap-2"
          >
            <FaSave /> Save Draft
          </motion.button>
          <motion.button
            onClick={() => handleCreateBlog("published")}
            whileHover={{ scale: 1.1 }}
            disabled={loading}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg hover:opacity-90 transition flex items-center gap-2"
          >
            <FaPenFancy /> Publish
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
