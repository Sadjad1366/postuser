import { useQuery } from "@tanstack/react-query";

import { fetchPostsList } from "../apis/users.api";
import React from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { IPost } from "../types/posts.type";


export const PostsPage: React.FC = () => {
  const [allPosts, setAllPosts] = React.useState<IPost[]>([]);
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
    if (posts.data) {
      setAllPosts([...allPosts, ...posts.data.posts]);
    }
  }, [posts.data]);

  React.useEffect(() => {
    if (!posts.error || !posts.isError) return;
    throw new Error("AAA");
    // passing AAA to error boundary
  }, [posts.error, posts.isError]);

  return (
    <section>
      {posts.isLoading && allPosts.length === 0 ? (
        <div>Loading posts...</div>
      ) : posts.isError ? (
        <div>Error loading posts.</div>
      ) : (
        <div>
          <h2>Posts List</h2>
          <ul>
            {allPosts.map((post) => (
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
