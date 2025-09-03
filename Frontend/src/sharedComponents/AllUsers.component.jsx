import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:1551/api/users/all", {
          withCredentials: true,
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
const handleDelete = async (userId) => {
  try {
    const token = localStorage.getItem("token"); // ✅ define it here
    await axios.delete(`http://localhost:1551/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(users.filter((u) => u._id !== userId));
  } catch (err) {
    console.error("Error deleting user:", err.response?.data || err.message);
  }
};
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading users...</p>
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No users found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 hover:shadow-lg transition"
          >
            <div
              onClick={() => navigate(`/admin/users/${user._id}`)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <img
                src={
                  user.avatar
                    ? `http://localhost:1551/api/users/avatar/${user.avatar}`
                    : "https://via.placeholder.com/100"
                }
                alt={user.username}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-sm mt-1">
                  <span className="font-medium">Role:</span>{" "}
                  {user.roles?.join(", ")}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Verified:</span>{" "}
                  {user.isVerified ? "✅ Yes" : "❌ No"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={() => navigate(`/admin/users/update/${user._id}`)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
