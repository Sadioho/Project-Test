import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CopyrightIcon from "@material-ui/icons/Copyright";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import Logo from "../image/logo.png";
import { _isEmpty } from "./helpers";
import "./style.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 10px",
    alignItems: "center",
  },
  root2: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 30px",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    maxWidth: "200px",
  },
  textBtn: {
    fontWeight: "bold",
    color: "black",
  },
  content: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px 10px",
    alignItems: "center",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("my-info"));
  const history=useHistory()
  function signout() {
    props.setloginSuccess(false);
    props.setListResult([]);
    props.setendResult(false)
    localStorage.removeItem("my-info");
    history.push("/login");
  }
  return (
    <div className="header">
      {props.loginSuccess===true ? (
        <div className="header-login">
          <AppBar position="static" className="bg_login">
            <Toolbar className={classes.root2}>
              <img className={classes.image} src={Logo} alt="" />
              <label forhtml="check-logout" className="user-name">
                <AccountCircleIcon className="icon-user" />
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <ArrowDropDownIcon />
                <input type="checkbox" id="check-logout" />
                <div className="logout" onClick={signout}>
                  Đăng xuất
                </div>
              </label>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <AppBar position="static" className="bg_header">
          <Container maxWidth="lg">
            <Toolbar className={classes.root}>
              <Link to="/">
                <img className={classes.image} src={Logo} alt="" />
              </Link>
              <div>
                <Link to="/">
                  <Button className={classes.textBtn} color="inherit">
                    Home
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className={classes.textBtn} color="inherit">
                    Login
                  </Button>
                </Link>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      <Container maxWidth="lg">
        <div className="footer">
          <p className="footer__item">
            <CopyrightIcon />
            <span> Copyright QLTSGeek 2020 </span>
          </p>
          <p className="footer__item"> Terms & Conditions </p>
          <p className="footer__item"> Privacy Policy </p>
        </div>
      </Container>
    </div>
  );
}
