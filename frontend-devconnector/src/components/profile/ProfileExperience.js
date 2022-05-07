import React from "react";
import formatDate from "../layout/formatDate";

const ProfileExperience = (props) => {
  const { from, to, title, location, description } = props.experience;
  return (
    <div>
      <h3 className="text-dark">{"company"}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Position: </strong> {title}
      </p>
      <p>
        <strong>Location: </strong> {location}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
