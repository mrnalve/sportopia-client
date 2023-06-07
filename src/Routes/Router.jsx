import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home/Home";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import Dashboard from "../Layout/Dashboard";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children:[
      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'manageUsers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'manageClasses',
        element: <ManageClasses></ManageClasses>
      },
    ]
  }
]);

