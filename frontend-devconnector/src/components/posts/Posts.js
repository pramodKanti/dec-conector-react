import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import useHttp from "../hooks/use-http";
import { useSelector } from "react-redux";

const Posts = () => {
  const { sendRequest } = useHttp();
  const [posts, setPost] = useState([]);
  const token = useSelector((state) => state.auth.token);

  const applyData = (data) => {
    console.log(data);

    setPost(data);
  };
  console.log("posts");

  useEffect(() => {
    sendRequest(
      {
        url: "/api/posts",
        method: "GET",
        headers: { "Content-type": "application/json", Authorization: token },
      },
      applyData
    );
  }, [sendRequest, token]);

  // create function and call it from child and update list of item
  let onDelete = (postId) => {
    let myPosts = posts.filter((post) => post._id !== postId);
    setPost(myPosts);
  };

  const onLike = (data, postId) => {
    const likePostIndex = posts.findIndex((post) => post._id === postId);

    const likeExist = data.msg === "Post already liked";

    if (!likeExist) {
      posts[likePostIndex].likes = [
        { _id: postId },
        ...posts[likePostIndex].likes,
      ];
    }
    console.log("like");

    setPost(posts);
  };
  const onDisLike = (data, postId) => {
    const likePostIndex = posts.findIndex((post) => post._id === postId);

    const likeExist = data.msg === "Post has not yet been liked";

    if (!likeExist) {
      posts[likePostIndex].likes = [...data];
    }
    console.log("dislike");
    setPost(posts);
  };

  const onAddPost = (post) => {
    const newPost = [post, ...posts];
    console.log("onAddPost");
    setPost(newPost);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community
      </p>
      <PostForm onAddPost={onAddPost} />
      <div className="posts">
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onDelete={onDelete}
            onLike={onLike}
            onDisLike={onDisLike}
            showActions={true}
          />
        ))}
      </div>
    </section>
  );
};

export default Posts;
