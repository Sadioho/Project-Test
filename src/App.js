import React, { Component, useEffect, useState } from "react";
import Header from "./components/Header";
import Login from "../src/components/Auth/Login/Login";
import Signup from "../src/components/Auth/Signup/Signup";
import Main from "../src/components/Layout/Main";
import Exam from "../src/components/features/Exam/Exam";
import { _isEmpty } from "./components/helpers/index";

import ListQuestion from "./components/features/ListQuestion/ListQuestion";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export const DataApp = React.createContext(null);

export default function App() {
  const [listUser, setlistUser] = useState([]);
  const [reload, setreload] = useState();
  const [loginSuccess, setloginSuccess] = useState(false);
  const [endResult, setendResult] = useState(false);
  const [listResult, setListResult] = useState([]);

  const [showResult, setShowResult] = useState(0);
  const [time, setTime] = useState(null);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  

  async function fetchUsers() {
    const requestUrl = "http://localhost:3000/users";
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    setlistUser(responseJSON);
  }

  useEffect(() => {
    async function fetchListQuestion() {
      const requestUrl = "http://localhost:3000/list_question";
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setData(responseJSON);
      setIsLoading(true);
    }
    fetchListQuestion();
    if (!_isEmpty(localStorage.getItem("my-info"))) {
      setloginSuccess(true);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  return (
    <Router>
      <Header loginSuccess={loginSuccess} />
      <Switch>
        <Route
          path="/login"
          render={() => {
            return _isEmpty(localStorage.getItem("my-info")) ? (
              <Login setloginSuccess={setloginSuccess} listUser={listUser} />
            ) : (
              <Redirect to="/" />
            );
          }}
        />
        <Route
          path="/signup"
          render={() => {
            return _isEmpty(localStorage.getItem("my-info")) ? (
              <Signup
                setloginSuccess={setloginSuccess}
                listUser={listUser}
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
            return !_isEmpty(localStorage.getItem("my-info")) ? (
              <Exam endResult={endResult}  data={data} showResult={showResult} time={time}/>
            ) : (
              <Redirect to="/" />
            );
          }}
        />

       
          <Route
            path="/question"
            render={() => {
              return !_isEmpty(localStorage.getItem("my-info")) ? (

                
                    <ListQuestion
                  setendResult={setendResult}
                  data={data}
                  isLoading={isLoading}
                  listResult={listResult}
                  setListResult={setListResult}
                  showResult={showResult}
                  setShowResult={setShowResult}
                  setTime={setTime}
                  listUser={listUser}
                />
           
              
              ) : (
                <Redirect to="/" />
              );
            }}
          />
     

        <Route
          path="/"
          render={() => {
            return !_isEmpty(localStorage.getItem("my-info")) ? (
              <Exam endResult={endResult}  showResult={showResult}   data={data} time={time}/>
            ) : (
              <Main />
            );
          }}
        ></Route>
      </Switch>
    </Router>
  );
}
