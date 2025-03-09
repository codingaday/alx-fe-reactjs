// PostsComponent.js
import React from "react";
import { useQuery } from "react-query";

// Fetch data function
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

function PostsComponent() {
  const { data, error, isLoading, isError, isFetching, refetch } = useQuery(
    "posts",
    fetchPosts,
    {
      // Caching and refetch options
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 2,
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    }
  );

  // Handle loading and error states
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={refetch} disabled={isFetching}>
        {isFetching ? "Refetching..." : "Refetch Data"}
      </button>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
