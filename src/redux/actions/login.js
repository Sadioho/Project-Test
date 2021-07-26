import {
  LOGIN_ACCOUNT,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_FAILED,
  LOGOUT_ACCOUNT,
  SIGUP_ACCOUNT,
  SIGUP_ACCOUNT_FAILED,
  SIGUP_ACCOUNT_SUCCESS,
  RESET_FLAGS
} from "../constants/login";

export function loginAcount(user) {
  return {
    type: LOGIN_ACCOUNT,
    user:user
  };
}

export function loginAcountSuccess(payload) {
  return {
    type: LOGIN_ACCOUNT_SUCCESS,
    payload: payload,
  };
}

export function loginAcountFailure(message) {
  return {
    type: LOGIN_ACCOUNT_FAILED,
    message: message,
  };
}

export function logoutAcount() {
  return {
    type: LOGOUT_ACCOUNT
  };
}

//sigup

export function sigupAccount(data) {
  return {
    type: SIGUP_ACCOUNT,
    data
  };
}

export function sigupAccountSuccess(payload) {
  return {
    type: SIGUP_ACCOUNT_SUCCESS,
    payload: payload,
  };
}

export function sigupAccountFailure(message) {
  return {
    type: SIGUP_ACCOUNT_FAILED, 
    message: message,
  };
}


//reset flag 

export function resetFlags(){
  return{
    type: RESET_FLAGS
  }
}