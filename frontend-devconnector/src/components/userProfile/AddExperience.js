import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../../store/alert-slice";

const AddExperience = () => {
  const [checkbox, setCheckbox] = useState(false);
  const inputJobRef = useRef();
  const inputCompanyRef = useRef();
  const inputLocationRef = useRef();
  const inputFromDateRef = useRef();
  const inputToDateRef = useRef();
  const inputJobDescSRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

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

  const { sendRequest } = useHttp();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredTitle = inputJobRef.current.value;
    const enteredCompany = inputCompanyRef.current.value;
    const entredLocation = inputLocationRef.current.value;
    const enteredFrom = inputFromDateRef.current.value;
    const enteredTo = inputToDateRef.current.value;
    const entreredJobDecs = inputJobDescSRef.current.value;

    sendRequest(
      {
        url: "/api/profile/experience",
        method: "POST",
        body: {
          title: enteredTitle,
          company: enteredCompany,
          location: entredLocation,
          from: enteredFrom,
          to: enteredTo,
          current: true,
          description: entreredJobDecs,
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
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form onSubmit={submitHandler} className="form">
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            ref={inputJobRef}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            ref={inputCompanyRef}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            ref={inputLocationRef}
            required
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from" ref={inputFromDateRef} required />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value=""
              required
              onClick={checkboxHandler}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            disabled={checkbox}
            type="date"
            name="to"
            ref={inputToDateRef}
            v
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            ref={inputJobDescSRef}
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
  );
};

export default AddExperience;
