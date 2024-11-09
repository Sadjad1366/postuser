
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Navigate, useParams, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import { fetchPostById } from "../apis/users.api";
import { fetchPostComments } from "../apis/users.api";
import { IComment } from "../types/commentType";
import React from "react";
import { FaThumbsUp, FaThumbsDown, FaComments } from 'react-icons/fa';


export const PostById: React.FC = () => {
  const { id } = useParams();
  const loaderData = useLoaderData();
  const validId = !isNaN(Number(id));
console.log(loaderData);


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
  <div className="flex flex-col p-6 gap-5 bg-white rounded-lg shadow-md">
    {/* Post Title */}
    <h2 className="font-semibold text-2xl text-gray-800">{post.data?.title}</h2>

    {/* Post Body */}
    <p className="text-gray-600 text-lg leading-relaxed">{post.data?.body}</p>

    {/* Reactions Section */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-green-500">
        <FaThumbsUp />
        <span className="text-lg font-medium">{post.data?.reactions.likes}</span>
      </div>
      <div className="flex items-center gap-2 text-red-500">
        <FaThumbsDown />
        <span className="text-lg font-medium">{post.data?.reactions.dislikes}</span>
      </div>
    </div>

    {/* Tags Section */}
    <div className="flex flex-wrap gap-2">
      {post.data?.tags?.map((tag: string, index: number) => (
        <span key={index} className="bg-blue-100 text-blue-500 px-2 py-1 rounded-lg text-sm font-medium">
          #{tag}
        </span>
      ))}
    </div>

    {/* Toggle Comments Button */}
    <button
      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 transition-colors text-white rounded-lg w-[200px] px-3 py-2 text-lg font-medium"
      onClick={toggleComments}
    >
      <FaComments />
      {showComments ? "Hide Comments" : "Show Comments"}
    </button>

    {/* Comments Section */}
    {showComments && (
      <div className="mt-4">
        <h3 className="bg-gray-200 text-xl font-semibold p-2 rounded-t-lg">Comments:</h3>
        {postComments.isLoading ? (
          <div className="p-2 text-gray-500">Loading comments...</div>
        ) : postComments.isError ? (
          <div className="p-2 text-red-500">Error loading comments.</div>
        ) : (
          <div className="bg-gray-100 rounded-lg">
            {postComments.data?.map((comment: IComment) => (
              <div className="p-3 text-gray-800 font-medium border-b last:border-none" key={comment.id}>
                {comment.body}
              </div>
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
