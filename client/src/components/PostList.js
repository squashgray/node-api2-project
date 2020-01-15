import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="userlist">
      <h1>Post List</h1>
      {posts.map(post => (
        <PostCard key={post.id} posts={post} />
      ))}
    </div>
  );
};

export default PostList;
