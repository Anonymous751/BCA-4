import { useEffect, useState } from "react";
import axios from "axios";

export default function UserBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:1551/api/blogs/my-blogs?ts=${Date.now()}`, // prevent caching
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        setBlogs(res.data.blogs);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err.response?.data || err.message);
        setError(err.response?.data || { error: err.message });
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading blogs...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blogs</h1>

      {error && (
        <p className="text-red-500 text-center mb-4">{error.error}</p>
      )}

      {blogs.length === 0 && !error ? (
        <p className="text-gray-600 text-center">You haven’t created any blogs yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {blog.coverImage && (
                <img
                  src={`http://localhost:1551/api/blogs/cover/${blog.coverImage}`}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{blog.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                  <span>Tags: {blog.tags?.join(", ") || "None"}</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => window.location.href = `/blogs/${blog._id}`}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
