import { useState } from "react";

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:1551/api/users/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include" // ensure cookies/tokens are sent
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password changed successfully");
        setOldPassword("");
        setNewPassword("");
      } else {
        setMessage(data.error || "❌ Failed to change password");
      }
    } catch (err) {
      setMessage("❌ Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
        {message && <p className="mt-3 text-sm">{message}</p>}
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-900 text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
