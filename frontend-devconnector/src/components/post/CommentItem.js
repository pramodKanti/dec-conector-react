import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import useHttp from "../hooks/use-http";
import formatDate from "../layout/formatDate";
import axios from "axios";

const CommentItem = (props) => {
  const { user, date, name, text, avatar, _id } = props.comment;
  const currentUser = useSelector((state) => state.auth.currentUser);
  const token = useSelector((state) => state.auth.token);
  // const { sendRequest } = useHttp();

  // const applyData = (data) => {
  //   console.log(data);
  // };

  const deleteComment = async () => {
    console.log("deleteComment1");
    // console.log("props:: ", props.postId);
    // console.log("_id: ", _id);
    // sendRequest(
    //   {
    //     url: `api/posts/comment/${props.postId}/${_id}`,
    //     method: "DELETE",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: token,
    //     },
    //     // body: { text: text },
    //   },
    //   applyData
    // );

    let response = await axios.delete(
      `api/posts/comment/${props.postId}/${_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    console.log("response1: ", response);
    // sendRequest(
    //   {
    //     url: `api/posts/comment/${props.postId}/${_id}`,
    //     method: "DELETE",
    //     headers: { "Content-Type": "application/json", Authorization: token },
    //   },
    //   applyData
    // );
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
        <p className="post-date">Posted on {formatDate(date)}</p>
        {user === currentUser.user._id && (
          <button
            onClick={deleteComment}
            type="button"
            className="btn btn-danger"
          >
            <i className="fas fa-times" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
