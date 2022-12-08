import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../auth";


export const PrivateRoute = ({children, roles=[]}) => {
  const location = useLocation();
  const {user} = useContext(AuthContext);

  return user.logged ? (
    roles.includes(user.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/404" />
    )
  ):(
    <Navigate to="/login" state={{ from: location }} />
  )
}