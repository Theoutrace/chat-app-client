import React, { useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import "./Login.css";
import { AuthActions } from "../../Store/reducers/auth-reducer";

const Signup = (props) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const nameTexthandler = (e) => {
    if (/\d/g.test(e.target.value)) {
      alert("digits are not allowed!");
    } else {
      setUserName(() => e.target.value);
    }
  };
  const emailTexthandler = (e) => {
    setUserEmail(() => e.target.value);
  };

  const phoneTexthandler = (e) => {
    if (/^\d*$/.test(e.target.value)) {
      setUserPhone(() => e.target.value);
    }
  };

  const passwordTexthandler = (e) => {
    setUserPassword(() => e.target.value);
  };

  const onSignupHandler = async (event) => {
    event.preventDefault();
    const userObj = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: userPassword,
    };
    try {
      const response = await axios.post(
        `http://localhost:3001/signup`,
        userObj,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 550) {
        throw new Error(response.data.message);
      } else if (response.statusText === "OK") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", userEmail);
        dispatch(AuthActions.login({ email: userEmail }));
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <form onSubmit={onSignupHandler}>
      <Card
        sx={{
          maxWidth: 350,
          minWidth: 350,
          maxHeight: 500,
          minHeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            "& .MuiTextField-root": {
              mx: 4,
              my: 1,
              width: "30ch",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
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
            Signup
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Name"
            type="text"
            onChange={nameTexthandler}
            value={userName}
          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            type="email"
            onChange={emailTexthandler}
            value={userEmail}
          />
          <TextField
            required
            id="outlined-required"
            label="Phone Number"
            type="phone"
            onChange={phoneTexthandler}
            value={userPhone}
          />
          <TextField
            id="outlined-password-input"
            required
            label="Password"
            type="password"
            autoComplete="new-password"
            onChange={passwordTexthandler}
            value={userPassword}
          />
          <Button
            variant="contained"
            sx={{ mx: 4, my: 1, width: "259px" }}
            type="submit"
          >
            Register
          </Button>
          <Typography variant="p" sx={{ mx: 4, my: 2, width: "259px" }}>
            Already have an account?
            <span
              className="cursor-pointer-login-signup mx-1 text-primary"
              onClick={() => props.toggle()}
            >
              Login
            </span>
          </Typography>
        </Box>
      </Card>
    </form>
  );
};

export default Signup;
