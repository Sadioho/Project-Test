import { createSelector } from "reselect";
import { initialState } from "../reducers/questions";

/**
 * Direct selector to the app state domain 
 */

const selectUserDomain = (state) => {
  return state.KeyQuestion || initialState;
};

const makeSelectQuestion = () =>
  createSelector(selectUserDomain, (substate) => substate.questions);

const makeSelectStatusFlagsQ = () =>
  createSelector(selectUserDomain, (substate) => substate.statusFlags);


export { makeSelectQuestion, makeSelectStatusFlagsQ };
