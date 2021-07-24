import { all } from "redux-saga/effects";
import accountSaga from "./accountSaga";
import questionSaga from "./questionsSaga";
import loginSaga from "./loginSaga"

export default function* rootSaga() {
  yield all([questionSaga(),accountSaga(),loginSaga()]);
}
