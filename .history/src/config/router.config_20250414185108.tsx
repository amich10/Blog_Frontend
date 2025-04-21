import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";

const RouterConfig = () =>{
    return(
       <>
       <Auth
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
       </>
    )
}
export default RouterConfig;