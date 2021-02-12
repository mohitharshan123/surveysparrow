import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import "./LoginRegister.css";
import { url } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as axios from "axios";

const LoginRegister = () => {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/home");
    }
    return () => {};
  }, [history]);

  const loginProps = useSpring({
    left: registrationFormStatus ? -820 : 0,
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 820,
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 0px transparent"
      : "solid 2px #1059FF",
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 2px #1059FF"
      : "solid 0px transparent",
  });

  function registerTabClicked() {
    setRegistartionFormStatus(true);
  }

  function loginTabClicked() {
    setRegistartionFormStatus(false);
  }

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginRes = await axios.post(`${url}/users/login/`, {
        username,
        password,
      });
      if (loginRes.data?.success === 1) {
        clearInputs();
        localStorage.setItem("user_id", loginRes.data.user_id);
        localStorage.setItem("token", loginRes.data.token);
        history.push("/home");
      } else {
        toast(loginRes.data?.data);
      }
    } catch (error) {
      toast("An error occurred, please try again");
    }
  };

  const clearInputs = () => {
    setPassword("");
    setUsername("");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const registerRes = await axios.post(`${url}/users/`, {
        username,
        password,
      });
      if (registerRes.data?.success === 1) {
        toast("Successfully Registered User");
        loginTabClicked();
      }
      clearInputs();
    } catch (error) {
      toast("An error occurred, Please try again");
      clearInputs();
    }
  };

  return (
    <div className="login-register-wrapper">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
      <div className="nav-buttons">
        <animated.button
          onClick={loginTabClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login{" "}
        </animated.button>{" "}
        <animated.button
          onClick={registerTabClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register{" "}
        </animated.button>{" "}
      </div>{" "}
      <div className="form-group">
        <animated.form action="" id="loginform" style={loginProps}>
          <label htmlFor="username"> Username </label>{" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
          />
          <label htmlFor="password"> Password </label>{" "}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            id="password"
          />
          <input
            onClick={login}
            type="submit"
            value="submit"
            className="submit"
            disabled={!username || !password}
          />
        </animated.form>{" "}
        <animated.form action="" id="registerform" style={registerProps}>
          <label htmlFor="username"> Username </label>{" "}
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
          />
          <label htmlFor="password"> Password </label>{" "}
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            id="password"
          />
          <input
            onClick={register}
            type="submit"
            value="submit"
            className="submit"
            disabled={!username || !password}
          />
        </animated.form>{" "}
      </div>{" "}
    </div>
  );
};

export default LoginRegister;
