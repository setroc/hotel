import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../context";

export const PublicRoute = ({children}) => {
  const location = useLocation();
  const {user} = useAuth();
  const {user_role} = user;
  if ( user_role ) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}