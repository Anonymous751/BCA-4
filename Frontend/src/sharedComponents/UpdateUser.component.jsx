import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UpdateUser() {
  const { id } = useParams(); // get user ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    roles: [],
    isVerified: false,
  });

  const [loading, setLoading] = useState(true);

  // Fetch user by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:1551/api/users/${id}`, {
          withCredentials: true,
        });
        const user = res.data.user;
        setFormData({
          username: user.username || "",
          email: user.email || "",
          roles: user.roles || [],
          isVerified: user.isVerified || false,
        });
      } catch (err) {
        console.error("Error fetching user:", err);
        alert("Failed to load user data.");
        navigate("/admin/users");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "roles") {
      setFormData({
        ...formData,
        roles: value.split(",").map((r) => r.trim()), // comma separated
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token"); // 🔑 get token

    await axios.put(
      `http://localhost:1551/api/users/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ send token
        },
        withCredentials: true,
      }
    );

    alert("User updated successfully!");
    navigate("/admin/users");
  } catch (err) {
    console.error("Error updating user:", err.response?.data || err.message);
    alert(err.response?.data?.message || "Failed to update user.");
  }
};


  if (loading) return <p className="p-6">Loading user data...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Roles (comma separated)
          </label>
          <input
            type="text"
            name="roles"
            value={formData.roles.join(", ")}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isVerified"
            checked={formData.isVerified}
            onChange={handleChange}
          />
          <label>Verified</label>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Update User
        </button>
      </form>
    </div>
  );
}
