import React from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  // Get the dynamic 'id' parameter from the URL
  const { id } = useParams();

  return (
    <div>
      <h3>Blog Post {id}</h3>
      <p>Here is the content of the blog post with ID {id}.</p>
    </div>
  );
}

export default BlogPost;
