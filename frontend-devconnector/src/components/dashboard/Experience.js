import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../hooks/use-http";
import { alertActions } from "../../store/alert-slice";
import formatDate from "../layout/formatDate";

const Experience = (props) => {
  const token = useSelector((state) => state.auth.token);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const applyData = (data) => {
    props.onUpdateProfile(data);

    dispatch(
      alertActions.alert({
        id: data.id,
        alertType: "success",
        msg: "SuccesFully Delete!",
      })
    );
  };

  const deleteExperience = (e, id) => {
    e.preventDefault();

    sendRequest(
      {
        url: `/api/profile/experience/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
      applyData
    );
  };

  const experiences = props.experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Now"}
      </td>
      <td>
        <button
          onClick={(e) => deleteExperience(e, exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

export default Experience;
