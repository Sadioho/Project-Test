import { createSelector } from "reselect";
import { initialState } from "../reducers/logins";

/**
 * Direct selector to the app state domain
 */

const selectLoginDomain = (state) => {
  return state.AccountLogin || initialState;
};


const makeSelectLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.user);
 
const makeSelectIsSuccessLogin= () =>
  createSelector(selectLoginDomain, (substate) => substate.flags);

export { makeSelectLogin, makeSelectIsSuccessLogin };
