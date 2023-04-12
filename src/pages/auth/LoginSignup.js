import React, { useState } from "react";
import Login from "../../components/loginSignup/Login";
import Signup from "../../components/loginSignup/Signup";
import "./LoginSignup.css";

const LoginSignup = () => {
  const [login, setLogin] = useState(true);

  const toggleLoginFormHandler = () => {
    setLogin((p) => !p);
  };
  return (
    <div className="my-5 d-flex justify-content-center">
      {login ? (
        <Login toggle={toggleLoginFormHandler} />
      ) : (
        <Signup toggle={toggleLoginFormHandler} />
      )}
    </div>
  );
};

export default LoginSignup;
