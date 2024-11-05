import { useQuery } from "@tanstack/react-query";

import { fetchUsersLists } from "../apis/users.api";
import React from "react";
import UserCard from "../components/UserCard";
import { IUser } from "../types/userType";


export const UsersPage: React.FC = () => {
  const [allUsers, setAllUsers] = React.useState<IUser[]>([]);
  const [skip, setSkip] = React.useState(0);
  const limit = 30;

  const users = useQuery({
    queryKey: ["fetching-users", skip],
    queryFn: () => fetchUsersLists(skip, limit),
  });

  const loadMore = () => {
    setSkip(skip + limit);
  };

  React.useEffect(() => {
    if (users.data) {
      setAllUsers([...allUsers, ...users.data.users]);
    }
  }, [users.data]);

  React.useEffect(() => {
    if (!users.error || !users.isError) return;
    throw new Error("AAA");
    // passing AAA to error boundary
  }, [users.error, users.isError]);

  return (
    <section>
      {users.isLoading && allUsers.length === 0 ? (
        <div>Loading users...</div>
      ) : users.isError ? (
        <div>Error loading users.</div>
      ) : (
        <div>
          <h2 className="font-bold text-xl p-2">Users List</h2>
          <ul>
            {allUsers.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
          </ul>
          {users.data && users.data.total > skip + limit && (
            <button onClick={loadMore}>Show More</button>
          )}
        </div>
      )}
    </section>
  );
};
