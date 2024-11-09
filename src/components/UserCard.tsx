import { Link } from "react-router-dom";
import { IUser } from "../types/userType";
import React from "react";

// Add `className` and other props by extending React's standard HTML attributes for a div
export const UserCard: React.FC<{ user: IUser } & React.HTMLAttributes<HTMLDivElement>> = ({ user, className, style, ...props }) => {
  return (
    <div
      className={`bg-blue-400 hover:bg-blue-200 rounded-lg shadow-md p-6 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg ${className}`}
      style={style}
      {...props}  // Spread additional props like event handlers
    >
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
          <div className="text-gray-600 font-medium text-lg">{user.email}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
