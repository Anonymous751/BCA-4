import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaUser, FaEnvelope, FaIdBadge, FaImage, FaEdit } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from backend
  const fetchProfile = async () => {
    const token = localStorage.getItem("token");
    console.log("🔑 Fetching profile, token:", token);

    if (!token) {
      console.warn("❌ No token found. Please login again.");
      toast.error("No token found. Please login again.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:1551/api/users/logged-in-user-profile",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("📦 Profile API response:", res.data);

      const userData = res.data.user;

      // Normalize ID field (some APIs send id, some send _id)
      userData._id = userData._id || userData.id;

      // Add avatarUrl if avatar exists
      userData.avatarUrl = userData.avatar
        ? `http://localhost:1551/api/files/${userData.avatar}`
        : null;

      setUser(userData);
      console.log("✅ User state updated:", userData);
    } catch (err) {
      console.error("❌ Error fetching profile:", err.response || err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Run effect when component mounts or when redirected with updated user
  useEffect(() => {
    if (location.state?.updatedUser) {
      console.log("🔄 Using updated user from location.state:", location.state.updatedUser);

      const updatedUser = { ...location.state.updatedUser };

      // Normalize ID field
      updatedUser._id = updatedUser._id || updatedUser.id;

      // Add avatarUrl if avatar exists
      updatedUser.avatarUrl = updatedUser.avatar
        ? `http://localhost:1551/api/files/${updatedUser.avatar}`
        : null;

      setUser(updatedUser);
      setLoading(false);
    } else {
      fetchProfile();
    }
  }, [location.state]);

  if (loading) return <p className="text-center mt-10 text-gray-700">Loading...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">No user data available</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center relative">
        {/* Avatar */}
        {user.avatarUrl ? (
          <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <img
              src={user.avatarUrl}
              alt="Admin Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center bg-gray-200 text-gray-500 text-4xl">
            <FaImage />
          </div>
        )}

        {/* Username */}
        <h2 className="text-3xl font-bold mb-2 text-indigo-700 flex items-center justify-center gap-2">
          <FaUser /> {user.username}
        </h2>

        {/* Email */}
        <p className="text-gray-700 flex items-center justify-center gap-2">
          <FaEnvelope /> {user.email}
        </p>

        {/* Roles */}
        <p className="text-gray-700 flex items-center justify-center gap-2 mt-2">
          <FaIdBadge /> Role: {user.roles?.join(", ")}
        </p>

        {/* Update Profile Button */}
        <button
          onClick={() => navigate("/admin/update-profile")}
          className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <FaEdit /> Update Profile
        </button>
      </div>
    </div>
  );
}
