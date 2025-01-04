import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  allowedRole: number;
}

export const RequireAuth = ({ allowedRole }: RequireAuthProps) => {
  const { role } = useAuth();

  return role == allowedRole ? <Outlet /> : <Navigate to="/" />;
};
