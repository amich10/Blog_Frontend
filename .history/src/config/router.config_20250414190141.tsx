import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

const RouterConfig = () =>{
    return(
       <>
       <AuthProvider></AuthProvider>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
       </>
    )
}
export default RouterConfig;