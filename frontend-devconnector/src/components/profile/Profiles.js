import React, { Fragment, useState, useEffect } from "react";
import ProfileItem from "./ProfileItem";
import useHttp from "../hooks/use-http";
import Spinner from "../layout/Spinner";

const Profiles = () => {
  const [profiles, setProfile] = useState([]);
  const { isLoading, sendRequest } = useHttp();

  const applyData = (data) => {
    console.log(data);

    setProfile(data);
  };

  useEffect(() => {
    sendRequest(
      {
        url: "/api/profile/all",
        method: "GET",
      },
      applyData
    );
  }, [sendRequest]);

  return (
    <section className="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profiles;
