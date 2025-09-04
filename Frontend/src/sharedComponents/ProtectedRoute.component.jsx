<<<<<<< HEAD
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth.context";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated() || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin has full access
  if (user.role === "Admin") return <Outlet />;

  // Author & Reader can only access their own dashboards
  return allowedRoles.includes(user.role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
=======
// src/sharedComponents/ProtectedRoute.component.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // User not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User role not allowed
    return <Navigate to="/" replace />;
  }

  return children;
}
>>>>>>> d096c23 (Almost All Admin,2-3 Author, ! Reader Notification)
