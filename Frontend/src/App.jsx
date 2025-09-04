<<<<<<< HEAD
=======
// src/App.jsx
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import MainLayout from "./layouts/Main.layout.jsx";
import AdminDashboardLayout from "./layouts/AdminDashboard.layout.jsx";
import AuthorDashboardLayout from "./layouts/AuthorDashboard.layout.jsx";
import ReaderDashboardLayout from "./layouts/ReaderDashboard.layout.jsx";
import Loader from "./sharedComponents/Loader.component.jsx";
import ErrorComponent from "./sharedComponents/Errors.component.jsx";
import ProtectedRoute from "./sharedComponents/ProtectedRoute.component.jsx";

// Static imports
import VerifyOtpPage from "./features/users/pages/VerifyOtp.page.jsx";
import ForgetPasswordPage from "./features/users/pages/ForgetPassword.page.jsx";
import HomePage from "./navbarPages/Home.page.jsx";
import AboutPage from "./navbarPages/About.page.jsx";
import ServicesPage from "./navbarPages/Service.page.jsx";
import ContactPage from "./navbarPages/Contact.page.jsx";
<<<<<<< HEAD
import AdminDashboardLayout from "./layouts/AdminDashboard.layout.jsx";
import AuthorDashboardLayout from "./layouts/AuthorDashboard.layout.jsx";
import ReaderDashboardLayout from "./layouts/ReaderDashboard.layout.jsx";
import "./App.css";
// import Profile from "./features/users/components/Profile.component.jsx";
=======
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
import CreateBlogPage from "./features/blogs/pages/CreateBlog.page.jsx";
import GenerateOtpPage from "./features/users/pages/GenerateOtoPage.jsx";
import ResetPasswordPage from "./features/users/pages/ResetPassword.page.jsx";
import AdminProfile from "./features/admin/components/AdminProfile.component.jsx";
import DashChangePassword from "./features/users/pages/DashChangePassword.pages.jsx";
import AllUsers from "./sharedComponents/AllUsers.component.jsx";
<<<<<<< HEAD
import ProtectedRoute from "./sharedComponents/ProtectedRoute.component.jsx";

// Lazy-loaded pages
const BlogListPage = lazy(() =>
  import("./features/blogs/pages/BlogList.page.jsx")
);
const BlogDetailsPage = lazy(() =>
  import("./features/blogs/pages/BlogDetails.page.jsx")
);
=======
import UpdateProfile from "./features/admin/components/UpdatePeofile.component.jsx";
import UserDetails from "./sharedComponents/UserDetail.component.jsx";
import UpdateUser from "./sharedComponents/UpdateUser.component.jsx";
import AdminDashboard from "./features/admin/components/AdminDashboard.component.jsx";
import AuthorDashboardPage from "./features/Author/components/AuthorDashboard.components.jsx";
import FavouritePage from "./features/Favourites/components/Favourite.component.jsx";
import AdminSettings from "./features/admin/pages/AdminSettings.page.jsx";
import UpdateBlogPage from "./features/blogs/pages/UpdateBlog.page.jsx";

// Lazy imports
const BlogListPage = lazy(() => import("./features/blogs/pages/BlogList.page.jsx"));
const BlogDetailsPage = lazy(() => import("./features/blogs/pages/BlogDetails.page.jsx"));
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
const LoginPage = lazy(() => import("./features/users/pages/Login.page.jsx"));
const RegisterPage = lazy(() => import("./features/users/pages/Register.page.jsx"));

import { AuthProvider } from "./context/auth.context";
import UpdateBlogPage from "./features/blogs/pages/UpdateBlog.page.jsx";
import AdminSettings from "./features/admin/pages/AdminSettings.page.jsx";
import UpdateProfile from "./features/admin/components/UpdatePeofile.component.jsx";
import UserDetails from "./sharedComponents/UserDetail.component.jsx";
import UpdateUser from "./sharedComponents/UpdateUser.component.jsx";
import AdminDashboard from "./features/admin/components/AdminDashboard.component.jsx"

const userRole = localStorage.getItem("userRole"); 
const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorComponent />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "blogs/:id", element: <BlogDetailsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "about-page", element: <AboutPage /> },
      { path: "service-page", element: <ServicesPage /> },
      { path: "contact-page", element: <ContactPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
      { path: "forget-password", element: <ForgetPasswordPage /> },
<<<<<<< HEAD
      // { path: "profile", element: <Profile /> },
      
      { path: "generate-otp", element: <GenerateOtpPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      
=======
      { path: "generate-otp", element: <GenerateOtpPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
    ],
  },

  // Admin routes
  {
    path: "/admin",
<<<<<<< HEAD
   element: (
    // <ProtectedRoute allowedRoles={["Admin"]}>
      <AdminDashboardLayout />
    //  </ProtectedRoute>
  ),
    children: [
        { path: "dashboard", element: <AdminDashboard /> },
       { path: "users", element: <AllUsers /> },
       { path: "users/:id", element: <UserDetails /> },
=======
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AllUsers /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "users/update/:id", element: <UpdateUser /> },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      { path: "settings", element: <AdminSettings /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
      { path: "blogs", element: <BlogListPage /> },
<<<<<<< HEAD
      {
  path: "/admin/blogs/update/:id",
  element: (
    // <ProtectedRoute allowedRoles={["Author"]}>
      <UpdateBlogPage />
    // </ProtectedRoute>
  ),
},
{
  path: "users/update/:id",
  element: <UpdateUser />,
},
{
  path: "update-profile",
  element: (
    // Optional: wrap in <ProtectedRoute allowedRoles={["Admin"]}>
    <UpdateProfile />
  ),
}
  
=======
      { path: "blogs/update/:id", element: <UpdateBlogPage /> },
      { path: "update-profile", element: <UpdateProfile /> },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
    ],
  },

  // Author routes
  {
    path: "/author",
    element: (
<<<<<<< HEAD
    // <ProtectedRoute allowedRoles={["Author"]}>
      <AuthorDashboardLayout />
  //  </ProtectedRoute>
  ),
    children: [
      { path: "create-blog", element: <CreateBlogPage /> },
=======
      <ProtectedRoute allowedRoles={["Author"]}>
        <AuthorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "author-dashboard", element: <AuthorDashboardPage /> },
      { path: "create-blog", element: <CreateBlogPage /> },
      { path: "blogs/my-blog", element: <BlogListPage /> },
      { path: "blogs/update/:id", element: <UpdateBlogPage /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
      { path: "stats", element: <h1>Blog Stats</h1> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
      { path: "blogs", element: <BlogListPage /> },
      {
  path: "/author/blogs/update/:id",
  element: (
    // <ProtectedRoute allowedRoles={["Admin"]}>
      <UpdateBlogPage />
    // </ProtectedRoute>
  ),
}
    ],
  },

  // Reader routes
  {
    path: "/reader",
<<<<<<< HEAD
     element: (
    // <ProtectedRoute allowedRoles={["Reader"]}>
      <ReaderDashboardLayout />
    //  </ProtectedRoute>
  ),
=======
    element: (
      <ProtectedRoute allowedRoles={["Reader"]}>
        <ReaderDashboardLayout />
      </ProtectedRoute>
    ),
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
    children: [
      { path: "blogs", element: <BlogListPage /> },
      { path: "explore", element: <h1>Explore Blogs</h1> },
<<<<<<< HEAD
      { path: "favorites", element: <h1>Favorites</h1> },
      { path: "notifications", element: <h1>Notifications</h1> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
      { path: "blogs", element: <BlogListPage /> },
=======
      { path: "favourites", element: <FavouritePage /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
