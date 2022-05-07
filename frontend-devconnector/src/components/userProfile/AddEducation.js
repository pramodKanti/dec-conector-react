import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";
import useHttp from "../hooks/use-http";
import { Link, useHistory } from "react-router-dom";

const AddEducation = () => {
  const [checkbox, setCheckbox] = useState(false);
  const inputSchoolRef = useRef();
  const inputDegreeRef = useRef();
  const inputFeildOfStudyRef = useRef();
  const inputFromRef = useRef();
  const inputToRef = useRef();
  const inputProgDescRef = useRef();
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const applyData = (data) => {
    if (data._id) {
      dispatch(
        alertActions.alert({
          alertType: "success",
          msg: "succesfuly Added!",
        })
      );
    }
    if (data._id) {
      history.push("/dashboard");
    }
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredSchool = inputSchoolRef.current.value;
    const entredDegree = inputDegreeRef.current.value;
    const entredStudyField = inputFeildOfStudyRef.current.value;
    const entredFrom = inputFromRef.current.value;
    const entredTo = inputToRef.current.value;
    const entredProgDesc = inputProgDescRef.current.value;

    sendRequest(
      {
        url: "/api/profile/education",
        method: "POST",
        body: {
          school: enteredSchool,
          degree: entredDegree,
          fieldofstudy: entredStudyField,
          from: entredFrom,
          to: entredTo,
          current: false,
          description: entredProgDesc,
        },
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      applyData
    );
  };

  const checkboxHandler = () => {
    setCheckbox((preState) => !preState);
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Add Your Education</h1>
        <p className="lead">
          <i className="fas fa-graduation-cap"></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form onSubmit={submitHandler} className="form">
          <div className="form-group">
            <input
              type="text"
              placeholder="* School or Bootcamp"
              name="school"
              ref={inputSchoolRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Degree or Certificate"
              name="degree"
              ref={inputDegreeRef}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Field Of Study"
              name="fieldofstudy"
              ref={inputFeildOfStudyRef}
              required
            />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" ref={inputFromRef} required />
          </div>
          <div className="form-group">
            <p>
              <input
                type="checkbox"
                name="current"
                value=""
                onClick={checkboxHandler}
              />{" "}
              Current School or Bootcamp
            </p>
          </div>
          <div className="form-group">
            <h4>To Date</h4>
            <input
              disabled={checkbox}
              type="date"
              name="to"
              ref={inputToRef}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Program Description"
              ref={inputProgDescRef}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link
            to="/dashboard"
            className="btn btn-light my-1"
            href="dashboard.html"
          >
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default AddEducation;
