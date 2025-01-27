import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USERS, GET_USER_PROFILE, ADD_NEW_USER, DELETE_USER, UPDATE_USER ,GET_OPTIONS} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail, getOptionsSuccess, getOptionsFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getUsers, getUserProfile, addNewUser, updateUser, deleteUser } from "../../helpers/fakebackend_helper"
import { toast } from "react-toastify"
import axios from "axios";

function* fetchOptions() {
  try {
    const response = yield call(axios.get, "https://hrtapsell.ir/api/employee/preData", {
    });

    yield put(getOptionsSuccess(response.data));
  } catch (error) {
    yield put(getOptionsFail(error));
  }
}
function* onAddNewUser({ payload: user }) {
  let authToken = localStorage.getItem("authToken");
  try {
    const response = yield call(
        axios.post,
        "https://hrtapsell.ir/api/employee/create",
        user,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          },
        }
    );
    yield put(addUserSuccess(response.data));
  } catch (error) {
    yield put(addUserFail(error));
  }
}
function* fetchUsers() {
  try {
    // قبلاً از یه مسیر فیک یا متد fakebackend_helper صدا می‌زدید
    // حالا می‌خواهید مستقیم از API بگیرید:
    const response = yield call(axios.get, "https://hrtapsell.ir/api/employee/getAll");

    // در صورت موفقیت، داده را در ریداکس ذخیره می‌کنیم
    yield put(getUsersSuccess(response.data));
  } catch (error) {
    yield put(getUsersFail(error));
  }
}


function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response))
    toast.success("تماس با موفقیت به روز شد", { autoClose: 2000 });
  } catch (error) {
    yield put(updateUserFail(error))
    toast.error("به روز رسانی تماس ناموفق بود", { autoClose: 2000 });
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(response))
    toast.success("تماس با موفقیت حذف شد", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteUserFail(error))
    toast.error("تماس حذف نشد", { autoClose: 2000 });
  }
}


function* contactsSaga() {
  yield takeEvery(GET_OPTIONS, fetchOptions);
  yield takeEvery(GET_USERS, fetchUsers);
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile);
  yield takeEvery(ADD_NEW_USER, onAddNewUser);
  yield takeEvery(UPDATE_USER, onUpdateUser);
  yield takeEvery(DELETE_USER, onDeleteUser);
}

export default contactsSaga;
