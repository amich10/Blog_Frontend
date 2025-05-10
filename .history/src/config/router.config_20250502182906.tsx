import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import { CategoryProvider } from "../context/category context/category.context";

const RouterConfig = () => {
  return (
    <>
      <AuthProvider>
        <uSER
        <CategoryProvider>
        <ToastContainer theme="light" />
        <RouterProvider router={router}></RouterProvider>
        </CategoryProvider>
      </AuthProvider>
    </>
  );
};
export default RouterConfig;
