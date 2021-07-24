import { call, put, takeLatest } from "redux-saga/effects";
import _get from "lodash/get";
import axios from "axios";
import {
  getDataAccountFailure,
  getDataAccountSuccess,
} from "../actions/account";
import { GET_DATA_ACCOUNT } from "../constants/account";

function fetchAccounts() {
  return axios({
    method: "GET", 
    url: "http://localhost:3000/users",
  });
}

function* callApiAccounts() {
  try {
    const response = yield call(fetchAccounts);
    const data = _get(response, "data", []);
    yield put(getDataAccountSuccess(data));
  } catch (error) {
    yield put(getDataAccountFailure(error));
  }
}

export default function* accountSaga() {
  yield takeLatest(GET_DATA_ACCOUNT, callApiAccounts);
}
