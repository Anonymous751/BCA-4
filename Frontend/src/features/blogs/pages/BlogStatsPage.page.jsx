import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function BlogStatsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `http://localhost:1551/api/blogs/my-blogs`,
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );

        // Trim description for preview (first 100 chars)
        const mappedBlogs = res.data.blogs.map((blog) => ({
          ...blog,
          shortDescription:
            blog.description.length > 100
              ? blog.description.slice(0, 100) + "..."
              : blog.description,
        }));

        setBlogs(mappedBlogs);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.response?.data || { error: err.message });
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading stats...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">{error.error}</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Blog Stats</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <>
          {/* Blog Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold mb-3">{blog.title}</h2>

                {/* Jodit content preview */}
                <div
                  className="text-gray-700 mb-4 line-clamp-5 prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.description }}
                />

                {/* Metrics */}
                <div className="flex justify-between text-sm text-gray-500 flex-wrap gap-2">
                  <span>Views: {blog.views || 0}</span>
                  <span>Likes: {blog.likesCount || 0}</span>
                  <span>Dislikes: {blog.dislikesCount || 0}</span>
                  <span>Comments: {blog.commentsCount || 0}</span>
                </div>

                <button
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  onClick={() => window.location.href = `/blogs/${blog._id}`}
                >
                  Read More
                </button>
              </div>
            ))}
          </div>

          {/* Chart */}
          <h2 className="text-2xl font-bold mb-4 text-center">Blog Metrics Chart</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={blogs}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <XAxis
                dataKey="title"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="views" fill="#3b82f6" name="Views" />
              <Bar dataKey="likesCount" fill="#10b981" name="Likes" />
              <Bar dataKey="dislikesCount" fill="#ef4444" name="Dislikes" />
              <Bar dataKey="commentsCount" fill="#f59e0b" name="Comments" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
