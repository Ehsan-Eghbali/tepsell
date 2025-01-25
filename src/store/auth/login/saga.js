import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import {API_ERROR, LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN} from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import axios from "axios";

const fireBaseBackend = getFirebaseBackend();

function* loginUser(action) {
  try {
    const response = yield call(axios.post, action.payload.apiUrl, {
      email: action.payload.email,
      password: action.payload.password,
    });
    const token = response.data.token; // Adjust the key according to your API response
    localStorage.setItem("authToken", token);

    // در صورت موفقیت
    yield put({ type: LOGIN_SUCCESS, payload: response.data });
    // هدایت به داشبورد
    action.payload.navigate("/");
  } catch (error) {
    // مدیریت خطا
    yield put({
      type: API_ERROR,
      payload: error.response?.data?.error || "خطایی رخ داده است",
    });
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history('/login');
  } catch (error) {
    yield put(apiError(error));
  }
}

function* socialLogin({ payload: { type, history } }) {
  try {
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend = getFirebaseBackend();
      const response = yield call(fireBaseBackend.socialLoginUser, type);
      if (response) {
        history("/dashboard");
      } else {
        history("/login");
      }
      localStorage.setItem("authUser", JSON.stringify(response));
      yield put(loginSuccess(response));
      if(response)
      history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
