import { useQuery } from "@tanstack/react-query";

import { fetchPostsList } from "../apis/users.api";
import React from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";


export const PostsPage: React.FC = () => {
  const [skip, setSkip] = React.useState(0);
  const limit = 30;

  const posts = useQuery({
    queryKey: ["fetching-posts", skip],
    queryFn: () => fetchPostsList(skip, limit),
  });

  const loadMore = () => {
    setSkip(skip + limit);
  };

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
              <Link key={post.id} to={`/post-info/${post.id}`}>
                <PostCard post={post} />
              </Link>
            ))}
          </ul>
          {posts.data && posts.data.total > skip + limit && (
            <button onClick={loadMore}>Show More</button>
          )}
        </div>
      )}
    </section>
  );
};
