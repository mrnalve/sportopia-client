import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="absolute left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2">
        <Circles
          height="80"
          width="80"
          color="#66FCF1"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
