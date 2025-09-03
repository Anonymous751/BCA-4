import { FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    otp: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must be numeric")
      .required("OTP is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const res = await axios.post(
      "http://localhost:1551/api/users/reset-password",
      {
        email: values.email,
        otp: Number(values.otp), // convert string to number
        newPassword: values.newPassword,
      }
    );

    toast.success(res.data.message || "✅ Password reset successfully!");
    setTimeout(() => navigate("/login"), 1500);
  } catch (err) {
    toast.error(err.response?.data?.error || "Failed to reset password");
  } finally {
    setSubmitting(false);
  }
};

  const inputClasses =
    "peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700";

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-indigo-600 to-purple-700 px-4 pt-32">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
      >
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 animate-pulse">
          Reset Password
        </h2>

        <Formik
          initialValues={{ email: "", otp: "", newPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email */}
              <div className="relative mb-6">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field type="email" name="email" placeholder="Email" className={inputClasses} />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* OTP */}
              <div className="relative mb-6">
                <FaCheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field type="text" name="otp" placeholder="Enter OTP" maxLength="6" className={inputClasses} />
                <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* New Password */}
              <div className="relative mb-6">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field type="password" name="newPassword" placeholder="New Password" className={inputClasses} />
                <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Reset Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300"
              >
                <FaCheckCircle />
                <span>{isSubmitting ? "Resetting..." : "Reset Password"}</span>
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}
