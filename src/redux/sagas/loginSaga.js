import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { loginAcountFailure, loginAcountSuccess } from "../actions/login";
import { LOGIN_ACCOUNT } from "../constants/login";
import _get from "lodash/get";


function fetchAccounts() {
  return axios({
    method: "GET",
    url: "http://localhost:3000/users",
  });
}



export function* loginSaga(payload) {
    const user = payload.user;
    const responseV1 = yield call(fetchAccounts);
    const data = _get(responseV1, "data", []);
    let check = data.filter(
      (item) => item.email === user.email && item.password === user.password
    );
    console.log("ehck",check); 
    if (check.length > 0) {
      payload = check[0];
      localStorage.setItem("my-info", JSON.stringify(check[0]));
      
      yield put(loginAcountSuccess(payload));
    }else{
      yield put(loginAcountFailure("Khong co tai khoan nao ton tai"));
    }
}

export default function* allLoginSaga() {
  yield takeLatest(LOGIN_ACCOUNT, loginSaga);
}
