import { call, put, takeLatest } from "redux-saga/effects";
import { loginAcountFailure, loginAcountSuccess } from "../actions/login";
import { LOGIN_ACCOUNT } from "../constants/login";


export const loginUserService = (request) => {
  
  return request.user;
};

export function* loginSaga(payload) {
  try {
    const response = yield call(loginUserService, payload);
    yield put(loginAcountSuccess(response));
  } catch (error) {
    yield put(loginAcountFailure(error));
  }
}

export default function* allLoginSaga() {
  yield takeLatest(LOGIN_ACCOUNT, loginSaga);
}
