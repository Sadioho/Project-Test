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
import { getDataAccount } from "./redux/actions/account";
import { loginAcount, logoutAcount } from "./redux/actions/login";
import { getListQuestion } from "./redux/actions/question";
import {
  makeSelectAccount,
  makeSelectStatusFlagsAccount,
} from "./redux/selectors/accounts";
import {
  makeSelectIsSuccessLogin,
  makeSelectLogin,
} from "./redux/selectors/login";
import {
  makeSelectQuestion,
  makeSelectStatusFlagsQ,
} from "./redux/selectors/questions";

export const DataApp = React.createContext(null);

function App(props) {
  const [reload, setreload] = useState();
  const [loginSuccess, setloginSuccess] = useState(false);
  const [endResult, setendResult] = useState(false);
  const [listResult, setListResult] = useState([]);
  const [showResult, setShowResult] = useState(0);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (props.isSuccessLogin) {
      setloginSuccess(true);
    }
    props.triggerGetListQuestion();
  }, []);

  useEffect(() => {
    props.triggerGetListAccount();
  }, [reload]);

  console.log("flag", props.statusFlags);
  return (
    <Router>
      <Header
        loginSuccess={loginSuccess}
        setendResult={setendResult}
        setloginSuccess={setloginSuccess}
        setListResult={setListResult}
        isSuccessLogin={props.isSuccessLogin}
        accountLogin={props.accountLogin}
        triggerLogout={props.triggerLogout}
      />
      <Switch>
        <Route
          path="/login"
          render={() => {
            return !props.isSuccessLogin ? (
              <Login
                setloginSuccess={setloginSuccess}
                dataAccount={props.dataAccount}
                isSuccessAccount={props.isSuccessAccount.isSuccess}
                triggerLogin={props.triggerLogin}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/signup"
          render={() => {
            return !props.isSuccessLogin ? (
              <Signup
                setloginSuccess={setloginSuccess}
                dataAccount={props.dataAccount}
                isSuccessAccount={props.isSuccessAccount.isSuccess}
                setreload={setreload}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/exam"
          render={() => {
            return props.isSuccessLogin ? (
              <Exam
                endResult={endResult}
                data={props.listQuestion}
                showResult={showResult}
                time={time}
                dataAccount={props.dataAccount}
                isSuccessAccount={props.isSuccessAccount.isSuccess}
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
            return props.isSuccessLogin ? (
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
                setreload={setreload}
              />
            ) : (
              <Redirect to="/" />
            );
          }}
        />

        <Route
          path="/"
          render={() => {
            return props.isSuccessLogin ? (
              <Exam
                endResult={endResult}
                showResult={showResult}
                data={props.listQuestion}
                time={time}
                dataAccount={props.dataAccount}
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
  //login
  isSuccessLogin: makeSelectIsSuccessLogin(),
  accountLogin: makeSelectLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerGetListQuestion: () => dispatch(getListQuestion()),
    triggerGetListAccount: () => dispatch(getDataAccount()),
    triggerLogin: (user) => dispatch(loginAcount(user)),
    triggerLogout: () => dispatch(logoutAcount()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(App);
