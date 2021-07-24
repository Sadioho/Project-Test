import produce from "immer";
import {
  LOGIN_ACCOUNT_FAILED, LOGIN_ACCOUNT_SUCCESS, LOGOUT_ACCOUNT
} from "../constants/login";

let user=JSON.parse(localStorage.getItem('my-info'));

export const initialState = user ? {isSuccess:true,user,error:"sai roi"} : {}
  // isSuccess:false


/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case LOGIN_ACCOUNT_SUCCESS: {
        draft.user = action.payload; 
        draft.isSuccess=true
        break;
      }
      case LOGIN_ACCOUNT_FAILED: {
        draft.error = action.message;
        draft.isSuccess=false
        break;
      }
      case LOGOUT_ACCOUNT: {
        draft.isSuccess=false
        break;
      }
    }
  });

export default accountReducer;
