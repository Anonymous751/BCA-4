// src/features/users/pages/Login.page.jsx
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../context/auth.context";

export default function LoginPage() {
<<<<<<< HEAD
<<<<<<< HEAD
    const { login } = useAuth();
=======
  const { login } = useAuth();
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
  const { login } = useAuth();
>>>>>>> 68ee815 (AlMost-85)
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const res = await axios.post("http://localhost:1551/api/users/login", {
        email: values.email,
        password: values.password,
      });

      const token = res.data.token;
      const user = {
        name: res.data.user.username, // or res.data.user.name depending on your backend
        role: res.data.user.roles[0], // Author, Reader, Admin
      };

      // ✅ Save user + token in AuthContext
      login(user, token);
=======
=======
>>>>>>> 68ee815 (AlMost-85)
      console.log("Logging in with:", values);
      const res = await axios.post("http://localhost:1551/api/users/login", values);
      console.log("API Response:", res.data);

      const { token, user } = res.data;

      // Save user + token in AuthContext
      login({ name: user.username, role: user.roles[0], roles: user.roles }, token);

      // Save in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userRoles", JSON.stringify(user.roles));
      localStorage.setItem("username", user.username);
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)

      toast.success(res.data.message || "Login successful!");

      // Redirect based on role
      setTimeout(() => {
<<<<<<< HEAD
<<<<<<< HEAD
        if (user.role === "Admin") navigate("/admin/profile");
        else if (user.role === "Author") navigate("/author/profile");
        else if (user.role === "Reader") navigate("/reader/profile");
        else toast.error("Unknown user role");
      }, 1500);

    } catch (err) {
=======
=======
>>>>>>> 68ee815 (AlMost-85)
        if (user.roles.includes("Admin")) navigate("/admin/dashboard");
        else if (user.roles.includes("Author")) navigate("/author/author-dashboard");
        else if (user.roles.includes("Reader")) navigate("/reader/blogs");
        else navigate("/"); // fallback
      }, 500);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
      toast.error(err.response?.data?.error || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 animate-pulse">
          Welcome Back
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
<<<<<<< HEAD
<<<<<<< HEAD
              {/* Email */}
=======
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field type="email" name="email" placeholder="Email" className={inputClasses} />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Password */}
=======
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field type="password" name="password" placeholder="Password" className={inputClasses} />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Forgot password */}
=======
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
              <div className="text-right">
                <NavLink to="/generate-otp" className="text-sm text-indigo-600 hover:underline hover:text-purple-600 transition-all">
                  Forgot Password?
                </NavLink>
              </div>

<<<<<<< HEAD
<<<<<<< HEAD
              {/* Submit Button */}
=======
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <FaSignInAlt />
                <span>{isSubmitting ? "Logging in..." : "Login"}</span>
              </motion.button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <NavLink to="/register" className="text-indigo-600 font-semibold cursor-pointer hover:underline transition-all">
            Register
          </NavLink>
        </p>
      </motion.div>
    </div>
  );
}
