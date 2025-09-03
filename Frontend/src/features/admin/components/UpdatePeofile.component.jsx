import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaSave, FaImage } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null); // can be File or URL string
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          "http://localhost:1551/api/users/logged-in-user-profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = res.data.user;
        setUsername(user.username);
        setEmail(user.email);
        setAvatar(
          user.avatar
            ? `http://localhost:1551/api/files/${user.avatar}`
            : null
        );
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response || err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle profile update
  const handleUpdate = async () => {
    setSaving(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Token missing, cannot update profile");
      setSaving(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (avatar instanceof File) formData.append("avatar", avatar);

    try {
      const res = await axios.put(
        "http://localhost:1551/api/users/update-user-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = res.data.user;
      const normalizedUser = {
        ...updatedUser,
        _id: updatedUser._id || updatedUser.id,
        avatarUrl: updatedUser.avatar
          ? `http://localhost:1551/api/files/${updatedUser.avatar}`
          : null,
      };

      // Update local UI instantly
      setUsername(normalizedUser.username);
      setEmail(normalizedUser.email);
      setAvatar(normalizedUser.avatarUrl);

      toast.success(res.data.message || "Profile updated successfully!");

      // ✅ Redirect with normalized user
      navigate("/admin/profile", { state: { updatedUser: normalizedUser } });
    } catch (err) {
      console.error("❌ Error updating profile:", err.response || err);
      toast.error(err.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-16 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">
          Update Profile
        </h2>

        {/* Avatar Upload */}
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-indigo-500 flex items-center justify-center bg-gray-200">
          {avatar ? (
            <img
              src={avatar instanceof File ? URL.createObjectURL(avatar) : avatar}
              alt="Avatar Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <FaImage className="text-gray-500 text-4xl" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="mb-4"
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-100 mb-4 outline-none border border-gray-300"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-xl bg-gray-100 mb-6 outline-none border border-gray-300"
        />

        {/* Save Button */}
        <button
          onClick={handleUpdate}
          disabled={saving}
          className={`px-6 py-3 rounded-full bg-gradient-to-r from-green-500 via-teal-500 to-indigo-500 text-white font-semibold shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform ${
            saving ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaSave /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
