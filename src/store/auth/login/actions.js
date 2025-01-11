import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  SOCIAL_LOGIN,
} from "./actionTypes"
import axios from "axios";

export const loginUser = (user, navigate, API_URL) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER });

    try {
      const response = await axios.post(API_URL, {
        username: user.email,
        password: user.password,
      });

      // ذخیره اطلاعات کاربر در Redux
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      // هدایت کاربر به صفحه داشبورد
      navigate("/dashboard");
    } catch (error) {
      dispatch({
        type: API_ERROR,
        payload: error.response?.data?.error || "خطایی رخ داده است",
      });
    }
  };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}

export const socialLogin = (type, history) => {
  return {
    type: SOCIAL_LOGIN,
    payload: { type, history },
  };
};