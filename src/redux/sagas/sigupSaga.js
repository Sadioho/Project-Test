import axios from "axios";
import _get from "lodash/get";
import { call, put, takeLatest } from "redux-saga/effects";
import { sigupAccountFailure, sigupAccountSuccess } from "../actions/login";
import { SIGUP_ACCOUNT } from "../constants/login";

function getAccounts() {
  return axios({
    method: "GET",
    url: "http://localhost:3000/users",
  });
}
function postAccounts(data) {
  return fetch("http://localhost:3000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

export function* sigupSaga(payload) {
  const user = payload.data;
  const responseV1 = yield call(getAccounts);
  const data = _get(responseV1, "data", []);
  let countAccount = data.filter((item) => {
    return item.email === user.email;
  });
  if (countAccount.length > 0) {
    yield put(sigupAccountFailure("Email Da Ton Tai"));
  } else {
    postAccounts(user);
    yield put(sigupAccountSuccess(user));
    localStorage.setItem("my-info", JSON.stringify(user));
  }
}

export default function* allSigupSaga() {
  yield takeLatest(SIGUP_ACCOUNT, sigupSaga);
}
