import { useQuery } from "@tanstack/react-query";

import { fetchPostsList } from "../apis/users.api";
import React from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
// import { IPost } from "../types/posts.type";

export const PostsPage: React.FC = () => {
  const posts = useQuery({
    queryKey: ["fetching-posts"],
    queryFn: fetchPostsList,
  });

  React.useEffect(() => {
    console.log(posts.data);
    console.log("posts", posts.data?.posts);
  }, [posts]);

  React.useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("AAA");
    // passing AAA to error boundary
  }, [posts.error, posts.isError]);

  return (
    <section>
      {posts.isLoading ? (
        <div>Loading users...</div>
      ) : posts.isError ? (
        <div>Error loading users.</div>
      ) : (
        <div>
          <h2>Users List</h2>
          <ul>
            {posts.data?.posts.map((post) => (
              <Link  key={post.id} to={`/post-info/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
