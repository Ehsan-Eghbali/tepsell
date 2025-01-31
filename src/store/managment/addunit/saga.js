import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_UNITS_REQUEST,
  FETCH_UNITS_SUCCESS,
  FETCH_UNITS_FAILURE,
  ADD_UNIT_REQUEST,
  ADD_UNIT_SUCCESS,
  ADD_UNIT_FAILURE,
  REMOVE_UNIT_REQUEST,
  REMOVE_UNIT_SUCCESS,
  REMOVE_UNIT_FAILURE
} from './actionTypes';

const API_BASE_URL = 'https://hrtapsell.ir/api/unit';

function* fetchUnitsSaga() {
  try {
    const response = yield call(axios.get, `${API_BASE_URL}/getAll`);
    console.log(response)
    yield put(FETCH_UNITS_SUCCESS(response.data));
  } catch (error) {
    yield put({ type: FETCH_UNITS_FAILURE, payload: error.message });
  }
}

function* addUnitSaga(action) {
  try {
    const response = yield call(axios.post, `${API_BASE_URL}/insert`, action.payload);
    yield put({ type: ADD_UNIT_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ADD_UNIT_FAILURE, payload: error.message });
  }
}

function* removeUnitSaga(action) {
  try {
    yield call(axios.post, `${API_BASE_URL}/remove`, { id: action.payload });
    yield put({ type: REMOVE_UNIT_SUCCESS, payload: action.payload });
  } catch (error) {
    yield put({ type: REMOVE_UNIT_FAILURE, payload: error.message });
  }
}

export default function* unitSaga() {
  yield takeLatest(FETCH_UNITS_REQUEST, fetchUnitsSaga);
  yield takeLatest(ADD_UNIT_REQUEST, addUnitSaga);
  yield takeLatest(REMOVE_UNIT_REQUEST, removeUnitSaga);
}
