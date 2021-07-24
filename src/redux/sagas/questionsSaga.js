import axios from "axios";
import _get from "lodash/get";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  getListQuestionFailure, getListQuestionSuccess
} from "../actions/question";
// import { fetchUsers } from "../../components/helpers";
import { GET_LIST_QUESTION } from "../constants/question";


export function fetchUsers(){
  return axios({
    method: "GET",
    url: "http://localhost:3000/list_question"
  });
}
// worker saga: makes the api call when watcher saga sees the action
function* callApiQuestion() {
  try {
    const response = yield call(
      fetchUsers
    );
    const data = _get(response, "data", []);
    yield put(getListQuestionSuccess(data));
  } catch (error) {
    yield put(getListQuestionFailure(error));
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* questionSaga() {
  yield takeLatest(GET_LIST_QUESTION, callApiQuestion);
}
