import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated) return <Component {...props} />;
        if (!isAuthenticated) return <Redirect to="./login" />;
      }}
    />
  );
};

export default PrivateRoute;
