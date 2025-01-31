import React from "react";
import { Navigate } from "react-router-dom";


// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Profile from "../pages/profile/Profile";

//  //  managment
import AddTeam from "../pages/managment/addteam";
import AddUnit from "../pages/managment/addunit";

// //Employees
import EmployeeList from "../pages/Employees/EmployeeList/Employees-list";
const authProtectedRoutes = [
  { path: "/profile", component: <Profile /> },
  { path: "/employee/:id", component: <Profile /> },

  // Employees

  { path: "/employees-List", component: <EmployeeList /> },


  //   //Utility
  { path: "/", exact: true, component: <Navigate to="/" /> },
  { path: "/", exact: true, component: <Navigate to="/profile" /> },

  // Management
  { path: "/addteam", component: <AddTeam /> },
  { path: "/addunit", component: <AddUnit /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  // { path: "/addteam", component: <AddTeam /> },
];

export { authProtectedRoutes, publicRoutes }
