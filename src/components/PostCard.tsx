import { AiTwotoneDislike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { GrFormView } from "react-icons/gr";
import { IPost } from "../types/posts.type";



export const PostCard:React.FC<{post:IPost}> = ({ post}) => {
  return (
    <div className="bg-slate-200 flex flex-col gap-y-3 my-3 px-2">
      <div className="text-center font-bold text-xl">
        {post.title}
      </div>
      <div className="text-xl font-medium">{post.body}</div>
      <div className="font-">tags: {post.tags}</div>
      <div className="font-">userId: {post.userId}</div>
      <div className="flex gap-x-4">
      <div className="flex justify-center items-center"><AiOutlineLike /> {post.reactions.likes}</div>
        <div className="flex justify-center items-center"><AiTwotoneDislike/> {post.reactions.dislikes}</div>
        <div className="flex justify-center items-center"><GrFormView />{post.views}</div>
      </div>
    </div>
  );
};

export default PostCard;
