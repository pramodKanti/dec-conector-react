import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import useHttp from "../hooks/use-http";

const Post = () => {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const { sendRequest, isLoading } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const params = useParams();

  const applyData = (data) => {
    setPost(data);
    setComments(data.comments);
    console.log(data);
  };

  console.log(post.comments);

  useEffect(() => {
    console.log(token);
    sendRequest(
      {
        url: `/api/posts/${params.id}`,
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      },
      applyData
    );
  }, [sendRequest, token, params.id]);

  const onAddComment = (comment) => {
    setComments(comment);
  };

  return isLoading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />

      <CommentForm postId={post._id} onAddComment={onAddComment} />
      <div className="comments">
        {post.comments &&
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          ))}
      </div>
    </section>
  );
};

export default Post;
