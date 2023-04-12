import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import "./Login.css";
import { useDispatch } from "react-redux";
import { AuthActions } from "../../Store/reducers/auth-reducer";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const emailInputHandler = (e) => {
    setUserEmail(() => e.target.value);
  };

  const passwordInputHandler = (e) => {
    setUserPassword(() => e.target.value);
  };

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    const userObj = {
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await axios.post(
        `http://localhost:3001/login`,
        userObj,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", userEmail);
        dispatch(
          AuthActions.login({ email: userEmail, auth: response.data.token })
        );
        navigate("/chat");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("Something went wrong here!");
      }
    }
  };
  return (
    <form onSubmit={loginFormSubmitHandler}>
      <Card
        sx={{
          maxWidth: 350,
          minWidth: 350,
          maxHeight: 400,
          minHeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            "& .MuiTextField-root": { mx: 4, my: 1, width: "30ch" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          autoComplete="on"
        >
          <Typography
            variant="h5"
            sx={{
              mx: 4,
              my: 3,
              width: "259px",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Email"
            onChange={emailInputHandler}
            value={userEmail}
          />
          <TextField
            id="outlined-password-input"
            required
            label="Password"
            type="password"
            onChange={passwordInputHandler}
            value={userPassword}
          />
          <Typography variant="p" sx={{ mx: 4, mb: 1, width: "259px" }}>
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => ""}
            >
              Forgot Password
            </span>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{ mx: 4, my: 1, width: "259px" }}
          >
            Login
          </Button>
          <Typography variant="p" sx={{ mx: 4, my: 2, width: "259px" }}>
            Don't have an account?
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => props.toggle()}
            >
              Register
            </span>
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

export default Login;
