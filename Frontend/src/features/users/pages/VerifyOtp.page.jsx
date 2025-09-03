import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialEmail = location.state?.email || "";

  const [otp, setOtp] = useState(new Array(6).fill("")); // string array for input
  const inputsRef = useRef([]);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    otpString: Yup.string()
      .length(6, "OTP must be 6 digits")
      .matches(/^\d+$/, "OTP must be numeric")
      .required("OTP is required"),
  });

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendOtp = async (email) => {
    try {
      setResendDisabled(true);
      const res = await axios.post("http://localhost:1551/api/users/resend-otp", { email });
      if (res.data.attemptsLeft === 0) {
        toast.error("⚠️ You have reached maximum resend attempts. You are blocked.");
      } else {
        toast.success(`OTP resent successfully! Attempts left: ${res.data.attemptsLeft}`);
        setResendTimer(30);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const otpNumber = Number(otp.join("")); // convert OTP to Number
      if (isNaN(otpNumber)) {
        toast.error("Invalid OTP format");
        setSubmitting(false);
        return;
      }

      await axios.post("http://localhost:1551/api/users/verify-otp", {
        email: values.email,
        otp: otpNumber, // send as Number
      });

      toast.success("✅ Email verified successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to verify OTP");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses =
    "peer w-full pl-10 pr-3 pt-5 pb-2 border-b-2 border-gray-300 focus:border-indigo-600 outline-none text-gray-700";
  const labelClasses =
    "absolute left-10 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-1 peer-focus:text-xs peer-focus:text-indigo-600";

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
          Verify OTP
        </h2>

        <p className="text-center text-red-600 mb-6 text-sm">
          <span className="text-red-600">Note:</span> Make sure you are registered before getting OTP.
        </p>

        <Formik
          initialValues={{ email: initialEmail, otpString: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setFieldValue }) => {
            // Sync OTP array with Formik value
            useEffect(() => {
              const otpArr = values.otpString.split("");
              while (otpArr.length < 6) otpArr.push("");
              setOtp(otpArr);
            }, [values.otpString]);

            const handleOtpChangeFormik = (e, idx) => {
              const val = e.target.value.replace(/\D/, "");
              const otpArr = [...otp];
              otpArr[idx] = val;
              setOtp(otpArr);
              setFieldValue("otpString", otpArr.join(""));
              if (val && idx < 5) inputsRef.current[idx + 1].focus();
            };

            return (
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

                {/* OTP Inputs */}
                <div className="flex justify-between mb-8 gap-2">
                  {otp.map((digit, idx) => (
                    <motion.input
                      key={idx}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChangeFormik(e, idx)}
                      onKeyDown={(e) => handleOtpBackspace(e, idx)}
                      className="w-12 h-12 text-center text-xl font-semibold rounded-lg border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-400 transition-all duration-300 outline-none"
                      whileFocus={{ scale: 1.1, boxShadow: "0 0 8px rgba(79, 70, 229,0.5)" }}
                    />
                  ))}
                </div>
                <ErrorMessage name="otpString" component="div" className="text-red-500 text-sm mb-4" />

                {/* Verify Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(79, 70, 229, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 mb-4"
                >
                  <FaCheckCircle />
                  <span>{isSubmitting ? "Verifying..." : "Verify OTP"}</span>
                </motion.button>

                {/* Resend OTP Button */}
                <button
                  type="button"
                  disabled={resendDisabled}
                  onClick={() => handleResendOtp(values.email)}
                  className={`w-full bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold mb-2 transition-all duration-300 ${
                    resendDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300"
                  }`}
                >
                  {resendDisabled ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </motion.div>
    </div>
  );
}
