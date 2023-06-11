import React from "react";
import {
  FaBars,
  FaBook,
  FaHistory,
  FaHome,
  FaListAlt,
  FaPlus,
  FaUsers,
} from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

const Dashboard = () => {
  // const isAdmin = true;
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  console.log(isInstructor);

  return (
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
                    ? `/dashboard/manageClasses`
                    : isInstructor
                    ? "/dashboard/addClass"
                    : "/dashboard/mySelectedClasses"
                }
                activeClassName="menu-item-active"
                className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
              >
                {isAdmin ? (
                  <>
                    <FaHome className="mr-2" />
                    Manage Classes
                  </>
                ) : isInstructor ? (
                  <>
                    <FaPlus className="mr-2" /> Add a Class
                  </>
                ) : (
                  <>
                    <TiTick /> My Selected Classes
                  </>
                )}
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
                {isAdmin ? (
                  <>
                    <FaUsers className="mr-2" /> Manage Users
                  </>
                ) : isInstructor ? (
                  <>
                    <FaBook /> My Classes
                  </>
                ) : (
                  <>
                    <FaListAlt /> My Enrolled Classes
                  </>
                )}
              </NavLink>
            </li>
            {!isAdmin && !isInstructor ? (
              <li>
                <NavLink
                  to={"/dashboard/paymentHistory"}
                  activeClassName="menu-item-active"
                  className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
                >
                  <FaHistory></FaHistory>
                  Payment History
                </NavLink>
              </li>
            ) : (
              ""
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
