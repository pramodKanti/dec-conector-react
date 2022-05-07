import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";
import useHttp from "../hooks/use-http";

const Login = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();

  const applyData = (data) => {
    let message;
    if (data.email) {
      message = data.email;
    }
    if (data.password) {
      message = data.password;
    }
    if (!data.token) {
      dispatch(
        alertActions.alert({
          // id: uuidv4,
          alertType: "danger",
          msg: message,
        })
      );
    }
    dispatch(authActions.login(data.token));

    if (data.token) {
      history.push("./dashboard");
    }
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    sendRequest(
      {
        url: "/api/users/login",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          email: enteredEmail,
          password: enteredPassword,
        },
      },
      applyData
    );
  };

  return (
    <div>
      <section className="container">
        {/* <div className="alert alert-danger">Invalid credentials</div> */}
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form onSubmit={submitHandler} className="form" action="dashboard.html">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              ref={emailInputRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              ref={passwordInputRef}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/resister">Sign Up</Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
