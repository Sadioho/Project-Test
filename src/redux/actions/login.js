import {
  LOGIN_ACCOUNT,
  LOGIN_ACCOUNT_SUCCESS,
  LOGIN_ACCOUNT_FAILED,
  LOGOUT_ACCOUNT
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
