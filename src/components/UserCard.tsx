import { Link } from "react-router-dom";
import { IUser } from "../types/userType";

export const UserCard:React.FC<{user:IUser}> = ({ user}) => {
  return (
    <div className="bg-slate-200 flex flex-col gap-y-3 my-3 p-2">
    <img className="size-12" src={user.image} alt="" />
      <Link to={`/user/${user.id}`}><div className="font-">{user.firstName} {user.lastName}</div></Link>
      <div className="flex gap-x-4">
        <div className="flex justify-center items-center">age: {user.age}</div>
        <div className="flex justify-center items-center">email: {user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
