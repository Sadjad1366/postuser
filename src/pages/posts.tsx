import { useQuery } from "@tanstack/react-query";
import { fetchPostsList } from "../apis/users.api";
import React from "react";
import PostCard from "../components/PostCard";
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

  return (
    <section className="container mx-auto">
      {posts.isLoading && allPosts.length === 0 ? (
        <div>Loading posts...</div>
      ) : posts.isError ? (
        <div>Error loading posts.</div>
      ) : (
        <div>
          <h2 className="text-xl font-bold p-2">Posts List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPosts.map((post, index) => (
              <PostCard
                key={post.id}
                post={post}
                className="animate-shuffle" // Apply the shuffling animation defined in Tailwind config
                style={{ animationDelay: `${index * 300}ms` }} // Apply staggered delay of 100ms between each post
              />
            ))}
          </div>
          {posts.data && posts.data.total > skip + limit && (
            <button onClick={loadMore}>Show More</button>
          )}
        </div>
      )}
    </section>
  );
};
