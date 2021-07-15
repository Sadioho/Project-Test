import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import LoginImg from "../../../image/login.png";
import ButtonV2 from "../../common/button/ButtonV2";


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
}));

export default function Signup(props) {
  const classes = useStyles();
  const [errorsCheckAccount, seterrorsCheckAccount] = useState(true);
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function submitForm(data) {
    let data2 = { ...data, time: null, point: null };
    let countAccount = props.listUser.filter((item) => {
      return item.email === data.email;
    });
    if (countAccount.length > 0) {
      seterrorsCheckAccount(false);
      console.log("trùng");
    } else {
      let ramdomID = Math.random().toString(36).substring(7);

      let apiUser = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(data2),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      apiUser = await apiUser.json();
      console.log(apiUser);
      localStorage.setItem("my-info", JSON.stringify(apiUser));
      seterrorsCheckAccount(true);
      props.setloginSuccess(true);
      props.setreload(ramdomID);
      history.push("/");
    }
  }

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
              {errors.firstName && "Không được để trống"}
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
              {errors.lastName && "Không được để trống "}
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
              {errors.email && "Nhập đúng email"}{" "}
            </p>
            {!errorsCheckAccount && (
              <p className="login__errors"> Email đã tồn tại </p>
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
                "Không được để trống, Mật khẩu lớn hơn 4 ký tự"}
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
              {errors.confirmPassword && "Mật khẩu không trùng"}
            </p>

            <div className="button-input">
              <div></div>
              <ButtonV2
                type="submit"
                width="130px"
                margin="unset"
                background="rgb(167, 86, 252)"
                backgroundColor="#B8B5FF"
                borderRadius="100px"
                float="right"
              >
                Đăng ký
              </ButtonV2>
            </div>
          </form>
        </div>
        <img src={LoginImg} alt="" />
      </Container>
    </div>
  );
}
