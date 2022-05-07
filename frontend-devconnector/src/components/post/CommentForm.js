import React, { useState } from "react";
import useHttp from "../hooks/use-http";
import { useSelector } from "react-redux";

const CommentForm = (props) => {
  const [text, setText] = useState("");
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);

  const applyData = (data) => {
    console.log(data);
    setText("");
    props.onAddComment(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    sendRequest(
      {
        url: `/api/posts/comment/${props.postId}`,
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: { text: text },
      },
      applyData
    );
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a Comment</h3>
      </div>
      <form className="form my-1" onSubmit={submitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment the post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default CommentForm;
