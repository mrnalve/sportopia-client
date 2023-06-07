import React from "react";
import { FaChalkboardTeacher, FaHome, FaUsers } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center bg-gradient-to-r from-[#0B0C10] to-[rgba(21, 21, 21, 0)]">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-[#0B0C10] text-white">
          {/* Sidebar content here */}
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  activeClassName="menu-item-active"
                  className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
                >
                  <FaHome className="mr-2" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageUsers"
                  activeClassName="menu-item-active"
                  className="flex items-center py-2 px-4 rounded transition-colors duration-200 hover:bg-[#66FCF1] hover:text-black"
                >
                  <FaUsers className="mr-2" />
                  Manage Users
                </NavLink>
              </li>
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
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
