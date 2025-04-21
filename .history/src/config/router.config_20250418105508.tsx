import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";

const RouterConfig = () =>{
    return(
       <>
        <ToastContainer theme="light"/> 
        <RouterProvider router={router}></RouterProvider>
       </>
    )
}
export default RouterConfig;