import React from "react";
import formatDate from "../layout/formatDate";
// import { useParams } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const Education = (props) => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  // console.log(token);

  const applyData = (data) => {
    console.log(data);
    props.onDelete(data);

    dispatch(
      alertActions.alert({
        id: data.id,
        alertType: "success",
        msg: "SuccesFully Delete!",
      })
    );
  };

  const deletHandler = (e, id) => {
    e.preventDefault();

    console.log(token);
    sendRequest(
      {
        url: `/api/profile/education/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
      applyData
    );
  };

  const education = props.education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={(e) => deletHandler(e, edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{education}</tbody>
      </table>
    </div>
  );
};

export default Education;
