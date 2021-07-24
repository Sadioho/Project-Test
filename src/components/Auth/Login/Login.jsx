import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as yup from "yup";
import LoginImg from "../../../image/login.png";
import ButtonV2 from "../../common/button/ButtonV2";
import { Spinner2 } from "../../spinner/Spinner2";


const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon_loading:{
    display:"flex",
    alignItems: "center",
  }
}));

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
});

export default function Login(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const classes = useStyles();
  const [loginError, setLoginError] = useState(false);
  
  let history = useHistory();

  function setLoginErrorV2() {
    setLoginError(true);
  }

  const submitForm = (data) => {
    let checkLogin = props.isSuccessAccount &&  props.dataAccount.filter(
      (item) => item.email === data.email && item.password === data.password
    );
    if (checkLogin.length === 1) {
      console.log("chgecklog",checkLogin);
      localStorage.setItem("my-info", JSON.stringify(checkLogin[0]));
    let user={ 
      firstName:checkLogin[0].firstName,
      lastName:checkLogin[0].lastName
    }
      props.triggerLogin(user)
      
      props.setloginSuccess(true);
      history.push("/exam");
    } else {
      setLoginErrorV2(); 
    }

  };

  return (
    <div className="header__content">
      <Container maxWidth="lg" className={classes.content}>
        <div className="header__content_login">
          <Typography component="h1" variant="h6">
            Login to your account
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(submitForm)}
            // onSubmit={handleSubmit()}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label=" Email Address"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <p className="login__errors">
              {errors.email && "Nhập email cho đúng"}
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              {...register("password")}
            />
            <p className="login__errors">
              {errors.password && "Mật khẩu phải dài hơn 4 ký tự"}
            </p>
            <p className="login__errors">
              {loginError && "Tài khoản or mật khẩu không chính xác"}
            </p>
            <div className="button-input">
              <div>
                <Link to="/" variant="body2">
                  Quên mật khẩu ?
                </Link>
                <Link to="/signup" variant="body2">
                  Đăng ký
                </Link>
              </div>
           
             <div className={classes.icon_loading}>
             {loginError && <Spinner2/>}
              <ButtonV2
                type="submit"
                width="100px"
                margin="unset"
                background="rgb(167, 86, 252)"
                backgroundcolor="#B8B5FF"
                borderradius="100px"
              >
                Login
              </ButtonV2>
             </div>
            </div>
          </form>
        </div>
        <img src={LoginImg} alt="" width="514" height="539"/>
      </Container>
    </div>
  );
}
