import produce from "immer";
import {
  LOGIN_ACCOUNT_FAILED,
  LOGIN_ACCOUNT_SUCCESS,
  LOGOUT_ACCOUNT,
  SIGUP_ACCOUNT_SUCCESS,
  SIGUP_ACCOUNT_FAILED,
  RESET_FLAGS,
} from "../constants/login";

let user = JSON.parse(localStorage.getItem("my-info"));

export const initialState = user ? { flags: {loginSuccess: true, }, user,}
  : {
      flags: {
        loginSuccess: false,
        loginFailure: false,


        
        sigupFailure: false,
        
      },
      error: null,
    };

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case LOGIN_ACCOUNT_SUCCESS: {
        draft.user = action.payload; 
        draft.dataUser=action.dataUser;
        draft.flags.loginSuccess = true;
        draft.flags.loginFailure = false;
        break;
      }
      case LOGIN_ACCOUNT_FAILED: {
        draft.error = action.message;
        draft.flags.loginFailure = true;
        break;
      }
      case LOGOUT_ACCOUNT: {
        draft.flags.loginSuccess = false;
        break;
      }

      //sigup

      case SIGUP_ACCOUNT_SUCCESS: {
        draft.user = action.payload;
        draft.flags.loginSuccess = true;
        draft.flags.sigupFailure = false;
        break;
      }
      case SIGUP_ACCOUNT_FAILED: {
        draft.error = action.message;
        draft.flags.sigupFailure = true;
        break;
      }

      //reset
      case RESET_FLAGS: {
        draft.flags.loginFailure = false;
        draft.flags.loginSuccess= false;
        draft.flags.sigupFailure = false;

        break;
      }

    }
  });

export default accountReducer;
