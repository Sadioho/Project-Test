import React, { memo, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import Login from "../src/components/Auth/Login/Login";
import Signup from "../src/components/Auth/Signup/Signup";
import Exam from "../src/components/features/Exam/Exam";
import ListQuestion from "./components/features/ListQuestion/ListQuestion";
import Header from "./components/Layout/Header/Header";
import Main from "./components/Layout/Main/Main";
import {
  loginAcount,
  logoutAcount,
  resetFlags,
  sigupAccount,
} from "./redux/actions/login";
import { getListQuestion } from "./redux/actions/question";
import { getDataAccount } from "./redux/actions/account";
import {
  makeSelectIsSuccessLogin,
  makeSelectLogin,
} from "./redux/selectors/login";
import {
  makeSelectQuestion,
  makeSelectStatusFlagsQ,
} from "./redux/selectors/questions";

import {
  makeSelectAccount,
  makeSelectStatusFlagsAccount,
} from "./redux/selectors/accounts";

export const DataApp = React.createContext(null);

function App(props) {
  const [endResult, setendResult] = useState(false);
  const [listResult, setListResult] = useState([]);
  const [showResult, setShowResult] = useState(0);
  const [time, setTime] = useState(null);

  useEffect(() => {
    props.triggerGetListQuestion();
  }, []);

  return (
    <Router>
      <Header
        setendResult={setendResult}
        setListResult={setListResult}
        loginSuccess={props.statusFlagsLogin.loginSuccess}
        accountLogin={props.accountLogin}
        triggerLogout={props.triggerLogout}
      />
      <Switch>
        <Route
          path="/login"
          render={() => {
            return !props.statusFlagsLogin.loginSuccess ? (
              <Login
                triggerLogin={props.triggerLogin}
                loginSuccess={props.statusFlagsLogin.loginSuccess}
                loginFailure={props.statusFlagsLogin.loginFailure}
                triggerResetFlagsAuth={props.triggerResetFlagsAuth}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/signup"
          render={() => {
            return !props.statusFlagsLogin.loginSuccess ? (
              <Signup
                triggerSigup={props.triggerSigup}
                loginSuccess={props.statusFlagsLogin.loginSuccess}
                loginFailure={props.statusFlagsLogin.sigupFailure}
        
                triggerGetListAccount={props.triggerGetListAccount}
                triggerResetFlagsAuth={props.triggerResetFlagsAuth}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/exam"
          render={() => {
            return props.statusFlagsLogin.loginSuccess ? (
              <Exam
                endResult={endResult}
                data={props.listQuestion}
                showResult={showResult}
                time={time}
                dataAccount={props.dataAccount}
                isSuccessAccount={props.isSuccessAccount.isSuccess}
                loginSuccess={props.statusFlagsLogin.loginSuccess}
                listResult={listResult}
                setListResult={setListResult}
                setendResult={setendResult}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />

        <Route
          path="/question"
          render={() => {
            return props.statusFlagsLogin.loginSuccess ? (
              <ListQuestion
                setendResult={setendResult}
                data={props.listQuestion}
                statusFlags={props.statusFlags.isLoading}
                listResult={listResult}
                setListResult={setListResult}
                showResult={showResult}
                setShowResult={setShowResult}
                setTime={setTime}
                dataAccount={props.dataAccount}
                isSuccessAccount={props.isSuccessAccount.isSuccess} 
                loginSuccess={props.statusFlagsLogin.loginSuccess}
                triggerGetListAccount={props.triggerGetListAccount}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />

        <Route
          path="/"
          render={() => {
            return props.statusFlagsLogin.loginSuccess ? (
              <Exam
                endResult={endResult}
                showResult={showResult}
                data={props.listQuestion}
                time={time}
                dataAccount={props.dataAccount}
                loginSuccess={props.statusFlagsLogin.loginSuccess}
                isSuccessAccount={props.isSuccessAccount.isSuccess}
                setendResult={setendResult}
                listResult={listResult}
                setListResult={setListResult}
              
              />
            ) : (
              <Main />
            );
          }}
        ></Route>
      </Switch>
    </Router>
  );
}

const mapStateToProps = createStructuredSelector({
  statusFlags: makeSelectStatusFlagsQ(),
  listQuestion: makeSelectQuestion(),
  dataAccount: makeSelectAccount(),
  isSuccessAccount: makeSelectStatusFlagsAccount(),
  statusFlagsLogin: makeSelectIsSuccessLogin(),
  accountLogin: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListQuestion: () => dispatch(getListQuestion()),
    triggerGetListAccount: () => dispatch(getDataAccount()),
    triggerLogin: (user) => dispatch(loginAcount(user)),

    triggerLogout: () => dispatch(logoutAcount()),
    triggerSigup: (user) => dispatch(sigupAccount(user)),
    //resetpass
    triggerResetFlagsAuth: () => dispatch(resetFlags()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
