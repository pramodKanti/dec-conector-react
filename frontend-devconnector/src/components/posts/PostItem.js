import React, { Fragment } from "react";
import { Link } from "react-router-dom";
// import formatDate from "../layout/formatDate";
import { useSelector } from "react-redux";
import useHttp from "../hooks/use-http";

const PostItem = (props) => {
  const { user, avatar, name, text, _id, comments, likes } = props.post;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.currentUser);

  const likeData = (data) => {
    console.log(data);

    props.onLike(data, _id);

    // call a function and pass item id
  };

  const disLikeData = (data) => {
    console.log(data);

    props.onDisLike(data, _id);
  };

  const delData = (data) => {
    console.log(data);

    props.onDelete(_id);
  };

  const addLike = () => {
    sendRequest(
      {
        url: `api/posts/like/${_id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      likeData
    );
  };

  const unLike = () => {
    sendRequest(
      {
        url: `api/posts/unlike/${_id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      disLikeData
    );
  };

  const deletePost = () => {
    sendRequest(
      {
        url: `api/posts/${_id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      delData
    );
  };

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        {/* <p className="post-date">Posted on {formatDate(date)}</p> */}
        {props.showActions && isAuthenticated && (
          <Fragment>
            <button onClick={addLike} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-up" />{" "}
              <span>
                {likes && likes.length > 0 && <span>{likes.length}</span>}
              </span>
            </button>
            <button onClick={unLike} type="button" className="btn btn-light">
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion
              {comments && comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {user === currentUser.user._id && (
              <button
                onClick={deletePost}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default PostItem;
