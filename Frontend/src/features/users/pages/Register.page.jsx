import { FaUser, FaEnvelope, FaLock, FaUpload, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    roles: "Reader",
    avatar: null,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    roles: Yup.string().required("Role is required"),
  });

  const handleAvatarChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
      setFieldValue("avatar", file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      formData.append("roles", values.roles);
      if (values.avatar) formData.append("avatar", values.avatar);

      const res = await axios.post("http://localhost:1551/api/users/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message);
      // redirect to Verify OTP page
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: values.email } });
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4 pt-28 pb-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-10 animate-pulse">
          Create Account
        </h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-6">
              {/* Username */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
                />
                <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field
                  type={showConfirm ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
                <ErrorMessage name="confirm_password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Role */}
              <div className="flex gap-4 items-center">
                <span className="text-gray-600 font-medium">Role:</span>
                {["Reader", "Author", "Admin"].map((r) => (
                  <label key={r} className="flex items-center gap-1 text-gray-700 cursor-pointer">
                    <Field type="radio" name="roles" value={r} className="accent-indigo-600" />
                    {r}
                  </label>
                ))}
                <ErrorMessage name="roles" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Avatar Upload */}
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium mb-2">Avatar:</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-300">
                    <FaUpload />
                    <span>Choose Avatar</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleAvatarChange(e, setFieldValue)}
                    />
                  </label>
                  {avatar && (
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-full border-2 border-indigo-600 object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <FaSignInAlt />
                <span>{isSubmitting ? "Registering..." : "Register"}</span>
              </motion.button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all"
          >
            Login
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
