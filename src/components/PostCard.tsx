import { AiTwotoneDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { IPost } from "../types/posts.type";
import { Link } from "react-router-dom";
import React from "react";

// Add className and style as additional props to PostCard component
export const PostCard: React.FC<{ post: IPost } & React.HTMLAttributes<HTMLDivElement>> = ({ post, className, style, ...props }) => {
  return (
    <div
      className={`bg-blue-400 hover:bg-blue-200 flex flex-col gap-y-3 my-3 p-4 shadow-2xl rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${className}`}
      style={style}
      {...props}  // Spread additional props like event handlers
    >
      <div className="font-bold text-xl truncate">
        <Link to={`/post-info/${post.id}`}>{post.title}</Link>
      </div>
      <div className="text-xl font-medium line-clamp-3">{post.body}</div>
      <div className="flex gap-x-3">
        {post.tags.map((tag, idx) => (
          <div key={idx}>{tag}</div>
        ))}
      </div>
      <div className="flex gap-x-4">
        <div className="flex items-center">
          <AiOutlineLike /> {post.reactions.likes}
        </div>
        <div className="flex items-center">
          <AiTwotoneDislike /> {post.reactions.dislikes}
        </div>
        <div className="flex items-center">
          <GrFormView /> {post.views}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
