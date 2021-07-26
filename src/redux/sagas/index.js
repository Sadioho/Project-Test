import { all } from "redux-saga/effects";
import accountSaga from "./accountSaga";
import questionSaga from "./questionsSaga";
import loginSaga from "./loginSaga"
import sigupSaga from "./sigupSaga"

export default function* rootSaga() {
  yield all([questionSaga(),accountSaga(),loginSaga(),sigupSaga()]);
}
 