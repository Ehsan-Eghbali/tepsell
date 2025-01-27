import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";


import JobReducer from "./jobs/reducer";


import contacts from "./employee/reducer";


import Dashboard from "./dashboard/reducer";

//Dasboard job
import DashboardJob from "./dashboard-jobs/reducer";

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,

  crypto,

  JobReducer,

  contacts,
  Dashboard,

  DashboardJob
});

export default rootReducer;
