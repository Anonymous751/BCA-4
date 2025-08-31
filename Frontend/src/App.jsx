import React, { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/Main.layout.jsx";
import Loader from "./sharedComponents/Loader.component.jsx";
import ErrorComponent from "./sharedComponents/Errors.component.jsx";
import VerifyOtpPage from "./features/users/pages/VerifyOtp.page.jsx";
import ForgetPasswordPage from "./features/users/pages/ForgetPassword.page.jsx";
import HomePage from "./navbarPages/Home.page.jsx";
import AboutPage from "./navbarPages/About.page.jsx";
import ServicesPage from "./navbarPages/Service.page.jsx";
import ContactPage from "./navbarPages/Contact.page.jsx";
import AdminDashboardLayout from "./layouts/AdminDashboard.layout.jsx";
import AuthorDashboardLayout from "./layouts/AuthorDashboard.layout.jsx";
import ReaderDashboardLayout from "./layouts/ReaderDashboard.layout.jsx";
import "./App.css";
// Lazy-loaded pages
const BlogListPage = lazy(() =>
  import("./features/blogs/pages/BlogList.page.jsx")
);
const BlogDetailsPage = lazy(() =>
  import("./features/blogs/pages/BlogDetails.page.jsx")
);
const LoginPage = lazy(() => import("./features/users/pages/Login.page.jsx"));
const RegisterPage = lazy(() =>
  import("./features/users/pages/Register.page.jsx")
);
const DashboardPage = lazy(() =>
  import("./features/admin/pages/Dashboard.page.jsx")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorComponent />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blogs/:id", element: <BlogDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "about-page", element: <AboutPage /> },
      { path: "service-page", element: <ServicesPage /> },
      { path: "contact-page", element: <ContactPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminDashboardLayout />,
    children: [
      { path: "users", element: <h1>Manage Users</h1> },
      { path: "reports", element: <h1>Reports</h1> },
      { path: "settings", element: <h1>Settings</h1> },
    ],
  },
  {
    path: "/author",
    element: <AuthorDashboardLayout />,
    children: [
      { path: "blogs", element: <h1>My Blogs</h1> },
      { path: "write", element: <h1>Write Blog</h1> },
      { path: "stats", element: <h1>Blog Stats</h1> },
    ],
  },
  {
    path: "/reader",
    element: <ReaderDashboardLayout />,
    children: [
      { path: "explore", element: <h1>Explore Blogs</h1> },
      { path: "favorites", element: <h1>Favorites</h1> },
      { path: "notifications", element: <h1>Notifications</h1> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
