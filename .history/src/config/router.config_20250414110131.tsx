import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";

const RouterConfig = () =>{
    return(
        <ToastContainer >
            
        </ToastContainer>
       <RouterProvider router={router}></RouterProvider> 
    )
}
export default RouterConfig;