import React from "react";
import { FaBars, FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { Circles } from "react-loader-spinner";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  // const isAdmin = true;
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isInstructor, isInstructorLoading] = useInstructor();
  console.log(isInstructor);

  return isAdminLoading || isInstructorLoading ? (
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
  ) : (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)]">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-grad text-left drawer-button lg:hidden"
        >
          <FaBars />
        </label>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-[#0B0C10] text-white">
          {/* Sidebar content here */}

          <>
            <li>
              <NavLink
                to={
                  isAdmin
                    ? `/dashboard/adminHome`
                    : isInstructor
                    ? "/dashboard/addClass"
                    : "/dashboard/mySelectedClasses"
                }
                activeClassName="menu-item-active"
                className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
              >
                <FaHome className="mr-2" />
                {isAdmin
                  ? "Admin Home"
                  : isInstructor
                  ? "Add a Class"
                  : "My Selected Classes"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={
                  isAdmin
                    ? `/dashboard/manageUsers`
                    : isInstructor
                    ? "/dashboard/myClasses"
                    : "/dashboard/myEnrolledClasses"
                }
                activeClassName="menu-item-active"
                className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
              >
                <FaUsers className="mr-2" />
                {isAdmin
                  ? "Manage Users"
                  : isInstructor
                  ? "My Classes"
                  : "My Enrolled Classes"}
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/dashboard/manageClasses"
                  activeClassName="menu-item-active"
                  className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
                >
                  <FaChalkboardTeacher className="mr-2" />
                  Manage Classes
                </NavLink>
              </li>
            )}
            <hr className="text-white my-4" />
            <li>
              <NavLink
                to="/"
                activeClassName="menu-item-active"
                className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
              >
                <FaHome className="mr-2" />
                Home
              </NavLink>
            </li>
          </>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
