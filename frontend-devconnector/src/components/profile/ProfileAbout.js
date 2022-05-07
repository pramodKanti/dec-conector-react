import React, { Fragment } from "react";

const ProfileAbout = (props) => {
  const { user, bio, skills } = props.profile;
  // console.log(props);
  // const user = { name: "user" };
  // const skills = ["javascript"];
  // const bio = "bio";

  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">
            {user.name.trim().split(" ")[0]}s Bio
          </h2>
          <p>{bio}</p>
          <div className="line" />
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileAbout;
