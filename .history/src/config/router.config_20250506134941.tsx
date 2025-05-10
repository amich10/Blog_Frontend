import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import { CategoryProvider } from "../context/category context/category.context";
import { UserProvider } from "../context/user.context";
import { CommentProvider } from "../context/comment.context";

const RouterConfig = () => {
  return (
    <>
      <AuthProvider>
        <UserProvider>
        <CategoryProvider>
          <CommentProvider slug="">
        <ToastContainer theme="light" />
        <RouterProvider router={router}></RouterProvider>
        </CommentProvider>
        </CategoryProvider>
        </UserProvider>
      </AuthProvider>
    </>
  );
};
export default RouterConfig;
