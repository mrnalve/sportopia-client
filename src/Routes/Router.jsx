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
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AddClass from "../Pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import MySelectedClasses from "../Pages/Dashboard/Students/MySelectedClasses/MySelectedClasses";
import Instructor from "../Pages/Instructor/Instructor";
import Classes from "../Pages/Classes/Classes";
import MyEnrolledClasses from "../Pages/Dashboard/Students/MyEnrolledClasses/MyEnrolledClasses";
import Payment from "../Pages/Dashboard/Students/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/Students/PaymentHistory/PaymentHistory";
import FeedbackPage from "../Pages/Dashboard/AdminHome/FeedBackPage/FeedBackPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/instructor",
        element: <Instructor></Instructor>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // admin route
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "feedbackPage",
        element: (
          <AdminRoute>
            <FeedbackPage></FeedbackPage>
          </AdminRoute>
        ),
      },
      // instructor route
      {
        path: "addClass",
        element: <PrivateRoute><AddClass></AddClass></PrivateRoute>,
      },
      {
        path: "myClasses",
        element: <PrivateRoute><MyClasses></MyClasses></PrivateRoute>,
      },
      // student route
      {
        path: "mySelectedClasses",
        element: <PrivateRoute><MySelectedClasses></MySelectedClasses></PrivateRoute>,
      },
      {
        path: "myEnrolledClasses",
        element: <PrivateRoute><MyEnrolledClasses></MyEnrolledClasses></PrivateRoute>,
      },
      {
        path: "paymentHistory",
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>,
      },
      {
        path: "payment",
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
    ],
  },
]);
