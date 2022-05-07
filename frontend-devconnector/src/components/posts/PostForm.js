import React, { useState } from "react";
import useHttp from "../hooks/use-http";
import { useSelector } from "react-redux";

const PostForm = (props) => {
  const [text, setText] = useState("");
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);

  const applyData = (data) => {
    console.log(data);
    setText("");
    props.onAddPost(data);
  };

  const sumbitHandler = (e) => {
    sendRequest(
      {
        url: "/api/posts",
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: { text: text },
      },
      applyData
    );
    e.preventDefault();
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1" onSubmit={sumbitHandler}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
