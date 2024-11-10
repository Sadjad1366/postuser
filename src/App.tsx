import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  // fetchPostByIdLoader,
  PostById } from "./pages/posts-byId";
import { fetchUserByIdLoader, UserById } from "./pages/user-byId";
import { UserPostsPage } from "./pages/userPostPage";
import { MainLayout } from "./layouts/main";
import { NotFound } from "./pages/Not-found";
import { PostsPage } from "./pages/posts";
import { UsersPage } from "./pages/users";
import HomePage from "./pages/homePage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "posts",
        element: <PostsPage />,
      },
      {
        path: "post-info/:id",
        element: <PostById />,
        // loader: fetchPostByIdLoader,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "user/:id",
        element: <UserById />,
        children: [
          {
            path: "user/:id/posts",
            element: <UserPostsPage />,
          },
        ],
        loader: fetchUserByIdLoader,
      },

      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
