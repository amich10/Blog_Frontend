import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

import { UserProvider } from "../context/user.context";
import { CategoryProvider } from "../context/category.context";
import { PostProvider } from "../context/post.context";

const RouterConfig = () => {
  return (
      <AuthProvider>
        <UserProvider>
          <PostProvider>
          <CategoryProvider>
            <ToastContainer theme="light" />
            <RouterProvider router={router}></RouterProvider>
          </CategoryProvider>
          </PostProvider>
        </UserProvider>
      </AuthProvider>
  );
};
export default RouterConfig;
