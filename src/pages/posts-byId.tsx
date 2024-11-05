
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Navigate, useParams, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { fetchPostById, fetchUserById } from "../apis/users.api";
import { fetchPostComments } from "../apis/users.api";
import { IComment } from "../types/commentType";
import React from "react";


export const PostById: React.FC = () => {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const validId = !isNaN(Number(id));


  const post = useQuery({
    queryKey: ["fetching-post", id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: validId,
  });

  const postComments = useQuery({
    queryKey: ["fetching-post-comments", id],
    queryFn: () => fetchPostComments(Number(id)),
    enabled: validId,
  });

  const [showComments, setShowComments] = React.useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!validId || (post.error as AxiosError)?.status === 404) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="flex flex-col p-4 gap-3">

      <h2 className="font-semibold">{post.data?.title}</h2>
      <p>{post.data?.body}</p>
      <button className="bg-green-400 rounded-lg text-white w-[200px] p-3" onClick={toggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div>
          <h3 className="bg-slate-400 text-xl font-semibold p-2">Comments:</h3>
          {postComments.isLoading ? (
            <div>Loading comments...</div>
          ) : postComments.isError ? (
            <div>Error loading comments.</div>
          ) : (
            <div className="bg-slate-200">
              {postComments.data?.map((comment: IComment) => (
                <div className="p-3 text-lg font-medium" key={comment.id}>{comment.body}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export const fetchPostByIdLoader = async (data: LoaderFunctionArgs) => {
  let post = undefined;
  try {
    post = await fetchPostById(Number(data.params.id));
  } catch (error) {
    console.log("error", error);
  }
  return { post };
};
