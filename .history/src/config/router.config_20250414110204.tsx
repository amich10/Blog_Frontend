import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";

const RouterConfig = () =>{
    return(
        <ToastContainer theme="light">
             <RouterProvider router={router}></RouterProvider>
        </ToastContainer> 
    )
}
export default RouterConfig;