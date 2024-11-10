import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../apis/users.api";
import { fetchPostComments } from "../apis/users.api";
import { IPost } from "../types/posts.type";
import { IComment } from "../types/commentType";
import { AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";

export const UserPostsPage: React.FC = () => {
  const { id } = useParams();
  const validId = !isNaN(Number(id));

  const userPosts = useQuery({
    queryKey: ["fetching-user-posts", id],
    queryFn: () => fetchUserPosts(Number(id)),
    enabled: validId,
  });

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const postComments = useQuery({
    queryKey: ["fetching-post-comments", selectedPostId],
    queryFn: () => fetchPostComments(selectedPostId!),
    enabled: selectedPostId !== null,
  });

  const toggleComments = (postId: number) => {
    setSelectedPostId(selectedPostId === postId ? null : postId);
  };
  return (
    <div className="container mx-auto">
      <h2 className="font-semibold text-2xl">
        User Posts
      </h2>
      {userPosts.isLoading ? (
        <div>Loading user posts...</div>
      ) : userPosts.isError ? (
        <div>Error loading user posts.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {userPosts.data?.map((post: IPost) => (
            <div key={post.id}>
              <div className="bg-slate-400 rounded-lg mt-2 p-3 flex flex-col gap-3">
                <p className="text-lg font-semibold">{post.title}</p>
                <p>{post.body}</p>
                <div className="flex gap-x-5">
                  {post.tags.map((tag) => (
                    <div>{tag}</div>
                  ))}
                </div>
              <div className="flex gap-x-7">
              <div className="flex justify-center items-center">
                  <AiOutlineLike /> {post.reactions.likes}
                </div>
                <div className="flex justify-center items-center">
                  <AiTwotoneDislike /> {post.reactions.dislikes}
                </div>
                <div className="flex justify-center items-center">
                  <GrFormView />
                  {post.views}
                </div>
              </div>
              </div>
              <button className="mt-3 bg-green-500 p-3 rounded-xl text-xl text-white" onClick={() => toggleComments(post.id)}>
                {selectedPostId === post.id ? "Hide Comments" : "Show Comments"}
              </button>
              {selectedPostId === post.id && (
                <div>
                  {postComments.isLoading ? (
                    <div>Loading comments...</div>
                  ) : postComments.isError ? (
                    <div>Error loading comments.</div>
                  ) : (
                    <div>
                      {postComments.data?.map((comment: IComment) => (
                        <div className="bg-stone-400 p-3 mt-3 rounded-lg" key={comment.id}>{comment.body}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
