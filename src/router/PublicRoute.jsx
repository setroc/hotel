import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../auth";

export const PublicRoute = ({children}) => {
  const location = useLocation();
  const {user} = useContext(AuthContext);
  if ( user.logged ) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
}