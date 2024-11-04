import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./layouts/main";
import { NotFound } from "./pages/Not-found";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostsPage } from "./pages/posts";
import { UsersPage } from "./pages/users";
import { fetchPostByIdLoader, PostById } from "./pages/posts-byId";
import { fetchUserByIdLoader, UserById } from "./pages/user-byId";
// import { ErrorBoundary } from "./components/errorboundry";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <div>
            <h1 className="underline font-bold">Hello World</h1>
          </div>
        )
      },
      {
        path: "posts",
        element: <PostsPage />,
        // errorElement: <ErrorBoundary />,
      },
      {
        path: "post-info/:id",
        element: <PostById/>,
        loader: fetchPostByIdLoader,
      },
      {
        path: "users",
        element: <UsersPage />,
        // errorElement: <ErrorBoundary />,
      },
      {
        path: "user-info/:id",
        element: <UserById/>,
        loader: fetchUserByIdLoader,
      },
      {
        path: "/404",
        element: <NotFound />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>

  );
}

export default App;
