import React from "react";

const ProfileTop = (props) => {
  const { user, company, status, website, social, location } = props.profile;
  console.log(props.profile.user);
  // const user = {
  //   avatar:
  //     "//www.gravatar.com/avatar/aaf714f364467a126af2e190897f45bd?s=200&r=pg&d=mm",
  //   name: "user",
  // };
  // const status = "pending";
  // const company = "Google";
  // const location = "haryana";
  // const website = "http://";
  // const social = "http://";

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company ? <span> at {company}</span> : null}
      </p>
      <p>{location ? <span>{location}</span> : null}</p>
      <div className="icons my-1">
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x" />
          </a>
        ) : null}
        {social
          ? Object.entries(social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

export default ProfileTop;
