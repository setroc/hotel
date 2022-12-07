import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { AuthContext } from "../auth";


export const PrivateRoute = ({children, role}) => {
  const location = useLocation();
  const {user} = useContext(AuthContext);

  // Checar si esta autenticado
  if ( !user.logged ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Checar si esta autenticado y puede ver esta ruta según su role
  if ( user.logged && user.role != role ) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}