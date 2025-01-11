import React from "react";
import { Navigate } from "react-router-dom";

// import InvoiceDetail from "../pages/Invoices/invoices-detail";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import Profile from "../pages/profile/Profile";


// // Dashboard
import Dashboard from "../pages/Dashboard/index";
import DashboardJob from "../pages/DashboardJob/index";



//Job
import JobGrid from "../pages/JobPages/JobGrid/index";
import JobDetails from "../pages/JobPages/JobDetails";
import JobCategories from "../pages/JobPages/JobCategories";
import JobList from "../pages/JobPages/JobList/index";
import ApplyJobs from "../pages/JobPages/ApplyJobs/index";
import CandidateList from "../pages/JobPages/CandidateList";
import CandidateOverview from "../pages/JobPages/CandidateOverview";

// //Pages
import PagesStarter from "../pages/Utility/pages-starter";


// //Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/index";
const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard/> },
  { path: "/dashboard-job", component: <DashboardJob/> },
  { path: "/profile", component: <Profile /> },

  //
  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/job-list", component: <JobList /> },
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },

  // Contacts
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },


  //   //Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
  { path: "/logout", component: <Logout /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
];

// export { authProtectedRoutes, publicRoutes };
export { authProtectedRoutes, publicRoutes }
