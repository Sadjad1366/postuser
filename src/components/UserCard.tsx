import { Link } from "react-router-dom";
import { IUser } from "../types/userType";

export const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <img
          className="w-24 h-24 rounded-full object-cover"
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div className="flex flex-col gap-2">
          <Link
            to={`/user/${user.id}`}
            className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition duration-300"
          >
            {user.firstName} {user.lastName}
          </Link>
          <div className="text-gray-600">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
