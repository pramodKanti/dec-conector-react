import React, { useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import useHttp from "../hooks/use-http";

const Resister = () => {
  const inputNameRef = useRef();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputPassword2Ref = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();

  const applyData = (data) => {
    if (data._id) {
      history.push("./login");
    } else {
      if (data.email) {
        dispatch(
          alertActions.alert({
            id: 1,
            alertType: "danger",
            msg: data.email,
          })
        );
      }
    }
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    const enteredName = inputNameRef.current.value;
    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    const enteredPassword2 = inputPassword2Ref.current.value;
    if (enteredPassword === enteredPassword2) {
      sendRequest(
        {
          url: "/api/users/register",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: {
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
            password2: enteredPassword2,
          },
        },
        applyData
      );
    } else {
      dispatch(
        alertActions.alert({
          id: 1,
          alertType: "danger",
          msg: "Password does not match",
        })
      );
    }
  };
  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form
          onSubmit={sumbitHandler}
          className="form"
          action="create-profile.html"
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              required
              ref={inputNameRef}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              ref={inputEmailRef}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              ref={inputPasswordRef}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              ref={inputPassword2Ref}
            />
          </div>
          {/* <Link to="/create-profile"> */}
          <button type="submit" className="btn btn-primary" value="Register">
            Resister
          </button>
          {/* </Link> */}
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </section>
    </div>
  );
};

export default Resister;
