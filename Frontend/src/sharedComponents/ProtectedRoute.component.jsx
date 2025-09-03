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
