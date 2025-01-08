import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRole: number;
}

export const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { role, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (role !== allowedRole) {
    // Redirect to unauthorized page if role is not allowed
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
