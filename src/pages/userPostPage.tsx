import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../apis/users.api";
import { IPost } from "../types/posts.type";

export const UserPostsPage: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));

  const userPosts = useQuery({
    queryKey: ["fetching-user-posts", id],
    queryFn: () => fetchUserPosts(Number(id)),
    enabled: validId,
  });

  return (
      <div>
        <h2>User Posts</h2>
        {userPosts.isLoading ? (
          <div>Loading user posts...</div>
        ) : userPosts.isError ? (
          <div>Error loading user posts.</div>
        ) : (
          <div className="flex flex-col gap-3">
            {userPosts.data?.map((post: IPost) => (
              <div className="flex flex-col gap-4 bg-slate-300" key={post.id}>
                  <p className="font-semibold text-lg">{post.title}</p>
                  <p>{post.body}</p>
                  </div>
            ))}
          </div>
        )}
      </div>
    );
  };
