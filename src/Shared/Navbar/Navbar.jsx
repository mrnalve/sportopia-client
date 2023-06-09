import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import sportLogo from "../../../public/soccer-ball.png";
import { AuthContext } from "../../Authentication/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  // something problem
  // handle logout
  const handleLogout = (event) => {
    event.preventDefault();
    logout()
      .then(() => {})
      .catch((error) => console.log(error?.message));
  };
  // list item
  const menuItems = (
    <>
      <li>
        <Link to={"/"}>Home</Link>
      </li>
      <li>
        <Link to={"/instructor"}>Instructor</Link>
      </li>
      <li>
        <Link to={"/classes"}>Class</Link>
      </li>
      {user && (
        <li>
          <Link
            to={`/dashboard/${
              isAdmin
                ? "adminHome"
                : isInstructor
                ? "addClass"
                : "mySelectedClasses"
            }`}
          >
            Dashboard
          </Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar w-full">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-[#0b0c10] rounded-box w-52 z-10"
          >
            {menuItems}
          </ul>
        </div>
        <div className="flex items-center h-5">
          <span className="text-xl font-extrabold text-white geologica h-5 pr-2 italic">
            SPORTOPIA
          </span>
          <div className="w-24 h-5">
            <img className="h-7" src={sportLogo} alt="" />
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img title={user?.displayName} src={user.photoURL} />
              </div>
            </div>
            <button onClick={handleLogout} className="btn btn-grad text-white">
              Log out
            </button>
          </>
        ) : (
          <Link to={"/login"}>
            <button className="btn btn-grad text-white">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
