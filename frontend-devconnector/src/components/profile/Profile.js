import React, { Fragment, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useHttp from "../hooks/use-http";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const params = useParams();
  const { sendRequest } = useHttp();

  console.log("profile.js");

  const applyData = (data) => {
    setProfile(data);
    console.log(data);
  };

  useEffect(() => {
    sendRequest(
      {
        url: `/api/profile/handle/${params.handle}`,
        method: "GET",
      },
      applyData
    );
  }, [sendRequest, params.handle]);

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/doveloper" className="btn btn-light">
            Back To Profiles
          </Link>
          {/* {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )} */}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

export default Profile;
