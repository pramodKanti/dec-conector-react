import React from "react";

import formatDate from "../layout/formatDate";

const ProfileEducation = (props) => {
  const { from, to, degree, fieldofstudy, description } = props.education;
  return (
    <div>
      <h3 className="text-dark">{"school"}</h3>
      <p>
        {formatDate(from)} - {to ? formatDate(to) : "Now"}
      </p>
      <p>
        <strong>Degree: </strong> {degree}
      </p>
      <p>
        <strong>Field Of Study: </strong> {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong> {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
