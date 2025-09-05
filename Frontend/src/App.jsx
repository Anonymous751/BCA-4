<<<<<<< HEAD
<<<<<<< HEAD
=======
// src/App.jsx
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
=======
// src/App.jsx
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

// Layouts
>>>>>>> 68ee815 (AlMost-85)
import MainLayout from "./layouts/Main.layout.jsx";
import AdminDashboardLayout from "./layouts/AdminDashboard.layout.jsx";
import AuthorDashboardLayout from "./layouts/AuthorDashboard.layout.jsx";
import ReaderDashboardLayout from "./layouts/ReaderDashboard.layout.jsx";
<<<<<<< HEAD
=======

// Components
>>>>>>> 68ee815 (AlMost-85)
import Loader from "./sharedComponents/Loader.component.jsx";
import ErrorComponent from "./sharedComponents/Errors.component.jsx";
import ProtectedRoute from "./sharedComponents/ProtectedRoute.component.jsx";

<<<<<<< HEAD
// Static imports
import VerifyOtpPage from "./features/users/pages/VerifyOtp.page.jsx";
import ForgetPasswordPage from "./features/users/pages/ForgetPassword.page.jsx";
=======
// Static imports for essential pages
>>>>>>> 68ee815 (AlMost-85)
import HomePage from "./navbarPages/Home.page.jsx";
import AboutPage from "./navbarPages/About.page.jsx";
import ServicesPage from "./navbarPages/Service.page.jsx";
import ContactPage from "./navbarPages/Contact.page.jsx";
<<<<<<< HEAD
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
=======
import VerifyOtpPage from "./features/users/pages/VerifyOtp.page.jsx";
import ForgetPasswordPage from "./features/users/pages/ForgetPassword.page.jsx";
import GenerateOtpPage from "./features/users/pages/GenerateOtoPage.jsx";
import ResetPasswordPage from "./features/users/pages/ResetPassword.page.jsx";
import CreateBlogPage from "./features/blogs/pages/CreateBlog.page.jsx";
import AdminProfile from "./features/admin/components/AdminProfile.component.jsx";
import DashChangePassword from "./features/users/pages/DashChangePassword.pages.jsx";
import AllUsers from "./sharedComponents/AllUsers.component.jsx";
import UpdateProfile from "./features/admin/components/UpdatePeofile.component.jsx";
import UserDetails from "./sharedComponents/UserDetail.component.jsx";
import UpdateUser from "./sharedComponents/UpdateUser.component.jsx";
import AdminDashboard from "./features/admin/components/AdminDashboard.component.jsx";
import AuthorDashboardPage from "./features/Author/components/AuthorDashboard.components.jsx";
import FavouritePage from "./features/Favourites/components/Favourite.component.jsx";
import AdminSettings from "./features/admin/pages/AdminSettings.page.jsx";
import UpdateBlogPage from "./features/blogs/pages/UpdateBlog.page.jsx";
import UserBlogsPage from "./features/blogs/pages/UserBlogPage.page.jsx";
import BlogStatsPage from "./features/blogs/pages/BlogStatsPage.page.jsx";

// Lazy-loaded pages for performance
>>>>>>> 68ee815 (AlMost-85)
const BlogListPage = lazy(() =>
  import("./features/blogs/pages/BlogList.page.jsx")
);
const BlogDetailsPage = lazy(() =>
  import("./features/blogs/pages/BlogDetails.page.jsx")
);
<<<<<<< HEAD
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
=======
const LoginPage = lazy(() => import("./features/users/pages/Login.page.jsx"));
const RegisterPage = lazy(() =>
  import("./features/users/pages/Register.page.jsx")
);

// ----------------------------
// Router Configuration
// ----------------------------
const router = createBrowserRouter([
  
  // ----------------------------
  // Public Routes
  // ----------------------------
>>>>>>> 68ee815 (AlMost-85)
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
=======
      { path: "generate-otp", element: <GenerateOtpPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
    ],
  },

  // ----------------------------
  // Admin Routes (Protected)
  // ----------------------------
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
>>>>>>> 68ee815 (AlMost-85)
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <AllUsers /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "users/update/:id", element: <UpdateUser /> },
<<<<<<< HEAD
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
=======
>>>>>>> 68ee815 (AlMost-85)
      { path: "settings", element: <AdminSettings /> },
      { path: "profile", element: <AdminProfile /> },
      { path: "change-password", element: <DashChangePassword /> },
      { path: "blogs", element: <BlogListPage /> },
<<<<<<< HEAD
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
=======
      { path: "blogs/update/:id", element: <UpdateBlogPage /> },
      { path: "update-profile", element: <UpdateProfile /> },
    ],
  },

  // ----------------------------
  // Author Routes (Protected)
  // ----------------------------
  {
    path: "/author",
    element: (
      <ProtectedRoute allowedRoles={["Author"]}>
        <AuthorDashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "author-dashboard", element: <AuthorDashboardPage /> },
      { path: "create-blog", element: <CreateBlogPage /> },
      { path: "blogs/my-blog", element: <UserBlogsPage /> },
      { path: "blogs/update/:id", element: <UpdateBlogPage /> },
      { path: "profile", element: <AdminProfile /> }, // reuse AdminProfile component
      { path: "change-password", element: <DashChangePassword /> },
      { path: "stats", element: <BlogStatsPage /> }, // blog stats page
    ],
  },

  // Route to view blogs by user ID (optional)
  { path: "/blogs/:userId", element: <UserBlogsPage /> },

  // ----------------------------
  // Reader Routes (Protected)
  // ----------------------------
  {
    path: "/reader",
>>>>>>> 68ee815 (AlMost-85)
    element: (
      <ProtectedRoute allowedRoles={["Reader"]}>
        <ReaderDashboardLayout />
      </ProtectedRoute>
    ),
<<<<<<< HEAD
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
=======
    children: [
      { path: "blogs", element: <BlogListPage /> },
      { path: "explore", element: <h1>Explore Blogs</h1> },
      { path: "favourites", element: <FavouritePage /> },
      { path: "profile", element: <AdminProfile /> }, // reuse AdminProfile component
      { path: "change-password", element: <DashChangePassword /> },
>>>>>>> 68ee815 (AlMost-85)
    ],
  },
]);

// ----------------------------
// App Component
// ----------------------------
export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
