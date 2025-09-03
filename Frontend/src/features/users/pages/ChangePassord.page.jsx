import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function ChangePassword() {
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().min(6, "At least 6 chars").required("New password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:1551/api/users/change-password",
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("✅ Password changed successfully!");
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to change password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-xl mt-6">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Field type="password" name="oldPassword" placeholder="Old Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <Field type="password" name="newPassword" placeholder="New Password" className="w-full p-2 border rounded" />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              {isSubmitting ? "Changing..." : "Change Password"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
