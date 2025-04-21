import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const RouterConfig = () =>{
    return(
       <>
       <ErrorBoundary>
       <AuthProvider>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
        
       </>
    )
}
export default RouterConfig;