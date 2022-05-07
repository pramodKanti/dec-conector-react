import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("./");
  };
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/doveloper">Developers</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="posts">Posts</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/resister">Register</Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link to="/dashboard">
              <i className="fas fa-user" />{" "}
              <span className="hide-sm">Dashboard</span>
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <a onClick={logoutHandler} href="#!">
              <i className="fas fa-sign-out-alt" />{" "}
              <span className="hide-sm">Logout</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
