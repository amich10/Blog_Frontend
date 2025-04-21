import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";

const RouterConfig = () =>{
    return(
        <ToastContainer >
             <RouterProvider router={router}></RouterProvider>
        </ToastContainer> 
    )
}
export default RouterConfig;