import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Resister from "./components/auth/Resister";
import Login from "./components/auth/Login";
import CreateProfile from "./components/userProfile/CreateProfile";
import DashBoard from "./components/dashboard/DashBoard";
import Profiles from "./components/profile/Profiles";
import AddEducation from "./components/userProfile/AddEducation";
import AddExperience from "./components/userProfile/AddExperience";
import Alert from "./components/layout/Alert";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";
// import Modal from "./components/modal/Modal";

const App = () => {
  const alerts = useSelector((state) => state.alert.alertData);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const showalert = alerts !== null;
  return (
    <Fragment>
      <Navbar />

      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <section className="container">
            {showalert && <Alert alerts={alerts} />}
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/resister">
              <Resister />
            </Route>{" "}
            <Route path="/doveloper">
              <Profiles />
            </Route>
            <PrivateRoute path="/create-profile" component={CreateProfile} />
            <PrivateRoute path="/dashboard" component={DashBoard} />
            <PrivateRoute path="/posts" exact component={Posts} />
            <PrivateRoute path="/posts/:id" component={Post} />
            <PrivateRoute path="/profile/:handle" component={Profile} />
            <PrivateRoute path="/add-experience" component={AddExperience} />
            <PrivateRoute path="/add-education" component={AddEducation} />
          </section>
        </Switch>
      </main>
    </Fragment>
  );
};

export default App;
