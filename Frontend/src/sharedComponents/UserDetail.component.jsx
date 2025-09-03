import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaUserShield } from "react-icons/fa";

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:1551/api/users/${id}`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("❌ Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 text-xl font-semibold">🚨 User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center gap-6 border-b pb-6">
        <img
          src={
            user.avatar
              ? `http://localhost:1551/api/users/avatar/${user.avatar}`
              : "https://via.placeholder.com/150"
          }
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            {user.username}
            {user.isVerified ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
          </h2>
          <p className="flex items-center text-gray-600 mt-1">
            <FaEnvelope className="mr-2 text-blue-500" /> {user.email}
          </p>
          <p className="flex items-center mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
            <FaUserShield className="mr-2" />
            {user.roles?.join(", ")}
          </p>
        </div>
      </div>

      {/* User Meta Info */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow rounded-xl border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">Account Status</h3>
          <p className="mt-2 text-gray-600">
            {user.isVerified ? "✅ Verified User" : "❌ Not Verified"}
          </p>
        </div>
        <div className="p-4 bg-white shadow rounded-xl border hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-700">User ID</h3>
          <p className="mt-2 text-sm text-gray-500">{user._id}</p>
        </div>
      </div>

      {/* Raw JSON Section */}
      <div className="mt-8 bg-gray-900 text-gray-100 p-6 rounded-xl shadow-inner">
        <h3 className="text-lg font-semibold mb-4">📦 Full User Data</h3>
        <pre className="text-sm overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
