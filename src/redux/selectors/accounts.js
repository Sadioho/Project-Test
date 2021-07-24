import { createSelector } from "reselect";
import { initialState } from "../reducers/accounts";

/**
 * Direct selector to the app state domain
 */

const selectAccountDomain = (state) => {
  return state.KeyAccount || initialState;
};

const makeSelectAccount = () =>
  createSelector(selectAccountDomain, (substate) => substate.accounts);

const makeSelectStatusFlagsAccount = () =>
  createSelector(selectAccountDomain, (substate) => substate.statusFlags);

export { makeSelectAccount, makeSelectStatusFlagsAccount };
