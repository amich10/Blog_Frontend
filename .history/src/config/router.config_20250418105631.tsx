import { RouterProvider } from "react-router";
import { router } from "./routes.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/auth.context";

const RouterConfig = () =>{
    return(
       <>
       <AuthProvider>

       </AuthProvider>
       </>
    )
}
export default RouterConfig;