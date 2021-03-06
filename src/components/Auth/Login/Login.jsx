import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
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
  icon_loading: {
    display: "flex",
    alignItems: "center",
  },
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
  let history = useHistory();

  const submitForm = (data) => {
    let user = {
      email: data.email,
      password: data.password,
    };
    props.triggerLogin(user);
    if (props.loginSuccess) {
      history.push("/exam");
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
   props.triggerResetFlagsAuth()
  }, [])

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
              {errors.email && "Nh???p email cho ????ng"}
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
              {errors.password && "M???t kh???u ph???i d??i h??n 4 k?? t???"}
            </p>
            <p className="login__errors">
              {props.loginFailure && "T??i kho???n or m???t kh???u kh??ng ch??nh x??c"}
            </p>
            <div className="button-input">
              <div>
                <Link to="/" variant="body2">
                  Qu??n m???t kh???u ?
                </Link>
                <Link to="/signup"  variant="body2">
                  ????ng k??
                </Link>
              </div>

              <div className={classes.icon_loading}>
                {props.loginFailure && <Spinner2 />}
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
        <img src={LoginImg} alt="" width="514" height="539" />
      </Container>
    </div>
  );
}
