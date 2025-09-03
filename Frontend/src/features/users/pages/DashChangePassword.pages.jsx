import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DashChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!oldPassword || !newPassword) {
    toast.error("⚠️ Please fill both fields!");
    return;
  }

  try {
    setLoading(true);

    const token = localStorage.getItem("token"); // get token from storage

    const response = await axios.post(
      "http://localhost:1551/api/users/change-password",
      { oldPassword, newPassword },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );

    toast.success(response.data.message || "✅ Password changed successfully!");

    setOldPassword("");
    setNewPassword("");

    setTimeout(() => {
      navigate("/admin");
    }, 1500);
  } catch (error) {
    console.error("Change password error:", error);
    toast.error(
      error.response?.data?.error || "❌ Failed to change password. Try again."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Change Password
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block text-gray-700 mb-1">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md transition text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
