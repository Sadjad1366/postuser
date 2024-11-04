export const urls = {
  users: { users: "/users", byId: (id: number) => `/users/${id}` },
  posts: {
    list: "/posts",
    byId: (id: number) => `/posts/${id}`,
  },
};
