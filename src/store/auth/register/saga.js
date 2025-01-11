import { takeEvery, fork, put, all, call } from "redux-saga/effects"

//Account Redux states
import { REGISTER_USER } from "./actionTypes"
import { registerUserSuccessful, registerUserFailed } from "./actions"
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_BACK_END_URL + "/auth/register";

//Include Both Helper File with needed methods
// Is user register successfull then direct plot user in redux.
function* registerUser({ payload: { user, token } }) {
  try {
    // Make API request with JWT token in headers
    const response = yield call(axios.post, API_URL, user, {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token
      },
    });

    // Dispatch success action
    yield put(registerUserSuccessful(response.data));
  } catch (error) {
    // Dispatch failure action
    console.error("Registration error: ", error.response || error.message);
    yield put(registerUserFailed(error.response?.data || "Registration failed"));
  }
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser)
}

function* accountSaga() {
  yield all([fork(watchUserRegister)])
}

export default accountSaga
