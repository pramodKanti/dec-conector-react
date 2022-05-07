import React, { useState, useRef, Fragment } from "react";
import useHttp from "../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { alertActions } from "../../store/alert-slice";

const CreateProfile = () => {
  const [showSocial, setShowSocial] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputStatusRef = useRef();
  const inputCompanyRef = useRef();
  const inputWebsiteRef = useRef();
  const inputLocationRef = useRef();
  const inputSkillsRef = useRef();
  const inputGithubUsernameRef = useRef();
  const inputBioRef = useRef();
  const { sendRequest } = useHttp();
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

  const sumbitHandler = (e) => {
    e.preventDefault();
    const entredStatus = inputStatusRef.current.value;
    const enteredCompany = inputCompanyRef.current.value;
    const enteredWebsite = inputWebsiteRef.current.value;
    const enteredSkills = inputSkillsRef.current.value;
    const enteredGithub = inputGithubUsernameRef.current.value;
    const enteredLocation = inputLocationRef.current.value;
    const entererdBio = inputBioRef.current.value;

    console.log(token);
    sendRequest({
      url: "/api/profile",
      method: "POST",
      headers: { "Content-type": "application/json", Authorization: token },
      body: {
        handle: enteredGithub,
        company: enteredCompany,
        website: enteredWebsite,
        location: enteredLocation,
        bio: entererdBio,
        status: entredStatus,
        githubusername: enteredGithub,
        skills: enteredSkills,
        youtube: "https://youtube.com/demo",
        twitter: "https://tw.com/demo",
        facebook: "https://fb.com/demo",
        linkedin: "https://linkedin.com/dem",
        instagram: "https://insta.com/demo",
      },
      applyData,
    });
  };

  const socialHandler = () => {
    setShowSocial((preState) => !preState);
  };

  return (
    <div>
      <section className="container">
        <h1 className="large text-primary">Create Your Profile</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Let's get some information to make
          your profile stand out
        </p>
        <small>* = required field</small>
        <form onSubmit={sumbitHandler} className="form">
          <div className="form-group">
            <select name="status" ref={inputStatusRef}>
              <option value="0">* Select Professional Status</option>
              <option value="Developer">Developer</option>
              <option value="Junior Developer">Junior Developer</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Manager">Manager</option>
              <option value="Student or Learning">Student or Learning</option>
              <option value="Instructor">Instructor or Teacher</option>
              <option value="Intern">Intern</option>
              <option value="Other">Other</option>
            </select>
            <small className="form-text">
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Company"
              name="company"
              ref={inputCompanyRef}
            />
            <small className="form-text">
              Could be your own company or one you work for
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Website"
              name="website"
              ref={inputWebsiteRef}
            />
            <small className="form-text">
              Could be your own or a company website
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              ref={inputLocationRef}
            />
            <small className="form-text">
              City & state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="* Skills"
              name="skills"
              ref={inputSkillsRef}
            />
            <small className="form-text">
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Github Username"
              name="githubusername"
              ref={inputGithubUsernameRef}
            />
            <small className="form-text">
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className="form-group">
            <textarea
              placeholder="A short bio of yourself"
              name="bio"
              ref={inputBioRef}
            ></textarea>
            <small className="form-text">Tell us a little about yourself</small>
          </div>

          <div className="my-2">
            <button
              onClick={socialHandler}
              type="button"
              className="btn btn-light"
            >
              {showSocial ? "hide" : "Add Social Network Links"}
            </button>
            <span>Optional</span>
          </div>
          {showSocial && (
            <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input
                  type="text"
                  placeholder="Instagram URL"
                  name="instagram"
                />
              </div>
            </Fragment>
          )}
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="./dashboard">
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

export default CreateProfile;
