import { useQuery } from "@tanstack/react-query";

import {  fetchUsersLists } from "../apis/users.api";
import React from "react";
import UserCard from "../components/UserCard";

export const UsersPage: React.FC = () => {
  const users = useQuery({
    queryKey: ["fetching-users"],
    queryFn: fetchUsersLists,
  });

  React.useEffect(() => {
    console.log(users.data);
    console.log("users",users.data?.users);
  }, [users]);

  React.useEffect(() => {
    if (!users.error || !users.isError) return;
    throw new Error("AAA");
    // passing AAA to error boundary
  }, [users.error, users.isError]);

  return (
    <section>
      {users.isLoading ? (
        <div>Loading users...</div>
      ) : users.isError ? (
        <div>Error loading users.</div>
      ) : (
        <div>
          <h2>Users List</h2>
          <ul>
            {users.data?.users.map((user) => (
              <UserCard key={user.id} user={user}/>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
