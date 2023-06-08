import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  if (loading || isAdminLoading) {
    return  <Circles
    height="80"
    width="80"
    color="#66FCF1"
    ariaLabel="circles-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
  />;
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
