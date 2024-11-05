export const urls = {
  users: { users: "/users",
          byId: (id: number) => `/users/${id}` ,
     posts: (userId: number) => `/users/${userId}/posts`,
    },
  posts: {
    list: "/posts",
    byId: (id: number) => `/posts/${id}`,
  },
};
