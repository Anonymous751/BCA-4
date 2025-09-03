import { FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function GenerateOtpPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const handleGenerateOtp = async (values) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:1551/api/users/request-password-reset", {
        email: values.email,
      });

      toast.success(`✅ OTP generated! Check email: ${res.data.otp || "Sent"}`);

      // Redirect to Reset Password page with email
      navigate("/reset-password", { state: { email: values.email } });

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to generate OTP");
    } finally {
      setLoading(false);
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
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-4 animate-pulse">
          Generate OTP
        </h2>

        <p className="text-center text-red-600 mb-6 text-sm">
          Enter your email to receive a one-time password (OTP)
        </p>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={handleGenerateOtp}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Email Input */}
              <div className="relative mb-8">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={inputClasses}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Generate OTP Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || loading}
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 mb-4"
              >
                <FaPaperPlane />
                <span>{loading ? "Generating..." : "Generate OTP"}</span>
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
}
