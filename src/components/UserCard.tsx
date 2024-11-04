import { Link } from "react-router-dom";
import { IUser } from "../types/userType";
// export interface IUserCard {
//   user?: IUser
// }
export const UserCard:React.FC<IUser> = ({ user}) => {
  return (
    <div className="bg-slate-200 flex flex-col gap-y-3 my-3 px-2">
      <div className="text-center font-bold text-xl">
        {user.title}
      </div>
      <div className="text-xl font-medium">{user.id}</div>
      <Link to={`/user-info/${user.id}`}><div className="font-">{user.firstName}</div></Link>
      <div className="flex gap-x-4">
      <div className="flex justify-center items-center"> {user.lastName}</div>
        <div className="flex justify-center items-center"> {user.age}</div>
        <div className="flex justify-center items-center">{user.birthdate}</div>
      </div>
    </div>
  );
};

export default UserCard;
