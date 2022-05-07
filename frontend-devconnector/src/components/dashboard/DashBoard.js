import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DashboardActions from "./DashboardAction";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import { authActions } from "../../store/auth-slice";
import { alertActions } from "../../store/alert-slice";

const DashBoard = () => {
  const [profile, setProfile] = useState([]);

  const { sendRequest, isLoading } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log(isLoading);
  console.log("dashboard");

  const applyData = useCallback(
    (data) => {
      dispatch(authActions.profile(data));
      setProfile(data);
    },
    [dispatch]
  );

  const applyData1 = (data) => {
    if (data.success) {
      dispatch(
        alertActions.alert({
          alertType: "success",
          msg: "succesfuly Delete!",
        })
      );
      history.replace("./");
      dispatch(authActions.logout());
    }
  };

  const updateProfile = (profile) => {
    setProfile(profile);
  };

  const profileDeleteHandler = (e) => {
    e.preventDefault();
    sendRequest(
      {
        url: "/api/profile",
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      applyData1
    );
  };

  useEffect(() => {
    sendRequest(
      {
        url: "/api/profile/",
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      applyData
    );
  }, [sendRequest, applyData, token]);

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Dashboard</h1>

        <p className="lead">
          <i className="fas fa-user"></i>{" "}
          {`Welcome ${profile.user && profile.user.name}`}
        </p>
        <DashboardActions profile={profile} />
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {profile.experience ? (
              <Experience
                experience={profile.experience}
                onUpdateProfile={updateProfile}
              />
            ) : (
              "no Experience"
            )}
            {profile.education ? (
              <Education
                education={profile.education}
                onDelete={updateProfile}
              />
            ) : (
              "no education"
            )}
            <div className="my-2">
              <button onClick={profileDeleteHandler} className="btn btn-danger">
                <i className="fas fa-user-minus"></i>
                Delete My Account
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default DashBoard;
