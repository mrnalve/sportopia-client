import React, { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import useInstructor from "../hooks/useInstructor";

const InstructorRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const [isInstructor, isInstructorLoading] = useInstructor();
  if (loading || isInstructorLoading) {
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
  if (user && isInstructor) {
    return children;
  }
  return <Navigate to={"/"} state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
