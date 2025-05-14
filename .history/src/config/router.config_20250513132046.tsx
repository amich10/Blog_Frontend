import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

import { UserProvider } from "../context/user.context";
import { CategoryProvider } from "../context/category.context";

const RouterConfig = () => {
  return (
      <AuthProvider>
        <UserProvider>
          <CategoryProvider>
            <ToastContainer theme="light" />
            <RouterProvider router={router}></RouterProvider>
          </CategoryProvider>
        </UserProvider>
      </AuthProvider>
  );
};
export default RouterConfig;
