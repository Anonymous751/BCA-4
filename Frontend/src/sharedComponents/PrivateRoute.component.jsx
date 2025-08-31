import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.context";

export default function PrivateRoute({ children, roles }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated()) return <Navigate to="/login" state={{ from: location }} />;

  if (roles && !roles.includes(user?.role)) {
    return <div className="text-center mt-10">Unauthorized</div>;
  }

  return children;
}
