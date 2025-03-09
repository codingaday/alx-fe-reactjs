import React from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams(); // Dynamic parameter
  return <h3>Blog Post {postId}</h3>;
}

export default BlogPost;
