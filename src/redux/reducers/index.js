import { combineReducers } from "redux";
import accounts from "./accounts";
import questions from "./questions";
import loginReducer from "./logins";


const rootReducer = combineReducers({
  KeyQuestion: questions,
  KeyAccount: accounts,
  AccountLogin: loginReducer,
});

export default rootReducer;
