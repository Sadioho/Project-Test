import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import LoginImg from "../../../image/login.png";
import ButtonV2 from "../../common/button/ButtonV2";
import { Spinner2 } from "../../spinner/Spinner2";

 

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px 10px",
    alignItems: "center",
  },
  icon_loading:{
    display:"flex",
    alignItems: "center",
  }
}));

export default function Signup(props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function submitForm(data) {
    let randomID=Math.random().toString(36).substring(7).toString(36)
    let data2 = { ...data, time: 0, point: 0 ,id:randomID};
    props.triggerSigup(data2)
  }

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
   props.triggerResetFlagsAuth()
  }, [])

  return (
    <div className="header__content">
      <Container maxWidth="lg" className={classes.content}>
        <div className="header__content_login">
          <Typography component="h1" variant="h6">
            Signup
          </Typography>
          <form onSubmit={handleSubmit(submitForm)}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstName"
              label=" First Name "
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              name="firstName"
              autoComplete="firstName"
              autoFocus
              {...register("firstName")}
            />
            <p className="login__errors">
              {errors.firstName && "Kh??ng ???????c ????? tr???ng"}
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastName"
              label=" Last Name "
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              name="lastName"
              autoComplete="lastName"
              {...register("lastName")}
            />
            <p className="login__errors">
              {errors.lastName && "Kh??ng ???????c ????? tr???ng "}
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email "
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              name="email"
              autoComplete="email"
              {...register("email")}
            />
            <p className="login__errors">
              {errors.email && "Nh???p ????ng email"}{" "}
            </p>
            {props.loginFailure && (
              <p className="login__errors"> Email ???? t???n t???i </p>
            )}
            <TextField
              variant="outlined"
              margin="normal"
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
              {errors.password &&
                "Kh??ng ???????c ????? tr???ng, M???t kh???u l???n h??n 4 k?? t???"}
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              {...register("confirmPassword")}
            />
            <p className="login__errors">
              {errors.confirmPassword && "M???t kh???u kh??ng tr??ng"}
            </p>

            <div className="button-input">
              <div> </div>
              <div className={classes.icon_loading}>
              {props.loginFailure && <Spinner2/>}
              <ButtonV2
                type="submit"
                width="130px"
                margin="unset"
                background="rgb(167, 86, 252)"
                backgroundcolor="#B8B5FF"
                borderradius="100px"
                float="right"
              >
                ????ng k??
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
