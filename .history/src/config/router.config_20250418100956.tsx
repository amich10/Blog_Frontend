import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import { Provider } from "react-redux";

const RouterConfig = () =>{
    return(
       <>
       <Provider
       <AuthProvider>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
       </>
    )
}
export default RouterConfig;