import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../context";


export const PrivateRoute = ({roles=[]}) => {
  const location = useLocation();
  const {user} = useAuth();
  const {user_role} = user;

  return user_role ? (
    roles.includes(user_role) ? (
      <Outlet />
    ) : (
      <Navigate to="/404" />
    )
  ):(
    <Navigate to="/login" state={{ from: location }} />
  )
}