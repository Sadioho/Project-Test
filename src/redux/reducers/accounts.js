import produce from "immer";
import {
  GET_DATA_ACCOUNT,
  GET_DATA_ACCOUNT_SUCCESS, 
  GET_DATA_ACCOUNT_FAILED 
} from "../constants/account";

export const initialState = {
  accounts: [],
  statusFlags: {
    isLoading: false,
    isSuccess:false
  },
  log: {
    error: "",
  },
};

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const { type } = action;
    switch (type) {
      case GET_DATA_ACCOUNT: {
        draft.statusFlags.isLoading = true;
        draft.statusFlags.isSuccess=false

        break;
      }
      case GET_DATA_ACCOUNT_SUCCESS: {
        draft.statusFlags.isLoading = false;
        draft.accounts = action.payload;
        draft.statusFlags.isSuccess=true
        break;
      }
      case GET_DATA_ACCOUNT_FAILED: {
        draft.statusFlags.isLoading = false;
        draft.log.error = action.message;
        draft.statusFlags.isSuccess=false

        break;
      }


      
    }
  });

export default accountReducer;
