import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const PrivateRoute = ({children}) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <progress className="progress w-56 absolute left-[50%] -translate-x-1/2 top-[10%]"></progress>;
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
